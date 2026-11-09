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
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  CheckList,
  CompareMini,
  FaqList,
  OfferCard,
  PageHero,
  Pills,
  ReviewsSection,
  Section,
  SectionHeader,
  Sources,
  linkCls,
} from "@/components/sections/Shared";
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "We Buy Houses", url: `${site.url}/we-buy-houses` },
          { name: city.name, url: `${site.url}/we-buy-houses/${city.slug}` },
          { name: comboLabels[situation], url: `${site.url}/we-buy-houses/${city.slug}/${situation}` },
        ]}
      />

      <PageHero
        eyebrow={`${city.name} · ${city.county}`}
        title={combo.h1}
        sub={<RichText text={combo.intro[0]} />}
      >
        <p className="mt-5 text-sm">
          <Link href={`/we-buy-houses/${city.slug}`} className="font-semibold text-brand-yellow hover:underline">
            We Buy Houses in {city.name} →
          </Link>
        </p>
      </PageHero>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {combo.intro.slice(1).map((p, i) => (
            <p key={i} className={`leading-relaxed text-gray-600 ${i > 0 ? "mt-4" : ""}`}>
              <RichText text={p} />
            </p>
          ))}

          <h2 className="mt-10 text-2xl font-bold text-brand-black">{combo.localHeading}</h2>
          {combo.local.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-gray-600">
              <RichText text={p} />
            </p>
          ))}
          <Sources items={combo.sources} />

          <h2 className="mt-10 text-2xl font-bold text-brand-black">How Selling to House Junkies Works</h2>
          <CheckList
            className="mt-5"
            items={[
              "Tell us the address and what is going on with the house",
              "Get a written cash offer within 24 hours, with no obligation",
              "No repairs, no cleaning, no agent commissions",
              "We cover closing costs, and you choose the closing date",
            ]}
          />
        </div>
        <div className="lg:col-span-2">
          <OfferCard>
            <LeadForm sourcePage={`/we-buy-houses/${city.slug}/${situation}`} />
          </OfferCard>
        </div>
      </section>

      {bought.length > 0 && (
        <Section gray>
          <SectionHeader
            eyebrow="Recent Purchases"
            title={`Houses We Bought in ${city.name}`}
            sub={`Real houses House Junkies bought in ${city.name}, with photos and the price we paid.`}
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bought.slice(0, 3).map((p) => (
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

      <Section id="faq" narrow>
        <SectionHeader eyebrow="FAQ" title={`${comboLabels[situation]} in ${city.name}: Common Questions`} />
        <div className="mt-10">
          <FaqList items={combo.faqs} />
        </div>
      </Section>

      <Section gray>
        <SectionHeader title={`Other Situations We Buy In ${city.name}`} />
        <div className="mt-8">
          <Pills
            items={comboSituationSlugs
              .filter((s) => s !== situation)
              .map((s) => ({ href: `/we-buy-houses/${city.slug}/${s}`, label: `${comboLabels[s]} in ${city.name}` }))}
          />
        </div>

        <div className="mt-14">
          <SectionHeader title={`${comboLabels[situation]} in Nearby Cities`} />
          <div className="mt-8">
            <Pills items={nearbyCombos.map((c) => ({ href: `/we-buy-houses/${c.slug}/${situation}`, label: c.name }))} />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-600">
          See everything about{" "}
          <Link href={`/we-buy-houses/${city.slug}`} className={linkCls}>
            selling your house in {city.name}
          </Link>
          ,<br className="sm:hidden" /> or read our full guide to{" "}
          <Link href={`/sell-your-house/${situation}`} className={linkCls}>
            {guideLabel[situation]}
          </Link>
          .
        </p>
      </Section>

      <CompareMini gray={false} />
      <ReviewsSection />
    </div>
  );
}
