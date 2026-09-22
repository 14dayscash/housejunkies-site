import type { Metadata } from "next";
import Link from "next/link";
import { situations } from "@/lib/situations";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Every Situation We Buy Houses In | ${site.name}`,
  description: "Inherited property, probate, foreclosure, divorce, fire damage, and every other situation House Junkies buys houses in.",
  alternates: { canonical: "/sell-your-house" },
};

export default function SellYourHousePage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Every Situation We Buy Houses In</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Whatever the situation, we buy as-is, no repairs, no fees. Pick yours below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {situations.map((s) => (
            <Link
              key={s.slug}
              href={`/sell-your-house/${s.slug}`}
              className="rounded-lg border border-gray-200 p-5 hover:border-brand-yellow-dark"
            >
              <div className="font-semibold text-brand-black">{s.title}</div>
              <p className="mt-2 text-sm text-gray-600">{s.summary}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Don't see your situation listed? Call {site.phone}, we buy in circumstances beyond
          this list too.
        </p>
      </section>
    </div>
  );
}
