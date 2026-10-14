// Email notification through Web3Forms.
//
// This MUST run in the browser. Web3Forms blocks server-side calls on its free
// plan (403 "This method is not allowed"), which is why the old calls inside
// the /api routes never delivered an email. The access key is designed to be
// public, so it lives in a NEXT_PUBLIC_ env var.
//
// Never throws and never blocks the lead: the lead is already saved to
// Supabase before this runs, so a failed email is logged and swallowed.

export async function notifyWeb3Forms(fields: Record<string, unknown>): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error("Web3Forms notification skipped: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set");
    return false;
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "House Junkies Website",
        ...fields,
      }),
      keepalive: true,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success) {
      console.error("Web3Forms notification rejected:", res.status, data?.message ?? data);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Web3Forms notification failed:", e);
    return false;
  }
}
