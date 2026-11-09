import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero, SectionHeader, CompareCards, ReviewsSection, btnYellow, linkCls } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Cash Offer vs. Listing`,
  description: "A real, honest side-by-side of what selling to House Junkies looks like versus listing your house with an agent.",
  alternates: { canonical: "/compare" },
};

// 2026-11-08 overhaul: the old table rows, as check vs X cards like the
// homepage mini comparison, with the full detail kept.
const usPoints: [string, string][] = [
  ["Timeline to Close: You Choose", "Most deals close in 14 days, as fast as 7 if you need to, or later if you need time to move."],
  ["Repairs Required: None", "Sold as-is. No repairs, no cleaning, no property clean-out."],
  ["Showings: None", "One walkthrough with us. No open houses, no strangers walking through on weekends."],
  ["Agent Commission: None", "You are selling directly to us, so there is no commission coming out of your sale."],
  ["Closing Costs: Covered by House Junkies", "Escrow, title, and closing costs are on us, so there are no surprises at the closing table."],
  ["Financing Risk: None", "We buy with our own capital, so there is no buyer's loan that can fall through."],
  ["Certainty of Sale: Firm Offer Once Accepted", "Our repair numbers come from our own crew, so there is nothing left to renegotiate after you sign."],
];
const listingPoints: [string, string][] = [
  ["Timeline: Typically 60 to 90+ Days", "That clock starts after an accepted offer, and repair time before listing comes on top of it."],
  ["Repairs: Often Required", "Repairs are often required by the buyer's lender or negotiated after the inspection."],
  ["Showings: Multiple, Ongoing", "Showings and open houses keep going on an ongoing basis until the house sells."],
  ["Agent Commission: Typically 5-6%", "Usually 5-6% of the sale price, split between the agents, plus marketing and other costs."],
  ["Closing Costs: Typically Paid by the Seller", "Title, escrow, transfer tax, and any repair credits come out of your proceeds."],
  ["Financing Risk: Real", "If the buyer's loan falls through, the process restarts and you are back on the market."],
  ["Certainty of Sale: Not Until Closing", "Deals can fall out of escrow over inspection, appraisal, or financing issues."],
];

export default function ComparePage() {
  return (
    <div>
      <PageHero
        eyebrow="Cash Offer vs. Listing"
        title="Cash Offer vs. Listing"
        sub="Selling for cash isn't automatically the right move for every seller, and we'll tell you that on the phone. Here's an honest look at the actual tradeoff."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeader
          eyebrow="Side by Side"
          title="Why Sell to House Junkies Instead of a Market Listing"
          sub="Listing will get you top dollar with the right timing and a house that is market ready. For homes that need work, here is how the options actually stack up."
        />
        <div className="mt-10">
          <CompareCards us={usPoints} listing={listingPoints} />
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          <SectionHeader
            eyebrow="Real Numbers"
            title="A Worked Example"
            sub="Say a house would sell for $320,000 fully repaired and listed on the open market. Here's roughly how the two paths compare, using typical Central Valley numbers:"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-500">Listing With an Agent</h3>
              <dl className="mt-5 divide-y divide-gray-100 text-sm">
                {[
                  ["Repaired Sale Price", "$320,000"],
                  ["Agent Commission (5-6%)", "-$17,600"],
                  ["Seller-Paid Closing Costs", "-$3,200"],
                  ["Repairs to Get It Market-Ready", "-$15,000 to $30,000+"],
                  ["Time to Close", "60 to 90+ Days, Plus Repair Time"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-gray-600">{k}</dt>
                    <dd className="text-right font-semibold text-brand-black">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl border-2 border-brand-yellow bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:p-8">
              <h3 className="text-xl font-bold text-brand-black">Selling to {site.name}</h3>
              <dl className="mt-5 divide-y divide-gray-100 text-sm">
                {[
                  ["Repairs", "Accounted for in the Offer Upfront"],
                  ["Closing Costs", "$0, We Cover Them"],
                  ["Commission", "$0"],
                  ["Repairs You Pay For", "$0, Sold As-Is"],
                  ["Time to Close", "14 Days, as Fast as 7, You Choose"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start justify-between gap-4 py-3">
                    <dt className="text-gray-600">{k}</dt>
                    <dd className="text-right font-semibold text-brand-black">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-500">
            The exact numbers depend on your specific property. See{" "}
            <Link href="/how-we-calculate-your-offer" className="font-semibold text-brand-yellow-dark hover:underline">
              how we calculate your offer
            </Link>{" "}
            for the real formula, or call{" "}
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">
              {site.phone}
            </a>{" "}
            and we&apos;ll run the numbers on your house specifically.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 text-center md:py-20">
        <SectionHeader eyebrow="The Honest Answer" title="When Listing Might Net You More" />
        <p className="mt-4 leading-relaxed text-gray-600">
          If your house is in good condition, you&apos;re not on a tight timeline, and you can afford to wait through
          showings and a financed buyer&apos;s process, listing on the open market can net a higher final price.
          Because {site.name} is part of{" "}
          <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
            {site.parentOrganization}
          </Link>
          , which also owns{" "}
          <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
            {site.legacyRealEstate.name}
          </Link>
          , we can tell you honestly which path fits your situation, even if that means listing instead of selling to
          us directly.
        </p>
        <Link href="/get-offer" className={`${btnYellow} mt-8`}>
          Get My Cash Offer <span aria-hidden="true">→</span>
        </Link>
        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link href="/faq" className={linkCls}>
            Read Our FAQ →
          </Link>
          <Link href="/how-it-works" className={linkCls}>
            See How It Works →
          </Link>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}
