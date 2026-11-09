import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero, SectionHeader, CompareMini, ReviewsSection, btnYellow } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `How We Calculate Your Offer`,
  description: "A transparent look at the four numbers behind every House Junkies cash offer, and how it compares to listing your house.",
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
      <PageHero
        eyebrow="No Black Box"
        title="How We Calculate Your Offer"
        sub="Most cash-offer companies won't show you this. We will, because our number doesn't move after you sign, and this is why."
      />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeader
          eyebrow="The Four Numbers"
          title="Every Offer Comes From Four Numbers"
          sub="We'll walk through each one with you on the phone before you ever sign anything."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <li
              key={s.label}
              className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-yellow text-lg font-bold text-black">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-brand-black">{s.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-brand-black p-6 text-center text-white md:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">The Math, in One Line</p>
          <p className="mt-3 text-base font-semibold leading-relaxed md:text-lg">
            Offer = After-Repair Value <span className="text-brand-yellow">−</span> Renovation Cost{" "}
            <span className="text-brand-yellow">−</span> Holding &amp; Closing Costs{" "}
            <span className="text-brand-yellow">−</span> Our Margin
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-gray-600">
          <p>
            Because our renovation numbers come from the crew that actually does the work, and because we fund every
            deal ourselves there is no bank or outside partner to back out, there&apos;s nothing left to
            &quot;discover&quot; during an inspection a week before closing.{" "}
            <strong className="text-brand-black">The number we give you on day one is the number you get paid.</strong>
          </p>
          <p className="text-sm text-gray-500">
            One more thing worth knowing: because {site.name} is part of{" "}
            <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
              {site.parentOrganization}
            </Link>
            , which also includes{" "}
            <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
              {site.legacyRealEstate.name}
            </Link>{" "}
            ({site.legacyRealEstate.dre}), we can pull what your house would realistically list for on the open market
            and what we&apos;d pay off-market in the same conversation. If listing nets you more, we&apos;ll tell you.
          </p>
          <Link href="/get-offer" className={`${btnYellow} mt-2`}>
            Get My Cash Offer <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CompareMini />
      <ReviewsSection gray={false} />
    </div>
  );
}
