import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";

const liveCities = cities;

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-black text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">
              Visalia & the Central Valley
            </p>
            <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">
              SELL YOUR HOME AS-IS FOR CASH IN THE CENTRAL VALLEY
            </h1>
            <p className="mt-3 text-lg font-medium text-white/90">
              A local, vertically integrated buyer with the numbers to back it up. No fees. No
              obligation. Get a real offer today.
            </p>
            <p className="mt-4 text-lg text-white/70">
              {site.name} has bought, renovated, and resold {site.stats.homesBought} homes across the
              Central Valley over {site.stats.yearsInBusiness} years. We're not a lead service and we're
              not a wholesaler, we buy the property with our own capital and renovate it with our own
              licensed construction crew ({site.licenses.generalContractor}).
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-white/80 sm:grid-cols-2">
              <li>✓ No Repairs, Any Condition</li>
              <li>✓ We Cover Closing Costs</li>
              <li>✓ Close in 7 to 30 Days</li>
              <li>✓ Se Habla Espanol</li>
            </ul>
          </div>
          <LeadForm sourcePage="/" />
        </div>
      </section>

      {/* Trust bar - sourced stats only */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 text-center md:grid-cols-4">
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.homesBought}</div>
            <div className="mt-1 text-sm text-gray-500">Homes bought & renovated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.yearsInBusiness}</div>
            <div className="mt-1 text-sm text-gray-500">Years in business</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.bbbRating}</div>
            <div className="mt-1 text-sm text-gray-500">BBB Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.sfrAnalyticsRank}</div>
            <div className="mt-1 text-sm text-gray-500">Investor in Visalia</div>
          </div>
        </div>
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-center text-xs text-gray-600">
          Ranked #1 by transaction volume in Visalia ({site.stats.sfrAnalyticsVolume} across{" "}
          {site.stats.sfrAnalyticsDeals} deals) by{" "}
          <span className="font-medium text-gray-700">{site.stats.sfrAnalyticsSource}</span>, an
          independent, third-party market data source.
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
          {site.parentOrganization}. That's what lets us pay more than a wholesaler and close faster
          than a company that has to shop your house to a stranger before they can buy it.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 1 - Acquisitions</div>
            <p className="mt-2 font-semibold text-brand-black">{site.stats.sfrAnalyticsVolume} across {site.stats.sfrAnalyticsDeals} deals</p>
            <p className="mt-1 text-sm text-gray-600">
              Funded entirely with private capital, no banks, no outside brokers, no financing that
              can collapse a week before closing. That's what {site.stats.sfrAnalyticsRank}-ranked
              volume in Visalia actually looks like.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 2 - Construction</div>
            <p className="mt-2 font-semibold text-brand-black">Renovated in-house</p>
            <p className="mt-1 text-sm text-gray-600">
              Our own licensed general contractor crew, {site.licenses.generalContractor}, handles
              every rehab, no out-of-town subcontractors. The same crew also builds ground-up new
              construction and full ADUs, from design through permitting to turnkey delivery.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 3 - Brokerage</div>
            <p className="mt-2 font-semibold text-brand-black">{site.legacyRealEstate.agentCount} agents, {site.legacyRealEstate.monthlyVolume}/mo</p>
            <p className="mt-1 text-sm text-gray-600">
              Resold through {site.legacyRealEstate.name} ({site.licenses.brokerage}),{" "}
              {site.legacyRealEstate.countyRank}, averaging {site.legacyRealEstate.monthlySales} home
              sales a month. Led by our broker, {site.people.broker.name}.
            </p>
          </div>
        </div>
        <Link href="/about" className="mt-6 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          Meet the team behind it →
        </Link>
      </section>

      {/* Situations - 12, even grid */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-brand-black">We Buy Houses in Any Situation</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {situations.map((s) => (
              <Link
                key={s.slug}
                href={`/sell-your-house/${s.slug}`}
                className="rounded-md border border-gray-200 bg-white px-4 py-3 text-center text-sm font-medium text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
              >
                {s.navLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">Service Areas</h2>
        <p className="mt-2 text-gray-600">
          Proudly serving homeowners throughout Tulare, Kings, Fresno, and Kern counties.
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
