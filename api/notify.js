import webpush from 'web-push';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const publicVapidKey = process.env.VITE_VAPID_PUBLIC_KEY || 'BI14YFPZRs_QS2ElH4Jkf7zcXgYbtSc4f6lmTIx7Dpcq9oZqWIrXKxnbWQ8nSjHzvrXk1mCny0Ghu054a3lFQ24';
  const privateVapidKey = process.env.VAPID_PRIVATE_KEY; // MUST be set in Vercel Environment Variables

  if (!privateVapidKey) {
    console.error('Missing VAPID_PRIVATE_KEY');
    return res.status(500).json({ error: 'Missing VAPID_PRIVATE_KEY in environment variables' });
  }

  webpush.setVapidDetails(
    'mailto:test@somosinfieles.com',
    publicVapidKey,
    privateVapidKey
  );

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing Supabase credentials' });
  }

  try {
    const { message, title } = req.body;

    // Fetch all active subscriptions from Supabase
    const subResponse = await fetch(`${supabaseUrl}/rest/v1/admin_push_subscriptions?select=*`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!subResponse.ok) {
      throw new Error(`Supabase error: ${subResponse.status}`);
    }

    const subscriptions = await subResponse.json();

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({ success: true, message: 'No subscriptions found' });
    }

    const notificationPayload = JSON.stringify({
      title: title || 'Nueva Venta',
      body: message || 'Se ha registrado una nueva venta.',
      icon: '/Logo somos infieles - Cuadrado.jpg',
      data: {
        url: '/admin'
      }
    });

    const sendPromises = subscriptions.map((sub) => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.keys_p256dh,
          auth: sub.keys_auth
        }
      };
      
      return webpush.sendNotification(pushSubscription, notificationPayload)
        .catch(err => {
          console.error('Error sending notification to an endpoint:', err);
          if (err.statusCode === 410 || err.statusCode === 404) {
            // Subscription expired or unsubscribed, remove from DB
            fetch(`${supabaseUrl}/rest/v1/admin_push_subscriptions?endpoint=eq.${encodeURIComponent(sub.endpoint)}`, {
              method: 'DELETE',
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`
              }
            });
          }
          return { error: err.message || err.toString(), statusCode: err.statusCode };
        });
    });

    const results = await Promise.all(sendPromises);
    const errors = results.filter(r => r && r.error);

    return res.status(200).json({ success: true, count: subscriptions.length, errors });
  } catch (error) {
    console.error('Error in notify handler:', error);
    return res.status(500).json({ error: error.message });
  }
}
