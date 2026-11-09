import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { counties, getCounty, citiesInCounty } from "@/lib/counties";
import { site } from "@/lib/site";
import { countyPhotos } from "@/lib/homeContent";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  CompareMini,
  ReviewsSection,
  Section,
  SectionHeader,
  SituationGrid,
  btnYellow,
  cardCls,
  linkCls,
} from "@/components/sections/Shared";

export function generateStaticParams() {
  return counties.map((c) => ({ county: c.slug }));
}

export function generateMetadata({ params }: { params: { county: string } }): Metadata {
  const county = getCounty(params.county);
  if (!county) return {};
  return {
    title: { absolute: `We Buy Houses in ${county.name}, CA | Cash Offer in 24 Hours` },
    description: county.description,
    alternates: { canonical: `/counties/${county.slug}` },
  };
}

export default function CountyPage({ params }: { params: { county: string } }) {
  const county = getCounty(params.county);
  if (!county) notFound();
  const citiesHere = citiesInCounty(county.name);

  const photo = countyPhotos[county.slug];

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "We Buy Houses", url: `${site.url}/we-buy-houses` },
          { name: county.name, url: `${site.url}/counties/${county.slug}` },
        ]}
      />
      <section className="relative isolate overflow-hidden bg-brand-black text-white">
        {photo && (
          <img src={photo.src} alt={photo.alt} className={`absolute inset-0 -z-20 h-full w-full object-cover ${photo.pos ?? ""}`} />
        )}
        <div className="absolute inset-0 -z-10 bg-black/70" aria-hidden="true" />
        <div className="mx-auto max-w-4xl px-4 py-14 text-center md:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">{citiesHere.length} Cities Served</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">We Buy Houses in {county.name}, CA</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{county.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/get-offer" className={btnYellow}>
              Get My Cash Offer <span aria-hidden="true">→</span>
            </Link>
            <a
              href={`tel:${site.phoneE164}`}
              className="inline-flex items-center justify-center rounded-lg border border-white/70 px-6 py-3 font-bold text-white transition-colors hover:bg-white hover:text-black"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow={county.name} title={`Cities We Buy In Across ${county.name}`} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {citiesHere.map((c) => (
            <Link key={c.slug} href={`/we-buy-houses/${c.slug}`} className={`${cardCls} group block transition-shadow hover:shadow-md`}>
              <h2 className="text-lg font-bold text-brand-black">{c.name}</h2>
              <p className="mt-1 text-sm text-gray-500">Population approximately {c.population}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{c.marketNote}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark group-hover:underline">
                We Buy Houses in {c.name} →
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t see your city listed? Call {site.phone},<br className="sm:hidden" /> we buy throughout the Central Valley
          beyond this list too.
        </p>
        <div className="mt-3 text-center">
          <Link href="/we-buy-houses" className={`text-sm ${linkCls}`}>
            See Every County and City We Serve →
          </Link>
        </div>
      </Section>

      <SituationGrid title={`We Buy ${county.name} Houses in Any Situation`} />

      <CompareMini />
      <ReviewsSection gray={false} />
    </div>
  );
}
