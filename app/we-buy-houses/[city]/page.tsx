import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { cities, getCity } from "@/lib/cities";
import { RichText } from "@/components/RichText";
import { comboLabels, comboSituationSlugs, isComboCity } from "@/lib/combos";
import { GBP_URL } from "@/lib/reviews";
import { counties } from "@/lib/counties";
import { situations } from "@/lib/situations";
import { LeadForm } from "@/components/LeadForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { cityFaq, newestFirst, portfolioStats, propertiesIn } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { CityFactsSection } from "@/components/CityFactsSection";
import {
  CheckList,
  CompareMini,
  FactList,
  FaqList,
  OfferCard,
  PageHero,
  Pills,
  ReviewsSection,
  Section,
  SectionHeader,
  cardCls,
  linkCls,
} from "@/components/sections/Shared";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCity(params.city);
  if (!city) return {};
  return {
    title: { absolute: `We Buy Houses in ${city.name}, CA | Cash Offer in 24 Hours` },
    description: `We Buy Houses ${city.name}, CA for cash, no fees, no repairs. Call ${site.phone}.`,
    alternates: { canonical: `/we-buy-houses/${city.slug}` },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCity(params.city);
  if (!city) notFound();

  const faqs = [
    {
      question: `How fast can you buy my house in ${city.name}?`,
      answer: "We can close in as little as 7 days. Once you accept our cash offer, you choose the closing date.",
    },
    {
      question: "Do you pay closing costs and fees?",
      answer: "Yes. We cover all closing costs, escrow fees, and title fees. There are no commissions.",
    },
    {
      question: `What condition does my ${city.name} house need to be in?`,
      answer: "Any condition. We buy houses as-is, including major repair needs, fire or water damage, and code violations.",
    },
    {
      question: `Do you buy houses outside ${city.name} too?`,
      answer: `Yes. We buy throughout ${city.county} and the surrounding Central Valley. Call us if your property isn't listed on our service area page.`,
    },
    {
      question: `Are you a real cash home buyer in ${city.name}, or a wholesaler?`,
      answer: `We buy with our own funds and renovate with our own licensed crew (${site.licenses.generalContractor}), then resell through our own brokerage. We are not passing your contract to a stranger.`,
    },
  ];

  // Real purchases in this city (lib/properties.ts). Empty for cities we have
  // not bought in yet, in which case none of this renders.
  const recent = newestFirst(propertiesIn(city.name));
  const recentStats = portfolioStats(recent);
  faqs.push(...cityFaq(city.name));

  const sameCounty = cities.filter((c) => c.county === city.county && c.slug !== city.slug);
  const nearby = [
    ...sameCounty.filter((c) => c.featured),
    ...sameCounty.filter((c) => !c.featured),
  ].slice(0, 6);

  const countyMatch = counties.find((c) => c.name === city.county);

  const L = ({ href, children }: { href: string; children: ReactNode }) => (
    <Link href={href} className={linkCls}>{children}</Link>
  );

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "We Buy Houses", url: `${site.url}/we-buy-houses` },
          { name: city.name, url: `${site.url}/we-buy-houses/${city.slug}` },
        ]}
      />
      <PageHero
        eyebrow={city.county}
        title={<>Sell Your House Fast for Cash<br className="hidden sm:block" /> in {city.name}, CA</>}
        sub={city.description}
      >
        {city.slug === "visalia" && (
          <p className="mt-4 text-sm font-semibold text-white/80">
            House Junkies Inc., 801 W Main Street, Visalia.<br />Part of Ulloa Investment Group.
          </p>
        )}
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CheckList
            items={[
              "No repairs or renovations needed",
              "No inspections or appraisals required",
              "No realtor commissions, no escrow fees",
              "You choose the closing date",
            ]}
          />
          {city.marketNote && <p className="mt-8 text-gray-600">{city.marketNote}</p>}
          {city.neighborhoods.length > 0 && (
            <p className="mt-4 text-sm text-gray-500">
              Serving {city.neighborhoods.join(", ")}
              {city.zipCodes.length > 0 ? ` (${city.zipCodes.slice(0, 6).join(", ")}${city.zipCodes.length > 6 ? "…" : ""})` : ""}.
              Population approximately {city.population}.
            </p>
          )}
          <p className="mt-4 text-sm text-gray-500">
            {site.name} is a vertically integrated buyer, meaning we buy, renovate,
            and resell with our own capital and our own licensed crew
            ({site.licenses.generalContractor}), not a wholesaler shopping your
            house to a stranger.
          </p>
        </div>
        <div className="lg:col-span-2">
          <OfferCard>
            <LeadForm sourcePage={`/we-buy-houses/${city.slug}`} />
          </OfferCard>
        </div>
      </section>

      <Section gray>
        <SectionHeader eyebrow={`We Buy Houses in ${city.name}`} title={`How a Cash Sale Works in ${city.name}`} />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className={cardCls}>
            <h2 className="text-lg font-bold text-brand-black">Cash Home Buyers in {city.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              If you want to skip listing, showings, and agent commissions, a direct cash sale is the
              simplest route. {site.name} is a local cash home buyer: we make the offer, we pay the
              closing costs, and you pick the closing date, in as little as 7 days. There is no
              obligation, and you get a written offer within 24 hours of sharing your address.
            </p>
          </div>
          <div className={cardCls}>
            <h2 className="text-lg font-bold text-brand-black">House Buyers in {city.name}, CA: Any Condition</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              We buy houses in {city.name} in any condition, including{" "}
              <L href="/sell-your-house/fire-damage">fire damage</L>,{" "}
              <L href="/sell-your-house/water-damage">water damage</L>,{" "}
              <L href="/sell-your-house/code-violations">code violations</L>,{" "}
              <L href="/sell-your-house/with-tenants">tenant-occupied rentals</L>,{" "}
              <L href="/sell-your-house/hoarder-house">hoarder houses</L>,{" "}
              <L href="/sell-your-house/vacant">vacant houses</L>,{" "}
              <L href="/sell-your-house/foreclosure">homes facing foreclosure</L>, and{" "}
              <L href="/sell-your-house/inherited-property">inherited or probate properties</L>.
              Because we renovate with our own crew, a house that needs work is something we price in,
              not a reason to walk away.
            </p>
          </div>
          <div className={cardCls}>
            <h2 className="text-lg font-bold text-brand-black">Sell My House Fast in {city.name}, CA, As-Is</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Selling <L href="/sell-your-house/as-is">as-is</L> means no
              repairs, no cleaning out the garage, and no inspection or appraisal waiting on a buyer&apos;s lender.
              See exactly <L href="/how-we-calculate-your-offer">how we calculate your offer</L>{" "}
              and how it compares with <L href="/compare">listing with an agent</L> before you decide.
            </p>
          </div>
        </div>
      </Section>

      {city.longContent && (
        <Section narrow>
          {city.longContent.map((block, bi) => (
            <div key={block.heading} className={bi > 0 ? "mt-12" : ""}>
              <h2 className="text-2xl font-bold text-brand-black md:text-3xl">{block.heading}</h2>
              {block.paragraphs.map((para, i) => (
                <p key={i} className="mt-4 leading-relaxed text-gray-600">
                  <RichText text={para} />
                </p>
              ))}
            </div>
          ))}
        </Section>
      )}

      {recent.length > 0 && (
        <Section gray border={!city.longContent}>
          <SectionHeader
            eyebrow="Recent Purchases"
            title={`Recent House Junkies Purchases in ${city.name}`}
            sub={
              <>
                Here {recentStats.count === 1 ? "is one" : `are ${recentStats.count}`} of our recent purchases in {city.name},
                <br className="hidden md:block" /> with photos, square footage, lot size, and the price we paid for each one.
              </>
            }
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <PropertyCard p={p} />
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/projects" className={`text-sm ${linkCls}`}>
              See Every House Junkies Project →
            </Link>
          </div>
        </Section>
      )}

      <CityFactsSection slug={city.slug} name={city.name} />

      <Section gray>
        <SectionHeader eyebrow="Local Facts" title={`${city.name} Quick Facts`} />
        <div className="mt-10">
          <FactList items={city.quickFacts} />
        </div>
      </Section>

      <Section>
        {isComboCity(city.slug) && (
          <div className="mb-14">
            <SectionHeader title={`Selling a ${city.name} House in a Tough Spot?`} />
            <div className="mt-8">
              <Pills
                items={comboSituationSlugs.map((s) => ({
                  href: `/we-buy-houses/${city.slug}/${s}`,
                  label: `${comboLabels[s]} in ${city.name}`,
                }))}
              />
            </div>
          </div>
        )}
        <SectionHeader title={`Common Situations in ${city.name}`} />
        <div className="mt-8">
          <Pills items={situations.slice(0, 5).map((s) => ({ href: `/sell-your-house/${s.slug}`, label: s.navLabel }))} />
        </div>
        <div className="mt-6 text-center">
          <Link href="/sell-your-house" className={`text-sm ${linkCls}`}>
            See Every Situation We Buy →
          </Link>
        </div>
        {nearby.length > 0 && (
          <div className="mt-14">
            <SectionHeader title={`We Also Buy Houses Near ${city.name}`} />
            <div className="mt-8">
              <Pills items={nearby.map((c) => ({ href: `/we-buy-houses/${c.slug}`, label: c.name }))} />
            </div>
          </div>
        )}
        {countyMatch && (
          <div className="mt-6 text-center">
            <Link href={`/counties/${countyMatch.slug}`} className={`text-sm ${linkCls}`}>
              See Every City We Serve in {city.county} →
            </Link>
          </div>
        )}
      </Section>

      <CompareMini />

      <Section id="faq" narrow>
        <SectionHeader eyebrow="FAQ" title={`${city.name} Cash Home Sale FAQ`} />
        <div className="mt-10">
          <FaqList items={faqs} />
        </div>
      </Section>

      {city.slug === "visalia" ? (
        <ReviewsSection
          title="What People Say About House Junkies in Visalia"
          sub="Real reviews from our Google Business Profile at our Visalia office, quoted word for word."
        >
          <div className="mt-8 text-center text-sm">
            <Link href="/reviews" className={linkCls}>Read All Our Reviews →</Link>
            <span className="mx-3 text-gray-300">|</span>
            <a href={GBP_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>See Them on Google →</a>
          </div>
        </ReviewsSection>
      ) : (
        <ReviewsSection />
      )}
    </div>
  );
}
