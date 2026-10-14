import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { full_name, phone, email, property_address, description, source_page } = body;

  if (!full_name || !phone || !property_address) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = supabaseServer();
  const { error } = await supabase.from("leads").insert({
    full_name,
    phone,
    email,
    property_address,
    notes: description,
    source_page,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // The Web3Forms email is sent from the browser (see lib/web3forms.ts), not
  // here: Web3Forms blocks server-side calls on the free plan.
  return NextResponse.json({ ok: true });
}
