"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { addressLines, type Deal, type DirectoryRow } from "@/lib/deals/calc";
import { Dashboard } from "./Dashboard";
import { DealWizard } from "./DealWizard";
import { DealDetail } from "./DealDetail";
import { CheckIcon, btnGhost, btnPrimary, btnDark, inputCls } from "./ui";

type View =
  | { name: "dashboard" }
  | { name: "wizard"; deal?: Deal }
  | { name: "success"; deal: Deal }
  | { name: "detail"; id: string };

export function DealsApp() {
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

  const signOut = () => supabase?.auth.signOut();

  return (
    <div className="min-h-[70vh] bg-gray-50">
      <div className="bg-brand-black text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-white.png" alt="House Junkies" width={56} height={37} className="h-10 w-auto sm:h-12" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-brand-yellow sm:text-xs">House Junkies Team Only</p>
              <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">Deal Tracker</h1>
            </div>
          </div>
          {session && (
            <div className="text-right text-sm">
              <p className="hidden text-gray-300 sm:block">{session.user.email}</p>
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
          <SignedIn session={session} signOut={signOut} />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

function SignedIn({ session, signOut }: { session: Session; signOut: () => void }) {
  const supabase = dealsSupabase()!;
  const [view, setView] = useState<View>({ name: "dashboard" });
  const [myDeals, setMyDeals] = useState<Deal[]>([]);
  const [directory, setDirectory] = useState<DirectoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const [mine, dir] = await Promise.all([
      supabase.from("deals").select("*").order("created_at", { ascending: false }),
      supabase.rpc("deal_directory"),
    ]);
    const err = mine.error ?? dir.error;
    setError(err ? err.message : null);
    if (!mine.error) setMyDeals((mine.data ?? []) as Deal[]);
    if (!dir.error) setDirectory((dir.data ?? []) as DirectoryRow[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  // Always land at the top when the screen changes (matters on phones).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [view]);

  const toDashboard = () => setView({ name: "dashboard" });

  if (view.name === "wizard") {
    return (
      <DealWizard
        deal={view.deal}
        directory={directory}
        onCancel={() => (view.deal ? setView({ name: "detail", id: view.deal.id }) : toDashboard())}
        onSaved={async (saved, isNew) => {
          await load();
          setView(isNew ? { name: "success", deal: saved } : { name: "detail", id: saved.id });
        }}
      />
    );
  }

  if (view.name === "success") {
    const [line1, line2] = addressLines(view.deal.address);
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-black">
          <CheckIcon className="h-8 w-8" />
        </div>
        <p className="mt-5 font-display text-3xl font-black text-brand-black">SUCCESS!</p>
        <p className="mt-3 text-lg text-gray-700">
          <span className="font-bold text-brand-black">{line1}</span>
          {line2 && <span className="block text-gray-500">{line2}</span>}
        </p>
        <p className="mt-2 font-bold uppercase tracking-wide text-gray-600">was successfully added to your deals</p>
        <div className="mt-8 grid gap-3">
          <button onClick={() => setView({ name: "detail", id: view.deal.id })} className={btnPrimary}>
            Add More Info
          </button>
          <button onClick={toDashboard} className={btnDark}>
            View Leads
          </button>
          <button onClick={signOut} className={btnGhost}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  if (view.name === "detail") {
    const deal = myDeals.find((d) => d.id === view.id);
    if (!deal) {
      return (
        <p className="text-gray-600">
          {loading ? "Loading..." : "That deal could not be found. "}
          {!loading && (
            <button onClick={toDashboard} className="font-semibold text-brand-yellow-dark hover:underline">
              Back to Deals
            </button>
          )}
        </p>
      );
    }
    return (
      <DealDetail
        deal={deal}
        onBack={toDashboard}
        onRecalculate={() => setView({ name: "wizard", deal })}
        onChanged={load}
        onDeleted={async () => {
          await load();
          toDashboard();
        }}
      />
    );
  }

  return (
    <Dashboard
      session={session}
      myDeals={myDeals}
      directory={directory}
      loading={loading}
      error={error}
      onAdd={() => setView({ name: "wizard" })}
      onOpen={(id) => setView({ name: "detail", id })}
    />
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
