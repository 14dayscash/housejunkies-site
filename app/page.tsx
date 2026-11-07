import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroOfferForm } from "@/components/HeroOfferForm";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";
import { RecentAcquisitions } from "@/components/RecentAcquisitions";

const liveCities = cities.filter((c) => c.featured);

// SEO TEST (started 2026-10-08): the homepage had 12 clicks / 429 impressions
// at avg position 7.2 (Search Console). Previous title: "We Buy Houses in
// Visalia, CA | House Junkies". Compare CTR in Search Console after 3 weeks.
export const metadata: Metadata = {
  title: { absolute: "We Buy Houses in Visalia, CA | Cash Offer in 24 Hours" },
  description:
    "Local cash home buyers in Visalia, ranked #1 by volume (SFR Analytics). Written offer in 24 hours, no fees, no repairs. Call (559) 368-8956.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero (2026-11-06 overhaul, from Dominic's mockup): the House Junkies
          Main St office as the background with a dark overlay, Abel on the
          left with his name block, the offer card on the right. Mobile puts
          the card first, then Abel. */}
      <section className="relative isolate overflow-hidden bg-black text-white">
        {/* Desktop uses a tighter crop of the right end of the building so
            the House Junkies sign lands between Abel and the offer card.
            Phones keep the full-width photo (the card covers the top there). */}
        <Image
          src="/images/office/hero-office.jpg"
          alt="The House Junkies Inc. office building in the Central Valley"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center md:hidden"
        />
        <Image
          src="/images/office/hero-office-desktop.jpg"
          alt="The House Junkies Inc. office building with the House Junkies sign"
          fill
          priority
          sizes="100vw"
          className="-z-20 hidden object-cover object-[50%_18%] md:block"
        />
        <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 pt-8 md:h-[calc(100svh-68px)] md:max-h-[760px] md:min-h-[460px] md:grid-cols-[45fr_55fr] md:gap-8 md:px-8 md:pt-0 lg:h-[calc(100svh-76px)] lg:px-12">
          {/* Abel + name block */}
          <div className="relative order-2 mx-auto h-[340px] w-full max-w-sm self-end sm:h-[400px] md:order-1 md:mx-0 md:h-[min(500px,calc(100svh-96px))] md:max-w-none">
            <Image
              src="/images/team/abel-hero.png"
              alt="Abel Ulloa, CEO and Owner of House Junkies Inc."
              width={453}
              height={960}
              priority
              sizes="(min-width: 768px) 240px, 170px"
              className="absolute bottom-0 right-0 h-full w-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] md:left-[8%] md:right-auto"
            />
            <div className="absolute bottom-6 left-0 rounded-lg bg-gradient-to-r from-black/70 via-black/40 to-transparent py-3 pl-4 pr-10 leading-snug [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] md:bottom-10">
              <p className="text-[22px] font-bold md:text-2xl">Abel Ulloa</p>
              <p className="text-base italic text-white/90">CEO &amp; Owner</p>
              <p className="text-[15px] font-light text-white/80">House Junkies Inc.</p>
              <p className="text-[15px] font-light text-white/80">Ulloa Investment Group</p>
            </div>
          </div>

          {/* Offer card */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end md:py-4">
            <HeroOfferForm />
          </div>
        </div>
      </section>
      <div id="hero-end-sentinel" />

      {/* Trust bar - sourced stats only */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 text-center md:grid-cols-4">
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.homesBought}</div>
            <div className="mt-1 text-sm text-gray-500">Homes Bought & Renovated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.yearsInBusiness}</div>
            <div className="mt-1 text-sm text-gray-500">Years in Business</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.bbbRating}</div>
            <div className="mt-1 text-sm text-gray-500">BBB Accredited Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.sfrAnalyticsRank}</div>
            <div className="mt-1 text-sm text-gray-500">Investor in Visalia</div>
          </div>
        </div>
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-center text-xs text-gray-600">
          <p>
            Ranked <strong className="font-bold text-gray-800">#1</strong> by transactions and volume in{" "}
            <strong className="font-bold text-gray-800">Visalia</strong> by SFR Analytics, an independent
            third-party data source.
          </p>
          <p className="mt-1">
            We&apos;ve bought, renovated, and resold{" "}
            <strong className="font-bold text-gray-800">{site.stats.homesBought}</strong> homes across the
            Central Valley using our own capital and licensed construction crew.
          </p>
          <p className="mt-1 font-bold text-gray-800">
            Locally owned. Vertically integrated. No fees. No obligations. {site.licenses.generalContractor}
          </p>
        </div>
      </section>

      {/* How It Works - the simple process before we explain the company behind it */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">How It Works - 3 Simple Steps</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="relative rounded-lg border border-gray-200 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow font-bold text-black">1</div>
            <p className="mt-4 font-semibold text-brand-black">Contact Us</p>
            <p className="mt-1 text-sm text-gray-600">
              Tell us about your property (in any condition). Fill out the form or call. It only takes a minute.
            </p>
          </div>
          <div className="relative rounded-lg border border-gray-200 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow font-bold text-black">2</div>
            <p className="mt-4 font-semibold text-brand-black">Get Your Offer</p>
            <p className="mt-1 text-sm text-gray-600">
              We analyze your house and send a fair, no-obligation cash offer within 24 hours.
            </p>
          </div>
          <div className="relative rounded-lg border border-gray-200 p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow font-bold text-black">3</div>
            <p className="mt-4 font-semibold text-brand-black">Get Paid</p>
            <p className="mt-1 text-sm text-gray-600">
              Accept the offer, pick your closing date, and get paid. We cover all fees and closing costs.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/compare" className="font-semibold text-brand-yellow-dark hover:underline">
            Compare to Listing on the Market →
          </Link>
          <Link href="/faq" className="font-semibold text-brand-yellow-dark hover:underline">
            Read FAQs →
          </Link>
        </div>
      </section>

      {/* Why us / authority */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">
          Vertically Integrated, Start to Finish
        </h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          Most cash-offer companies are a lead form with a phone number behind it. {site.name} is
          different: acquisitions, construction, and brokerage all happen under one roof, part of{" "}
          <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
            {site.parentOrganization}
          </Link>
          . That's what lets us pay more than a wholesaler and close faster
          than a company that has to shop your house to a stranger before they can buy it. The
          company is led by{" "}
          <Link href="/team/abel-ulloa" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
            Abel Ulloa, Owner and CEO
          </Link>
          .
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 1 - Acquisitions</div>
            <p className="mt-2 font-semibold text-brand-black">{site.stats.homesBought} Houses Flipped</p>
            <p className="mt-1 text-sm text-gray-600">
              Ranked {site.stats.sfrAnalyticsRank} in Visalia and Tulare County by transaction volume,
              per {site.stats.sfrAnalyticsSource}. No banks slowing things down, just private money
              and trusted partners who move as fast as we do. This allows us to close quickly and
              efficiently.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 2 - Construction</div>
            <p className="mt-2 font-semibold text-brand-black">Renovated In-house</p>
            <p className="mt-1 text-sm text-gray-600">
              Our own licensed general contractor crew, {site.licenses.generalContractor}, handles
              every rehab, no out-of-town subcontractors. The same crew also builds ground-up new
              construction and full ADUs, from design through permitting to turnkey delivery.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 3 - Brokerage</div>
            <p className="mt-2 font-semibold text-brand-black">{site.legacyRealEstate.agentCount} Agents, {site.legacyRealEstate.monthlyVolume}/mo</p>
            <p className="mt-1 text-sm text-gray-600">
              Resold with{" "}
              <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-white">
                {site.legacyRealEstate.name}
              </Link>{" "}
              ({site.licenses.brokerage}), the{" "}
              {site.legacyRealEstate.countyRank.replace(/^the /i, "")}. Averaging{" "}
              {site.legacyRealEstate.monthlySales} home sales and {site.legacyRealEstate.monthlyVolume} in
              volume per month. Led by our broker,{" "}
              <Link href="/team/jenny-madrid" className="underline decoration-dotted underline-offset-2 hover:text-white">
                {site.people.broker.name}
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/about" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
            Read our full story →
          </Link>
          <Link href="/team" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
            Meet the team →
          </Link>
        </div>
      </section>

      {/* Condensed comparison table, full version lives on /compare */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">Why Sell to Us Instead of Listing</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-brand-yellow/40 bg-brand-yellow/5 p-6">
            <div className="font-bold text-brand-black">Selling to {site.name}</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>✓ No Repairs, Sold As-Is</li>
              <li>✓ No Agent Commissions</li>
              <li>✓ We Cover Closing Costs</li>
              <li>✓ No Financing Contingencies</li>
              <li>✓ Close in 7 to 30 Days, My Choice</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="font-bold text-gray-500">Listing With an Agent</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>• Repairs Often Required</li>
              <li>• Typically 5-6% in Commissions</li>
              <li>• Closing Costs Paid by the Seller</li>
              <li>• Can Fall Through on Financing</li>
              <li>• Typically 60 to 90+ Days</li>
            </ul>
          </div>
        </div>
        <Link href="/compare" className="mt-4 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          See the full comparison, with real numbers →
        </Link>
      </section>

      {/* Real purchases, from lib/properties.ts */}
      <RecentAcquisitions id="recent-purchases" />

      {/* Situations - grouped into Any Reason / Any Condition / Any Challenge */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-brand-black">We Buy Houses in Any Situation</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {[
              { heading: "Any Reason", slugs: ["inherited-property", "relocating", "divorce"] },
              { heading: "Any Condition", slugs: ["fire-damage", "water-damage", "vacant", "as-is"] },
              { heading: "Any Challenge", slugs: ["probate", "foreclosure", "code-violations", "with-tenants", "liens"] },
            ].map((group) => (
              <div key={group.heading}>
                <h3 className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">{group.heading}</h3>
                <div className="mt-3 space-y-2">
                  {group.slugs.map((slug) => {
                    const s = situations.find((x) => x.slug === slug);
                    if (!s) return null;
                    return (
                      <Link
                        key={s.slug}
                        href={`/sell-your-house/${s.slug}`}
                        className="block rounded-md border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
                      >
                        {s.navLabel}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">Service Areas</h2>
        <p className="mt-2 text-gray-600">
          Proudly serving homeowners across Tulare, Kings, Fresno, and Kern counties, and
          beyond.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {liveCities.map((c) => (
            <Link
              key={c.slug}
              href={`/we-buy-houses/${c.slug}`}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <Link href="/we-buy-houses" className="mt-4 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          Browse every county and city we serve →
        </Link>
      </section>

      {/* Explore the Site - the only link to /explore lives here, on purpose */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-brand-black">Explore the Site</h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-600">
            Every page on this site, laid out visually, cities, situations, the team, all of it.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block rounded-full border-2 border-brand-yellow-dark bg-white px-6 py-3 font-semibold text-brand-black hover:bg-brand-yellow-dark hover:text-white"
          >
            See the Full Site Map →
          </Link>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brand-black">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">Ready for a No-Obligation Cash Offer?</h2>
          <p className="mt-2 text-white/70">Call, text, or fill out the form. We respond within 24 hours.</p>
          <a
            href={`tel:${site.phoneE164}`}
            className="mt-6 inline-block rounded-md bg-brand-yellow px-6 py-3 font-bold text-black hover:bg-brand-yellow-dark"
          >
            Call {site.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
