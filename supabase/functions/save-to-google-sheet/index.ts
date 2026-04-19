import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Body {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  background: string;
  orderId: string;
  paymentStatus: string;
  amount: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = (await req.json()) as Body;

    // Check if participant with this order_id already exists
    const { data: existing } = await supabase
      .from("participants")
      .select("id")
      .eq("order_id", body.orderId)
      .maybeSingle();

    if (existing) {
      // Update existing record
      const { error } = await supabase
        .from("participants")
        .update({
          payment_status: body.paymentStatus,
          amount: body.amount,
        })
        .eq("id", existing.id);

      if (error) throw error;
    } else {
      // Insert new record
      const { error } = await supabase
        .from("participants")
        .insert({
          full_name: body.fullName,
          email: body.email,
          phone: body.phone,
          profession: body.profession,
          background: body.background,
          order_id: body.orderId,
          payment_status: body.paymentStatus,
          amount: body.amount,
          status: "pending",
        });

      if (error) throw error;
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error(msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
