import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

// Writes the lead to Supabase (source_page carried through for the KPI/CRM
// source-tagging the SEO report calls out as non-negotiable), then fires a
// Web3Forms email so someone actually sees it without checking the database.

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { full_name, phone, property_address, source_page } = body;

  if (!full_name || !phone || !property_address) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = supabaseServer();
  const { error } = await supabase.from("leads").insert({
    full_name,
    phone,
    property_address,
    source_page,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  // Fire-and-forget email notification via Web3Forms. Don't fail the request
  // if this fails, the lead is already safely in Supabase.
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `New lead: ${full_name} — ${property_address}`,
        from_name: "House Junkies Website",
        full_name,
        phone,
        property_address,
        source_page,
      }),
    });
  } catch (e) {
    console.error("Web3Forms notification failed:", e);
  }

  return NextResponse.json({ ok: true });
}
