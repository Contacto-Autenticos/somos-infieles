import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN");

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fallback fixed exchange rate USD to COP
const FALLBACK_USD_TO_COP_RATE = 3600;

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { title, unit_price_usd, user_email, reference, back_url } = await req.json();

    let rate = FALLBACK_USD_TO_COP_RATE;
    try {
      const rateResponse = await fetch("https://open.er-api.com/v6/latest/USD");
      if (rateResponse.ok) {
        const rateData = await rateResponse.json();
        if (rateData && rateData.rates && rateData.rates.COP) {
          rate = rateData.rates.COP;
          console.log(`Fetched current exchange rate: 1 USD = ${rate} COP`);
        }
      } else {
        console.warn(`Failed to fetch exchange rate, using fallback. Status: ${rateResponse.status}`);
      }
    } catch (err) {
      console.error("Error fetching exchange rate, using fallback:", err);
    }

    // Convert USD to COP
    const unit_price_cop = Math.round(unit_price_usd * rate);

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: reference,
            title: title,
            unit_price: unit_price_cop,
            quantity: 1,
            currency_id: "COP",
          }
        ],
        external_reference: reference,
        back_urls: {
          success: `${back_url}?status=approved&ref=${reference}`,
          failure: `${back_url}?status=failure&ref=${reference}`,
          pending: `${back_url}?status=pending&ref=${reference}`,
        },
        auto_return: "approved",
        payer: {
          email: user_email
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error de Mercado Pago:", data);
      return new Response(JSON.stringify({ error: data.message || "Error en Mercado Pago", detail: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: response.status,
      });
    }

    return new Response(JSON.stringify({ 
      id: data.id, 
      init_point: data.init_point,
      unit_price_cop: unit_price_cop 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    console.error("Error en create-mp-preference-infieles:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
