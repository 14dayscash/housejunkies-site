import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";
import { ReviewsSection } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Get Your Free Cash Offer`,
  description:
    "Tell us about your house and get a free, no-obligation cash offer from House Junkies within 24 hours. No fees, no repairs, no closing costs.",
  alternates: { canonical: "/get-offer" },
};

// 2026-11-08 overhaul (Dominic): "Get Your FREE Offer" heading sits on top of
// the form, then a thin-bordered "Why Choose Us?" box with our five points,
// the Google + BBB badges, and the House Junkies logo, then the review slider.
const whyUs: [string, string][] = [
  ["No Fees to Sell Your House", "No agent commission, no hidden charges, and the offer itself is always free."],
  ["A Strong Off-Market Offer", "Our own construction crew prices the repairs, so we can pay more than buyers who have to hire the work out."],
  ["Sell As-Is. No Cleanup. No Repairs.", "Leave the house the way it is, along with anything inside you do not want."],
  ["Close in as Little as 7 Days", "Most deals close in 14 days, faster if you need it, or later if you need time to move."],
  ["No Closing Costs", "Escrow, title, and closing costs are on us, so the number we agree on is what you walk away with."],
];

export default function GetOfferPage({
  searchParams,
}: {
  searchParams: { address?: string };
}) {
  const address = searchParams.address ?? "";

  return (
    <div>
      <section className="bg-brand-black px-4 pb-12 pt-8 md:pb-16 md:pt-12">
        <div className="mx-auto max-w-lg">
          <div className="rounded-t-lg bg-white px-6 pb-2 pt-6 text-center">
            <h1 className="text-3xl font-bold text-brand-black md:text-4xl">
              Get Your <span className="underline decoration-2 underline-offset-4">FREE</span> Offer
            </h1>
            <p className="mt-2 text-gray-600">
              A few quick details and we will reach out within 24 hours with a no-obligation cash offer.
            </p>
          </div>
          <div className="[&>form]:rounded-t-none [&>form]:border-t-0 [&>form]:shadow-none">
            <LeadForm sourcePage="/get-offer" initialAddress={address} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="rounded-2xl border border-gray-300 p-6 md:p-10">
          <h2 className="text-center text-2xl font-bold text-brand-black md:text-3xl">Why Choose Us?</h2>
          <ul className="mx-auto mt-8 max-w-xl space-y-5">
            {whyUs.map(([title, body]) => (
              <li key={title} className="flex gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-black">
                    <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="font-bold text-brand-black">{title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-3">
            <a
              href="https://share.google/a8MBePgETXLdYaMqs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[72px] items-center justify-center rounded-lg border border-gray-200 px-2"
            >
              <img src="/images/google-reviews-badge.png" alt="House Junkies Google Reviews, 5 stars" width={400} height={225} className="h-[54px] w-auto" />
            </a>
            <a
              href="https://www.bbb.org/us/ca/visalia/profile/real-estate-investing/house-junkies-inc-1126-850058147/#sealclick"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="flex h-[72px] items-center justify-center rounded-lg border border-gray-200 px-2"
            >
              <img
                src="https://seal-central-northern-western-arizona.bbb.org/seals/blue-seal-160-82-bbb-850058147.png"
                style={{ border: 0 }}
                alt="House Junkies Inc BBB Business Review"
                width={120}
                height={62}
                className="h-[54px] w-auto"
              />
            </a>
          </div>

          <div className="mt-10 flex justify-center">
            <img src="/images/logo-black.png" alt={`${site.name} Inc. logo`} width={346} height={230} className="h-24 w-auto" />
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}
