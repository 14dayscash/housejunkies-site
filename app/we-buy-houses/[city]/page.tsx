import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cities, getCity } from "@/lib/cities";
import { LeadForm } from "@/components/LeadForm";
import { FaqJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const city = getCity(params.city);
  if (!city) return {};
  return {
    title: `Sell My House Fast in ${city.name}, CA | Cash Offer`,
    description:
      city.description ||
      `We buy houses as-is in ${city.name}, CA. Fair cash offer, no fees, close on your timeline.`,
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
  ];

  return (
    <div>
      {city.needsRealContent && (
        <div className="bg-yellow-50 px-4 py-2 text-center text-xs text-yellow-800">
          Draft page: needs real neighborhoods, zip codes, and a linked project before this goes live.
        </div>
      )}
      <FaqJsonLd items={faqs} />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-brand-green">{city.county}</p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">
            Sell Your House Fast for Cash in {city.name}, CA
          </h1>
          <p className="mt-4 text-gray-600">
            {city.description ||
              `We buy houses as-is in ${city.name}. No repairs, no fees, no hassle.`}
          </p>
          {city.neighborhoods.length > 0 && (
            <p className="mt-4 text-sm text-gray-500">
              Serving {city.neighborhoods.join(", ")}
              {city.zipCodes.length > 0 ? ` (${city.zipCodes.join(", ")})` : ""}.
            </p>
          )}
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>✓ No repairs or renovations needed</li>
            <li>✓ No inspections or appraisals required</li>
            <li>✓ No realtor commissions, no escrow fees</li>
            <li>✓ You choose the closing date</li>
          </ul>
        </div>
        <LeadForm sourcePage={`/we-buy-houses/${city.slug}`} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-bold">
          {city.name} Cash Home Sale FAQ
        </h2>
        <dl className="mt-4 space-y-4">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-gray-900">{f.question}</dt>
              <dd className="mt-1 text-gray-600">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
