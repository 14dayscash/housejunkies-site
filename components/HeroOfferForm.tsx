"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddressInput } from "./AddressInput";

// Homepage hero card (layout modeled on Dominic's 2026-11-06 mockup):
// headline, sub-headline, address field with a pin, Get My Offer button,
// three checkmarks, then the Google and BBB badges. Submits the address to
// /get-offer, same as the sticky bar. The headline is the page's H1.

const checks = ["No Repairs", "No Closing Costs", "No Commissions"];

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
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[460px] rounded-2xl bg-white p-6 text-brand-black shadow-[0_20px_40px_rgba(0,0,0,0.15)] sm:p-8 md:p-9"
    >
      <h1 className="text-[28px] font-bold leading-tight md:text-[32px]">
        Sell Your Home Fast in the Central Valley!
      </h1>
      <p className="mt-2 text-base text-gray-600 md:text-[17px]">Get Your Free Offer in {"<24"} Hours</p>

      <label htmlFor="hero_address" className="sr-only">
        Property address
      </label>
      <div className="relative mt-5">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <AddressInput
          id="hero_address"
          name="address"
          required
          placeholder="Enter your property address"
          className="h-[52px] w-full rounded-lg border border-gray-300 pl-11 pr-3 text-brand-black placeholder:text-gray-400 focus:border-brand-yellow-dark focus:outline-none focus:ring-2 focus:ring-brand-yellow/40"
          onChange={(v) => {
            setAddress(v);
            if (v.trim()) setMissing(false);
          }}
        />
      </div>
      {missing && <p className="mt-2 text-sm text-red-600">Please enter your property address.</p>}

      <button
        type="submit"
        className="mt-4 h-[56px] w-full rounded-lg bg-brand-yellow text-lg font-bold text-black transition-colors hover:bg-brand-yellow-dark"
      >
        Get My Offer
      </button>

      <ul className="mt-4 flex flex-wrap items-center justify-center gap-y-1 text-[13px] font-medium text-gray-700 sm:flex-nowrap sm:justify-between">
        {checks.map((c, i) => (
          <li
            key={c}
            className={`flex items-center gap-1 whitespace-nowrap px-2 py-0.5 sm:px-0 ${
              i > 0 ? "sm:border-l sm:border-gray-300 sm:pl-3" : ""
            }`}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-brand-yellow-dark">
              <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {c}
          </li>
        ))}
      </ul>

      {/* Google 5-star badge left, BBB seal right. The BBB seal stays a plain
          hotlinked <img> since it must be served live from BBB's own servers. */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="flex h-[76px] items-center justify-center rounded-lg border border-gray-200 px-2">
          <img
            src="/images/google-5-star-badge.png"
            alt="5-star rated on Google"
            width={85}
            height={60}
            className="h-[56px] w-auto"
          />
        </div>
        <a
          href="https://www.bbb.org/us/ca/visalia/profile/real-estate-investing/house-junkies-inc-1126-850058147/#sealclick"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="flex h-[76px] items-center justify-center rounded-lg border border-gray-200 px-2"
        >
          <img
            src="https://seal-central-northern-western-arizona.bbb.org/seals/blue-seal-160-82-bbb-850058147.png"
            style={{ border: 0 }}
            alt="House Junkies Inc BBB Business Review"
            width={120}
            height={62}
            className="h-[56px] w-auto"
          />
        </a>
      </div>
    </form>
  );
}
