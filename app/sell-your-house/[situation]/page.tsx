import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { situations, getSituation } from "@/lib/situations";
import { cities } from "@/lib/cities";
import { LeadForm } from "@/components/LeadForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  CompareMini,
  FactList,
  FaqList,
  OfferCard,
  PageHero,
  Pills,
  ReviewsSection,
  Section,
  SectionHeader,
  Sources,
  cardCls,
  linkCls,
} from "@/components/sections/Shared";
import { Linkify } from "@/components/Linkify";
import { RichText } from "@/components/RichText";
import { comboCitySlugs, isComboSituation } from "@/lib/combos";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return situations.map((s) => ({ situation: s.slug }));
}

export function generateMetadata({ params }: { params: { situation: string } }): Metadata {
  const situation = getSituation(params.situation);
  if (!situation) return {};
  return {
    title: situation.metaTitle,
    description: `${situation.metaDescription} Call ${site.phone}.`,
    alternates: { canonical: `/sell-your-house/${situation.slug}` },
  };
}

export default function SituationPage({ params }: { params: { situation: string } }) {
  const situation = getSituation(params.situation);
  if (!situation) notFound();

  const keySteps = situation.keySteps ?? [
    { title: "Info", body: `Tell us about your property and situation, including anything specific to ${situation.title.toLowerCase()}.` },
    { title: "Consult", body: "We walk through your specific situation and what a cash offer would look like." },
    { title: "Process", body: "We handle whatever paperwork or coordination the situation calls for." },
    { title: "Escrow & Close", body: "We open escrow with a local title company and you get paid on your timeline." },
  ];

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Sell Your House", url: `${site.url}/sell-your-house/${situation.slug}` },
          { name: situation.title, url: `${site.url}/sell-your-house/${situation.slug}` },
        ]}
      />

      <PageHero eyebrow="Sell Your House" title={situation.title} sub={situation.summary} />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-brand-black">Quick Facts</h2>
          <div className="mt-5">
            <FactList single items={situation.quickFacts} />
          </div>

          {situation.details && (
            <>
              <h2 className="mt-12 text-2xl font-bold text-brand-black">More Detail</h2>
              {situation.details.map((paragraph, i) => (
                <p key={i} className="mt-4 leading-relaxed text-gray-600">
                  <Linkify text={paragraph} />
                </p>
              ))}
            </>
          )}

          {situation.localSection && (
            <>
              <h2 className="mt-12 text-2xl font-bold text-brand-black">{situation.localSection.heading}</h2>
              {situation.localSection.paragraphs.map((paragraph, i) => (
                <p key={i} className="mt-4 leading-relaxed text-gray-600">
                  <RichText text={paragraph} />
                </p>
              ))}
              <Sources items={situation.localSection.sources ?? []} />
            </>
          )}

          <p className="mt-10 text-sm text-gray-500">
            {site.name} is vertically integrated: we buy, renovate with our own
            licensed crew ({site.licenses.generalContractor}), and can resell
            through our own brokerage ({site.licenses.brokerage}), so there's no
            middleman shopping your deal to a stranger.
          </p>
        </div>
        <div className="lg:col-span-2">
          <OfferCard>
            <LeadForm sourcePage={`/sell-your-house/${situation.slug}`} />
          </OfferCard>
        </div>
      </section>

      <Section gray>
        <SectionHeader eyebrow="The Process" title="How It Works" />
        <div className={`mt-10 grid gap-5 sm:grid-cols-2 ${keySteps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {keySteps.map((step, i) => (
            <div key={step.title} className={cardCls}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-sm font-bold text-black">
                {i + 1}
              </span>
              <h3 className="mt-4 font-bold text-brand-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {situation.faqs && (
        <Section id="faq" narrow>
          <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
          <div className="mt-10">
            <FaqList
              items={situation.faqs.map((f) => ({ question: f.question, answer: <Linkify text={f.answer} />, text: f.answer }))}
            />
          </div>
          {situation.legalDisclaimer && (
            <p className="mt-10 border-t border-gray-200 pt-4 text-xs text-gray-600">{situation.legalDisclaimer}</p>
          )}
        </Section>
      )}
      {!situation.faqs && situation.legalDisclaimer && (
        <Section narrow>
          <p className="text-xs text-gray-600">{situation.legalDisclaimer}</p>
        </Section>
      )}

      <Section gray>
        <SectionHeader title="Top Cities We Buy In" />
        <div className="mt-8">
          <Pills
            items={cities
              .filter((c) => c.featured)
              .slice(0, 5)
              .map((c) => ({ href: `/we-buy-houses/${c.slug}`, label: c.name }))}
          />
        </div>
        <div className="mt-6 text-center">
          <Link href="/we-buy-houses" className={`text-sm ${linkCls}`}>
            See Every City We Serve →
          </Link>
        </div>

        {isComboSituation(situation.slug) && (
          <div className="mt-14">
            <SectionHeader title={`${situation.title} in Your City`} />
            <div className="mt-8">
              <Pills
                items={comboCitySlugs.flatMap((slug) => {
                  const c = cities.find((x) => x.slug === slug);
                  return c ? [{ href: `/we-buy-houses/${slug}/${situation.slug}`, label: c.name }] : [];
                })}
              />
            </div>
          </div>
        )}

        <div className="mt-14">
          <SectionHeader title="Other Situations We Buy In" />
          <div className="mt-8">
            <Pills
              items={situations
                .filter((s) => s.slug !== situation.slug)
                .map((s) => ({ href: `/sell-your-house/${s.slug}`, label: s.title }))}
            />
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          Based in Visalia?{" "}
          <Link href="/we-buy-houses/visalia" className={linkCls}>
            See How We Buy Houses in Visalia, CA →
          </Link>
        </div>
      </Section>

      <CompareMini gray={false} />
      <ReviewsSection />
    </div>
  );
}
