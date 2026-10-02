"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddressInput } from "./AddressInput";

// The homepage's hero version of the same address-capture idea as the
// sticky bar, just bigger/more prominent, so the homepage doesn't need the
// full 5-field form taking up space. Submits to /get-offer the same way.

export function HeroOfferForm() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) return;
    router.push(`/get-offer?address=${encodeURIComponent(address.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
      <label htmlFor="hero_address" className="block text-sm font-medium text-gray-700">
        Property Address
      </label>
      <AddressInput
        id="hero_address"
        name="address"
        required
        placeholder="123 Main St, Visalia, CA"
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-3 text-brand-black"
        onChange={setAddress}
      />
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-brand-yellow px-4 py-3 font-bold text-black hover:bg-brand-yellow-dark"
      >
        Get My Offer
      </button>
      <p className="mt-3 text-center text-xs text-gray-500">No obligation. No fees. We respond within 24 hours.</p>
    </form>
  );
}
