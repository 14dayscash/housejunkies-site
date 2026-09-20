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
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <div className="text-2xl font-bold text-brand-yellow">{site.stats.homesBought}</div>
              <div className="text-xs text-white/60">Homes bought & renovated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-yellow">{site.stats.sfrAnalyticsVolume}</div>
              <div className="text-xs text-white/60">Transaction volume (SFR Analytics)</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-yellow">{site.legacyRealEstate.agentCount}</div>
              <div className="text-xs text-white/60">Legacy Real Estate agents</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-brand-yellow">{site.stats.yearsInBusiness}</div>
              <div className="text-xs text-white/60">Years in business</div>
            </div>
          </div>
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
            <div className="font-semibold text-brand-black">{site.name} - We Buy</div>
            <p className="mt-1 text-sm text-gray-500">{site.entityAddresses.acquisitions}</p>
            <p className="mt-2 text-sm text-gray-600">
              The acquisitions and investment arm, and the entity ranked {site.stats.sfrAnalyticsRank} in
              Visalia by transaction volume ({site.stats.sfrAnalyticsVolume} across{" "}
              {site.stats.sfrAnalyticsDeals} deals) per {site.stats.sfrAnalyticsSource}. Cash offers
              on any-condition properties, funded entirely in-house with private capital, no bank
              or outside partner to back out and nothing to fall through during underwriting.
              Every offer is built from a real four-number formula (after-repair value, renovation
              cost, holding and closing costs, and margin), not a lowball starting point meant to
              get negotiated up.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-5">
            <div className="font-semibold text-brand-black">House Junkies Construction - We Build</div>
            <p className="mt-1 text-sm text-gray-500">{site.entityAddresses.construction}</p>
            <p className="mt-2 text-sm text-gray-600">
              Our licensed California general contractor crew, {site.licenses.generalContractor},
              bonded and insured. Full renovations, remodels, and ground-up ADU builds across
              Tulare, Kings, Kern, and Fresno counties. Because the crew that prices the rehab is
              the crew that does it, there's nothing left to "discover" during an inspection a week
              before closing.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-5">
            <div className="font-semibold text-brand-black">{site.legacyRealEstate.name} - We Sell</div>
            <p className="mt-1 text-sm text-gray-500">{site.entityAddresses.brokerage}</p>
            <p className="mt-2 text-sm text-gray-600">
              The brokerage arm, {site.legacyRealEstate.dre}, led by {site.people.broker.name},
              Broker of Record, and {site.legacyRealEstate.countyRank.toLowerCase()} with{" "}
              {site.legacyRealEstate.agentCount} agents. Averaging {site.legacyRealEstate.monthlySales}{" "}
              sales and over {site.legacyRealEstate.monthlyVolume} in closed volume per month. Because
              we own a brokerage too, we can tell you what your house would list for and what we'd pay
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
                {(person.phone || person.email) && (
                  <div className="mt-3 space-y-0.5 border-t border-gray-100 pt-3 text-sm">
                    {person.phone && (
                      <p>
                        <a href={`tel:${person.phone.replace(/[^\d]/g, "")}`} className="text-brand-yellow-dark hover:underline">
                          {person.phone}
                        </a>
                      </p>
                    )}
                    {person.email && (
                      <p>
                        <a href={`mailto:${person.email}`} className="text-brand-yellow-dark hover:underline">
                          {person.email}
                        </a>
                      </p>
                    )}
                  </div>
                )}
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
          <li>BBB Rating: {site.stats.bbbRating}</li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-brand-black">Our Locations</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {site.officeLocations.map((loc) => (
            <div key={loc.label} className="rounded-lg border border-gray-200 p-4">
              <div className="text-sm font-semibold text-brand-yellow-dark">{loc.label}</div>
              <p className="mt-1 text-sm text-gray-600">{loc.street}</p>
              <p className="text-sm text-gray-600">{loc.city}, {loc.region} {loc.postalCode}</p>
            </div>
          ))}
        </div>

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

        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
          <iframe
            title={`${site.name} location`}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3214.2749466497953!2d-119.30014460000001!3d36.3298857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80952faa5888361d%3A0x404fb85892fcdb84!2sHouse%20Junkies%20Inc.!5e0!3m2!1sen!2sus!4v1788719427287!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
