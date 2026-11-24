"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { DEAL_STATUSES, dealSpread, shortDate, usd, type Deal, type DealStatus } from "@/lib/deals/calc";
import { DealForm } from "./DealForm";
import { btnPrimary, inputCls } from "./ui";

const STAT_CARDS: { label: string; status: DealStatus }[] = [
  { label: "Leads", status: "Lead" },
  { label: "Contracts Sent", status: "Contract Sent" },
  { label: "Escrows Open", status: "Escrow" },
  { label: "Sold", status: "Sold" },
  { label: "Held", status: "Held" },
];

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

  return (
    <div className="min-h-[70vh] bg-gray-50">
      <div className="bg-brand-black text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Team Only</p>
            <h1 className="text-2xl font-extrabold sm:text-3xl">Deal Tracker</h1>
          </div>
          {session && supabase && (
            <div className="text-right text-sm">
              <p className="hidden text-gray-300 sm:block">{session.user.email}</p>
              <button onClick={() => supabase.auth.signOut()} className="font-semibold text-brand-yellow hover:underline">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {!supabase ? (
          <p className="rounded-lg bg-white p-6 text-gray-700 shadow-sm">
            Supabase is not configured for this deploy. Add NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel and redeploy.
          </p>
        ) : !ready ? (
          <p className="text-gray-500">Loading...</p>
        ) : session ? (
          <Dashboard />
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
    <form onSubmit={submit} className="mx-auto mt-4 max-w-sm space-y-4 rounded-xl bg-white p-6 shadow-sm">
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

function Dashboard() {
  const supabase = dealsSupabase()!;
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | DealStatus>("");
  // null = list view, "new" = add form, Deal = edit form
  const [editing, setEditing] = useState<Deal | "new" | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("deals")
      .select("*")
      .order("purchase_date", { ascending: false, nullsFirst: true })
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else {
      setError(null);
      setDeals((data ?? []) as Deal[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const d of deals) c[d.status] = (c[d.status] ?? 0) + 1;
    return c;
  }, [deals]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return deals.filter(
      (d) => (!statusFilter || d.status === statusFilter) && (!q || d.address.toLowerCase().includes(q)),
    );
  }, [deals, search, statusFilter]);

  if (editing) {
    return (
      <DealForm
        deal={editing === "new" ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {STAT_CARDS.map((s) => (
          <button
            key={s.status}
            onClick={() => setStatusFilter(statusFilter === s.status ? "" : s.status)}
            className={`rounded-xl border bg-white p-4 text-left shadow-sm transition-colors ${
              statusFilter === s.status ? "border-brand-yellow-dark ring-2 ring-brand-yellow/50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <p className="font-display text-3xl font-extrabold text-brand-black">{counts[s.status] ?? 0}</p>
            <p className="text-sm font-semibold text-gray-600">{s.label}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="Search by address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputCls} sm:flex-1`}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "" | DealStatus)} className={`${inputCls} sm:w-48`}>
          <option value="">All statuses</option>
          {DEAL_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={() => setEditing("new")} className={btnPrimary}>
          + Add Deal
        </button>
      </div>

      {error && <p className="rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading deals...</p>
      ) : visible.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-gray-600 shadow-sm">No deals match.</p>
      ) : (
        <>
          {/* Phones: cards */}
          <ul className="space-y-3 md:hidden">
            {visible.map((d) => {
              const spread = dealSpread(d);
              return (
                <li key={d.id}>
                  <button onClick={() => setEditing(d)} className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-brand-black">{d.address}</p>
                      <StatusPill status={d.status} />
                    </div>
                    <p className="mt-1 text-sm capitalize text-gray-500">
                      {d.deal_type} · {shortDate(d.purchase_date)}
                    </p>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                      <dt className="text-gray-500">Purchase</dt><dd className="text-right font-semibold">{usd(d.purchase_price)}</dd>
                      <dt className="text-gray-500">Loan</dt><dd className="text-right">{usd(d.loan_total)}</dd>
                      <dt className="text-gray-500">Resale</dt><dd className="text-right">{usd(d.resale_price)}</dd>
                      <dt className="text-gray-500">Spread</dt><dd className={`text-right font-semibold ${spreadCls(spread)}`}>{usd(spread)}</dd>
                    </dl>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Tablets and up: table */}
          <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                <tr>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Purchase Date</th>
                  <th className="px-4 py-3 text-right">Purchase</th>
                  <th className="px-4 py-3 text-right">Loan</th>
                  <th className="px-4 py-3 text-right">Resale</th>
                  <th className="px-4 py-3 text-right">Spread</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visible.map((d) => {
                  const spread = dealSpread(d);
                  return (
                    <tr key={d.id} onClick={() => setEditing(d)} className="cursor-pointer hover:bg-brand-yellow/10">
                      <td className="px-4 py-3 font-semibold text-brand-black">{d.address}</td>
                      <td className="px-4 py-3 capitalize">{d.deal_type}</td>
                      <td className="px-4 py-3"><StatusPill status={d.status} /></td>
                      <td className="px-4 py-3">{shortDate(d.purchase_date)}</td>
                      <td className="px-4 py-3 text-right">{usd(d.purchase_price)}</td>
                      <td className="px-4 py-3 text-right">{usd(d.loan_total)}</td>
                      <td className="px-4 py-3 text-right">{usd(d.resale_price)}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${spreadCls(spread)}`}>{usd(spread)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function spreadCls(n: number | null) {
  if (n == null) return "text-gray-400";
  return n >= 0 ? "text-green-700" : "text-red-600";
}

function StatusPill({ status }: { status: DealStatus }) {
  const cls =
    status === "Sold"
      ? "bg-green-100 text-green-800"
      : status === "Held"
        ? "bg-gray-800 text-white"
        : status === "Lead"
          ? "bg-gray-100 text-gray-700"
          : "bg-brand-yellow/30 text-black";
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${cls}`}>{status}</span>;
}
