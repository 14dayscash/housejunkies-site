import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { teamProfiles, shortBio } from "@/lib/teamProfiles";
import { PageHero, ReviewsSection, linkCls } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Our Team | Meet the People Behind House Junkies`,
  description: `Meet the people behind ${site.name}: Abel Ulloa, Dominic McClelland, Jenny Madrid, and Omar Ayon.`,
  alternates: { canonical: "/team" },
};

// 2026-11-08 overhaul: plainer intro, homepage card style, reviews.
export default function TeamPage() {
  return (
    <div>
      <PageHero
        eyebrow="Our Team"
        title="Meet the House Junkies Team"
        sub={`The people you will actually talk to when you call. Based in Visalia, and part of ${site.parentOrganization}.`}
      />

      <section className="mx-auto max-w-5xl px-4 py-14 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {teamProfiles.map((person) => (
            <Link
              key={person.slug}
              href={`/team/${person.slug}`}
              className="group flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 flex-shrink-0 rounded-full object-cover object-top ring-2 ring-brand-yellow"
                />
                <div>
                  <div className="text-lg font-bold text-brand-black group-hover:text-brand-yellow-dark">{person.name}</div>
                  <div className="text-sm font-semibold text-brand-yellow-dark">{person.title}</div>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">{shortBio(person.bio, 230)}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-yellow-dark group-hover:underline">
                View Full Profile →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link href="/about" className={linkCls}>
            Read Our Full Story →
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
