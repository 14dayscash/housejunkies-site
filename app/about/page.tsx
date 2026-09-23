import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.name} | Visalia's #1 Investment Group`,
  description: `Meet the team behind ${site.name}: acquisitions, construction, and brokerage under one roof in Visalia, CA. Ranked #1 by volume in Visalia per SFR Analytics.`,
  alternates: { canonical: "/about" },
};

type TeamMember = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  phone: string | null;
  email: string | null;
  photo: string | null;
};

const team: TeamMember[] = [
  { ...site.people.ceo, slug: "abel-ulloa", photo: "/images/team/abel.png" },
  { ...site.people.ops, slug: "dominic-mcclelland", photo: "/images/team/dominic.png" },
  { ...site.people.broker, slug: "jenny-madrid", photo: "/images/team/jenny.png" },
  { ...site.people.projectManager, slug: "omar-ayon", photo: "/images/team/omar-tools.png" },
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
            operation based in Visalia with {site.stats.yearsInBusiness} years in business, BBB
            Accredited with an {site.stats.bbbRating} rating. We buy houses directly with private
            capital, renovate
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

      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Image
            src="/images/team/team-photo.png"
            alt={`The ${site.name} team`}
            width={1535}
            height={1024}
            className="w-full object-cover"
          />
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
            <div className="flex items-center gap-3">
              <Image src="/images/logo-black.png" alt={site.name} width={40} height={40} className="h-10 w-10 object-contain" />
              <div className="font-semibold text-brand-black">{site.name} - We Buy</div>
            </div>
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
            <div className="flex items-center gap-3">
              <Image src="/images/logos/construction.png" alt="House Junkies Construction" width={40} height={40} className="h-10 w-10 rounded-full object-contain" />
              <div className="font-semibold text-brand-black">House Junkies Construction - We Build</div>
            </div>
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
            <div className="flex items-center gap-3">
              <Image src="/images/logos/legacy.png" alt={site.legacyRealEstate.name} width={40} height={40} className="h-10 w-10 rounded-full object-contain" />
              <div className="font-semibold text-brand-black">{site.legacyRealEstate.name} - We Sell</div>
            </div>
            <p className="mt-1 text-sm text-gray-500">{site.entityAddresses.brokerage}</p>
            <p className="mt-2 text-sm text-gray-600">
              The brokerage arm, {site.legacyRealEstate.dre}, led by {site.people.broker.name},
              Broker of Record, and {site.legacyRealEstate.countyRank} with{" "}
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
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl font-bold text-brand-black">Leadership Team</h2>
            <Link href="/team" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
              Full team page →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {team.map((person) => (
              <div key={person.name} className="rounded-lg border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={person.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 flex-shrink-0 rounded-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-brand-black text-lg font-bold text-brand-yellow">
                      {person.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-brand-black">{person.name}</div>
                    <div className="text-sm font-medium text-brand-yellow-dark">{person.title}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">{person.bio}</p>
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
                <Link
                  href={`/team/${person.slug}`}
                  className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline"
                >
                  View full profile →
                </Link>
              </div>
            ))}
          </div>
          {/* All four team members now have real photos (Omar's is a tools graphic, not a headshot, per his preference) */}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">Licenses & Standing</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>General Contractor: {site.licenses.generalContractor}</li>
          <li>Brokerage: {site.licenses.brokerage}</li>
          <li>BBB: Accredited, {site.stats.bbbRating} Rating</li>
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

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { src: "/images/office/main-st-exterior.jpg", alt: "House Junkies Main Street office", w: 1600, h: 1067 },
            { src: "/images/office/dorothea-exterior.jpg", alt: "Dorothea Ave office", w: 1600, h: 1200 },
            { src: "/images/office/office-interior.jpg", alt: "Office interior", w: 1494, h: 1600 },
            { src: "/images/office/office-door.jpg", alt: "House Junkies office door", w: 1600, h: 1600 },
            { src: "/images/office/marketing-table.jpg", alt: "House Junkies marketing materials", w: 1600, h: 1200 },
            { src: "/images/office/event-booth.jpg", alt: "House Junkies at a community event", w: 1179, h: 728 },
          ].map((img) => (
            <div key={img.src} className="overflow-hidden rounded-lg border border-gray-200">
              <Image src={img.src} alt={img.alt} width={img.w} height={img.h} className="aspect-square w-full object-cover" />
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
