import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `How We Calculate Your Offer | ${site.name}`,
  description: "A transparent look at the four numbers behind every House Junkies cash offer.",
  alternates: { canonical: "/how-we-calculate-your-offer" },
};

const steps = [
  {
    label: "After-Repair Value (ARV)",
    body: "What your house would sell for once it's fully renovated, based on closed comparable sales in your neighborhood, not asking prices.",
  },
  {
    label: "Renovation Cost",
    body: `A real construction estimate from our own crew, ${site.licenses.generalContractor}, not a guess from someone who has never repaired a house. We know what the work costs because we're the ones doing it.`,
  },
  {
    label: "Holding & Closing Costs",
    body: "Property taxes, insurance, utilities, and closing costs during the time we own and renovate the property before it resells.",
  },
  {
    label: "Our Margin",
    body: "What we need to make on the project for it to make sense as a business, same as any company that has to fund, renovate, and carry a property before resale.",
  },
];

export default function OfferCalcPage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">How We Calculate Your Offer</h1>
          <p className="mt-4 text-white/70">
            Most cash-offer companies won't show you this. We will, because our
            number doesn't move after you sign, and this is why.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-gray-600">
          Every offer we make comes from four numbers. We'll walk through each one
          with you on the phone before you ever sign anything.
        </p>
        <div className="mt-8 space-y-6">
          {steps.map((s, i) => (
            <div key={s.label} className="flex gap-4 rounded-lg border border-gray-200 p-5">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-yellow font-bold text-black">
                {i + 1}
              </div>
              <div>
                <div className="font-semibold text-brand-black">{s.label}</div>
                <p className="mt-1 text-sm text-gray-600">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-gray-50 p-6">
          <p className="font-semibold text-brand-black">The math, in one line:</p>
          <p className="mt-2 font-mono text-sm text-gray-700">
            Offer = After-Repair Value − Renovation Cost − Holding &amp; Closing Costs − Our Margin
          </p>
        </div>

        <p className="mt-8 text-gray-600">
          Because our renovation numbers come from the crew that actually does the
          work, and because we fund every deal ourselves there is no bank or
          outside partner to back out, there's nothing left to "discover" during
          an inspection a week before closing. The number we give you on day one
          is the number you get paid.
        </p>

        <p className="mt-6 text-sm text-gray-500">
          One more thing worth knowing: because {site.name} is part of{" "}
          {site.parentOrganization}, which also includes {site.legacyRealEstate.name} (
          {site.legacyRealEstate.dre}), we can pull what your house would realistically
          list for on the open market and what we'd pay off-market in the same
          conversation. If listing nets you more, we'll tell you.
        </p>

        <Link href="/compare" className="mt-6 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          See a full side-by-side comparison →
        </Link>
      </section>
    </div>
  );
}
