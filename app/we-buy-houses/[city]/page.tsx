import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { cities, getCity } from "@/lib/cities";
import { Linkify } from "@/components/Linkify";
import { counties } from "@/lib/counties";
import { situations } from "@/lib/situations";
import { LeadForm } from "@/components/LeadForm";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCity(params.city);
  if (!city) return {};
  return {
    title: { absolute: `We Buy Houses in ${city.name}, CA | Cash Offer in 24 Hours` },
    description: `★★★★★ 5.0 (3 Reviews) | We Buy Houses ${city.name}, CA for cash, no fees, no repairs. Call ${site.phone}.`,
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

  const sameCounty = cities.filter((c) => c.county === city.county && c.slug !== city.slug);
  const nearby = [
    ...sameCounty.filter((c) => c.featured),
    ...sameCounty.filter((c) => !c.featured),
  ].slice(0, 6);

  const countyMatch = counties.find((c) => c.name === city.county);

  return (
    <div>
      <FaqJsonLd items={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "We Buy Houses", url: `${site.url}/we-buy-houses` },
          { name: city.name, url: `${site.url}/we-buy-houses/${city.slug}` },
        ]}
      />
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">{city.county}</p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">
            Sell Your House Fast for Cash in {city.name}, CA
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            {city.description}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="md:col-span-2">
          {city.marketNote && (
            <p className="text-sm text-gray-500">{city.marketNote}</p>
          )}
          {city.neighborhoods.length > 0 && (
            <p className="mt-3 text-sm text-gray-500">
              Serving {city.neighborhoods.join(", ")}
              {city.zipCodes.length > 0 ? ` (${city.zipCodes.slice(0, 6).join(", ")}${city.zipCodes.length > 6 ? "…" : ""})` : ""}.
              Population approximately {city.population}.
            </p>
          )}
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>✓ No repairs or renovations needed</li>
            <li>✓ No inspections or appraisals required</li>
            <li>✓ No realtor commissions, no escrow fees</li>
            <li>✓ You choose the closing date</li>
          </ul>
          <p className="mt-6 text-sm text-gray-500">
            {site.name} is a vertically integrated buyer, meaning we buy, renovate,
            and resell with our own capital and our own licensed crew
            ({site.licenses.generalContractor}), not a wholesaler shopping your
            house to a stranger.
          </p>
        </div>
        <div>
          <LeadForm sourcePage={`/we-buy-houses/${city.slug}`} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="text-xl font-bold text-brand-black">Cash Home Buyers in {city.name}</h2>
        <p className="mt-3 text-gray-600">
          If you want to skip listing, showings, and agent commissions, a direct cash sale is the
          simplest route. {site.name} is a local cash home buyer: we make the offer, we pay the
          closing costs, and you pick the closing date, in as little as 7 days. There is no
          obligation, and you get a written offer within 24 hours of sharing your address.
        </p>

        <h2 className="mt-8 text-xl font-bold text-brand-black">House Buyers in {city.name}, CA: Any Condition</h2>
        <p className="mt-3 text-gray-600">
          We buy houses in {city.name} in any condition, including{" "}
          <Link href="/sell-your-house/fire-damage" className="font-semibold text-brand-yellow-dark hover:underline">fire damage</Link>,{" "}
          <Link href="/sell-your-house/water-damage" className="font-semibold text-brand-yellow-dark hover:underline">water damage</Link>,{" "}
          <Link href="/sell-your-house/code-violations" className="font-semibold text-brand-yellow-dark hover:underline">code violations</Link>,{" "}
          <Link href="/sell-your-house/with-tenants" className="font-semibold text-brand-yellow-dark hover:underline">tenant-occupied rentals</Link>,{" "}
          <Link href="/sell-your-house/hoarder-house" className="font-semibold text-brand-yellow-dark hover:underline">hoarder houses</Link>,{" "}
          and{" "}
          <Link href="/sell-your-house/inherited-property" className="font-semibold text-brand-yellow-dark hover:underline">inherited or probate properties</Link>.
          Because we renovate with our own crew, a house that needs work is something we price in,
          not a reason to walk away.
        </p>

        <h2 className="mt-8 text-xl font-bold text-brand-black">Sell My House Fast in {city.name}, CA, As-Is</h2>
        <p className="mt-3 text-gray-600">
          Selling <Link href="/sell-your-house/as-is" className="font-semibold text-brand-yellow-dark hover:underline">as-is</Link> means no
          repairs, no cleaning out the garage, and no inspection or appraisal waiting on a buyer&apos;s lender.
          See exactly{" "}
          <Link href="/how-we-calculate-your-offer" className="font-semibold text-brand-yellow-dark hover:underline">how we calculate your offer</Link>{" "}
          and how it compares with{" "}
          <Link href="/compare" className="font-semibold text-brand-yellow-dark hover:underline">listing with an agent</Link>{" "}
          before you decide.
        </p>
      </section>

      {city.longContent && (
        <section className="mx-auto max-w-6xl px-4 pb-8">
          {city.longContent.map((block) => (
            <div key={block.heading} className="mb-8">
              <h2 className="text-xl font-bold text-brand-black">{block.heading}</h2>
              {block.paragraphs.map((para, i) => (
                <p key={i} className="mt-3 text-gray-600">
                  <Linkify text={para} />
                </p>
              ))}
            </div>
          ))}
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <h2 className="text-xl font-bold text-brand-black">{city.name} Quick Facts</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {city.quickFacts.map((fact, i) => (
            <li key={i} className="flex gap-3 text-gray-600">
              <span className="mt-1 text-brand-yellow-dark">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-lg font-bold text-brand-black">Common Situations in {city.name}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {situations.slice(0, 5).map((s) => (
            <Link
              key={s.slug}
              href={`/sell-your-house/${s.slug}`}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
            >
              {s.navLabel}
            </Link>
          ))}
        </div>
        <Link href="/sell-your-house" className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          See every situation we buy →
        </Link>
        {countyMatch && (
          <p className="mt-6 text-sm text-gray-500">
            See every city we serve in{" "}
            <Link href={`/counties/${countyMatch.slug}`} className="font-semibold text-brand-yellow-dark hover:underline">
              {city.county}
            </Link>
            .
          </p>
        )}
        {nearby.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-brand-black">We Also Buy Houses Near {city.name}</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {nearby.map((c) => (
                <Link
                  key={c.slug}
                  href={`/we-buy-houses/${c.slug}`}
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-brand-black">
            {city.name} Cash Home Sale FAQ
          </h2>
          <div className="mt-4 space-y-5">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-brand-black">{f.question}</h3>
                <p className="mt-1 text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
