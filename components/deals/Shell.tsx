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
  tabBar,
  children,
}: {
  eyebrow: string;
  title: string;
  tabBar?: boolean; // phones use the bottom tab bar's Profile tab for sign out
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

  // Black behind the page too, so phones never flash white when you scroll past the ends.
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0a0a0a";
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  const signOut = () => {
    supabase?.auth.signOut();
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-brand-black text-white [color-scheme:dark]">
      {/* Solid black and stuck to the top, so the page never scrolls under the phone clock. */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-brand-black pt-[env(safe-area-inset-top)] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:py-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-white.png" alt="House Junkies" width={56} height={37} className="h-9 w-auto sm:h-12" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand-yellow sm:text-xs">{eyebrow}</p>
              <h1 className="text-xl font-extrabold leading-tight sm:text-3xl">{title}</h1>
            </div>
          </div>
          {session && (
            <div className={`text-right text-sm ${tabBar ? "hidden md:block" : ""}`}>
              <p className="font-bold text-white">{displayName(session)}</p>
              <button onClick={signOut} className="font-semibold text-brand-yellow hover:underline">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-6 pb-6">
        {!supabase ? (
          <p className="rounded-xl border border-white/10 bg-brand-charcoal p-6 text-gray-300">
            Supabase is not configured for this deploy. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in
            Vercel and redeploy.
          </p>
        ) : !ready ? (
          <p className="text-gray-400">Loading...</p>
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
    <form onSubmit={submit} className="mx-auto mt-4 max-w-sm space-y-4 rounded-2xl border border-white/10 bg-brand-charcoal p-6">
      <h2 className="text-xl font-extrabold text-white">Sign In</h2>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-gray-300">Email</span>
        <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-gray-300">Password</span>
        <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
      </label>
      {error && <p className="text-sm font-semibold text-red-400">{error}</p>}
      <button type="submit" disabled={busy} className={`${btnPrimary} w-full`}>
        {busy ? "Signing In..." : "Sign In"}
      </button>
      <p className="text-xs text-gray-400">Accounts are set up by the office. There is no public sign up.</p>
    </form>
  );
}
