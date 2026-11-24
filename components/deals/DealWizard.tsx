"use client";

import { useMemo, useState, type ReactNode } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { sameAddress } from "@/lib/deals/address";
import {
  CLOSING_COSTS,
  CONDITIONS,
  CONDITION_LABELS,
  CONDITION_RATES,
  HOLD_MONTHS,
  INTEREST_RATE,
  LISTING_OPTIONS,
  MIN_FINDERS_FEE,
  PICKER_TYPES,
  TYPE_LABELS,
  addressLines,
  calcDeal,
  usd,
  type Comp,
  type Condition,
  type Deal,
  type DealType,
  type DirectoryRow,
  type ListingBy,
} from "@/lib/deals/calc";
import { CheckIcon, bigInputCls, btnGhost, btnPrimary, inputCls, moneyInput, parseNum } from "./ui";

const STEP_COUNT = 7;
const MAX_COMPS = 5;

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
  const [dealType, setDealType] = useState<DealType | null>(deal?.deal_type ?? null);
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
  const [listingBy, setListingBy] = useState<ListingBy | null>(deal?.listing_by ?? null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const next = () => {
    setError(null);
    setStep((s) => s + 1);
    window.scrollTo({ top: 0 });
  };
  const back = () => {
    setError(null);
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
        listingBy: listingBy ?? "legacy",
      }),
    [arv, sqft, condition, finders, months, listingBy],
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
      address: address.trim(),
      deal_type: dealType,
      arv: parseNum(arv),
      comps: cleanComps,
      sqft: parseNum(sqft),
      condition,
      assignment_fee: parseNum(finders),
      months,
      interest_rate: INTEREST_RATE,
      closing_costs: CLOSING_COSTS,
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
        <button onClick={back} className="font-semibold text-brand-yellow-dark hover:underline">
          &larr; {step === 0 ? "Back to Deals" : "Back"}
        </button>
        {step < STEP_COUNT && (
          <p className="text-sm font-bold text-gray-500">
            Step {step + 1} of {STEP_COUNT}
          </p>
        )}
      </div>
      {step < STEP_COUNT && (
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full rounded-full bg-brand-yellow transition-all" style={{ width: `${((step + 1) / STEP_COUNT) * 100}%` }} />
        </div>
      )}

      {step === 0 && (
        <Screen eyebrow={deal ? "Edit Deal" : "New Deal"} title="Property Address">
          <form onSubmit={submitAddress} className="space-y-4">
            <input
              autoFocus
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
              Next
            </button>
          </form>
        </Screen>
      )}

      {step === 1 && (
        <Screen eyebrow="Deal Type" title="What kind of deal is it?">
          <div className="grid grid-cols-2 gap-3">
            {PICKER_TYPES.map((t) => (
              <OptionBox
                key={t}
                selected={dealType === t}
                onClick={() => {
                  setDealType(t);
                  next();
                }}
                className="aspect-[4/3] sm:aspect-square"
              >
                <TypeIcon type={t} />
                <span className="mt-2 text-lg font-extrabold">{TYPE_LABELS[t]}</span>
              </OptionBox>
            ))}
          </div>
        </Screen>
      )}

      {step === 2 && (
        <Screen eyebrow="After Repair Value" title="What is the property's estimated ARV?">
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
              <h3 className="text-base font-extrabold text-brand-black">Comps</h3>
              <p className="text-sm text-gray-500">Optional. Up to {MAX_COMPS} sold properties nearby.</p>
              <div className="mt-3 hidden grid-cols-[2fr_1.2fr_1.2fr_0.9fr_28px] gap-2 px-1 text-xs font-bold uppercase tracking-wide text-gray-500 sm:grid">
                <span>Address</span>
                <span>Sale Price</span>
                <span>Sale Date</span>
                <span>Sq Ft</span>
                <span />
              </div>
              <div className="mt-2 space-y-3 sm:space-y-2">
                {comps.map((c, i) => {
                  const set = (patch: Partial<CompDraft>) => setComps((all) => all.map((x, j) => (j === i ? { ...x, ...patch } : x)));
                  return (
                    <div key={i} className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:grid-cols-[2fr_1.2fr_1.2fr_0.9fr_28px] sm:border-0 sm:bg-transparent sm:p-0">
                      <input value={c.address} onChange={(e) => set({ address: e.target.value })} placeholder="Address" className={`${inputCls} col-span-2 py-2.5 sm:col-span-1`} />
                      <input inputMode="numeric" value={c.price} onChange={(e) => set({ price: moneyInput(e.target.value) })} placeholder="Sale price" className={`${inputCls} py-2.5`} />
                      <input type="date" value={c.date} onChange={(e) => set({ date: e.target.value })} aria-label="Sale date" className={`${inputCls} py-2.5`} />
                      <input inputMode="numeric" value={c.sqft} onChange={(e) => set({ sqft: e.target.value.replace(/\D/g, "") })} placeholder="Sq ft" className={`${inputCls} py-2.5`} />
                      <button
                        type="button"
                        onClick={() => setComps((all) => (all.length === 1 ? [emptyComp()] : all.filter((_, j) => j !== i)))}
                        aria-label="Remove comp"
                        className="text-right text-xl font-bold text-gray-400 hover:text-red-600 sm:text-center"
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
              {comps.length < MAX_COMPS && (
                <button type="button" onClick={() => setComps((all) => [...all, emptyComp()])} className="mt-3 font-bold text-brand-yellow-dark hover:underline">
                  + Add More
                </button>
              )}
            </div>
            <ErrorText error={error} />
            <button type="submit" className={`${btnPrimary} w-full`}>
              Next
            </button>
          </form>
        </Screen>
      )}

      {step === 3 && (
        <Screen eyebrow="Rehab" title="Property square footage">
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
                autoFocus
                inputMode="numeric"
                value={sqft}
                onChange={(e) => setSqft(e.target.value.replace(/\D/g, ""))}
                placeholder="1,200"
                className={`${bigInputCls} pr-14`}
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-gray-400">sf</span>
            </div>
            <h3 className="text-base font-extrabold text-brand-black">How much work does it need?</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CONDITIONS.map((c) => (
                <OptionBox key={c} selected={condition === c} onClick={() => setCondition(c)} className="py-4">
                  <span className="font-extrabold leading-tight">{CONDITION_LABELS[c]}</span>
                  <span className="mt-1 text-sm font-semibold text-gray-500">${CONDITION_RATES[c]}/sf</span>
                </OptionBox>
              ))}
            </div>
            {condition && parseNum(sqft) ? (
              <p className="text-center text-sm font-semibold text-gray-600">Rehab estimate: {usd(result.rehab)}</p>
            ) : null}
            <ErrorText error={error} />
            <button type="submit" className={`${btnPrimary} w-full`}>
              Next
            </button>
          </form>
        </Screen>
      )}

      {step === 4 && (
        <Screen eyebrow="Your Cut" title="Finders Fee" sub={`How much you make (minimum ${usd(MIN_FINDERS_FEE)})`}>
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
              Next
            </button>
          </form>
        </Screen>
      )}

      {step === 5 && (
        <Screen eyebrow="Holding Costs" title="How long will the flip take?">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HOLD_MONTHS.map((m) => (
              <OptionBox
                key={m}
                selected={months === m}
                onClick={() => {
                  setMonths(m);
                  next();
                }}
                className="py-6"
              >
                <span className="font-display text-3xl font-black">{m}</span>
                <span className="text-sm font-bold text-gray-500">Months</span>
              </OptionBox>
            ))}
          </div>
        </Screen>
      )}

      {step === 6 && (
        <Screen eyebrow="Listing" title="Who will list it?">
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(LISTING_OPTIONS) as ListingBy[]).map((k) => (
              <OptionBox key={k} selected={listingBy === k} onClick={() => setListingBy(k)} className="py-6">
                <span className="text-lg font-extrabold">{LISTING_OPTIONS[k].label}</span>
              </OptionBox>
            ))}
          </div>
          <button onClick={() => (listingBy ? next() : setError("Pick who will list it."))} className={`${btnPrimary} mt-6 w-full`}>
            Calculate
          </button>
          <ErrorText error={error} />
        </Screen>
      )}

      {step === 7 && (
        <Results
          address={address}
          result={result}
          busy={busy}
          error={error}
          isEdit={Boolean(deal)}
          onSave={save}
        />
      )}
    </div>
  );
}

function Results({
  address,
  result: r,
  busy,
  error,
  isEdit,
  onSave,
}: {
  address: string;
  result: ReturnType<typeof calcDeal>;
  busy: boolean;
  error: string | null;
  isEdit: boolean;
  onSave: () => void;
}) {
  const [line1, line2] = addressLines(address);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-brand-black p-6 text-white shadow-sm sm:p-8">
        <p className="text-center font-bold text-white">
          {line1}
          {line2 && <span className="block text-sm font-normal text-gray-400">{line2}</span>}
        </p>
        <div className="mt-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Our Max Offer</p>
          <p className="font-display text-5xl font-black sm:text-6xl">{r.works ? usd(r.maxOffer) : "-"}</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-brand-yellow p-4 text-center text-black">
            <p className="text-xs font-bold uppercase tracking-wide">You Will Make</p>
            <p className="font-display text-2xl font-black sm:text-3xl">{usd(r.findersFee)}</p>
          </div>
          <div className="rounded-xl bg-white p-4 text-center text-black">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Opening Offer</p>
            <p className="font-display text-2xl font-black sm:text-3xl">{r.works && r.openingOffer > 0 ? usd(r.openingOffer) : "-"}</p>
          </div>
        </div>
        {!r.works && (
          <p className="mt-5 rounded-xl bg-red-600 p-3 text-center text-sm font-bold">
            These numbers leave no room for an offer. Go back and check the ARV, rehab and finders fee.
          </p>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="font-display text-lg font-extrabold text-brand-black">Breakdown</h3>
        <dl className="mt-3 space-y-2 text-[15px]">
          <Row label="Purchase Price" value={r.maxOffer} />
          <Row label="Rehab Cost" value={r.rehab} />
          <Row label="Closing Cost" value={r.closing} />
          <Row label="Finders Fee" value={r.findersFee} />
          <Divider />
          <Row label="Points (2%)" value={r.points} />
          <Row label={`Interest (${INTEREST_RATE}%)`} value={r.interest} />
          <Divider />
          <Row label="All In" value={r.allIn} strong />
          <Divider />
          <Row label="After Repair Value" value={r.arv} />
          <Row label="Listing Agent" value={r.listingAgent} />
          <Divider />
          <Row label="Estimated Profit" value={r.profit} strong />
          <Row label="Target Profit" value={r.target} />
        </dl>
      </div>

      <ErrorText error={error} />
      <button onClick={onSave} disabled={busy || !r.works} className={`${btnPrimary} w-full py-4 text-lg`}>
        {busy ? "Saving..." : isEdit ? "SAVE CHANGES" : "SAVE DEAL"}
      </button>
    </div>
  );
}

function Screen({ eyebrow, title, sub, children }: { eyebrow: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-extrabold text-brand-black sm:text-3xl">{title}</h2>
      {sub && <p className="mt-1 text-gray-600">{sub}</p>}
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
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 px-3 text-center text-brand-black transition-colors ${
        selected ? "border-brand-yellow-dark bg-brand-yellow/20" : "border-gray-200 bg-white hover:border-brand-yellow"
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
        autoFocus={autoFocus}
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(moneyInput(e.target.value))}
        placeholder={placeholder}
        className={`${big ? bigInputCls : inputCls} pl-9`}
      />
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={strong ? "font-extrabold text-brand-black" : "text-gray-600"}>{label}</dt>
      <dd className={strong ? "font-extrabold text-brand-black" : "font-semibold text-gray-900"}>{usd(value)}</dd>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-gray-100" />;
}

function ErrorText({ error }: { error: string | null }) {
  if (!error) return null;
  return <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>;
}

function TypeIcon({ type }: { type: DealType }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-10 w-10 text-brand-black", "aria-hidden": true };
  if (type === "flip")
    return (
      <svg {...common}>
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    );
  if (type === "rental")
    return (
      <svg {...common}>
        <circle cx="8" cy="15" r="4" />
        <path d="M11 12l9-9" />
        <path d="M17 6l3 3" />
        <path d="M15 8l2 2" />
      </svg>
    );
  if (type === "multifamily")
    return (
      <svg {...common}>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" />
        <path d="M11 21v-3h2v3" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M3 20l6-9 4 5 3-4 5 8z" />
      <circle cx="17" cy="6" r="2" />
    </svg>
  );
}
