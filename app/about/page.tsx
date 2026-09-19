import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.name} | Visalia's Vertically Integrated Home Buyer`,
  description: `Meet the team behind ${site.name}: acquisitions, construction, and brokerage under one roof in Visalia, CA.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">About {site.name}</h1>
      <p className="mt-4 text-gray-600">
        {site.name} is part of {site.parentOrganization}, a vertically integrated real
        estate operation based in Visalia. We buy houses directly with private capital,
        renovate them with our own licensed construction crew, and resell through our own
        licensed brokerage. No banks, no outside brokers, no out-of-town contractors.
      </p>

      <h2 className="mt-10 text-xl font-bold">Leadership</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-6">
          <div className="font-semibold">{site.people.ceo.name}</div>
          <div className="text-sm text-gray-500">{site.people.ceo.title}</div>
        </div>
        <div className="rounded-lg border border-gray-200 p-6">
          <div className="font-semibold">{site.people.ops.name}</div>
          <div className="text-sm text-gray-500">{site.people.ops.title}</div>
        </div>
      </div>
      {/* TODO: real headshots + short bios once photos are ready */}

      <h2 className="mt-10 text-xl font-bold">Licenses</h2>
      <ul className="mt-2 text-gray-600">
        <li>General Contractor: {site.licenses.generalContractor}</li>
        <li>Brokerage: {site.licenses.brokerage}</li>
      </ul>
    </div>
  );
}
