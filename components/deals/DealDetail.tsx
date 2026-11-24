"use client";

import { useState } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { PHOTO_BUCKET } from "@/lib/deals/photos";
import {
  CONDITION_LABELS,
  DEAL_STATUSES,
  LISTING_OPTIONS,
  TYPE_LABELS,
  addressLines,
  pricePerSqft,
  rehabCost,
  savedDealProfit,
  shortDate,
  usd,
  type Deal,
  type DealStatus,
} from "@/lib/deals/calc";
import { PencilIcon, StatusPill, inputCls } from "./ui";
import { OfferEditor } from "./OfferEditor";
import { DealPhotos } from "./DealPhotos";
import { DealInfo } from "./DealInfo";

// The deal page. Owners can edit everything; /admin opens it read only.
export function DealDetail({
  deal,
  readOnly,
  ownerName,
  onBack,
  onRecalculate,
  onChanged,
  onDeleted,
}: {
  deal: Deal;
  readOnly?: boolean;
  ownerName?: string;
  onBack: () => void;
  onRecalculate?: () => void;
  onChanged?: () => Promise<void>;
  onDeleted?: () => void;
}) {
  const supabase = dealsSupabase()!;
  const [error, setError] = useState<string | null>(null);
  const [line1, line2] = addressLines(deal.address);

  async function updateStatus(status: DealStatus) {
    const { error } = await supabase.from("deals").update({ status }).eq("id", deal.id);
    if (error) setError(error.message);
    else await onChanged?.();
  }

  async function remove() {
    if (!window.confirm(`Delete ${deal.address}? This cannot be undone.`)) return;
    const { error } = await supabase.from("deals").delete().eq("id", deal.id);
    if (error) return setError(error.message);
    if (deal.photos?.length) await supabase.storage.from(PHOTO_BUCKET).remove(deal.photos);
    onDeleted?.();
  }

  const est = savedDealProfit(deal);
  const numbers = [
    { label: "Max Offer", value: usd(deal.max_offer) },
    { label: "Opening Offer", value: usd(deal.opening_offer) },
    { label: "You Make", value: usd(deal.assignment_fee) },
    { label: "ARV", value: usd(deal.arv) },
    { label: "Renovation", value: usd(rehabCost(deal.sqft, deal.condition)) },
    { label: "Rehab Level", value: deal.condition ? CONDITION_LABELS[deal.condition] : "-" },
    { label: "Square Feet", value: deal.sqft ? deal.sqft.toLocaleString("en-US") : "-" },
    { label: "Hold", value: deal.months ? `${deal.months} Months` : "-" },
    { label: "Listing", value: deal.listing_by ? LISTING_OPTIONS[deal.listing_by].short : "-" },
    { label: "Estimated Profit", value: est ? `${usd(est.profit)} (${est.pct.toFixed(1)}%)` : "-" },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <button onClick={onBack} className="font-semibold text-brand-yellow-dark hover:underline">
        &larr; Back to Deals
      </button>

      <div className="rounded-2xl bg-brand-black p-6 text-white shadow-sm">
        <p className="text-xl font-extrabold leading-snug">
          {line1}
          {line2 && <span className="block text-base font-normal text-gray-400">{line2}</span>}
        </p>
        <p className="mt-2 text-sm text-gray-400">
          <span className="font-bold uppercase tracking-wide">{TYPE_LABELS[deal.deal_type] ?? deal.deal_type}</span> &bull; Added{" "}
          {shortDate(deal.created_at)}
          {ownerName && (
            <>
              {" "}
              &bull; <span className="font-bold text-brand-yellow">{ownerName}</span>
            </>
          )}
        </p>
        {readOnly ? (
          <div className="mt-4">
            <StatusPill status={deal.status} />
          </div>
        ) : (
          <label className="mt-4 block max-w-xs">
            <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-brand-yellow">Status</span>
            <select value={deal.status} onChange={(e) => updateStatus(e.target.value as DealStatus)} className={inputCls}>
              {DEAL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-extrabold text-brand-black">Deal Numbers</h2>
          {!readOnly && onRecalculate && (
            <button onClick={onRecalculate} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-yellow px-3 py-2 text-sm font-bold text-black hover:bg-brand-yellow-dark">
              <PencilIcon className="h-4 w-4" /> RECALCULATE
            </button>
          )}
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {numbers.map((n) => (
            <div key={n.label} className="rounded-lg bg-gray-50 px-3 py-2">
              <dt className="text-xs font-bold uppercase tracking-wide text-gray-500">{n.label}</dt>
              <dd className="font-bold text-brand-black">{n.value}</dd>
            </div>
          ))}
        </dl>
        {deal.comps && deal.comps.length > 0 && (
          <div className="mt-5">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-gray-500">Comps</h3>
            <ul className="mt-2 divide-y divide-gray-100 text-sm">
              {deal.comps.map((c, i) => (
                <li key={i} className="flex flex-wrap justify-between gap-x-4 py-2">
                  <span className="font-semibold text-brand-black">{c.address || "-"}</span>
                  <span className="text-gray-600">
                    {usd(c.price)} &bull; {/^\d{4}-\d{2}-\d{2}/.test(c.date) ? shortDate(c.date) : c.date || "-"} &bull;{" "}
                    {c.sqft ? `${c.sqft.toLocaleString("en-US")} SQ FT` : "- SQ FT"}
                    {pricePerSqft(c.price, c.sqft) != null && <> &bull; ${pricePerSqft(c.price, c.sqft)!.toLocaleString("en-US")}/SF</>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* key: rebuild the editors when the saved deal changes */}
      <OfferEditor key={`o-${deal.purchase_price}-${deal.max_offer}-${deal.months}-${deal.interest_rate}-${deal.closing_costs}-${deal.assignment_fee}-${deal.condition}`} deal={deal} readOnly={readOnly} onChanged={onChanged} onRecalculate={onRecalculate} />

      <DealPhotos deal={deal} readOnly={readOnly} onChanged={onChanged} />

      <DealInfo deal={deal} readOnly={readOnly} onChanged={onChanged} />

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

      {!readOnly && (
        <div className="flex items-center justify-between">
          <StatusPill status={deal.status} />
          <button onClick={remove} className="font-semibold text-red-600 hover:underline">
            DELETE DEAL
          </button>
        </div>
      )}
    </div>
  );
}
