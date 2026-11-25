"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { sameAddress } from "@/lib/deals/address";
import {
  CLOSING_COSTS,
  CONDITIONS,
  CONDITION_LABELS,
  CONDITION_RATES,
  HOLD_MONTHS,
  INTEREST_RATE,
  MIN_FINDERS_FEE,
  addressLines,
  calcDeal,
  tidyAddress,
  pricePerSqft,
  usd,
  type Comp,
  type Condition,
  type Deal,
  type DealType,
  type DirectoryRow,
  type ListingBy,
} from "@/lib/deals/calc";
import { OfferHeadline, OfferRows } from "./Breakdown";
import { CheckIcon, bigInputCls, btnGhost, btnPrimary, inputCls, moneyInput, parseNum } from "./ui";

// Address, ARV, Rehab, Finders Fee, Timeline, then results (Dominic, 2026-11-25).
// Deal type (default Flip) and listing (default Legacy) are changed on the deal page.
const STEP_COUNT = 5;
const MAX_COMPS = 5;
// Comps columns: address, sale price, sale date, sq ft, $/sf, remove.
const COMP_GRID = "grid-cols-[1.8fr_1.1fr_1.1fr_0.8fr_0.9fr_28px]";
const COMP_GRID_SM = "sm:grid-cols-[1.8fr_1.1fr_1.1fr_0.8fr_0.9fr_28px]";

type CompDraft = { address: string; price: string; date: string; sqft: string };
const emptyComp = (): CompDraft => ({ address: "", price: "", date: "", sqft: "" });

export function DealWizard({
  deal,
  directory,
  onCancel,
  onSaved,
}: {
  deal?: Deal;
  directory: DirectoryRow[];
  onCancel: () => void;
  onSaved: (deal: Deal, isNew: boolean) => void;
}) {
  const supabase = dealsSupabase()!;
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState(deal?.address ?? "");
  const [dealType, setDealType] = useState<DealType>(deal?.deal_type ?? "flip");
  const [arv, setArv] = useState(deal?.arv ? moneyInput(String(deal.arv)) : "");
  const [comps, setComps] = useState<CompDraft[]>(() =>
    deal?.comps?.length
      ? deal.comps.map((c) => ({
          address: c.address ?? "",
          price: c.price ? moneyInput(String(c.price)) : "",
          date: c.date ?? "",
          sqft: c.sqft ? String(c.sqft) : "",
        }))
      : [emptyComp()],
  );
  const [sqft, setSqft] = useState(deal?.sqft ? String(deal.sqft) : "");
  const [condition, setCondition] = useState<Condition | null>(deal?.condition ?? null);
  const [finders, setFinders] = useState(deal?.assignment_fee ? moneyInput(String(deal.assignment_fee)) : "");
  const [months, setMonths] = useState<number | null>(deal?.months && (HOLD_MONTHS as readonly number[]).includes(deal.months) ? deal.months : null);
  const [listingBy, setListingBy] = useState<ListingBy>(deal?.listing_by ?? "legacy");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Which way the screens slide: forward slides in from the right.
  const [dir, setDir] = useState<"next" | "back">("next");
  const next = () => {
    setError(null);
    setDir("next");
    setStep((s) => s + 1);
    window.scrollTo({ top: 0 });
  };
  const back = () => {
    setError(null);
    setDir("back");
    if (step === 0) onCancel();
    else setStep((s) => s - 1);
  };

  const result = useMemo(
    () =>
      calcDeal({
        arv: parseNum(arv) ?? 0,
        sqft: parseNum(sqft) ?? 0,
        condition,
        findersFee: parseNum(finders) ?? 0,
        months: months ?? 6,
        listingBy,
        // Keep custom interest and closing costs set on the deal page.
        ratePct: deal?.interest_rate ?? INTEREST_RATE,
        closing: deal?.closing_costs ?? CLOSING_COSTS,
      }),
    [arv, sqft, condition, finders, months, listingBy, deal],
  );

  function submitAddress(e: React.FormEvent) {
    e.preventDefault();
    const a = address.trim();
    if (a.length < 5) return setError("Enter the full property address.");
    const dupe = directory.find((r) => r.id !== deal?.id && sameAddress(r.address, a));
    if (dupe) {
      return setError(
        dupe.is_mine
          ? "You already submitted this deal. You can find it under My Deals."
          : `That deal has already been submitted by ${dupe.owner_name} please contact them to check the status!`,
      );
    }
    next();
  }

  async function save() {
    setBusy(true);
    setError(null);
    const cleanComps: Comp[] = comps
      .filter((c) => c.address.trim() || c.price || c.date || c.sqft)
      .map((c) => ({ address: c.address.trim(), price: parseNum(c.price), date: c.date, sqft: parseNum(c.sqft) }));
    const row = {
      address: tidyAddress(address),
      deal_type: dealType,
      arv: parseNum(arv),
      comps: cleanComps,
      sqft: parseNum(sqft),
      condition,
      assignment_fee: parseNum(finders),
      months,
      interest_rate: result.ratePct,
      closing_costs: result.closing,
      listing_by: listingBy,
      max_offer: result.maxOffer,
      opening_offer: result.openingOffer,
    };
    const res = deal
      ? await supabase.from("deals").update(row).eq("id", deal.id).select().single()
      : await supabase.from("deals").insert({ ...row, status: "New Lead" }).select().single();
    setBusy(false);
    if (res.error) return setError(res.error.message);
    onSaved(res.data as Deal, !deal);
  }

  const findersNum = parseNum(finders);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <button onClick={back} className="font-semibold text-brand-yellow hover:underline">
          &larr; {step === 0 ? "Back to Deals" : "Back"}
        </button>
        {step < STEP_COUNT && (
          <p className="text-sm font-bold text-gray-400">
            Step {step + 1} of {STEP_COUNT}
          </p>
        )}
      </div>
      {step < STEP_COUNT && (
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-brand-yellow shadow-[0_0_12px_rgba(245,197,24,0.6)] transition-all duration-500" style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }} />
        </div>
      )}

      <div key={step} className={dir === "next" ? "hj-slide-next" : "hj-slide-back"}>
      {step === 0 && (
        <Screen eyebrow={deal ? "Edit Deal" : "New Deal"} title="Property Address">
          <form onSubmit={submitAddress} className="space-y-4">
            <input
              autoFocus={desktopFocus()}
              enterKeyHint="next"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError(null);
              }}
              placeholder="123 Main St, Visalia, CA 93291"
              autoComplete="street-address"
              className={bigInputCls}
            />
            <ErrorText error={error} />
            <button type="submit" className={`${btnPrimary} w-full`}>
              NEXT <ChevronIcon />
            </button>
          </form>
        </Screen>
      )}

      {step === 1 && (
        <Screen eyebrow="After Repair Value" title="Estimated Property ARV">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!parseNum(arv)) return setError("Enter the estimated after repair value.");
              next();
            }}
            className="space-y-6"
          >
            <MoneyField value={arv} onChange={setArv} placeholder="300,000" autoFocus big />
            <div>
              <h3 className="text-base font-extrabold text-white">Comparable Properties</h3>
              <p className="text-sm italic text-gray-400">OPTIONAL / Up to {MAX_COMPS} Sold Homes</p>
              <div className={`mt-3 hidden ${COMP_GRID} gap-2 px-1 text-xs font-bold uppercase tracking-wide text-gray-400 sm:grid`}>
                <span>ADDRESS</span>
                <span>SALE PRICE</span>
                <span>SALE DATE</span>
                <span>SQ FT</span>
                <span>$/SF</span>
                <span />
              </div>
              <div className="mt-2 space-y-3 sm:space-y-2">
                {comps.map((c, i) => {
                  const set = (patch: Partial<CompDraft>) => setComps((all) => all.map((x, j) => (j === i ? { ...x, ...patch } : x)));
                  const ppsf = pricePerSqft(parseNum(c.price), parseNum(c.sqft));
                  return (
                    <div key={i} className={`grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-white/5 p-3 ${COMP_GRID_SM} sm:border-0 sm:bg-transparent sm:p-0`}>
                      <input value={c.address} onChange={(e) => set({ address: e.target.value })} placeholder="ADDRESS" className={`${inputCls} col-span-2 py-2.5 sm:col-span-1`} />
                      <input inputMode="numeric" value={c.price} onChange={(e) => set({ price: moneyInput(e.target.value) })} placeholder="SALE PRICE" className={`${inputCls} py-2.5`} />
                      <input inputMode="numeric" value={c.date} onChange={(e) => set({ date: formatDateTyping(e.target.value) })} placeholder="SALE DATE" aria-label="Sale date" className={`${inputCls} py-2.5`} />
                      <input inputMode="numeric" value={c.sqft} onChange={(e) => set({ sqft: e.target.value.replace(/\D/g, "") })} placeholder="SQ FT" className={`${inputCls} py-2.5`} />
                      <div
                        aria-label="Price per square foot"
                        title="Figured from sale price and square feet"
                        className="flex items-center rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 font-semibold text-gray-400"
                      >
                        {ppsf != null ? `$${ppsf.toLocaleString("en-US")}/SF` : "$/SF"}
                      </div>
                      <button
                        type="button"
                        onClick={() => setComps((all) => (all.length === 1 ? [emptyComp()] : all.filter((_, j) => j !== i)))}
                        aria-label="Remove comp"
                        className="col-span-2 text-right text-xl font-bold text-gray-400 hover:text-red-400 sm:col-span-1 sm:text-center"
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
              {comps.length < MAX_COMPS && (
                <button type="button" onClick={() => setComps((all) => [...all, emptyComp()])} className="mt-3 font-bold text-brand-yellow hover:underline">
                  + Add More
                </button>
              )}
            </div>
            <ErrorText error={error} />
            <button type="submit" className={`${btnPrimary} w-full`}>
              NEXT <ChevronIcon />
            </button>
          </form>
        </Screen>
      )}

      {step === 2 && (
        <Screen eyebrow="Rehab" title="Property Square Footage">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!parseNum(sqft)) return setError("Enter the square footage.");
              if (!condition) return setError("Pick a rehab level.");
              next();
            }}
            className="space-y-5"
          >
            <div className="relative">
              <input
                autoFocus={desktopFocus()}
                enterKeyHint="next"
                inputMode="numeric"
                value={sqft}
                onChange={(e) => setSqft(e.target.value.replace(/\D/g, ""))}
                placeholder="1,200"
                className={`${bigInputCls} pr-20`}
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-gray-400">SQ FT</span>
            </div>
            <h3 className="text-base font-extrabold text-white">How much work does it need?</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CONDITIONS.map((c) => (
                <OptionBox key={c} selected={condition === c} onClick={() => setCondition(c)} className="py-4">
                  <span className="font-extrabold leading-tight">{CONDITION_LABELS[c]}</span>
                  <span className="mt-1 text-sm font-semibold text-gray-400">${CONDITION_RATES[c]}/SF</span>
                </OptionBox>
              ))}
            </div>
            {condition && parseNum(sqft) ? (
              <p className="text-center text-sm font-semibold text-gray-400">Renovation Estimate: {usd(result.rehab)}</p>
            ) : null}
            <ErrorText error={error} />
            <button type="submit" className={`${btnPrimary} w-full`}>
              NEXT <ChevronIcon />
            </button>
          </form>
        </Screen>
      )}

      {step === 3 && (
        <Screen eyebrow="Your Cut" title="Finders Fee" sub={`How Much You Make! (Minimum: ${usd(MIN_FINDERS_FEE)})`}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!findersNum || findersNum < MIN_FINDERS_FEE) return setError(`The minimum finders fee is ${usd(MIN_FINDERS_FEE)}.`);
              next();
            }}
            className="space-y-4"
          >
            <MoneyField value={finders} onChange={setFinders} placeholder="2,000" autoFocus big />
            <ErrorText error={error} />
            <button type="submit" className={`${btnPrimary} w-full`}>
              NEXT <ChevronIcon />
            </button>
          </form>
        </Screen>
      )}

      {step === 4 && (
        <Screen eyebrow="Holding Costs" title="Project Timeline">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HOLD_MONTHS.map((m) => (
              <OptionBox
                key={m}
                selected={months === m}
                onClick={() => {
                  setMonths(m);
                  setError(null);
                }}
                className="py-6"
              >
                <span className="font-display text-3xl font-black">{m}</span>
                <span className="text-sm font-bold text-gray-400">MONTHS</span>
              </OptionBox>
            ))}
          </div>
          <button onClick={() => (months ? next() : setError("Pick the project timeline."))} className={`${btnPrimary} mt-6 w-full`}>
            <CalculatorIcon /> CALCULATE
          </button>
          <ErrorText error={error} />
        </Screen>
      )}

      {step === 5 && (
        <Results
          address={address}
          sqft={parseNum(sqft)}
          condition={condition}
          result={result}
          busy={busy}
          error={error}
          isEdit={Boolean(deal)}
          onSave={save}
        />
      )}
      </div>
    </div>
  );
}

function Results({
  address,
  sqft,
  condition,
  result: r,
  busy,
  error,
  isEdit,
  onSave,
}: {
  address: string;
  sqft: number | null;
  condition: Condition | null;
  result: ReturnType<typeof calcDeal>;
  busy: boolean;
  error: string | null;
  isEdit: boolean;
  onSave: () => void;
}) {
  const [line1, line2] = addressLines(address);
  return (
    <div className="space-y-4">
      <button onClick={onSave} disabled={busy || !r.works} className={`${btnPrimary} w-full py-4 text-lg`}>
        <CheckIcon className="h-5 w-5" /> {busy ? "SAVING..." : isEdit ? "SAVE CHANGES" : "SAVE DEAL"}
      </button>
      <ErrorText error={error} />

      <OfferHeadline
        result={r}
        top={
          <p className="text-center font-bold text-white">
            {line1}
            {line2 && <span className="block text-sm font-normal text-gray-400">{line2}</span>}
            <span className="mt-1 block text-sm font-semibold text-brand-yellow">
              {sqft ? sqft.toLocaleString("en-US") : "-"} SF / {condition ? CONDITION_LABELS[condition] : "-"}
            </span>
          </p>
        }
      />

      <div className="rounded-2xl border border-white/10 bg-brand-charcoal p-6">
        <h3 className="mb-3 font-display text-lg font-extrabold text-white">OFFER BREAKDOWN</h3>
        <OfferRows result={r} />
      </div>
    </div>
  );
}

// Phones and tablets: never pop the keyboard open on a new screen (it covers
// everything). Computers with a mouse still get the cursor in the box.
function desktopFocus() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

// When the keyboard opens on a phone, slide the card up so the question and
// the box sit at the top of the screen, above the keyboard.
function liftAboveKeyboard(card: HTMLElement | null, target: EventTarget) {
  if (!card || desktopFocus()) return;
  const el = target as HTMLElement;
  if (!["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName)) return;
  setTimeout(() => {
    const header = 76; // sticky Deal Tracker bar
    const top = card.getBoundingClientRect().top + window.scrollY - header;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, 300);
}

function Screen({ eyebrow, title, sub, children }: { eyebrow: string; title: string; sub?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} onFocusCapture={(e) => liftAboveKeyboard(ref.current, e.target)} className="rounded-2xl border border-white/10 bg-brand-charcoal p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
      {sub && <p className="mt-1 text-gray-400">{sub}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function OptionBox({
  selected,
  onClick,
  className = "",
  children,
}: {
  selected: boolean;
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 px-3 text-center text-white transition active:scale-[0.97] ${
        selected
          ? "border-brand-yellow bg-brand-yellow/15 shadow-[0_0_24px_rgba(245,197,24,0.18)]"
          : "border-white/10 bg-white/5 hover:border-brand-yellow/60"
      } ${className}`}
    >
      {selected && (
        <span className="absolute right-2 top-2 rounded-full bg-brand-yellow p-1 text-black">
          <CheckIcon className="h-3 w-3" />
        </span>
      )}
      {children}
    </button>
  );
}

function MoneyField({
  value,
  onChange,
  placeholder,
  autoFocus,
  big,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  big?: boolean;
}) {
  return (
    <div className="relative">
      <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400 ${big ? "text-lg" : ""}`}>$</span>
      <input
        autoFocus={autoFocus && desktopFocus()}
        enterKeyHint="next"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(moneyInput(e.target.value))}
        placeholder={placeholder}
        className={`${big ? bigInputCls : inputCls} pl-9`}
      />
    </div>
  );
}


function ErrorText({ error }: { error: string | null }) {
  if (!error) return null;
  return <p className="mt-3 rounded-xl bg-red-500/10 p-3 text-sm font-semibold text-red-300">{error}</p>;
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M8 6h8" />
      <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
    </svg>
  );
}

// Types a date as MM/DD/YYYY.
function formatDateTyping(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}
