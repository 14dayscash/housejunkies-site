"use client";

import { useEffect, useMemo, useState } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { signedPhotoUrls } from "@/lib/deals/photos";
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
import { CountUpMoney, HouseIcon, PencilIcon, StatusPill, btnPrimary, inputCls, statusBar, statusText } from "./ui";

export function Dashboard({
  myDeals,
  directory,
  loading,
  error,
  onAdd,
  onOpen,
  hideTeam,
}: {
  myDeals: Deal[];
  directory: DirectoryRow[];
  loading: boolean;
  error: string | null;
  onAdd: () => void;
  onOpen: (id: string) => void;
  hideTeam?: boolean; // partners (outside wholesalers) never see Team Deals
}) {
  const supabase = dealsSupabase()!;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | DealStatus>("");
  const [covers, setCovers] = useState<Record<string, string>>({});

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    // Every stat box counts only your own deals (Dominic, 2026-11-25).
    for (const d of myDeals) c[d.status] = (c[d.status] ?? 0) + 1;
    return c;
  }, [myDeals]);

  // Your open deals: what we would pay, and what you would make.
  const open = myDeals.filter((d) => d.status !== "Closed");
  const pipeline = open.reduce((t, d) => t + (d.purchase_price ?? d.max_offer ?? 0), 0);
  const fees = open.reduce((t, d) => t + (d.assignment_fee ?? 0), 0);

  // Cover photo = first photo on each of your deals.
  const coverPaths = myDeals.map((d) => d.photos?.[0]).filter((p): p is string => !!p);
  const coverKey = coverPaths.join("|");
  useEffect(() => {
    let alive = true;
    signedPhotoUrls(supabase, coverPaths).then((u) => alive && setCovers(u));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coverKey]);

  const match = (address: string, status: string) =>
    (!statusFilter || status === statusFilter) && (!search.trim() || address.toLowerCase().includes(search.trim().toLowerCase()));

  const mine = myDeals.filter((d) => match(d.address, d.status));
  // Team Deals is every deal in the company, yours included.
  const others = directory.filter((d) => match(d.address, d.status));


  return (
    <div className="space-y-6">
      <button onClick={onAdd} className={`${btnPrimary} hidden py-4 text-lg md:inline-flex md:px-10`}>
        + Add New Deal
      </button>

      <div className={`hj-rise grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1c1c1c] to-brand-black`}>
        <div className="p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-yellow">Pipeline Value</p>
          <p className="mt-1 font-display text-2xl font-black tabular-nums text-white sm:text-4xl">
            <CountUpMoney value={pipeline} />
          </p>
        </div>
        <div className="border-l border-white/10 p-5 sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-yellow">Finders Fees</p>
          <p className="mt-1 font-display text-2xl font-black tabular-nums text-green-400 sm:text-4xl">
            <CountUpMoney value={fees} />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {DEAL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
            className={`relative overflow-hidden rounded-xl border bg-brand-charcoal p-3 text-left transition sm:p-4 ${
              statusFilter === s ? "border-white/40 bg-white/10" : "border-white/10 hover:border-white/25"
            }`}
          >
            <span className={`absolute inset-x-0 top-0 h-1 ${statusBar(s)}`} />
            <p className={`font-display text-2xl font-extrabold tabular-nums sm:text-3xl ${statusText(s)}`}>{counts[s] ?? 0}</p>
            <p className="text-[10px] font-bold uppercase leading-tight tracking-wide text-gray-400 sm:text-xs">{s}</p>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "" | DealStatus)} className={inputCls}>
          <option value="">All Deals</option>
          {DEAL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input
          type="search"
          placeholder="SEARCH BY ADDRESS"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={inputCls}
        />
      </div>

      {error && <p className="rounded-xl bg-red-500/10 p-4 text-sm font-semibold text-red-300">{error}</p>}

      {loading ? (
        <p className="text-gray-400">Loading deals...</p>
      ) : (
        <>
          <section>
            <h2 className="mb-3 text-xl font-extrabold text-white">My Deals</h2>
            {mine.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-brand-charcoal p-5 text-gray-400">
                {myDeals.length === 0 ? "Click Add New Deal to Start!" : "None of your deals match."}
              </p>
            ) : (
              <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {mine.map((d, i) => (
                  <MyDealCard key={d.id} deal={d} cover={d.photos?.[0] ? covers[d.photos[0]] : undefined} index={i} onOpen={() => onOpen(d.id)} />
                ))}
              </ul>
            )}
          </section>

          {!hideTeam && (
          <section>
            <h2 className="mb-3 text-xl font-extrabold text-white">Team Deals</h2>
            {others.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-brand-charcoal p-5 text-gray-400">No team deals match.</p>
            ) : (
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {others.map((d, i) => (
                  <TeamDealCard key={d.id} row={d} index={i} />
                ))}
              </ul>
            )}
          </section>
          )}
        </>
      )}
    </div>
  );
}

const stagger = (i: number) => ({ animationDelay: `${Math.min(i, 12) * 35}ms` });

function AddressBlock({ address }: { address: string }) {
  const [line1, line2] = addressLines(address);
  return (
    <p className="font-bold leading-snug text-white">
      {line1}
      {line2 && <span className="block font-normal text-gray-400">{line2}</span>}
    </p>
  );
}

function MetaLine({ status, type, date }: { status: DealStatus; type: keyof typeof TYPE_LABELS; date: string | null }) {
  return (
    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-400">
      <StatusPill status={status} />
      <span>&bull;</span>
      <span className="font-bold uppercase tracking-wide">{TYPE_LABELS[type] ?? type}</span>
      <span>&bull;</span>
      <span>{shortDate(date)}</span>
    </p>
  );
}

// Compact tile, two per row on phones: photo, address, status, then the
// four numbers in small type (Dominic, 2026-11-25).
function MyDealCard({ deal, cover, index, onOpen }: { deal: Deal; cover?: string; index: number; onOpen: () => void }) {
  const [line1, line2] = addressLines(deal.address);
  const stats = [
    { label: "Purchase", value: deal.purchase_price ?? deal.max_offer },
    { label: "Rehab", value: rehabCost(deal.sqft, deal.condition) },
    { label: "Finders Fee", value: deal.assignment_fee, green: true },
    { label: "ARV", value: deal.arv },
  ];
  return (
    <li className="hj-rise overflow-hidden rounded-xl border border-white/10 bg-brand-charcoal transition active:scale-[0.98] hover:border-white/25" style={stagger(index)}>
      <button onClick={onOpen} className="block w-full text-left" aria-label={`Open ${deal.address}`}>
        <span className="relative block aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-[#222] to-brand-black">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-white/20">
              <HouseIcon className="h-10 w-10" />
            </span>
          )}
          <span className={`absolute inset-x-0 top-0 h-1 ${statusBar(deal.status)}`} />
          <span className="absolute right-2 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-yellow text-black shadow-lg">
            <PencilIcon className="h-3.5 w-3.5" />
          </span>
        </span>
        <span className="block p-2.5">
          <span className="block truncate text-sm font-bold leading-tight text-white">{line1}</span>
          {line2 && <span className="block truncate text-[11px] leading-tight text-gray-400">{line2}</span>}
          <span className="mt-1.5 block">
            <StatusPill status={deal.status} />
          </span>
          <span className="mt-2 grid grid-cols-2 gap-1">
            {stats.map((s) => (
              <span key={s.label} className="block rounded-md bg-white/5 px-1.5 py-1">
                <span className="block text-[8px] font-bold uppercase tracking-wide text-gray-400">{s.label}</span>
                <span className={`block truncate text-[11px] font-bold tabular-nums ${s.green ? "text-green-400" : "text-white"}`}>{usd(s.value)}</span>
              </span>
            ))}
          </span>
        </span>
      </button>
    </li>
  );
}

function TeamDealCard({ row, index }: { row: DirectoryRow; index: number }) {
  return (
    <li className="hj-rise relative overflow-hidden rounded-xl border border-white/10 bg-brand-charcoal p-4 pl-5" style={stagger(index)}>
      <span className={`absolute inset-y-0 left-0 w-1 ${statusBar(row.status)}`} />
      <AddressBlock address={row.address} />
      <MetaLine status={row.status} type={row.deal_type} date={row.deal_date} />
      <p className="mt-2 text-sm font-bold text-brand-yellow">{row.owner_name}</p>
    </li>
  );
}
