const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MIDTRANS_SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY");
const MIDTRANS_CLIENT_KEY = Deno.env.get("MIDTRANS_CLIENT_KEY");
// Sandbox endpoint
const SNAP_URL = "https://app.sandbox.midtrans.com/snap/v1/transactions";

interface Body {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  background: string;
  amount: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (!MIDTRANS_SERVER_KEY || !MIDTRANS_CLIENT_KEY) {
      throw new Error("Midtrans keys belum dikonfigurasi");
    }

    const body = (await req.json()) as Body;
    if (!body.email || !body.fullName || !body.amount) {
      return new Response(JSON.stringify({ error: "Data tidak lengkap" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const orderId = `WEB-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const payload = {
      transaction_details: { order_id: orderId, gross_amount: body.amount },
      customer_details: {
        first_name: body.fullName,
        email: body.email,
        phone: body.phone,
      },
      item_details: [
        {
          id: "WEBINAR-TICKET",
          price: body.amount,
          quantity: 1,
          name: "Tiket Webinar",
        },
      ],
      credit_card: { secure: true },
    };

    const auth = btoa(`${MIDTRANS_SERVER_KEY}:`);
    const res = await fetch(SNAP_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Midtrans error:", data);
      throw new Error(`Midtrans error: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({
        token: data.token,
        redirect_url: data.redirect_url,
        order_id: orderId,
        client_key: MIDTRANS_CLIENT_KEY,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error(msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
