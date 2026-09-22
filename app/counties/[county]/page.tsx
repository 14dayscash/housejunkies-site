import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { counties, getCounty, citiesInCounty } from "@/lib/counties";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return counties.map((c) => ({ county: c.slug }));
}

export function generateMetadata({ params }: { params: { county: string } }): Metadata {
  const county = getCounty(params.county);
  if (!county) return {};
  return {
    title: `We Buy Houses in ${county.name}, CA | ${site.name}`,
    description: county.description,
    alternates: { canonical: `/counties/${county.slug}` },
  };
}

export default function CountyPage({ params }: { params: { county: string } }) {
  const county = getCounty(params.county);
  if (!county) notFound();
  const citiesHere = citiesInCounty(county.name);

  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">
            {citiesHere.length} cities served
          </p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">
            We Buy Houses in {county.name}, CA
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">{county.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {citiesHere.map((c) => (
            <Link
              key={c.slug}
              href={`/we-buy-houses/${c.slug}`}
              className="rounded-lg border border-gray-200 p-5 hover:border-brand-yellow-dark"
            >
              <div className="font-semibold text-brand-black">{c.name}</div>
              <p className="mt-1 text-sm text-gray-500">Population approximately {c.population}</p>
              <p className="mt-2 text-sm text-gray-600">{c.marketNote}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Don't see your city listed? Call {site.phone}, we buy throughout the Central Valley
          beyond this list too.
        </p>
      </section>
    </div>
  );
}
