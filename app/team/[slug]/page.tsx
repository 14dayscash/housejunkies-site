import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { teamProfiles, getTeamProfile } from "@/lib/teamProfiles";
import { BreadcrumbJsonLd, PersonJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return teamProfiles.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const person = getTeamProfile(params.slug);
  if (!person) return {};
  return {
    title: `${person.name} | ${person.title} | ${site.name}`,
    description: person.bio,
    alternates: { canonical: `/team/${person.slug}` },
  };
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const person = getTeamProfile(params.slug);
  if (!person) notFound();

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Team", url: `${site.url}/team` },
          { name: person.name, url: `${site.url}/team/${person.slug}` },
        ]}
      />
      <PersonJsonLd name={person.name} jobTitle={person.title} />

      <section className="bg-brand-black text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center sm:flex-row sm:text-left">
          <Image
            src={person.photo}
            alt={person.name}
            width={120}
            height={120}
            className="h-[120px] w-[120px] flex-shrink-0 rounded-full object-cover object-top"
          />
          <div>
            <h1 className="text-3xl font-bold">{person.name}</h1>
            <p className="mt-1 text-brand-yellow">{person.title}</p>
            <p className="mt-3 max-w-xl text-white/70">{person.bio}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-6">
          {person.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-lg font-bold text-brand-black">{s.heading}</h2>
              <p className="mt-2 text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>

        {(person.phone || person.email) && (
          <div className="mt-8 rounded-lg border border-gray-200 p-5">
            <div className="font-semibold text-brand-black">Contact {person.name.split(" ")[0]}</div>
            <div className="mt-2 space-y-1 text-sm">
              {person.phone && (
                <p>
                  <a href={`tel:${person.phone.replace(/[^\d]/g, "")}`} className="text-brand-yellow-dark hover:underline">
                    {person.phone}
                  </a>
                </p>
              )}
              {person.email && (
                <p>
                  <a href={`mailto:${person.email}`} className="text-brand-yellow-dark hover:underline">
                    {person.email}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

        <Link href="/team" className="mt-8 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          ← Back to the full team
        </Link>
      </section>
    </div>
  );
}
