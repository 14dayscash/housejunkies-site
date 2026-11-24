"use client";

// Shared pieces for the internal /deals and /admin tools (dark app look).
import { useEffect, useRef, useState } from "react";
import type { DealStatus } from "@/lib/deals/calc";

export const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/30";
export const bigInputCls = `${inputCls} py-4 text-lg font-semibold`;
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-yellow px-6 py-3.5 text-base font-extrabold text-black transition active:scale-[0.98] hover:bg-brand-yellow-dark disabled:cursor-not-allowed disabled:opacity-50";
export const btnDark =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-base font-bold text-white transition active:scale-[0.98] hover:bg-white/15";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-transparent px-6 py-3.5 text-base font-bold text-gray-200 transition active:scale-[0.98] hover:bg-white/5";

// One color per status, so the pipeline reads at a glance.
export const STATUS_COLORS: Record<string, { pill: string; text: string; bar: string }> = {
  "New Lead": { pill: "bg-gray-500/20 text-gray-300", text: "text-gray-300", bar: "bg-gray-400" },
  Contacted: { pill: "bg-sky-500/20 text-sky-300", text: "text-sky-300", bar: "bg-sky-400" },
  "Offer Sent": { pill: "bg-brand-yellow/20 text-brand-yellow", text: "text-brand-yellow", bar: "bg-brand-yellow" },
  "Contract Signed": { pill: "bg-orange-500/20 text-orange-300", text: "text-orange-300", bar: "bg-orange-400" },
  "Escrow Opened": { pill: "bg-purple-500/20 text-purple-300", text: "text-purple-300", bar: "bg-purple-400" },
  Closed: { pill: "bg-green-500/20 text-green-300", text: "text-green-300", bar: "bg-green-400" },
};
const FALLBACK = STATUS_COLORS["New Lead"];

export function StatusPill({ status }: { status: DealStatus | string }) {
  const c = STATUS_COLORS[status] ?? FALLBACK;
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${c.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.bar}`} />
      {status}
    </span>
  );
}

export function statusBar(status: string) {
  return (STATUS_COLORS[status] ?? FALLBACK).bar;
}
export function statusText(status: string) {
  return (STATUS_COLORS[status] ?? FALLBACK).text;
}

// Counts a number up to its value (and smoothly between values after that).
export function useCountUp(value: number, ms = 900) {
  const [shown, setShown] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !Number.isFinite(value)) {
      setShown(value);
      from.current = value;
      return;
    }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = a + (value - a) * eased;
      setShown(v);
      from.current = v;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, ms]);
  return shown;
}

export function CountUpMoney({ value, ms }: { value: number; ms?: number }) {
  const v = useCountUp(value, ms);
  return <>{Math.round(v).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}</>;
}

// Short yellow and white confetti burst (used after SAVE DEAL).
export function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      left: 50 + (Math.random() - 0.5) * 30,
      dx: (Math.random() - 0.5) * 520,
      up: -(140 + Math.random() * 260),
      rot: (Math.random() - 0.5) * 900,
      delay: Math.random() * 120,
      color: ["#f5c518", "#f5c518", "#ffffff", "#4ade80", "#d9ac0c"][i % 5],
      w: 6 + Math.random() * 6,
    })),
  );
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="hj-confetti absolute top-[38%] block rounded-[2px]"
          style={
            {
              left: `${p.left}%`,
              width: p.w,
              height: p.w * 0.45,
              background: p.color,
              animationDelay: `${p.delay}ms`,
              "--dx": `${p.dx}px`,
              "--up": `${p.up}px`,
              "--rot": `${p.rot}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
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

export function HouseIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
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
