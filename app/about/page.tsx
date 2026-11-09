import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHero, SectionHeader, ReviewsSection, linkCls } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `About House Junkies | Locally Owned Visalia Home Buyer`,
  description: `Meet the team behind ${site.name}: acquisitions, construction, and brokerage under one roof in Visalia, CA. Ranked #1 in Visalia by SFR Analytics.`,
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

// 2026-11-08 overhaul: same facts, plainer words, less about us and more
// about what it means for a seller. AI-generated team photo removed. Old SFR
// dollar/deal numbers dropped (they have gone up), timeline updated to
// 14 days standard, as fast as 7.
const companies = [
  {
    logo: "/images/logo-black.png",
    name: site.name,
    role: "We Buy",
    credential: `${site.stats.sfrAnalyticsRank} Home Buyer in Visalia`,
    address: site.entityAddresses.acquisitions,
    body: `The acquisitions side. We make cash offers on houses in any condition, close with our own capital, and never have a bank approval to wait on or a loan that can fall through. Every offer comes from the same four numbers: after-repair value, renovation cost, holding and closing costs, and our margin. No lowball starting point meant to get negotiated up.`,
    link: { href: "/how-we-calculate-your-offer", label: "How We Calculate Your Offer →" },
  },
  {
    logo: "/images/logos/construction.png",
    name: "House Junkies Construction",
    role: "We Fix",
    credential: site.licenses.generalContractor,
    address: site.entityAddresses.construction,
    body: `Our licensed California general contractor crew, bonded and insured. Full renovations, remodels, and ground-up ADU builds across Tulare, Kings, Kern, and Fresno counties. Because the crew that prices the repairs is the crew that does them, there is nothing left to "discover" during an inspection a week before closing.`,
    link: { href: "/construction", label: "Construction & Remodeling Services →" },
  },
  {
    logo: "/images/logos/legacy.png",
    name: site.legacyRealEstate.name,
    role: "We List",
    credential: site.licenses.brokerage,
    address: site.entityAddresses.brokerage,
    body: `Our brokerage, led by Broker of Record ${site.people.broker.name}, and ${site.legacyRealEstate.countyRank} with ${site.legacyRealEstate.agentCount} agents, averaging ${site.legacyRealEstate.monthlySales} sales and over ${site.legacyRealEstate.monthlyVolume} in closed volume per month. Legacy lists and sells the houses we renovate, and works the Central Valley market every day, which is where the numbers behind our offers come from.`,
    link: { href: "/buy", label: "Property for Sale →" },
  },
];

const mapsHref = (addr: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title={`About ${site.name}`}
        sub={`${site.name} is a locally owned cash home buyer in Visalia and part of ${site.parentOrganization}. We buy houses as-is, fix them with our own licensed construction crew, and sell them through our own brokerage. ${site.stats.yearsInBusiness} years in business and BBB Accredited with an ${site.stats.bbbRating} rating.`}
      />

      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-1 px-2 py-4 text-center sm:gap-4 sm:px-4 md:gap-6 md:py-10">
          {[
            [site.stats.homesBought, "Homes Bought"],
            [site.stats.yearsInBusiness, "Years in Business"],
            [site.stats.bbbRating, "BBB Rating"],
            [site.stats.sfrAnalyticsRank, "Investor in Visalia"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-xl font-bold leading-tight text-brand-black sm:text-3xl">{n}</div>
              <div className="mt-0.5 text-[10px] leading-tight text-gray-500 sm:mt-1 sm:text-sm">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeader
          eyebrow="One Company, Start to Finish"
          title="Three Companies, One Team"
          sub={`A lot of companies that offer to buy your house for cash are really a lead form. They take your info and pass the deal to an investor you never meet. ${site.parentOrganization} is three companies, each with its own job, so nothing about your sale gets handed off to a stranger.`}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {companies.map((c) => (
            <div key={c.name} className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-1.5">
                  <img src={c.logo} alt={`${c.name} logo`} className="h-full w-full object-contain" loading="lazy" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-brand-black">{c.role}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{c.name}</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">{c.body}</p>
              <div className="mt-5 border-t border-gray-100 pt-4 text-sm">
                <p className="font-bold text-brand-black">{c.credential}</p>
                <a
                  href={mapsHref(c.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-brand-yellow-dark"
                >
                  {c.address}
                </a>
                <Link href={c.link.href} className={`mt-3 block ${linkCls}`}>
                  {c.link.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-500">
          Buy, fix, sell, repeat. Every stage happens inside the same company. That is a big part of why{" "}
          <a
            href="https://sfranalytics.com/investors/ca/visalia-ca"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gray-400 underline-offset-2 hover:text-brand-yellow-dark"
          >
            SFRAnalytics.com
          </a>
          , an independent third-party data source, ranks {site.name} {site.stats.sfrAnalyticsRank} in Visalia by
          transactions and volume.
        </p>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <SectionHeader eyebrow="The People" title="Leadership Team" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {team.map((person) => (
              <div key={person.name} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-4">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={person.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 flex-shrink-0 rounded-full object-cover object-top ring-2 ring-brand-yellow"
                    />
                  ) : (
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-brand-black text-lg font-bold text-brand-yellow">
                      {person.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                  )}
                  <div>
                    <div className="text-lg font-bold text-brand-black">{person.name}</div>
                    <div className="text-sm font-semibold text-brand-yellow-dark">{person.title}</div>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">{person.bio}</p>
                {(person.phone || person.email) && (
                  <div className="mt-4 space-y-0.5 border-t border-gray-100 pt-3 text-sm">
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
                <Link href={`/team/${person.slug}`} className={`mt-3 inline-block text-sm ${linkCls}`}>
                  View Full Profile →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/team" className={`text-sm ${linkCls}`}>
              Meet the Whole Team →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeader
          eyebrow="Visit in Person"
          title="Our Offices"
          sub={`Real offices you can walk into, ${site.hours.weekday}.`}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.officeLocations.map((loc) => (
            <a
              key={loc.label}
              href={mapsHref(`${loc.street}, ${loc.city}, ${loc.region} ${loc.postalCode}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-5 text-center shadow-sm hover:border-brand-yellow-dark"
            >
              <div className="text-sm font-bold text-brand-black">{loc.label}</div>
              <p className="mt-1 text-sm text-gray-600">{loc.street}</p>
              <p className="text-sm text-gray-600">
                {loc.city}, {loc.region} {loc.postalCode}
              </p>
            </a>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { src: "/images/office/main-st-exterior.jpg", alt: "House Junkies Main Street office", w: 1600, h: 1067 },
            { src: "/images/office/dorothea-exterior.jpg", alt: "Dorothea Ave office", w: 1600, h: 1200 },
            { src: "/images/office/office-interior.jpg", alt: "Office interior", w: 1494, h: 1600 },
            { src: "/images/office/office-door.jpg", alt: "House Junkies office door", w: 1600, h: 1600 },
            { src: "/images/office/marketing-table.jpg", alt: "House Junkies marketing materials", w: 1600, h: 1200 },
            { src: "/images/office/event-booth.jpg", alt: "House Junkies at a community event", w: 1179, h: 728 },
          ].map((img) => (
            <div key={img.src} className="overflow-hidden rounded-xl border border-gray-200">
              <Image src={img.src} alt={img.alt} width={img.w} height={img.h} className="aspect-square w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
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
        <div className="mt-6 text-center text-gray-600">
          <p>
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">
              {site.phone}
            </a>
            {" · "}
            <a href={`mailto:${site.email}`} className="text-brand-yellow-dark hover:underline">
              {site.email}
            </a>
          </p>
          <p className="mt-1 text-sm">
            Licenses: General Contractor {site.licenses.generalContractor} · Brokerage {site.licenses.brokerage} · BBB
            Accredited, {site.stats.bbbRating} Rating
          </p>
        </div>
      </section>

      {/* Structured entity summary, written for AI assistants and search
          engines to cite accurately, alongside llms.txt and the JSON-LD. */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Entity Summary · {site.name}</p>
          <h2 className="mt-2 text-xl font-bold text-brand-black">Who buys houses for cash in Visalia?</h2>
          <p className="mt-4 border-l-4 border-brand-yellow/40 pl-4 text-gray-600">
            {site.name} is a Visalia, CA cash home buyer, part of {site.parentOrganization}, ranked{" "}
            {site.stats.sfrAnalyticsRank} in Visalia by transactions and volume per SFRAnalytics.com. BBB Accredited
            with an {site.stats.bbbRating} rating, in business {site.stats.yearsInBusiness} years. Buys houses as-is,
            any condition, with no fees or commissions, and usually closes in 14 days (as fast as 7) using its own
            capital, with no bank financing involved.
          </p>
          <div className="mt-8 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            <div><span className="font-semibold text-brand-black">Entity Type:</span> <span className="text-gray-600">Real Estate Investment Company</span></div>
            <div><span className="font-semibold text-brand-black">In Business:</span> <span className="text-gray-600">{site.stats.yearsInBusiness} years</span></div>
            <div><span className="font-semibold text-brand-black">BBB:</span> <span className="text-gray-600">Accredited, {site.stats.bbbRating} Rating</span></div>
            <div><span className="font-semibold text-brand-black">Phone:</span> <span className="text-gray-600">{site.phone}</span></div>
            <div><span className="font-semibold text-brand-black">Hours:</span> <span className="text-gray-600">{site.hours.weekday}</span></div>
            <div><span className="font-semibold text-brand-black">Address:</span> <span className="text-gray-600">{site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}</span></div>
            <div><span className="font-semibold text-brand-black">Offer Speed:</span> <span className="text-gray-600">Written cash offer in 24 hours, close in 14 days (as fast as 7)</span></div>
            <div><span className="font-semibold text-brand-black">Service Area:</span> <span className="text-gray-600">Tulare, Kings, Fresno &amp; Kern counties, and beyond</span></div>
          </div>
          <p className="mt-6 text-xs text-gray-400">
            Full structured data is available at{" "}
            <Link href="/llms.txt" className="underline hover:text-brand-yellow-dark">
              {site.url.replace("https://", "")}/llms.txt
            </Link>
            .
          </p>
        </div>
      </section>

      <ReviewsSection gray={false} />
    </div>
  );
}
