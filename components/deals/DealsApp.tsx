"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { addressLines, type Deal, type DirectoryRow } from "@/lib/deals/calc";
import { Dashboard, type DashTab } from "./Dashboard";
import { DealWizard } from "./DealWizard";
import { DealDetail } from "./DealDetail";
import { CheckIcon, Confetti, btnGhost, btnPrimary, btnDark } from "./ui";
import { DealsShell, displayName } from "./Shell";

// Shown on the success screen after a deal is saved (Dominic, 2026-11-24).
const TEAM_CONTACTS: { name: string; phone: string; email?: string }[] = [
  { name: "Dominic McClelland", phone: "(559) 368-8956" },
  { name: "Abel Ulloa", phone: "(559) 310-5004" },
  { name: "Ciara Seaton", phone: "(559) 358-0523", email: "ciaraseaton23@gmail.com" },
];

type Tab = DashTab | "profile";
type View =
  | { name: "dashboard" }
  | { name: "wizard"; deal?: Deal }
  | { name: "success"; deal: Deal }
  | { name: "detail"; id: string };

export function DealsApp() {
  return (
    <DealsShell eyebrow="House Junkies Team" title="Deal Tracker" tabBar>
      {(session, signOut) => <SignedIn session={session} signOut={signOut} />}
    </DealsShell>
  );
}

function SignedIn({ session, signOut }: { session: Session; signOut: () => void }) {
  const supabase = dealsSupabase()!;
  const [view, setView] = useState<View>({ name: "dashboard" });
  const [tab, setTab] = useState<Tab>("home");
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
  }, [view, tab]);

  const go = (t: Tab) => {
    setTab(t);
    setView({ name: "dashboard" });
  };
  const toDashboard = () => setView({ name: "dashboard" });
  const addDeal = () => setView({ name: "wizard" });

  // Add Deal runs full screen with no tab bar (more room for the keyboard).
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

  let content: ReactNode;
  if (view.name === "success") {
    const [line1, line2] = addressLines(view.deal.address);
    content = (
      <div className="hj-rise mx-auto max-w-lg rounded-2xl border border-white/10 bg-brand-charcoal p-8 text-center">
        <Confetti />
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-black shadow-[0_0_40px_rgba(245,197,24,0.45)]">
          <CheckIcon className="h-8 w-8" />
        </div>
        <p className="mt-5 font-display text-3xl font-black text-white">SUCCESS!</p>
        <p className="mt-3 text-lg text-gray-300">
          <span className="font-bold text-white">{line1}</span>
          {line2 && <span className="block text-gray-400">{line2}</span>}
        </p>
        <p className="mt-2 font-bold uppercase tracking-wide text-gray-400">Successfully Added to Deals</p>
        <div className="mt-5 rounded-xl bg-white/5 p-4 text-left text-xs leading-relaxed text-gray-400">
          <p className="font-bold text-gray-300">Contact Abel/Dominic to Confirm Offer</p>
          <p className="font-bold text-gray-300">Send Escrow Information to Ciara</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {TEAM_CONTACTS.map((c) => (
              <div key={c.name}>
                <p className="font-semibold text-gray-200">{c.name}</p>
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
          <button onClick={() => go("home")} className={btnDark}>
            View Leads
          </button>
          <button onClick={signOut} className={btnGhost}>
            Sign Out
          </button>
        </div>
      </div>
    );
  } else if (view.name === "detail") {
    const deal = myDeals.find((d) => d.id === view.id);
    content = !deal ? (
      <p className="text-gray-400">
        {loading ? "Loading..." : "That deal could not be found. "}
        {!loading && (
          <button onClick={toDashboard} className="font-semibold text-brand-yellow hover:underline">
            Back to Deals
          </button>
        )}
      </p>
    ) : (
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
  } else if (tab === "profile") {
    content = <Profile session={session} myDeals={myDeals} signOut={signOut} />;
  } else {
    content = (
      <Dashboard
        tab={tab}
        myDeals={myDeals}
        directory={directory}
        loading={loading}
        error={error}
        onAdd={addDeal}
        onOpen={(id) => setView({ name: "detail", id })}
      />
    );
  }

  return (
    <>
      {content}
      <TabBar active={view.name === "dashboard" ? tab : null} onTab={go} onAdd={addDeal} />
    </>
  );
}

// Phone-only bottom bar: Home, Team, big yellow + (Add Deal), Profile.
function TabBar({ active, onTab, onAdd }: { active: Tab | null; onTab: (t: Tab) => void; onAdd: () => void }) {
  const item = (t: Tab, label: string, icon: ReactNode) => (
    <button
      onClick={() => onTab(t)}
      className={`flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${
        active === t ? "text-brand-yellow" : "text-gray-500"
      }`}
    >
      {icon}
      {label}
    </button>
  );
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-black/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-end px-2">
        <div className="flex flex-1">
          {item("home", "Home", <IconHome />)}
          {item("team", "Team", <IconTeam />)}
        </div>
        <div className="flex w-20 justify-center">
          <button
            onClick={onAdd}
            aria-label="Add New Deal"
            className="-mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-black shadow-[0_6px_24px_rgba(245,197,24,0.45)] transition active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="h-7 w-7" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
        <div className="flex flex-1">{item("profile", "Profile", <IconUser />)}</div>
      </div>
    </nav>
  );
}

function Profile({ session, myDeals, signOut }: { session: Session; myDeals: Deal[]; signOut: () => void }) {
  const supabase = dealsSupabase()!;
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    supabase.rpc("is_admin").then(({ data }) => setIsAdmin(data === true));
  }, [supabase]);
  const name = displayName(session);
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="hj-rise mx-auto max-w-md space-y-4">
      <div className="rounded-2xl border border-white/10 bg-brand-charcoal p-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow font-display text-2xl font-black text-black">
          {initials}
        </div>
        <p className="mt-4 text-xl font-extrabold text-white">{name}</p>
        <p className="break-all text-sm text-gray-400">{session.user.email}</p>
        <p className="mt-4 font-display text-3xl font-black text-white">{myDeals.length}</p>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">My Deals</p>
      </div>
      {isAdmin && (
        <Link href="/admin" className={`${btnDark} w-full`}>
          ADMIN DASHBOARD
        </Link>
      )}
      <button onClick={signOut} className={`${btnGhost} w-full`}>
        SIGN OUT
      </button>
    </div>
  );
}

const iconCls = "h-6 w-6";
function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls} aria-hidden="true">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  );
}
function IconTeam() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls} aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14c2.4 0 4 1.5 4.5 4.5" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconCls} aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4 4-6 8-6s7 2 8 6" />
    </svg>
  );
}
