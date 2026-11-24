"use client";

import { useMemo, useState } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import {
  CONDITIONS,
  CONDITION_LABELS,
  CONDITION_RATES,
  DEAL_STATUSES,
  DEAL_TYPES,
  DEFAULT_CLOSING,
  INTEREST_RATES,
  LOAN_MONTHS,
  calcDeal,
  usd,
  type Condition,
  type Deal,
} from "@/lib/deals/calc";
import { btnGhost, btnPrimary, inputCls } from "./ui";

// Form fields are kept as strings while typing, then converted on save.
type FormState = {
  address: string;
  deal_type: string;
  status: string;
  purchase_date: string;
  list_price: string;
  purchase_price: string;
  loan_total: string;
  sqft: string;
  condition: string;
  closing_costs: string;
  assignment_fee: string;
  months: string;
  interest_rate: string;
  arv: string;
  resale_price: string;
  resale_date: string;
  exit_notes: string;
};

const MONEY_FIELDS = ["list_price", "purchase_price", "loan_total", "closing_costs", "assignment_fee", "arv", "resale_price"] as const;

function s(v: string | number | null | undefined) {
  return v == null ? "" : String(v);
}

function toForm(d: Deal | null): FormState {
  return {
    address: s(d?.address),
    deal_type: d?.deal_type ?? "flip",
    status: d?.status ?? "Lead",
    purchase_date: s(d?.purchase_date),
    list_price: s(d?.list_price),
    purchase_price: s(d?.purchase_price),
    loan_total: s(d?.loan_total),
    sqft: s(d?.sqft),
    condition: s(d?.condition),
    closing_costs: d ? s(d.closing_costs) : String(DEFAULT_CLOSING),
    assignment_fee: s(d?.assignment_fee),
    months: s(d?.months ?? 6),
    interest_rate: s(d?.interest_rate ?? 10),
    arv: s(d?.arv),
    resale_price: s(d?.resale_price),
    resale_date: s(d?.resale_date),
    exit_notes: s(d?.exit_notes),
  };
}

// "250,000" or "$250000" -> 250000. Blank -> null.
function parseNum(v: string): number | null {
  const cleaned = v.replace(/[$,\s]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function DealForm({ deal, onCancel, onSaved }: { deal: Deal | null; onCancel: () => void; onSaved: () => void }) {
  const supabase = dealsSupabase()!;
  const [f, setF] = useState<FormState>(() => toForm(deal));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [key]: e.target.value }));

  const calc = useMemo(
    () =>
      calcDeal({
        purchase: parseNum(f.purchase_price) ?? 0,
        sqft: parseNum(f.sqft) ?? 0,
        condition: (f.condition || null) as Condition | null,
        closing: parseNum(f.closing_costs) ?? DEFAULT_CLOSING,
        assignmentFee: parseNum(f.assignment_fee) ?? 0,
        ratePct: parseNum(f.interest_rate) ?? 10,
        months: parseNum(f.months) ?? 6,
        arv: parseNum(f.arv) ?? 0,
      }),
    [f],
  );
  const hasArv = (parseNum(f.arv) ?? 0) > 0;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const row: Record<string, unknown> = {
      address: f.address.trim(),
      deal_type: f.deal_type,
      status: f.status,
      purchase_date: f.purchase_date || null,
      resale_date: f.resale_date || null,
      sqft: parseNum(f.sqft),
      condition: f.condition || null,
      months: parseNum(f.months),
      interest_rate: parseNum(f.interest_rate),
      exit_notes: f.exit_notes.trim() || null,
    };
    for (const k of MONEY_FIELDS) row[k] = parseNum(f[k]);
    if (row.closing_costs == null) row.closing_costs = DEFAULT_CLOSING;

    const { error } = deal
      ? await supabase.from("deals").update(row).eq("id", deal.id)
      : await supabase.from("deals").insert(row);
    setBusy(false);
    if (error) setError(error.message);
    else onSaved();
  }

  async function remove() {
    if (!deal) return;
    if (!window.confirm(`Delete ${deal.address}? This cannot be undone.`)) return;
    setBusy(true);
    const { error } = await supabase.from("deals").delete().eq("id", deal.id);
    setBusy(false);
    if (error) setError(error.message);
    else onSaved();
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={onCancel} className="font-semibold text-brand-yellow-dark hover:underline">
          &larr; Back to Deals
        </button>
        <h2 className="text-xl font-extrabold text-brand-black">{deal ? "Edit Deal" : "Add Deal"}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card title="Property">
            <Field label="Address" full>
              <input required value={f.address} onChange={set("address")} className={inputCls} placeholder="123 Main St, Visalia, CA 93291" />
            </Field>
            <Field label="Deal Type">
              <select value={f.deal_type} onChange={set("deal_type")} className={`${inputCls} capitalize`}>
                {DEAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Status">
              <select value={f.status} onChange={set("status")} className={inputCls}>
                {DEAL_STATUSES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Square Feet">
              <input inputMode="numeric" value={f.sqft} onChange={set("sqft")} className={inputCls} />
            </Field>
            <Field label="Condition">
              <select value={f.condition} onChange={set("condition")} className={inputCls}>
                <option value="">Pick one</option>
                {CONDITIONS.map((c) => (
                  <option key={c} value={c}>{CONDITION_LABELS[c]} (${CONDITION_RATES[c]}/sf)</option>
                ))}
              </select>
            </Field>
          </Card>

          <Card title="Purchase">
            <Field label="Purchase Date">
              <input type="date" value={f.purchase_date} onChange={set("purchase_date")} className={inputCls} />
            </Field>
            <Field label="List Price"><Money value={f.list_price} onChange={set("list_price")} /></Field>
            <Field label="Purchase Price"><Money value={f.purchase_price} onChange={set("purchase_price")} /></Field>
            <Field label="Loan Total"><Money value={f.loan_total} onChange={set("loan_total")} /></Field>
            <Field label="Closing Costs"><Money value={f.closing_costs} onChange={set("closing_costs")} /></Field>
            <Field label="Assignment Fee"><Money value={f.assignment_fee} onChange={set("assignment_fee")} /></Field>
            <Field label="Interest Rate">
              <select value={f.interest_rate} onChange={set("interest_rate")} className={inputCls}>
                {INTEREST_RATES.map((r) => <option key={r} value={r}>{r}%</option>)}
              </select>
            </Field>
            <Field label="Months">
              <select value={f.months} onChange={set("months")} className={inputCls}>
                {LOAN_MONTHS.map((m) => <option key={m} value={m}>{m} months</option>)}
              </select>
            </Field>
          </Card>

          <Card title="Exit">
            <Field label="ARV"><Money value={f.arv} onChange={set("arv")} /></Field>
            <Field label="Resale Price"><Money value={f.resale_price} onChange={set("resale_price")} /></Field>
            <Field label="Resale Date">
              <input type="date" value={f.resale_date} onChange={set("resale_date")} className={inputCls} />
            </Field>
            <Field label="Exit Notes" full>
              <textarea rows={3} value={f.exit_notes} onChange={set("exit_notes")} className={inputCls} />
            </Field>
          </Card>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-xl bg-brand-black p-5 text-white shadow-sm">
            <h3 className="font-display text-lg font-extrabold text-brand-yellow">Deal Calculator</h3>
            <dl className="mt-3 space-y-1.5 text-sm">
              <Row label="Rehab" value={calc.rehab} />
              <Row label="Subtotal" value={calc.subtotal} />
              <Row label="Points (2%)" value={calc.points} />
              <Row label="Interest" value={calc.interest} />
              <Row label="All-In" value={calc.allIn} strong />
              <div className="my-2 border-t border-white/15" />
              <Row label="Listing Agent (6%)" value={calc.listingAgent} />
              <Row label="Estimated Profit" value={calc.profit} strong />
              <Row label="Target Profit (20%)" value={calc.target} />
            </dl>
            {hasArv && (
              <p className={`mt-3 rounded-lg px-3 py-2 text-center text-sm font-bold ${calc.meetsTarget ? "bg-green-600" : "bg-red-600"}`}>
                {calc.meetsTarget ? "Meets target" : "Below target"}
              </p>
            )}
            <div className="mt-4 rounded-lg bg-white p-4 text-brand-black">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">MLS Max Offer</p>
              <p className="font-display text-2xl font-extrabold">{hasArv ? usd(calc.mao) : "-"}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-gray-500">Opening Offer</p>
              <p className="font-display text-xl font-extrabold">{hasArv ? usd(calc.openingOffer) : "-"}</p>
            </div>
          </div>
        </aside>
      </div>

      {error && <p className="rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy} className={btnPrimary}>
          {busy ? "Saving..." : deal ? "Save Changes" : "Add Deal"}
        </button>
        <button type="button" onClick={onCancel} className={btnGhost}>Cancel</button>
        {deal && (
          <button type="button" onClick={remove} disabled={busy} className="ml-auto font-semibold text-red-600 hover:underline">
            Delete Deal
          </button>
        )}
      </div>
    </form>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <legend className="px-1 font-display text-lg font-extrabold text-brand-black">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-sm font-semibold text-gray-700">{label}</span>
      {children}
    </label>
  );
}

function Money({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
      <input inputMode="decimal" value={value} onChange={onChange} className={`${inputCls} pl-7`} />
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={strong ? "font-bold" : "text-gray-300"}>{label}</dt>
      <dd className={strong ? "font-bold" : ""}>{usd(value)}</dd>
    </div>
  );
}
