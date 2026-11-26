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
import { HouseIcon, StatusPill, inputCls, statusBar, statusText } from "./ui";
import { signedPhotoUrls } from "@/lib/deals/photos";

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

  if (allowed === null) return <p className="text-gray-400">Loading...</p>;
  if (!allowed)
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-brand-charcoal p-6 text-center">
        <p className="font-display text-xl font-extrabold text-white">ADMINS ONLY</p>
        <p className="mt-2 text-gray-400">This page is only for Dominic, Abel and Ciara.</p>
        <Link href="/deals" className="mt-4 inline-block font-bold text-brand-yellow hover:underline">
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
  const [partnerIds, setPartnerIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [status, setStatus] = useState<"" | DealStatus>("");
  const [owner, setOwner] = useState("");
  const [search, setSearch] = useState("");
  const [covers, setCovers] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    const [d, a, p] = await Promise.all([
      supabase.from("deals").select("*").order("created_at", { ascending: false }),
      supabase.rpc("admin_users"),
      supabase.rpc("admin_partner_ids"),
    ]);
    setError(d.error?.message ?? a.error?.message ?? null);
    if (!d.error) setDeals((d.data ?? []) as Deal[]);
    if (!a.error) setAccounts((a.data ?? []) as Account[]);
    if (!p.error) setPartnerIds(new Set((p.data ?? []) as string[]));
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [openId]);

  // Cover photo = first photo on each deal (admins can read every photo).
  const coverPaths = deals.map((d) => d.photos?.[0]).filter((p): p is string => !!p);
  const coverKey = coverPaths.join("|");
  useEffect(() => {
    let alive = true;
    signedPhotoUrls(supabase, coverPaths).then((u) => alive && setCovers(u));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverKey]);

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
      {error && <p className="rounded-xl bg-red-500/10 p-4 text-sm font-semibold text-red-300">{error}</p>}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {topStats.map((s) => (
          <div key={s.label} className="hj-rise rounded-xl border border-white/10 bg-gradient-to-br from-[#1f1f1f] to-brand-black p-4 text-white">
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
            className={`relative overflow-hidden rounded-xl border bg-brand-charcoal p-3 text-left transition sm:p-4 ${
              status === s ? "border-white/40 bg-white/10" : "border-white/10 hover:border-white/25"
            }`}
          >
            <span className={`absolute inset-x-0 top-0 h-1 ${statusBar(s)}`} />
            <p className={`font-display text-2xl font-extrabold tabular-nums sm:text-3xl ${statusText(s)}`}>{counts[s] ?? 0}</p>
            <p className="text-[10px] font-bold uppercase leading-tight tracking-wide text-gray-400 sm:text-xs">{s}</p>
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-white">ACCOUNTS</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((a) => (
            <li key={a.id}>
              <button
                onClick={() => setOwner(owner === a.id ? "" : a.id)}
                className={`w-full rounded-xl border bg-brand-charcoal p-4 text-left transition-colors ${
                  owner === a.id ? "border-brand-yellow-dark ring-2 ring-brand-yellow/50" : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-white">{a.display_name}</p>
                  {a.is_admin && <span className="rounded-full bg-brand-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">Admin</span>}
                  {partnerIds.has(a.id) && <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-300">Partner</span>}
                </div>
                <p className="break-all text-sm text-gray-400">{a.email}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-lg bg-white/5 px-3 py-2">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">Deals</dt>
                    <dd className="font-bold text-white">{a.deal_count}</dd>
                  </div>
                  <div className="rounded-lg bg-white/5 px-3 py-2">
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">Last Sign In</dt>
                    <dd className="font-bold text-white">{a.last_sign_in_at ? shortDate(a.last_sign_in_at) : "Never"}</dd>
                  </div>
                </dl>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-extrabold text-white">ALL DEALS</h2>
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
          <p className="text-gray-400">Loading deals...</p>
        ) : visible.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-brand-charcoal p-5 text-gray-400">No deals match.</p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((d) => (
              <AdminDealCard
                key={d.id}
                deal={d}
                owner={nameOf(d.created_by)}
                cover={d.photos?.[0] ? covers[d.photos[0]] : undefined}
                onOpen={() => setOpenId(d.id)}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function AdminDealCard({ deal, owner, cover, onOpen }: { deal: Deal; owner: string; cover?: string; onOpen: () => void }) {
  const [line1, line2] = addressLines(deal.address);
  const est = savedDealProfit(deal);
  const stats = [
    { label: "Purchase Price", value: usd(deal.purchase_price ?? deal.max_offer) },
    { label: "Rehab Cost", value: usd(rehabCost(deal.sqft, deal.condition)) },
    { label: "Finders Fee", value: usd(deal.assignment_fee), green: true },
    { label: "ARV", value: usd(deal.arv) },
  ];
  return (
    <li className="hj-rise">
      <button onClick={onOpen} className="w-full overflow-hidden rounded-2xl border border-white/10 bg-brand-charcoal text-left transition hover:border-white/25">
        <span className="relative block aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#222] to-brand-black">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-white/20">
              <HouseIcon className="h-14 w-14" />
            </span>
          )}
          <span className={`absolute inset-x-0 top-0 h-1 ${statusBar(deal.status)}`} />
        </span>
        <span className="block p-4">
        <p className="font-bold leading-snug text-white">
          {line1}
          {line2 && <span className="block font-normal text-gray-400">{line2}</span>}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400">
          <StatusPill status={deal.status} />
          <span>&bull;</span>
          <span className="font-bold uppercase tracking-wide">{TYPE_LABELS[deal.deal_type] ?? deal.deal_type}</span>
          <span>&bull;</span>
          <span>{shortDate(deal.purchase_date ?? deal.created_at)}</span>
        </p>
        <p className="mt-2 text-sm font-bold text-brand-yellow">{owner}</p>
        <dl className="mt-3 grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-white/5 px-3 py-2">
              <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">{s.label}</dt>
              <dd className={`font-bold ${s.green ? "text-green-400" : "text-white"}`}>{s.value}</dd>
            </div>
          ))}
          <div className="col-span-2 rounded-lg bg-white/5 px-3 py-2">
            <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">Estimated Profit</dt>
            <dd className="font-bold text-white">{est ? `${usd(est.profit)} (${est.pct.toFixed(1)}%)` : "-"}</dd>
          </div>
        </dl>
        </span>
      </button>
    </li>
  );
}
