"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { addressLines, type Deal, type DirectoryRow } from "@/lib/deals/calc";
import { Dashboard } from "./Dashboard";
import { DealWizard } from "./DealWizard";
import { DealDetail } from "./DealDetail";
import { CheckIcon, btnGhost, btnPrimary, btnDark } from "./ui";
import { DealsShell } from "./Shell";

// Shown on the success screen after a deal is saved (Dominic, 2026-11-24).
const TEAM_CONTACTS: { name: string; phone: string; email?: string }[] = [
  { name: "Dominic McClelland", phone: "(559) 368-8956" },
  { name: "Abel Ulloa", phone: "(559) 310-5004" },
  { name: "Ciara Seaton", phone: "(559) 358-0523", email: "ciaraseaton23@gmail.com" },
];

type View =
  | { name: "dashboard" }
  | { name: "wizard"; deal?: Deal }
  | { name: "success"; deal: Deal }
  | { name: "detail"; id: string };

export function DealsApp() {
  return (
    <DealsShell eyebrow="House Junkies Team" title="Deal Tracker">
      {(session, signOut) => <SignedIn session={session} signOut={signOut} />}
    </DealsShell>
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
      // Only your own deals here (admins can read every deal, so filter by owner).
      supabase.from("deals").select("*").eq("created_by", session.user.id).order("created_at", { ascending: false }),
      supabase.rpc("deal_directory"),
    ]);
    const err = mine.error ?? dir.error;
    setError(err ? err.message : null);
    if (!mine.error) setMyDeals((mine.data ?? []) as Deal[]);
    if (!dir.error) setDirectory((dir.data ?? []) as DirectoryRow[]);
    setLoading(false);
  }, [supabase, session.user.id]);

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
        <p className="mt-2 font-bold uppercase tracking-wide text-gray-600">Successfully Added to Deals</p>
        <div className="mt-5 rounded-xl bg-gray-50 p-4 text-left text-xs leading-relaxed text-gray-600">
          <p className="font-bold text-gray-700">Contact Abel/Dominic to Confirm Offer</p>
          <p className="font-bold text-gray-700">Send Escrow Information to Ciara</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {TEAM_CONTACTS.map((c) => (
              <div key={c.name}>
                <p className="font-semibold text-gray-800">{c.name}</p>
                <a href={`tel:${c.phone.replace(/\D/g, "")}`} className="block hover:underline">
                  {c.phone}
                </a>
                {c.email && (
                  <a href={`mailto:${c.email}`} className="block break-all hover:underline">
                    {c.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
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
