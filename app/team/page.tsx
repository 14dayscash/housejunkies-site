import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Our Team | ${site.name}`,
  description: `Meet the people behind ${site.name}: Abel Ulloa, Dominic McClelland, Jenny Madrid, and Omar Ayon.`,
  alternates: { canonical: "/team" },
};

type TeamMember = {
  name: string;
  title: string;
  bio: string;
  phone: string | null;
  email: string | null;
  photo: string;
};

const team: TeamMember[] = [
  { ...site.people.ceo, photo: "/images/team/abel.png" },
  { ...site.people.ops, photo: "/images/team/dominic.png" },
  { ...site.people.broker, photo: "/images/team/jenny.png" },
  { ...site.people.projectManager, photo: "/images/team/omar-tools.png" },
];

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
          {team.map((person) => (
            <div key={person.name} className="rounded-lg border border-gray-200 bg-white p-6">
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
              {(person.phone || person.email) && (
                <div className="mt-3 space-y-0.5 border-t border-gray-100 pt-3 text-sm">
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
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
