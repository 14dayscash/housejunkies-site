"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import {
  DEAL_STATUSES,
  TYPE_LABELS,
  addressLines,
  rehabCost,
  savedDealProfit,
  shortDate,
  usd,
  type Deal,
  type DealStatus,
} from "@/lib/deals/calc";
import { DealsShell } from "./Shell";
import { DealDetail } from "./DealDetail";
import { StatusPill, inputCls } from "./ui";

type Account = {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
  last_sign_in_at: string | null;
  is_admin: boolean;
  deal_count: number;
};

const HJ = "house-junkies"; // filter value for deals with no owner (the original purchases)

// /admin: read-only bird's eye view of every account and every deal.
// Only people in public.admins get data back (enforced in the database).
export function AdminApp() {
  return (
    <DealsShell eyebrow="House Junkies Admin" title="Admin Dashboard">
      {() => <AdminGate />}
    </DealsShell>
  );
}

function AdminGate() {
  const supabase = dealsSupabase()!;
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.rpc("is_admin").then(({ data }) => setAllowed(data === true));
  }, [supabase]);

  if (allowed === null) return <p className="text-gray-500">Loading...</p>;
  if (!allowed)
    return (
      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center shadow-sm">
        <p className="font-display text-xl font-extrabold text-brand-black">ADMINS ONLY</p>
        <p className="mt-2 text-gray-600">This page is only for Dominic, Abel and Ciara.</p>
        <Link href="/deals" className="mt-4 inline-block font-bold text-brand-yellow-dark hover:underline">
          Go to Deal Tracker &rarr;
        </Link>
      </div>
    );
  return <AdminDashboard />;
}

function AdminDashboard() {
  const supabase = dealsSupabase()!;
  const [deals, setDeals] = useState<Deal[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [status, setStatus] = useState<"" | DealStatus>("");
  const [owner, setOwner] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    const [d, a] = await Promise.all([
      supabase.from("deals").select("*").order("created_at", { ascending: false }),
      supabase.rpc("admin_users"),
    ]);
    setError(d.error?.message ?? a.error?.message ?? null);
    if (!d.error) setDeals((d.data ?? []) as Deal[]);
    if (!a.error) setAccounts((a.data ?? []) as Account[]);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [openId]);

  const nameOf = useMemo(() => {
    const m = new Map(accounts.map((a) => [a.id, a.display_name]));
    return (id: string | null) => (id ? m.get(id) ?? "Unknown" : "House Junkies");
  }, [accounts]);

  const open = deals.filter((d) => d.status !== "Closed");
  const sum = (list: Deal[], f: (d: Deal) => number | null | undefined) => list.reduce((t, d) => t + (f(d) ?? 0), 0);
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const d of deals) c[d.status] = (c[d.status] ?? 0) + 1;
    return c;
  }, [deals]);

  const topStats = [
    { label: "Total Deals", value: String(deals.length) },
    { label: "Accounts", value: String(accounts.length) },
    { label: "Open Deals", value: String(open.length) },
    { label: "Open Max Offers", value: usd(sum(open, (d) => d.max_offer)) },
    { label: "Open Finders Fees", value: usd(sum(open, (d) => d.assignment_fee)) },
    { label: "Open Est. Profit", value: usd(sum(open, (d) => savedDealProfit(d)?.profit)) },
  ];

  const q = search.trim().toLowerCase();
  const visible = deals.filter(
    (d) =>
      (!status || d.status === status) &&
      (!owner || (owner === HJ ? d.created_by == null : d.created_by === owner)) &&
      (!q || d.address.toLowerCase().includes(q)),
  );

  const openDeal = openId ? deals.find((d) => d.id === openId) : null;
  if (openDeal) {
    return <DealDetail deal={openDeal} readOnly ownerName={nameOf(openDeal.created_by)} onBack={() => setOpenId(null)} />;
  }

  return (
    <div className="space-y-8">
      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {topStats.map((s) => (
          <div key={s.label} className="rounded-xl bg-brand-black p-4 text-white shadow-sm">
            <p className="font-display text-xl font-extrabold sm:text-2xl">{loading ? "-" : s.value}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-brand-yellow">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
        {DEAL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(status === s ? "" : s)}
            className={`rounded-xl border bg-white p-3 text-left shadow-sm transition-colors sm:p-4 ${
              status === s ? "border-brand-yellow-dark ring-2 ring-brand-yellow/50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <p className="font-display text-2xl font-extrabold text-brand-black sm:text-3xl">{counts[s] ?? 0}</p>
            <p className="text-xs font-bold uppercase leading-tight tracking-wide text-gray-600 sm:text-sm">{s}</p>
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-brand-black">ACCOUNTS</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((a) => (
            <li key={a.id}>
              <button
                onClick={() => setOwner(owner === a.id ? "" : a.id)}
                className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm transition-colors ${
                  owner === a.id ? "border-brand-yellow-dark ring-2 ring-brand-yellow/50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-brand-black">{a.display_name}</p>
                  {a.is_admin && <span className="rounded-full bg-brand-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-yellow">Admin</span>}
                </div>
                <p className="break-all text-sm text-gray-500">{a.email}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg bg-gray-50 px-3 py-2">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">Deals</dt>
                    <dd className="font-bold text-brand-black">{a.deal_count}</dd>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-3 py-2">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">Last Sign In</dt>
                    <dd className="font-bold text-brand-black">{a.last_sign_in_at ? shortDate(a.last_sign_in_at) : "Never"}</dd>
                  </div>
                </dl>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-brand-black">ALL DEALS</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <select value={status} onChange={(e) => setStatus(e.target.value as "" | DealStatus)} className={inputCls}>
            <option value="">All Deals</option>
            {DEAL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select value={owner} onChange={(e) => setOwner(e.target.value)} className={inputCls}>
            <option value="">All Accounts</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.display_name}
              </option>
            ))}
            <option value={HJ}>House Junkies</option>
          </select>
        </div>
        <input type="search" placeholder="SEARCH BY ADDRESS" value={search} onChange={(e) => setSearch(e.target.value)} className={inputCls} />

        {loading ? (
          <p className="text-gray-500">Loading deals...</p>
        ) : visible.length === 0 ? (
          <p className="rounded-xl bg-white p-5 text-gray-600 shadow-sm">No deals match.</p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((d) => (
              <AdminDealCard key={d.id} deal={d} owner={nameOf(d.created_by)} onOpen={() => setOpenId(d.id)} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function AdminDealCard({ deal, owner, onOpen }: { deal: Deal; owner: string; onOpen: () => void }) {
  const [line1, line2] = addressLines(deal.address);
  const est = savedDealProfit(deal);
  const stats = [
    { label: "Purchase Price", value: usd(deal.purchase_price ?? deal.max_offer) },
    { label: "Rehab Cost", value: usd(rehabCost(deal.sqft, deal.condition)) },
    { label: "Finders Fee", value: usd(deal.assignment_fee), green: true },
    { label: "ARV", value: usd(deal.arv) },
  ];
  return (
    <li>
      <button onClick={onOpen} className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm hover:border-brand-yellow-dark">
        <p className="font-bold leading-snug text-brand-black">
          {line1}
          {line2 && <span className="block font-normal text-gray-600">{line2}</span>}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
          <StatusPill status={deal.status} />
          <span>&bull;</span>
          <span className="font-bold uppercase tracking-wide">{TYPE_LABELS[deal.deal_type] ?? deal.deal_type}</span>
          <span>&bull;</span>
          <span>{shortDate(deal.purchase_date ?? deal.created_at)}</span>
        </p>
        <p className="mt-2 text-sm font-bold text-brand-yellow-dark">{owner}</p>
        <dl className="mt-3 grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-gray-50 px-3 py-2">
              <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">{s.label}</dt>
              <dd className={`font-bold ${s.green ? "text-green-700" : "text-brand-black"}`}>{s.value}</dd>
            </div>
          ))}
          <div className="col-span-2 rounded-lg bg-gray-50 px-3 py-2">
            <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">Estimated Profit</dt>
            <dd className="font-bold text-brand-black">{est ? `${usd(est.profit)} (${est.pct.toFixed(1)}%)` : "-"}</dd>
          </div>
        </dl>
      </button>
    </li>
  );
}
