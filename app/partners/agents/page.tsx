import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { partnerTiers, partnerFaqs, partnerDisclaimer } from "@/lib/partnerTiers";
import { FaqJsonLd } from "@/components/JsonLd";
import { Linkify } from "@/components/Linkify";

export const metadata: Metadata = {
  title: `Partner With Us`,
  description: "Five ways to partner with House Junkies and Ulloa Investment Group, from a $2,000 deal referral to funding flips as a private lender.",
  alternates: { canonical: "/partners/agents" },
};

export default function PartnersPage() {
  return (
    <div>
      <FaqJsonLd items={partnerFaqs} />
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Five Ways to Partner With House Junkies</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            From sending us an address to lending private capital, here's every way to get
            involved with House Junkies and {site.parentOrganization}, and what each one
            actually pays.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-6">
          {partnerTiers.map((tier, i) => (
            <div key={tier.name} className="rounded-lg border border-gray-200 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-brand-black">{i + 1}. {tier.name}</h2>
                <span className="text-lg font-bold text-brand-yellow-dark">{tier.range}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
                <span><strong>You Bring:</strong> {tier.youBring}</span>
                <span><strong>Involvement:</strong> {tier.involvement}</span>
              </div>
              <p className="mt-3 text-gray-600"><Linkify text={tier.body} /></p>
              <p className="mt-2 text-sm text-gray-500"><strong>Best For:</strong> {tier.bestFor}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-xl font-bold text-brand-black">The Five Tiers Side by Side</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-3 pr-4 font-semibold text-brand-black">Tier</th>
                <th className="py-3 pr-4 font-semibold text-brand-black">Typical Range</th>
                <th className="py-3 pr-4 font-semibold text-brand-black">You Bring</th>
                <th className="py-3 font-semibold text-brand-black">Your Involvement</th>
              </tr>
            </thead>
            <tbody>
              {partnerTiers.map((t) => (
                <tr key={t.name} className="border-b border-gray-100 align-top">
                  <td className="py-3 pr-4 font-medium text-brand-black">{t.name}</td>
                  <td className="py-3 pr-4 text-brand-yellow-dark">{t.range}</td>
                  <td className="py-3 pr-4 text-gray-600">{t.youBring}</td>
                  <td className="py-3 text-gray-600">{t.involvement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-xl font-bold text-brand-black">Why Partner With House Junkies</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600">
          <li>
            We have bought {site.stats.homesBought} homes over {site.stats.yearsInBusiness} years, and we are ranked{" "}
            {site.stats.sfrAnalyticsRank} in Visalia by transaction volume ({site.stats.sfrAnalyticsVolume} across{" "}
            {site.stats.sfrAnalyticsDeals} deals, per {site.stats.sfrAnalyticsSource}). That means steady deals, not one-offs.
          </li>
          <li>
            Renovation work is done by our own licensed crew, House Junkies Construction ({site.licenses.generalContractor}),
            so costs come from real numbers.
          </li>
          <li>
            Finished houses are sold through {site.legacyRealEstate.name} ({site.legacyRealEstate.dre}), a brokerage in the same group.
          </li>
          <li>
            House Junkies is BBB Accredited with an {site.stats.bbbRating} rating, and you can see real houses we have bought on our{" "}
            <Link href="/projects" className="font-semibold text-brand-yellow-dark hover:underline">recent purchases page</Link>.
          </li>
        </ul>

        <h2 className="mt-12 text-xl font-bold text-brand-black">What We Buy and Where</h2>
        <p className="mt-3 text-gray-600">
          We buy houses across Tulare, Kings, Fresno, and Kern counties and beyond, including the Central
          Coast and Eastern Sierra. We buy in any condition and in any situation, such as probate, inherited
          houses, foreclosure, tenants, fire or water damage, and code violations. If you know someone in
          one of those spots, they may be a good lead for you to send us. Browse the{" "}
          <Link href="/sell-your-house" className="font-semibold text-brand-yellow-dark hover:underline">situations we buy in</Link>{" "}
          and the{" "}
          <Link href="/we-buy-houses" className="font-semibold text-brand-yellow-dark hover:underline">cities we cover</Link>.
        </p>

        <h2 className="mt-12 text-xl font-bold text-brand-black">Frequently Asked Questions</h2>
        <dl className="mt-4 space-y-4">
          {partnerFaqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-brand-black">{f.question}</dt>
              <dd className="mt-1 text-gray-600">{f.answer}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-400">
          {partnerDisclaimer}
        </p>

        <p className="mt-6 text-center text-gray-600">
          Want to talk through which one fits?{" "}
          <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">
            Call or text {site.phone}
          </a>
        </p>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-bold text-brand-black">Contact Us Directly</h2>
            <Link href="/team" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
              Meet the full team →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="font-semibold text-brand-black">{site.directContacts.ceo.name}</div>
              <div className="text-sm text-gray-500">{site.directContacts.ceo.title}</div>
              <p className="mt-2 text-sm">
                <a href={`tel:${site.directContacts.ceo.phone.replace(/[^\d]/g, "")}`} className="text-brand-yellow-dark hover:underline">
                  {site.directContacts.ceo.phone}
                </a>
              </p>
              <p className="text-sm">
                <a href={`mailto:${site.directContacts.ceo.email}`} className="text-brand-yellow-dark hover:underline">
                  {site.directContacts.ceo.email}
                </a>
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="font-semibold text-brand-black">{site.directContacts.ops.name}</div>
              <div className="text-sm text-gray-500">{site.directContacts.ops.title}</div>
              <p className="mt-2 text-sm">
                <a href={`tel:${site.directContacts.ops.phone.replace(/[^\d]/g, "")}`} className="text-brand-yellow-dark hover:underline">
                  {site.directContacts.ops.phone}
                </a>
              </p>
              <p className="text-sm">
                <a href={`mailto:${site.directContacts.ops.email}`} className="text-brand-yellow-dark hover:underline">
                  {site.directContacts.ops.email}
                </a>
              </p>
            </div>
          </div>

          <h2 className="mt-10 text-xl font-bold text-brand-black">Our Locations</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {site.officeLocations.map((loc) => (
              <div key={loc.label} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="text-sm font-semibold text-brand-yellow-dark">{loc.label}</div>
                <p className="mt-1 text-sm text-gray-600">{loc.street}</p>
                <p className="text-sm text-gray-600">{loc.city}, {loc.region} {loc.postalCode}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
