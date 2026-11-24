"use client";

import { useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  DEAL_STATUSES,
  TYPE_LABELS,
  addressLines,
  rehabCost,
  shortDate,
  usd,
  type Deal,
  type DealStatus,
  type DirectoryRow,
} from "@/lib/deals/calc";
import { PencilIcon, StatusPill, btnPrimary, inputCls } from "./ui";

export function Dashboard({
  session,
  myDeals,
  directory,
  loading,
  error,
  onAdd,
  onOpen,
}: {
  session: Session;
  myDeals: Deal[];
  directory: DirectoryRow[];
  loading: boolean;
  error: string | null;
  onAdd: () => void;
  onOpen: (id: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | DealStatus>("");

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const d of directory) c[d.status] = (c[d.status] ?? 0) + 1;
    return c;
  }, [directory]);

  const match = (address: string, status: string) =>
    (!statusFilter || status === statusFilter) && (!search.trim() || address.toLowerCase().includes(search.trim().toLowerCase()));

  const mine = myDeals.filter((d) => match(d.address, d.status));
  // Team Deals is every deal in the company, yours included.
  const others = directory.filter((d) => match(d.address, d.status));

  return (
    <div className="space-y-6">
      <button onClick={onAdd} className={`${btnPrimary} w-full py-4 text-lg sm:w-auto sm:px-10`}>
        + Add New Deal
      </button>

      <div className="grid grid-cols-3 gap-3 lg:grid-cols-6">
        {DEAL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
            className={`rounded-xl border bg-white p-3 text-left shadow-sm transition-colors sm:p-4 ${
              statusFilter === s ? "border-brand-yellow-dark ring-2 ring-brand-yellow/50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <p className="font-display text-2xl font-extrabold text-brand-black sm:text-3xl">{counts[s] ?? 0}</p>
            <p className="text-xs font-bold uppercase leading-tight tracking-wide text-gray-600 sm:text-sm">{s}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          placeholder="SEARCH BY ADDRESS"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputCls} sm:flex-1`}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "" | DealStatus)} className={`${inputCls} sm:w-56`}>
          <option value="">All Deals</option>
          {DEAL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading deals...</p>
      ) : (
        <>
          <section>
            <h2 className="mb-3 text-xl font-extrabold text-brand-black">My Deals</h2>
            {mine.length === 0 ? (
              <p className="rounded-xl bg-white p-5 text-gray-600 shadow-sm">
                {myDeals.length === 0 ? "Click Add New Deal to Start!" : "None of your deals match."}
              </p>
            ) : (
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {mine.map((d) => (
                  <MyDealCard key={d.id} deal={d} onOpen={() => onOpen(d.id)} />
                ))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-xl font-extrabold text-brand-black">Team Deals</h2>
            {others.length === 0 ? (
              <p className="rounded-xl bg-white p-5 text-gray-600 shadow-sm">No team deals match.</p>
            ) : (
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {others.map((d) => (
                  <TeamDealCard key={d.id} row={d} />
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function AddressBlock({ address }: { address: string }) {
  const [line1, line2] = addressLines(address);
  return (
    <p className="font-bold leading-snug text-brand-black">
      {line1}
      {line2 && <span className="block font-normal text-gray-600">{line2}</span>}
    </p>
  );
}

function MetaLine({ status, type, date }: { status: DealStatus; type: keyof typeof TYPE_LABELS; date: string | null }) {
  return (
    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
      <StatusPill status={status} />
      <span>&bull;</span>
      <span className="font-bold uppercase tracking-wide">{TYPE_LABELS[type] ?? type}</span>
      <span>&bull;</span>
      <span>{shortDate(date)}</span>
    </p>
  );
}

function MyDealCard({ deal, onOpen }: { deal: Deal; onOpen: () => void }) {
  const stats = [
    { label: "Purchase Price", value: deal.purchase_price ?? deal.max_offer },
    { label: "Rehab Cost", value: rehabCost(deal.sqft, deal.condition) },
    { label: "Finders Fee", value: deal.assignment_fee, green: true },
    { label: "ARV", value: deal.arv },
  ];
  return (
    <li className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <button onClick={onOpen} className="block w-full pr-10 text-left">
        <AddressBlock address={deal.address} />
        <MetaLine status={deal.status} type={deal.deal_type} date={deal.purchase_date ?? deal.created_at} />
      </button>
      <button
        onClick={onOpen}
        aria-label={`Edit ${deal.address}`}
        className="absolute right-3 top-3 rounded-lg bg-brand-yellow p-2 text-black transition-colors hover:bg-brand-yellow-dark"
      >
        <PencilIcon className="h-4 w-4" />
      </button>
      <dl className="mt-4 grid grid-cols-2 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-gray-50 px-3 py-2">
            <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">{s.label}</dt>
            <dd className={`font-bold ${s.green ? "text-green-700" : "text-brand-black"}`}>{usd(s.value)}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}

function TeamDealCard({ row }: { row: DirectoryRow }) {
  return (
    <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <AddressBlock address={row.address} />
      <MetaLine status={row.status} type={row.deal_type} date={row.deal_date} />
      <p className="mt-2 text-sm font-bold text-brand-yellow-dark">{row.owner_name}</p>
    </li>
  );
}
