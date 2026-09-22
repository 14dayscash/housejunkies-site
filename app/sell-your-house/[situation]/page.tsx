import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { situations, getSituation } from "@/lib/situations";
import { cities } from "@/lib/cities";
import { LeadForm } from "@/components/LeadForm";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return situations.map((s) => ({ situation: s.slug }));
}

export function generateMetadata({ params }: { params: { situation: string } }): Metadata {
  const situation = getSituation(params.situation);
  if (!situation) return {};
  return {
    title: situation.metaTitle,
    description: situation.metaDescription,
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
      {situation.faqs && <FaqJsonLd items={situation.faqs} />}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Sell Your House", url: `${site.url}/sell-your-house/${situation.slug}` },
          { name: situation.title, url: `${site.url}/sell-your-house/${situation.slug}` },
        ]}
      />

      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">{situation.title}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{situation.summary}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-brand-black">Quick Facts</h2>
          <ul className="mt-4 space-y-3">
            {situation.quickFacts.map((fact, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="mt-1 text-brand-yellow-dark">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>

          {situation.details && (
            <>
              <h2 className="mt-10 text-xl font-bold text-brand-black">More Detail</h2>
              {situation.details.map((paragraph, i) => (
                <p key={i} className="mt-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-bold text-brand-black">How It Works</h2>
            <div className="mt-4 space-y-4">
              {keySteps.map((step) => (
                <div key={step.title} className="rounded-lg border border-gray-200 p-4">
                  <div className="font-semibold text-brand-black">{step.title}</div>
                  <p className="mt-1 text-sm text-gray-600">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

          {situation.faqs && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-brand-black">Frequently Asked Questions</h2>
              <dl className="mt-4 space-y-4">
                {situation.faqs.map((f) => (
                  <div key={f.question}>
                    <dt className="font-semibold text-brand-black">{f.question}</dt>
                    <dd className="mt-1 text-gray-600">{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {situation.legalDisclaimer && (
            <p className="mt-10 border-t border-gray-200 pt-4 text-xs text-gray-600">
              {situation.legalDisclaimer}
            </p>
          )}

          <p className="mt-8 text-sm text-gray-500">
            {site.name} is vertically integrated: we buy, renovate with our own
            licensed crew ({site.licenses.generalContractor}), and can resell
            through our own brokerage ({site.licenses.brokerage}), so there's no
            middleman shopping your deal to a stranger.
          </p>
        </div>
        <div>
          <LeadForm sourcePage={`/sell-your-house/${situation.slug}`} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-lg font-bold text-brand-black">Top Cities We Buy In</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {cities.filter((c) => c.featured).slice(0, 5).map((c) => (
            <Link
              key={c.slug}
              href={`/we-buy-houses/${c.slug}`}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <Link href="/we-buy-houses" className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          See every city we serve →
        </Link>
      </section>
    </div>
  );
}
