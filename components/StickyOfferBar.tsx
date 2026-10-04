"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AddressInput } from "./AddressInput";

// Always-visible header bar: address field + "Get My Offer" button.
// Submitting takes the visitor to /get-offer with the address carried
// over, where the full 5-field form picks up with the address prefilled.
//
// Fully hidden on pages whose own form is already right at the top
// (/get-offer, /contact), since showing it there just doubles up the ask.
//
// On the homepage specifically: hidden while the hero (which has its own
// address+offer widget) is in view, then reappears once you've scrolled
// past it, watching a sentinel element placed at the end of the hero
// section rather than a hardcoded pixel height.
const FULLY_HIDDEN_ON = ["/get-offer", "/contact"];
const SCROLL_REVEAL_ON = ["/"];

export function StickyOfferBar({ hidden = false }: { hidden?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [address, setAddress] = useState("");
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (!SCROLL_REVEAL_ON.includes(pathname)) return;
    setScrolledPastHero(false);
    const sentinel = document.getElementById("hero-end-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolledPastHero(entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  if (hidden) return null;
  if (FULLY_HIDDEN_ON.includes(pathname)) return null;
  if (SCROLL_REVEAL_ON.includes(pathname) && !scrolledPastHero) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    router.push(`/get-offer?address=${encodeURIComponent(address.trim())}`);
  }

  return (
    <div className="border-b border-white/10 bg-brand-black px-4 py-2">
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-6xl items-center gap-2">
        <AddressInput
          id="sticky_address"
          name="address"
          placeholder="Enter your property address"
          className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 focus:bg-white focus:text-brand-black"
          onChange={setAddress}
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-md bg-brand-yellow px-4 py-2 text-sm font-bold text-black hover:bg-brand-yellow-dark"
        >
          Get My Offer
        </button>
      </form>
    </div>
  );
}
