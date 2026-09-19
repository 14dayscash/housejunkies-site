import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { situations, getSituation } from "@/lib/situations";
import { LeadForm } from "@/components/LeadForm";
import { FaqJsonLd } from "@/components/JsonLd";
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

  return (
    <div>
      {situation.faqs && <FaqJsonLd items={situation.faqs} />}

      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">{situation.title}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{situation.summary}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="md:col-span-2">
          {situation.details?.map((paragraph, i) => (
            <p key={i} className="mt-4 text-gray-600 first:mt-0">
              {paragraph}
            </p>
          ))}

          {situation.keySteps && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-brand-black">How It Works</h2>
              <div className="mt-4 space-y-4">
                {situation.keySteps.map((step) => (
                  <div key={step.title} className="rounded-lg border border-gray-200 p-4">
                    <div className="font-semibold text-brand-black">{step.title}</div>
                    <p className="mt-1 text-sm text-gray-600">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
            <p className="mt-10 border-t border-gray-200 pt-4 text-xs text-gray-400">
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
    </div>
  );
}
