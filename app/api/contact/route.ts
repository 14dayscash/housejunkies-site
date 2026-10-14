import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { full_name, email, phone, property_address, description } = body;

  if (!full_name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = supabaseServer();
  const { error } = await supabase.from("contact_messages").insert({
    full_name,
    email,
    phone,
    subject: property_address ? `Property: ${property_address}` : null,
    message: description,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Could not save message" }, { status: 500 });
  }

  // The Web3Forms email is sent from the browser (see lib/web3forms.ts), not
  // here: Web3Forms blocks server-side calls on the free plan.
  return NextResponse.json({ ok: true });
}
