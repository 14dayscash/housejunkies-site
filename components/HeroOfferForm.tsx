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
  const [missing, setMissing] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address.trim()) {
      setMissing(true);
      return;
    }
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
        containerClassName="mt-1"
        className="w-full rounded-md border border-gray-300 px-3 py-3 text-brand-black"
        onChange={(v) => {
          setAddress(v);
          if (v.trim()) setMissing(false);
        }}
      />
      {missing && <p className="mt-2 text-sm text-red-600">Please enter the property address.</p>}
      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-brand-yellow px-4 py-3 font-bold text-black hover:bg-brand-yellow-dark"
      >
        Get My Offer
      </button>
      <p className="mt-3 text-center text-xs text-gray-500">No obligation. No fees. We respond within 24 hours.</p>

      {/* BBB seal + Google 5-star badge, inside the card, same idea as
          Home Helpers' hero. BBB seal stays a plain hotlinked <img> since
          it must be served live from BBB's own servers, not cached. */}
      <div className="mt-5 flex items-center justify-center gap-5 border-t border-gray-100 pt-5">
        <a
          href="https://www.bbb.org/us/ca/visalia/profile/real-estate-investing/house-junkies-inc-1126-850058147/#sealclick"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <img
            src="https://seal-central-northern-western-arizona.bbb.org/seals/blue-seal-160-82-bbb-850058147.png"
            style={{ border: 0 }}
            alt="House Junkies Inc BBB Business Review"
            width={120}
            height={62}
          />
        </a>
        <img
          src="/images/google-5-star-badge.png"
          alt="5-star rated on Google"
          width={85}
          height={60}
          className="h-[60px] w-auto"
        />
      </div>
    </form>
  );
}
