import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero, CountyGrid, ReviewsSection } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Where We Buy Houses`,
  description: "Every county and city House Junkies buys houses in across the Central Valley.",
  alternates: { canonical: "/we-buy-houses" },
};

// 2026-11-08 overhaul: same county cards as the homepage (stock photo, county
// name, View All Cities), but every county and every city is listed here.
export default function WeBuyHousesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Where We Buy"
        title="Where We Buy Houses"
        sub="House Junkies buys houses for cash across Tulare, Kings, Fresno, and Kern counties, and beyond. Pick your county or city below."
      />
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <CountyGrid showAll maxCities={Infinity} />
        <p className="mt-10 text-center text-sm text-gray-500">
          Don&apos;t see your city? Call{" "}
          <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">
            {site.phone}
          </a>
          , we buy throughout the Central Valley beyond this list too.
        </p>
      </section>
      <ReviewsSection />
    </div>
  );
}
