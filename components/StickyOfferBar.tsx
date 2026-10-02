"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddressInput } from "./AddressInput";

// Always-visible header bar: address field + "Get My Offer" button. Does
// NOT collapse or hide on scroll, per Dominic's instruction. Submitting
// takes the visitor to /get-offer with the address carried over as a query
// param, where the full 5-field form picks up with the address prefilled.

export function StickyOfferBar() {
  const router = useRouter();
  const [address, setAddress] = useState("");

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
