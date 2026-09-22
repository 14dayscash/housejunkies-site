import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { teamProfiles } from "@/lib/teamProfiles";

export const metadata: Metadata = {
  title: `Our Team | ${site.name}`,
  description: `Meet the people behind ${site.name}: Abel Ulloa, Dominic McClelland, Jenny Madrid, and Omar Ayon.`,
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Our Team</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Four people running acquisitions, construction, and brokerage under one roof, part of{" "}
            {site.parentOrganization}.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {teamProfiles.map((person) => (
            <Link
              key={person.slug}
              href={`/team/${person.slug}`}
              className="rounded-lg border border-gray-200 bg-white p-6 hover:border-brand-yellow-dark"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={person.photo}
                  alt={person.name}
                  width={72}
                  height={72}
                  className="h-[72px] w-[72px] flex-shrink-0 rounded-full object-cover object-top"
                />
                <div>
                  <div className="font-semibold text-brand-black">{person.name}</div>
                  <div className="text-sm font-medium text-brand-yellow-dark">{person.title}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">{person.bio}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark">
                View full profile →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
