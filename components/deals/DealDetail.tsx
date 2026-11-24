"use client";

import { useState } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import {
  CONDITION_LABELS,
  DEAL_STATUSES,
  LISTING_OPTIONS,
  TYPE_LABELS,
  addressLines,
  rehabCost,
  shortDate,
  usd,
  type Deal,
  type DealStatus,
} from "@/lib/deals/calc";
import { PencilIcon, StatusPill, btnPrimary, inputCls, moneyInput, parseNum } from "./ui";

type Kind = "text" | "money" | "number" | "date" | "textarea" | "email" | "tel" | "select";
type FieldKey =
  | "seller_name" | "seller_phone" | "seller_email" | "lead_source" | "motivation" | "occupancy" | "follow_up_date"
  | "apn" | "lot_sqft" | "year_built" | "beds" | "baths"
  | "list_price" | "purchase_price" | "mortgage_balance" | "loan_total" | "purchase_date" | "closing_date"
  | "resale_price" | "resale_date" | "notes" | "exit_notes";

type FieldDef = { key: FieldKey; label: string; kind: Kind; options?: string[] };

// The "+ Add Info" menu. Order here is the order fields show on the page.
const FIELD_GROUPS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Contact",
    fields: [
      { key: "seller_name", label: "Seller Name", kind: "text" },
      { key: "seller_phone", label: "Seller Phone", kind: "tel" },
      { key: "seller_email", label: "Seller Email", kind: "email" },
      { key: "lead_source", label: "Lead Source", kind: "text" },
      { key: "motivation", label: "Seller Situation", kind: "text" },
      { key: "occupancy", label: "Occupancy", kind: "select", options: ["Vacant", "Owner Occupied", "Tenant Occupied"] },
      { key: "follow_up_date", label: "Next Follow Up", kind: "date" },
    ],
  },
  {
    title: "Property",
    fields: [
      { key: "apn", label: "APN", kind: "text" },
      { key: "lot_sqft", label: "Lot SF", kind: "number" },
      { key: "year_built", label: "Year Built", kind: "number" },
      { key: "beds", label: "Beds", kind: "number" },
      { key: "baths", label: "Baths", kind: "number" },
    ],
  },
  {
    title: "Money and Dates",
    fields: [
      { key: "list_price", label: "List Price", kind: "money" },
      { key: "purchase_price", label: "Purchase Price", kind: "money" },
      { key: "mortgage_balance", label: "Mortgage Balance", kind: "money" },
      { key: "loan_total", label: "Loan Total", kind: "money" },
      { key: "purchase_date", label: "Purchase Date", kind: "date" },
      { key: "closing_date", label: "Closing Date", kind: "date" },
      { key: "resale_price", label: "Resale Price", kind: "money" },
      { key: "resale_date", label: "Resale Date", kind: "date" },
    ],
  },
  {
    title: "Notes",
    fields: [
      { key: "notes", label: "Notes", kind: "textarea" },
      { key: "exit_notes", label: "Exit Notes", kind: "textarea" },
    ],
  },
];
const ALL_FIELDS = FIELD_GROUPS.flatMap((g) => g.fields);
const NUMERIC: Kind[] = ["money", "number"];

function initialValues(deal: Deal) {
  const v = {} as Record<FieldKey, string>;
  for (const f of ALL_FIELDS) {
    const raw = deal[f.key];
    v[f.key] = raw == null ? "" : f.kind === "money" ? moneyInput(String(raw)) : String(raw);
  }
  return v;
}

export function DealDetail({
  deal,
  onBack,
  onRecalculate,
  onChanged,
  onDeleted,
}: {
  deal: Deal;
  onBack: () => void;
  onRecalculate: () => void;
  onChanged: () => Promise<void>;
  onDeleted: () => void;
}) {
  const supabase = dealsSupabase()!;
  const [values, setValues] = useState(() => initialValues(deal));
  const [shown, setShown] = useState<FieldKey[]>(() => ALL_FIELDS.filter((f) => deal[f.key] != null && deal[f.key] !== "").map((f) => f.key));
  const [menuOpen, setMenuOpen] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [line1, line2] = addressLines(deal.address);

  const setValue = (key: FieldKey, v: string) => {
    setValues((all) => ({ ...all, [key]: v }));
    setDirty(true);
    setMessage(null);
  };

  async function updateStatus(status: DealStatus) {
    const { error } = await supabase.from("deals").update({ status }).eq("id", deal.id);
    if (error) setMessage({ ok: false, text: error.message });
    else await onChanged();
  }

  async function saveInfo() {
    setBusy(true);
    const row: Record<string, string | number | null> = {};
    for (const f of ALL_FIELDS) {
      const v = shown.includes(f.key) ? values[f.key].trim() : "";
      row[f.key] = v === "" ? null : NUMERIC.includes(f.kind) ? parseNum(v) : v;
    }
    const { error } = await supabase.from("deals").update(row).eq("id", deal.id);
    setBusy(false);
    if (error) return setMessage({ ok: false, text: error.message });
    setDirty(false);
    setMessage({ ok: true, text: "Saved." });
    await onChanged();
  }

  async function remove() {
    if (!window.confirm(`Delete ${deal.address}? This cannot be undone.`)) return;
    const { error } = await supabase.from("deals").delete().eq("id", deal.id);
    if (error) setMessage({ ok: false, text: error.message });
    else onDeleted();
  }

  const numbers = [
    { label: "Our Max Offer", value: usd(deal.max_offer) },
    { label: "Opening Offer", value: usd(deal.opening_offer) },
    { label: "You Make", value: usd(deal.assignment_fee) },
    { label: "ARV", value: usd(deal.arv) },
    { label: "Renovation", value: usd(rehabCost(deal.sqft, deal.condition)) },
    { label: "Rehab Level", value: deal.condition ? CONDITION_LABELS[deal.condition] : "-" },
    { label: "Square Feet", value: deal.sqft ? deal.sqft.toLocaleString("en-US") : "-" },
    { label: "Hold", value: deal.months ? `${deal.months} months` : "-" },
    { label: "Listing", value: deal.listing_by ? LISTING_OPTIONS[deal.listing_by].label : "-" },
  ];

  const unused = (fields: FieldDef[]) => fields.filter((f) => !shown.includes(f.key));

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
        </p>
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
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-extrabold text-brand-black">Deal Numbers</h2>
          <button onClick={onRecalculate} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-yellow px-3 py-2 text-sm font-bold text-black hover:bg-brand-yellow-dark">
            <PencilIcon className="h-4 w-4" /> Recalculate
          </button>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {numbers.map((n) => (
            <div key={n.label} className="rounded-lg bg-gray-50 px-3 py-2">
              <dt className="text-xs font-semibold text-gray-500">{n.label}</dt>
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
                    {usd(c.price)} &bull; {/^\d{4}-\d{2}-\d{2}/.test(c.date) ? shortDate(c.date) : c.date || "-"} &bull; {c.sqft ? `${c.sqft.toLocaleString("en-US")} sf` : "- sf"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-extrabold text-brand-black">Deal Info</h2>
        {shown.length === 0 && <p className="mt-2 text-gray-600">Nothing added yet. Tap Add Info for contact details, APN, dates and more.</p>}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {ALL_FIELDS.filter((f) => shown.includes(f.key)).map((f) => (
            <div key={f.key} className={f.kind === "textarea" ? "sm:col-span-2" : ""}>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor={`f-${f.key}`} className="text-sm font-semibold text-gray-700">
                  {f.label}
                </label>
                <div className="flex items-center gap-3 text-sm">
                  {f.kind === "tel" && values[f.key] && (
                    <a href={`tel:${values[f.key].replace(/[^\d+]/g, "")}`} className="font-bold text-brand-yellow-dark hover:underline">
                      Call
                    </a>
                  )}
                  {f.kind === "email" && values[f.key] && (
                    <a href={`mailto:${values[f.key]}`} className="font-bold text-brand-yellow-dark hover:underline">
                      Email
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setShown((s) => s.filter((k) => k !== f.key));
                      setDirty(true);
                    }}
                    aria-label={`Remove ${f.label}`}
                    className="text-lg font-bold leading-none text-gray-400 hover:text-red-600"
                  >
                    &times;
                  </button>
                </div>
              </div>
              <FieldInput def={f} value={values[f.key]} onChange={(v) => setValue(f.key, v)} />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-gray-300 px-4 py-3 font-bold text-brand-black hover:border-brand-yellow-dark"
        >
          <span className="text-xl leading-none">{menuOpen ? "−" : "+"}</span> Add Info
        </button>

        {menuOpen && (
          <div className="mt-4 space-y-4 rounded-xl bg-gray-50 p-4">
            {FIELD_GROUPS.map((g) =>
              unused(g.fields).length === 0 ? null : (
                <div key={g.title}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">{g.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {unused(g.fields).map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => {
                          setShown((s) => [...s, f.key]);
                          setTimeout(() => document.getElementById(`f-${f.key}`)?.focus(), 0);
                        }}
                        className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 hover:border-brand-yellow-dark hover:bg-brand-yellow/20"
                      >
                        + {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              ),
            )}
            {ALL_FIELDS.every((f) => shown.includes(f.key)) && <p className="text-sm text-gray-500">Every field is already added.</p>}
          </div>
        )}

        {message && <p className={`mt-4 text-sm font-semibold ${message.ok ? "text-green-700" : "text-red-600"}`}>{message.text}</p>}

        {dirty && (
          <button onClick={saveInfo} disabled={busy} className={`${btnPrimary} mt-5 w-full`}>
            {busy ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <StatusPill status={deal.status} />
        <button onClick={remove} className="font-semibold text-red-600 hover:underline">
          Delete Deal
        </button>
      </div>
    </div>
  );
}

function FieldInput({ def, value, onChange }: { def: FieldDef; value: string; onChange: (v: string) => void }) {
  const id = `f-${def.key}`;
  if (def.kind === "textarea") return <textarea id={id} rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
  if (def.kind === "select")
    return (
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        <option value="">Pick one</option>
        {def.options?.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  if (def.kind === "money")
    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">$</span>
        <input id={id} inputMode="numeric" value={value} onChange={(e) => onChange(moneyInput(e.target.value))} className={`${inputCls} pl-8`} />
      </div>
    );
  const type = def.kind === "number" ? "text" : def.kind;
  return (
    <input
      id={id}
      type={type}
      inputMode={def.kind === "number" ? "decimal" : undefined}
      value={value}
      onChange={(e) => onChange(def.kind === "number" ? e.target.value.replace(/[^\d.]/g, "") : e.target.value)}
      className={inputCls}
    />
  );
}
