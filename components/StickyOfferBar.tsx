"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AddressInput } from "./AddressInput";

// Address + "Get My Offer" form that follows the visitor down the page.
// Submitting takes them to /get-offer with the address carried over.
//
// Where it shows (Dominic, 2026-11-07):
// - Desktop (lg and up): it REPLACES the middle of the black header (the nav
//   links), between the logo and the phone button. See Header.tsx.
// - Phones and tablets: a floating white card just under the header.
// Same design in both places: white card, slow pulsing yellow glow.
//
// Fully hidden on pages whose own form is already at the top (/get-offer,
// /contact). On the homepage it stays hidden while the hero (which has its
// own offer card) is in view, then appears once you scroll past it, using a
// sentinel element at the end of the hero.
const FULLY_HIDDEN_ON = ["/get-offer", "/contact"];
const SCROLL_REVEAL_ON = ["/"];

export function useShowOffer() {
  const pathname = usePathname();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (!SCROLL_REVEAL_ON.includes(pathname)) return;
    setScrolledPastHero(false);
    const sentinel = document.getElementById("hero-end-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolledPastHero(entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  if (FULLY_HIDDEN_ON.includes(pathname)) return false;
  if (SCROLL_REVEAL_ON.includes(pathname) && !scrolledPastHero) return false;
  return true;
}

export function OfferForm({ id, className = "" }: { id: string; className?: string }) {
  const router = useRouter();
  const [address, setAddress] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    router.push(`/get-offer?address=${encodeURIComponent(address.trim())}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`hj-offer-glow hj-offer-drop flex items-center gap-2 rounded-xl border border-brand-yellow/60 bg-white p-1.5 sm:p-2 ${className}`}
    >
      <AddressInput
        id={id}
        name="address"
        placeholder="Enter your property address"
        containerClassName="min-w-0 flex-1"
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-brand-black placeholder-gray-400 focus:border-brand-yellow-dark focus:outline-none sm:py-2.5 sm:text-base"
        onChange={setAddress}
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-lg bg-brand-yellow px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-brand-yellow-dark sm:px-6 sm:py-2.5 sm:text-base"
      >
        Get My Offer
      </button>
    </form>
  );
}

// Phones and tablets only: floating card under the header. The outer wrapper
// is transparent and ignores clicks, so the page behind the gap stays usable.
export function StickyOfferBar({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none px-3 pt-2 sm:px-4 sm:pt-3 lg:hidden">
      <OfferForm id="sticky_address" className="pointer-events-auto mx-auto max-w-3xl" />
    </div>
  );
}
