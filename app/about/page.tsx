import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.name} | Visalia's #1 Investment Group`,
  description: `Meet the team behind ${site.name}: acquisitions, construction, and brokerage under one roof in Visalia, CA. Ranked #1 by volume in Visalia per SFR Analytics.`,
  alternates: { canonical: "/about" },
};

const team = [
  site.people.ceo,
  site.people.ops,
  site.people.broker,
  site.people.projectManager,
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">
            {site.stats.sfrAnalyticsRank} Investment Group in Visalia, per {site.stats.sfrAnalyticsSource}
          </p>
          <h1 className="mt-2 text-4xl font-bold">About {site.name}</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            {site.name} is part of {site.parentOrganization}, a vertically integrated real estate
            operation based in Visalia with {site.stats.yearsInBusiness} years in business and a{" "}
            {site.stats.bbbRating} BBB rating. We buy houses directly with private capital, renovate
            them with our own licensed construction crew, and resell through our own licensed
            brokerage. No banks, no outside brokers, no out-of-town contractors, every deal
            controlled from acquisition to resale.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">What "Vertically Integrated" Actually Means</h2>
        <p className="mt-4 text-gray-600">
          Most companies that offer to buy your house for cash are a lead form: they get your info,
          then shop the deal to an investor they've never told you about, or wholesale it to whoever
          bids highest. That middleman step is where sellers lose money and control.
        </p>
        <p className="mt-4 text-gray-600">
          {site.parentOrganization} is three companies, not one, and every one of them plays a
          distinct role. Nothing gets outsourced to a stranger.
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-gray-200 p-5">
            <div className="font-semibold text-brand-black">{site.name} — We Buy</div>
            <p className="mt-1 text-sm text-gray-500">{site.entityAddresses.acquisitions}</p>
            <p className="mt-2 text-sm text-gray-600">
              The acquisitions and investment arm. Cash offers on any-condition properties,
              funded entirely in-house, no bank or outside partner who can back out.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-5">
            <div className="font-semibold text-brand-black">House Junkies Construction — We Build</div>
            <p className="mt-1 text-sm text-gray-500">{site.entityAddresses.construction}</p>
            <p className="mt-2 text-sm text-gray-600">
              Our licensed California general contractor crew, {site.licenses.generalContractor},
              bonded and insured. Full renovations, remodels, and ground-up ADU builds. Because the
              crew that prices the rehab is the crew that does it, there's nothing left to
              "discover" during an inspection a week before closing.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-5">
            <div className="font-semibold text-brand-black">{site.legacyRealEstate.name} — We Sell</div>
            <p className="mt-1 text-sm text-gray-500">{site.entityAddresses.brokerage}</p>
            <p className="mt-2 text-sm text-gray-600">
              The brokerage arm, {site.legacyRealEstate.dre}, led by {site.people.broker.name},
              Broker of Record. Averaging {site.legacyRealEstate.monthlySales} sales and over{" "}
              {site.legacyRealEstate.monthlyVolume} in closed volume per month. Because we own a
              brokerage too, we can tell you what your house would list for and what we'd pay
              off-market in the same conversation, and if listing nets you more, we'll say so.
            </p>
          </div>
        </div>
        <p className="mt-4 text-gray-600">
          Acquire, renovate, sell, repeat. Every stage happens inside the same company, which is
          also why {site.name} is ranked {site.stats.sfrAnalyticsRank} in Visalia by transaction
          volume ({site.stats.sfrAnalyticsVolume} across {site.stats.sfrAnalyticsDeals} deals)
          according to {site.stats.sfrAnalyticsSource}, an independent third-party market data
          source, not a number we made up for a website.
        </p>
      </section>


      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h2 className="text-2xl font-bold text-brand-black">Leadership Team</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {team.map((person) => (
              <div key={person.name} className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="font-semibold text-brand-black">{person.name}</div>
                <div className="text-sm font-medium text-brand-yellow-dark">{person.title}</div>
                <p className="mt-2 text-sm text-gray-600">{person.bio}</p>
              </div>
            ))}
          </div>
          {/* TODO: real headshots once photos are ready to add */}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">Licenses & Standing</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>General Contractor: {site.licenses.generalContractor}</li>
          <li>Brokerage: {site.licenses.brokerage}</li>
          <li>BBB Rating: {site.stats.bbbRating} (see our profile for current standing)</li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-brand-black">Get In Touch</h2>
        <div className="mt-4 space-y-1 text-gray-600">
          <p>{site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}</p>
          <p>
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">{site.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} className="text-brand-yellow-dark hover:underline">{site.email}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
