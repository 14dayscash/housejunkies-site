"use client";

import { useMemo, useState } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import {
  CONDITIONS,
  CONDITION_LABELS,
  CONDITION_RATES,
  HOLD_MONTHS,
  MIN_FINDERS_FEE,
  calcDeal,
  dealCalcInput,
  usd,
  type Condition,
  type Deal,
} from "@/lib/deals/calc";
import { OfferHeadline, OfferRows } from "./Breakdown";
import { CheckIcon, btnPrimary, inputCls, moneyInput, parseNum } from "./ui";

// OFFER BREAKDOWN on the deal page. Owners can change rehab level, timeline,
// interest, closing cost and finders fee and see the offer update live.
export function OfferEditor({
  deal,
  readOnly,
  onChanged,
  onRecalculate,
}: {
  deal: Deal;
  readOnly?: boolean;
  onChanged?: () => Promise<void>;
  onRecalculate?: () => void;
}) {
  const supabase = dealsSupabase()!;
  const base = dealCalcInput(deal);
  const [condition, setCondition] = useState<Condition | null>(deal.condition);
  const [months, setMonths] = useState(String(deal.months ?? 6));
  const [rate, setRate] = useState(String(deal.interest_rate ?? 10));
  const [closing, setClosing] = useState(moneyInput(String(deal.closing_costs ?? 5000)));
  const [finders, setFinders] = useState(moneyInput(String(deal.assignment_fee ?? 0)));
  // Blank = use our max offer. Filled = what we actually paid or agreed to pay.
  const [purchase, setPurchase] = useState(deal.purchase_price != null ? moneyInput(String(deal.purchase_price)) : "");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const result = useMemo(() => {
    if (!base) return null;
    return calcDeal({
      ...base,
      condition,
      months: Number(months),
      ratePct: parseNum(rate) ?? 0,
      closing: parseNum(closing) ?? 0,
      findersFee: parseNum(finders) ?? 0,
      purchase: parseNum(purchase),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deal, condition, months, rate, closing, finders, purchase]);

  if (!base || !result) {
    return (
      <div className="rounded-2xl border border-white/10 bg-brand-charcoal p-6">
        <h2 className="font-display text-lg font-extrabold text-white">OFFER BREAKDOWN</h2>
        <p className="mt-2 text-gray-400">
          {readOnly ? "This deal has no calculator numbers yet." : "Click RECALCULATE to fill in the deal numbers."}
        </p>
        {!readOnly && onRecalculate && (
          <button onClick={onRecalculate} className={`${btnPrimary} mt-4`}>
            RECALCULATE
          </button>
        )}
      </div>
    );
  }

  const change = (fn: (v: string) => void) => (v: string) => {
    fn(v);
    setDirty(true);
    setMessage(null);
  };

  async function save() {
    const fee = parseNum(finders) ?? 0;
    if (fee < MIN_FINDERS_FEE) return setMessage({ ok: false, text: `The minimum finders fee is ${usd(MIN_FINDERS_FEE)}.` });
    const paid = parseNum(purchase);
    if (paid == null && !result!.works) return setMessage({ ok: false, text: "These numbers leave no room for an offer." });
    setBusy(true);
    const { error } = await supabase
      .from("deals")
      .update({
        condition,
        months: Number(months),
        interest_rate: parseNum(rate),
        closing_costs: parseNum(closing),
        assignment_fee: fee,
        purchase_price: paid,
        max_offer: result!.maxOffer,
        opening_offer: result!.openingOffer,
      })
      .eq("id", deal.id);
    setBusy(false);
    if (error) return setMessage({ ok: false, text: error.message });
    setDirty(false);
    setMessage({ ok: true, text: "Numbers saved." });
    await onChanged?.();
  }

  return (
    <div className="space-y-4">
      <OfferHeadline result={result} />

      <div className="rounded-2xl border border-white/10 bg-brand-charcoal p-6">
        <h2 className="mb-4 font-display text-lg font-extrabold text-white">OFFER BREAKDOWN</h2>

        {!readOnly && (
          <div className="mb-5 grid grid-cols-2 gap-3 rounded-xl bg-white/5 p-4 sm:grid-cols-3">
            <Control label="Purchase Price" wide>
              <Money value={purchase} onChange={change(setPurchase)} placeholder={result.works ? `${moneyInput(String(result.maxOffer))} (Max Offer)` : "Purchase price"} />
            </Control>
            <Control label="Rehab Level" wide>
              <select value={condition ?? ""} onChange={(e) => change((v) => setCondition(v as Condition))(e.target.value)} className={inputCls}>
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {CONDITION_LABELS[c]} (${CONDITION_RATES[c]}/SF)
                  </option>
                ))}
              </select>
            </Control>
            <Control label="Timeline">
              <select value={months} onChange={(e) => change(setMonths)(e.target.value)} className={inputCls}>
                {HOLD_MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m} Months
                  </option>
                ))}
              </select>
            </Control>
            <Control label="Interest">
              <div className="relative">
                <input inputMode="decimal" value={rate} onChange={(e) => change(setRate)(e.target.value.replace(/[^\d.]/g, ""))} className={`${inputCls} pr-8`} />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">%</span>
              </div>
            </Control>
            <Control label="Closing Cost">
              <Money value={closing} onChange={change(setClosing)} />
            </Control>
            <Control label="Finders Fee">
              <Money value={finders} onChange={change(setFinders)} />
            </Control>
          </div>
        )}

        <OfferRows result={result} />

        {message && <p className={`mt-4 text-sm font-semibold ${message.ok ? "text-green-400" : "text-red-400"}`}>{message.text}</p>}
        {!readOnly && dirty && (
          <button onClick={save} disabled={busy} className={`${btnPrimary} mt-5 w-full`}>
            <CheckIcon className="h-5 w-5" /> {busy ? "SAVING..." : "SAVE NUMBERS"}
          </button>
        )}
      </div>
    </div>
  );
}

function Control({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${wide ? "col-span-2 sm:col-span-1" : ""}`}>
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-gray-400">{label}</span>
      {children}
    </label>
  );
}

function Money({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
      <input inputMode="numeric" value={value} placeholder={placeholder} onChange={(e) => onChange(moneyInput(e.target.value))} className={`${inputCls} pl-7`} />
    </div>
  );
}
