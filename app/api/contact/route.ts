import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { full_name, email, phone, subject, message } = body;

  if (!full_name || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = supabaseServer();
  const { error } = await supabase.from("contact_messages").insert({
    full_name,
    email,
    phone,
    subject,
    message,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Could not save message" }, { status: 500 });
  }

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: subject || `New contact message from ${full_name}`,
        from_name: "House Junkies Website",
        full_name,
        email,
        phone,
        message,
      }),
    });
  } catch (e) {
    console.error("Web3Forms notification failed:", e);
  }

  return NextResponse.json({ ok: true });
}
