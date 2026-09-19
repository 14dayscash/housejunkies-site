import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `How We Calculate Your Offer | ${site.name}`,
  description: "A transparent look at how House Junkies arrives at a cash offer.",
  alternates: { canonical: "/how-we-calculate-your-offer" },
};

export default function OfferCalcPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">How We Calculate Your Offer</h1>
      <p className="mt-4 text-gray-600">
        {/* TODO: Dominic to fill in the actual formula/worked example — the SEO report
            flags this as the single best trust asset in the category, since no
            competitor shows their math. Don't publish a generic placeholder formula
            here, get the real one from Dominic before this page goes live. */}
        We're building out a full worked example here, with the real formula we use:
        after-repair value, minus estimated repair costs, minus our minimum margin,
        minus closing costs. In the meantime, call us and we'll walk through it on
        the phone.
      </p>
    </div>
  );
}
