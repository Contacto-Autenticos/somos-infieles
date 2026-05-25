export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Faltan variables de entorno de Supabase' });
  }

  try {
    // Hacemos una petición simple a la REST API de Supabase para generar actividad.
    // Esto previene que el proyecto de Free Tier se pause por inactividad.
    const response = await fetch(`${supabaseUrl}/rest/v1/?limit=1`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    // 200 OK y 401 Unauthorized son pruebas de que el ping llegó a Supabase
    // (el 401 pasa porque la key anónima no puede listar todas las tablas, pero cuenta como actividad).
    if (!response.ok && response.status !== 401) {
      throw new Error(`Supabase respondió con estado: ${response.status}`);
    }

    return res.status(200).json({ message: 'Ping a Supabase exitoso. Proyecto mantenido activo.' });
  } catch (error) {
    console.error('Error al hacer ping a Supabase:', error);
    return res.status(500).json({ error: error.message });
  }
}
