import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { situations, getSituation } from "@/lib/situations";
import { LeadForm } from "@/components/LeadForm";

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
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">{situation.title}</h1>
        <p className="mt-4 text-gray-600">{situation.summary}</p>
        {/* TODO: link to a real /projects/[slug] case study in this situation once one exists */}
      </div>
      <LeadForm sourcePage={`/sell-your-house/${situation.slug}`} />
    </section>
  );
}
