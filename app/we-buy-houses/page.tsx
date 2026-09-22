import type { Metadata } from "next";
import Link from "next/link";
import { counties, citiesInCounty } from "@/lib/counties";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Where We Buy Houses | ${site.name}`,
  description: "Every county and city House Junkies buys houses in across the Central Valley.",
  alternates: { canonical: "/we-buy-houses" },
};

export default function WeBuyHousesPage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Where We Buy Houses</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            House Junkies buys houses for cash across Tulare, Kings, Fresno, and Kern counties.
            Pick your county below to see every city we serve.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-10">
          {counties.map((county) => {
            const citiesHere = citiesInCounty(county.name);
            return (
              <div key={county.slug}>
                <div className="flex items-baseline justify-between">
                  <h2 className="text-xl font-bold text-brand-black">
                    <Link href={`/counties/${county.slug}`} className="hover:text-brand-yellow-dark">
                      {county.name}
                    </Link>
                  </h2>
                  <Link href={`/counties/${county.slug}`} className="text-sm font-semibold text-brand-yellow-dark hover:underline">
                    County overview →
                  </Link>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {citiesHere.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/we-buy-houses/${c.slug}`}
                      className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-sm text-gray-500">
          Don't see your city? Call {site.phone}, we buy throughout the Central Valley beyond this
          list too.
        </p>
      </section>
    </div>
  );
}
