import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { teamProfiles, getTeamProfile, shortBio } from "@/lib/teamProfiles";
import { BreadcrumbJsonLd, PersonJsonLd } from "@/components/JsonLd";
import { Linkify } from "@/components/Linkify";
import { site } from "@/lib/site";
import { ReviewsSection, btnYellow, linkCls } from "@/components/sections/Shared";

export function generateStaticParams() {
  return teamProfiles.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const person = getTeamProfile(params.slug);
  if (!person) return {};
  return {
    title: `${person.name} - ${person.title} | Visalia, CA`,
    description: shortBio(person.bio),
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
      <PersonJsonLd
        name={person.name}
        jobTitle={person.title}
        slug={person.slug}
        image={`${site.url}${person.photo}`}
        description={person.bio}
        telephone={person.phone ?? undefined}
        sameAs={person.sameAs}
        knowsAbout={["Cash home buying", "Real estate investing", "Probate and inherited property", "Visalia and Central Valley real estate"]}
      />

      {/* 2026-11-08 overhaul: same profile content, new layout, reviews. */}
      <section className="bg-brand-black text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-12 text-center md:py-16">
          <Image
            src={person.photo}
            alt={person.name}
            width={144}
            height={144}
            priority
            className="h-32 w-32 rounded-full object-cover object-top ring-4 ring-brand-yellow md:h-36 md:w-36"
          />
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-brand-yellow">{site.name} Team</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">{person.name}</h1>
          <p className="mt-2 text-lg text-white/80">{person.title}</p>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/70">
            <Linkify text={person.bio} exclude={[`/team/${person.slug}`]} />
          </p>
          {(person.phone || person.email) && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {person.phone && (
                <a href={`tel:${person.phone.replace(/[^\d]/g, "")}`} className={btnYellow}>
                  Call {person.name.split(" ")[0]}: {person.phone}
                </a>
              )}
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 px-6 py-2.5 font-bold text-white transition-colors hover:bg-white hover:text-black"
                >
                  Email {person.name.split(" ")[0]}
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {person.sections.map((s) => (
            <div key={s.heading} className="rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-black">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                <Linkify text={s.body} exclude={[`/team/${person.slug}`]} />
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link href="/team" className={linkCls}>
            ← Back to the Full Team
          </Link>
          <Link href="/construction" className={linkCls}>
            House Junkies Construction Services →
          </Link>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}
