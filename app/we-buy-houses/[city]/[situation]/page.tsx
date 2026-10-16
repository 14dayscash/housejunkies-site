import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { cities, getCity } from "@/lib/cities";
import {
  buildCombo,
  comboCitySlugs,
  comboLabels,
  comboParams,
  comboSituationSlugs,
  isComboCity,
  isComboSituation,
} from "@/lib/combos";
import { newestFirst, propertiesIn } from "@/lib/properties";
import { LeadForm } from "@/components/LeadForm";
import { PropertyCard } from "@/components/PropertyCard";
import { RichText } from "@/components/RichText";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const dynamicParams = false;

const guideLabel: Record<string, string> = {
  probate: "selling a probate house",
  foreclosure: "foreclosure in California",
  "as-is": "selling a house as-is",
  "fire-damage": "selling a fire-damaged house",
  "with-tenants": "selling a rental with tenants",
  "code-violations": "selling a house with code violations",
};

export function generateStaticParams() {
  return comboParams();
}

export function generateMetadata({ params }: { params: { city: string; situation: string } }): Metadata {
  if (!isComboCity(params.city) || !isComboSituation(params.situation)) return {};
  const combo = buildCombo(params.city, params.situation);
  if (!combo) return {};
  return {
    title: combo.metaTitle,
    description: `${combo.metaDescription} Call ${site.phone}.`,
    alternates: { canonical: `/we-buy-houses/${params.city}/${params.situation}` },
  };
}

export default function ComboPage({ params }: { params: { city: string; situation: string } }) {
  const city = getCity(params.city);
  if (!city || !isComboCity(params.city) || !isComboSituation(params.situation)) notFound();
  const situation = params.situation;
  const combo = buildCombo(city.slug, situation);
  if (!combo) notFound();

  // Real purchases in this city. For rentals, lead with multi-family buys.
  const all = newestFirst(propertiesIn(city.name));
  const bought =
    situation === "with-tenants"
      ? [...all.filter((p) => p.type === "Multi Family Property"), ...all.filter((p) => p.type !== "Multi Family Property")]
      : all;

  const nearbyCombos = comboCitySlugs
    .map((slug) => cities.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c) && c!.slug !== city.slug)
    .sort((a, b) => Number(b.county === city.county) - Number(a.county === city.county))
    .slice(0, 8);

  return (
    <div>
      <FaqJsonLd items={combo.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "We Buy Houses", url: `${site.url}/we-buy-houses` },
          { name: city.name, url: `${site.url}/we-buy-houses/${city.slug}` },
          { name: comboLabels[situation], url: `${site.url}/we-buy-houses/${city.slug}/${situation}` },
        ]}
      />

      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">
            <Link href={`/we-buy-houses/${city.slug}`} className="hover:underline">{city.name}</Link> · {city.county}
          </p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">{combo.h1}</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            <RichText text={combo.intro[0]} />
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="md:col-span-2">
          {combo.intro.slice(1).map((p, i) => (
            <p key={i} className="text-gray-600">
              <RichText text={p} />
            </p>
          ))}

          <h2 className="mt-8 text-xl font-bold text-brand-black">{combo.localHeading}</h2>
          {combo.local.map((p, i) => (
            <p key={i} className="mt-4 text-gray-600">
              <RichText text={p} />
            </p>
          ))}
          {combo.sources.length > 0 && (
            <p className="mt-4 text-xs text-gray-500">
              Sources:{" "}
              {combo.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 ? ", " : ""}
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-yellow-dark">
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          )}

          <h2 className="mt-10 text-xl font-bold text-brand-black">How Selling to House Junkies Works</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>✓ Tell us the address and what is going on with the house</li>
            <li>✓ Get a written cash offer within 24 hours, with no obligation</li>
            <li>✓ No repairs, no cleaning, no agent commissions</li>
            <li>✓ We cover closing costs, and you choose the closing date</li>
          </ul>
        </div>
        <div>
          <LeadForm sourcePage={`/we-buy-houses/${city.slug}/${situation}`} />
        </div>
      </section>

      {bought.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-10">
          <h2 className="text-xl font-bold text-brand-black">Houses We Bought in {city.name}</h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Real houses House Junkies bought in {city.name}, with photos and the price we paid.
          </p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bought.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <PropertyCard p={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-brand-black">
            {comboLabels[situation]} in {city.name}: Common Questions
          </h2>
          <div className="mt-4 space-y-5">
            {combo.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-brand-black">{f.question}</h3>
                <p className="mt-1 text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-lg font-bold text-brand-black">Other Situations We Buy In {city.name}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {comboSituationSlugs
            .filter((s) => s !== situation)
            .map((s) => (
              <Link
                key={s}
                href={`/we-buy-houses/${city.slug}/${s}`}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
              >
                {comboLabels[s]} in {city.name}
              </Link>
            ))}
        </div>

        <h2 className="mt-10 text-lg font-bold text-brand-black">{comboLabels[situation]} in Nearby Cities</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {nearbyCombos.map((c) => (
            <Link
              key={c.slug}
              href={`/we-buy-houses/${c.slug}/${situation}`}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
            >
              {c.name}
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-600">
          See everything about{" "}
          <Link href={`/we-buy-houses/${city.slug}`} className="font-semibold text-brand-yellow-dark hover:underline">
            selling your house in {city.name}
          </Link>
          , or read our full guide to{" "}
          <Link href={`/sell-your-house/${situation}`} className="font-semibold text-brand-yellow-dark hover:underline">
            {guideLabel[situation]}
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
