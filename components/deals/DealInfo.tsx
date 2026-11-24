"use client";

import { useState } from "react";
import { dealsSupabase } from "@/lib/deals/supabaseClient";
import { shortDate, usd, type Deal } from "@/lib/deals/calc";
import { CheckIcon, PencilIcon, btnGhost, btnPrimary, inputCls, moneyInput, parseNum } from "./ui";

type Kind = "text" | "money" | "number" | "date" | "textarea" | "email" | "tel" | "select";
type FieldKey =
  | "seller_name" | "seller_phone" | "seller_email" | "lead_source" | "motivation" | "occupancy" | "follow_up_date"
  | "apn" | "lot_sqft" | "year_built" | "beds" | "baths"
  | "list_price" | "purchase_price" | "mortgage_balance" | "loan_total" | "purchase_date" | "closing_date"
  | "resale_price" | "resale_date" | "notes" | "exit_notes";

type FieldDef = { key: FieldKey; label: string; kind: Kind; options?: string[] };

// The "+ ADD INFO" menu. Order here is the order fields show on the page.
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

function filledKeys(deal: Deal) {
  return ALL_FIELDS.filter((f) => deal[f.key] != null && deal[f.key] !== "").map((f) => f.key);
}

function initialValues(deal: Deal) {
  const v = {} as Record<FieldKey, string>;
  for (const f of ALL_FIELDS) {
    const raw = deal[f.key];
    v[f.key] = raw == null ? "" : f.kind === "money" ? moneyInput(String(raw)) : String(raw);
  }
  return v;
}

// How a saved value reads in view mode.
function display(f: FieldDef, raw: unknown) {
  if (raw == null || raw === "") return "-";
  if (f.kind === "money") return usd(Number(raw));
  if (f.kind === "date") return shortDate(String(raw));
  if (f.kind === "number" && f.key !== "year_built") return Number(raw).toLocaleString("en-US");
  return String(raw);
}

export function DealInfo({ deal, readOnly, onChanged }: { deal: Deal; readOnly?: boolean; onChanged?: () => Promise<void> }) {
  const supabase = dealsSupabase()!;
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(() => initialValues(deal));
  const [shown, setShown] = useState<FieldKey[]>(() => filledKeys(deal));
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const saved = filledKeys(deal);
  const savedFields = ALL_FIELDS.filter((f) => saved.includes(f.key));
  const unused = (fields: FieldDef[]) => fields.filter((f) => !shown.includes(f.key));

  function startEdit(addKey?: FieldKey) {
    setValues(initialValues(deal));
    const keys = filledKeys(deal);
    setShown(addKey && !keys.includes(addKey) ? [...keys, addKey] : keys);
    setEditing(true);
    setMessage(null);
    if (addKey) setTimeout(() => document.getElementById(`f-${addKey}`)?.focus(), 0);
  }

  function cancel() {
    setEditing(false);
    setMenuOpen(false);
    setMessage(null);
  }

  async function save() {
    setBusy(true);
    const row: Record<string, string | number | null> = {};
    for (const f of ALL_FIELDS) {
      const v = shown.includes(f.key) ? values[f.key].trim() : "";
      row[f.key] = v === "" ? null : NUMERIC.includes(f.kind) ? parseNum(v) : v;
    }
    const { error } = await supabase.from("deals").update(row).eq("id", deal.id);
    setBusy(false);
    if (error) return setMessage({ ok: false, text: error.message });
    await onChanged?.();
    setEditing(false);
    setMenuOpen(false);
    setMessage({ ok: true, text: "Saved." });
  }

  const addMenu = (
    <div className="mt-4 space-y-4 rounded-xl bg-white/5 p-4">
      {FIELD_GROUPS.map((g) =>
        unused(g.fields).length === 0 ? null : (
          <div key={g.title}>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">{g.title}</p>
            <div className="flex flex-wrap gap-2">
              {unused(g.fields).map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => {
                    if (!editing) return startEdit(f.key);
                    setShown((s) => [...s, f.key]);
                    setTimeout(() => document.getElementById(`f-${f.key}`)?.focus(), 0);
                  }}
                  className="rounded-full border border-white/15 bg-brand-charcoal px-3 py-1.5 text-sm font-semibold text-gray-200 hover:border-brand-yellow-dark hover:bg-brand-yellow/20"
                >
                  + {f.label}
                </button>
              ))}
            </div>
          </div>
        ),
      )}
      {ALL_FIELDS.every((f) => shown.includes(f.key)) && <p className="text-sm text-gray-400">Every field is already added.</p>}
    </div>
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-brand-charcoal p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-extrabold text-white">Deal Info</h2>
        {!readOnly && !editing && savedFields.length > 0 && (
          <button
            onClick={() => startEdit()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-yellow px-3 py-2 text-sm font-bold text-black hover:bg-brand-yellow-dark"
          >
            <PencilIcon className="h-4 w-4" /> EDIT
          </button>
        )}
      </div>

      {!editing ? (
        <>
          {savedFields.length === 0 ? (
            <p className="mt-2 text-gray-400">{readOnly ? "No extra info added yet." : "Contact info, property details, and more!"}</p>
          ) : (
            <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {savedFields.map((f) => {
                const raw = deal[f.key];
                const text = display(f, raw);
                return (
                  <div key={f.key} className={`rounded-lg bg-white/5 px-3 py-2 ${f.kind === "textarea" ? "col-span-2 sm:col-span-4" : ""} ${f.kind === "email" ? "col-span-2" : ""}`}>
                    <dt className="text-xs font-bold uppercase tracking-wide text-gray-400">{f.label}</dt>
                    <dd className={`font-bold text-white ${f.kind === "textarea" ? "whitespace-pre-wrap font-semibold" : "break-words"}`}>
                      {f.kind === "tel" ? (
                        <a href={`tel:${String(raw).replace(/[^\d+]/g, "")}`} className="hover:underline">
                          {text}
                        </a>
                      ) : f.kind === "email" ? (
                        <a href={`mailto:${raw}`} className="break-all hover:underline">
                          {text}
                        </a>
                      ) : (
                        text
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
        </>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {ALL_FIELDS.filter((f) => shown.includes(f.key)).map((f) => (
            <div key={f.key} className={f.kind === "textarea" ? "sm:col-span-2" : ""}>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor={`f-${f.key}`} className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  {f.label}
                </label>
                <button
                  type="button"
                  onClick={() => setShown((s) => s.filter((k) => k !== f.key))}
                  aria-label={`Remove ${f.label}`}
                  className="text-lg font-bold leading-none text-gray-400 hover:text-red-400"
                >
                  &times;
                </button>
              </div>
              <FieldInput def={f} value={values[f.key]} onChange={(v) => setValues((all) => ({ ...all, [f.key]: v }))} />
            </div>
          ))}
        </div>
      )}

      {!readOnly && (
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-dashed border-white/15 px-4 py-3 font-bold text-white hover:border-brand-yellow-dark"
        >
          <span className="text-xl leading-none">{menuOpen ? "−" : "+"}</span> ADD INFO
        </button>
      )}
      {!readOnly && menuOpen && addMenu}

      {message && <p className={`mt-4 text-sm font-semibold ${message.ok ? "text-green-400" : "text-red-400"}`}>{message.text}</p>}

      {editing && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={save} disabled={busy} className={btnPrimary}>
            <CheckIcon className="h-5 w-5" /> {busy ? "SAVING..." : "SAVE"}
          </button>
          <button onClick={cancel} className={btnGhost}>
            CANCEL
          </button>
        </div>
      )}
    </div>
  );
}

function FieldInput({ def, value, onChange }: { def: FieldDef; value: string; onChange: (v: string) => void }) {
  const id = `f-${def.key}`;
  if (def.kind === "textarea") return <textarea id={id} rows={4} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />;
  if (def.kind === "select")
    return (
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        <option value="">Pick One</option>
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
