// Shared pieces for the internal /deals tool.
import type { DealStatus } from "@/lib/deals/calc";

export const inputCls =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:border-brand-yellow-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow/40";
export const bigInputCls = `${inputCls} py-4 text-lg font-semibold`;
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow px-6 py-3.5 text-base font-extrabold text-black transition-colors hover:bg-brand-yellow-dark disabled:cursor-not-allowed disabled:opacity-50";
export const btnDark =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-black px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-charcoal";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-base font-bold text-gray-800 transition-colors hover:bg-gray-50";

export function StatusPill({ status }: { status: DealStatus | string }) {
  const cls =
    status === "Closed"
      ? "bg-green-100 text-green-800"
      : status === "New Lead"
        ? "bg-gray-100 text-gray-700"
        : status === "Escrow Opened" || status === "Contract Signed"
          ? "bg-brand-black text-brand-yellow"
          : "bg-brand-yellow/30 text-black";
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${cls}`}>{status}</span>;
}

export function PencilIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// "250,000" or "$250000" -> 250000. Blank -> null.
export function parseNum(v: string): number | null {
  const cleaned = v.replace(/[$,\s]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

// Shows 250000 as "250,000" while typing.
export function moneyInput(v: string) {
  const n = parseNum(v);
  if (n == null) return v.replace(/[^\d.]/g, "");
  return Math.round(n).toLocaleString("en-US");
}
