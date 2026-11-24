"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { btnPrimary, inputCls } from "./ui";

export function displayName(session: Session) {
  const m = session.user.user_metadata ?? {};
  return (m.display_name as string) || (m.full_name as string) || session.user.email || "";
}

// Black header + sign in, shared by /deals and /admin. One login works for both.
export function DealsShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: (session: Session, signOut: () => void) => ReactNode;
}) {
  const supabase = dealsSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [supabase]);

  const signOut = () => {
    supabase?.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-black text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-white.png" alt="House Junkies" width={56} height={37} className="h-10 w-auto sm:h-12" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand-yellow sm:text-xs">{eyebrow}</p>
              <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h1>
            </div>
          </div>
          {session && (
            <div className="text-right text-sm">
              <p className="font-bold text-white">{displayName(session)}</p>
              <button onClick={signOut} className="font-semibold text-brand-yellow hover:underline">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {!supabase ? (
          <p className="rounded-xl bg-white p-6 text-gray-700 shadow-sm">
            Supabase is not configured for this deploy. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in
            Vercel and redeploy.
          </p>
        ) : !ready ? (
          <p className="text-gray-500">Loading...</p>
        ) : session ? (
          children(session, signOut)
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

function LoginForm() {
  const supabase = dealsSupabase()!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setError(error.message);
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-4 max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-extrabold text-brand-black">Sign In</h2>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-gray-700">Email</span>
        <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-gray-700">Password</span>
        <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
      </label>
      {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
      <button type="submit" disabled={busy} className={`${btnPrimary} w-full`}>
        {busy ? "Signing In..." : "Sign In"}
      </button>
      <p className="text-xs text-gray-500">Accounts are set up by the office. There is no public sign up.</p>
    </form>
  );
}
