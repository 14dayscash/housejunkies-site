"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Browser client for the internal /deals tool. Uses the public anon key; row
// level security on the deals table means only signed-in team members can read
// or write. Created lazily so the build does not need the env vars.
let client: SupabaseClient | null = null;

export function dealsSupabase(): SupabaseClient | null {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  client = createClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true, storageKey: "hj-deals-auth" },
  });
  return client;
}
