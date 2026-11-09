import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { partnerTiers, partnerFaqs, partnerDisclaimer } from "@/lib/partnerTiers";
import { Linkify } from "@/components/Linkify";
import {
  CheckList,
  FaqList,
  PageHero,
  ReviewsSection,
  Section,
  SectionHeader,
  cardCls,
  linkCls,
} from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Partner With Us`,
  description: "Five ways to partner with House Junkies and Ulloa Investment Group, from a $2,000 deal referral to funding flips as a private lender.",
  alternates: { canonical: "/partners/agents" },
};

export default function PartnersPage() {
  const contacts = [site.directContacts.ceo, site.directContacts.ops];
  return (
    <div>
      <PageHero
        eyebrow="Partner With Us"
        title="Five Ways to Partner With House Junkies"
        sub={
          <>
            From sending us an address to lending private capital, here&apos;s every way to get
            involved with House Junkies and {site.parentOrganization},<br className="hidden md:block" /> and what each one
            actually pays.
          </>
        }
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          {partnerTiers.map((tier, i) => (
            <div key={tier.name} className={`${cardCls} ${i === partnerTiers.length - 1 && partnerTiers.length % 2 ? "lg:col-span-2" : ""}`}>
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-yellow font-bold text-black">{i + 1}</span>
                <div>
                  <h2 className="text-xl font-bold text-brand-black">{tier.name}</h2>
                  <p className="text-lg font-bold text-brand-yellow-dark">{tier.range}</p>
                </div>
              </div>
              <div className="mt-4 space-y-1 text-xs text-gray-500">
                <p><strong>You Bring:</strong> {tier.youBring}</p>
                <p><strong>Involvement:</strong> {tier.involvement}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600"><Linkify text={tier.body} /></p>
              <p className="mt-3 text-sm text-gray-500"><strong>Best For:</strong> {tier.bestFor}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section gray>
        <SectionHeader eyebrow="Compare" title="The Five Tiers Side by Side" />
        <div className="mx-auto mt-10 max-w-5xl overflow-x-auto rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white shadow-sm">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left">
                <th className="px-4 py-3 font-semibold text-brand-black">Tier</th>
                <th className="px-4 py-3 font-semibold text-brand-black">Typical Range</th>
                <th className="px-4 py-3 font-semibold text-brand-black">You Bring</th>
                <th className="px-4 py-3 font-semibold text-brand-black">Your Involvement</th>
              </tr>
            </thead>
            <tbody>
              {partnerTiers.map((t) => (
                <tr key={t.name} className="border-b border-gray-100 align-top last:border-0">
                  <td className="px-4 py-3 font-medium text-brand-black">{t.name}</td>
                  <td className="px-4 py-3 font-semibold text-brand-yellow-dark">{t.range}</td>
                  <td className="px-4 py-3 text-gray-600">{t.youBring}</td>
                  <td className="px-4 py-3 text-gray-600">{t.involvement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-black">Why Partner With House Junkies</h2>
            <CheckList
              className="mt-6"
              items={[
                <>
                  We have bought {site.stats.homesBought} homes over {site.stats.yearsInBusiness} years, and we are ranked{" "}
                  {site.stats.sfrAnalyticsRank} in Visalia by transaction volume ({site.stats.sfrAnalyticsVolume} across{" "}
                  {site.stats.sfrAnalyticsDeals} deals, per {site.stats.sfrAnalyticsSource}). That means steady deals, not one-offs.
                </>,
                <>
                  Renovation work is done by our own licensed crew, House Junkies Construction ({site.licenses.generalContractor}),
                  so costs come from real numbers.
                </>,
                <>Finished houses are sold through {site.legacyRealEstate.name} ({site.legacyRealEstate.dre}), a brokerage in the same group.</>,
                <>
                  House Junkies is BBB Accredited with an {site.stats.bbbRating} rating, and you can see real houses we have bought on our{" "}
                  <Link href="/projects" className={linkCls}>recent purchases page</Link>.
                </>,
              ]}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-black">What We Buy and Where</h2>
            <p className="mt-6 leading-relaxed text-gray-600">
              We buy houses across Tulare, Kings, Fresno, and Kern counties and beyond, including the Central
              Coast and Eastern Sierra. We buy in any condition and in any situation, such as probate, inherited
              houses, foreclosure, tenants, fire or water damage, and code violations. If you know someone in
              one of those spots, they may be a good lead for you to send us. Browse the{" "}
              <Link href="/sell-your-house" className={linkCls}>situations we buy in</Link> and the{" "}
              <Link href="/we-buy-houses" className={linkCls}>cities we cover</Link>.
            </p>
          </div>
        </div>
      </Section>

      <Section gray id="faq" narrow>
        <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-10">
          <FaqList items={partnerFaqs} />
        </div>
        <p className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-400">{partnerDisclaimer}</p>
        <p className="mt-6 text-center text-gray-600">
          Want to talk through which one fits?
          <br />
          <a href={`tel:${site.phoneE164}`} className={linkCls}>
            Call or Text {site.phone} →
          </a>
        </p>
      </Section>

      <Section>
        <SectionHeader eyebrow="Talk to Us" title="Contact Us Directly" />
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          {contacts.map((c) => (
            <div key={c.name} className={`${cardCls} text-center`}>
              <h3 className="text-lg font-bold text-brand-black">{c.name}</h3>
              <p className="text-sm text-gray-500">{c.title}</p>
              <p className="mt-3 text-sm">
                <a href={`tel:${c.phone.replace(/[^\d]/g, "")}`} className={linkCls}>{c.phone}</a>
              </p>
              <p className="text-sm">
                <a href={`mailto:${c.email}`} className="text-brand-yellow-dark hover:underline">{c.email}</a>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/team" className={`text-sm ${linkCls}`}>Meet the Full Team →</Link>
        </div>

        <div className="mt-16">
          <SectionHeader title="Our Locations" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.officeLocations.map((loc) => (
              <div key={loc.label} className={`${cardCls} text-center`}>
                <h3 className="text-sm font-bold text-brand-yellow-dark">{loc.label}</h3>
                <p className="mt-2 text-sm text-gray-600">{loc.street}</p>
                <p className="text-sm text-gray-600">{loc.city}, {loc.region} {loc.postalCode}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <ReviewsSection />
    </div>
  );
}
