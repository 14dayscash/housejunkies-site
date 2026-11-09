import type { Metadata } from "next";
import Link from "next/link";
import { buyPages } from "@/lib/buyPages";
import { BuyerInquiryForm } from "@/components/BuyerInquiryForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { forSaleProperties, properties } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { PageHero, SectionHeader, ReviewsSection, linkCls } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: "Property for Sale in Visalia, CA | Homes, Land & Investment Property",
  description:
    "Homes, investment property, buildings, and land for sale in Visalia and Tulare County from a local group that buys, renovates, and sells. Call (559) 368-8956.",
  alternates: { canonical: "/buy" },
};

export default function BuyHubPage() {
  const listings = forSaleProperties();
  const closed = properties.filter((p) => p.status === "Sold" || p.status === "Rented");

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Buy Property", url: `${site.url}/buy` },
        ]}
      />
      {/* 2026-11-08 overhaul: same content, centered, new section styling. */}
      <PageHero
        eyebrow="Buy From Us"
        title="Property for Sale in Visalia & Tulare County"
        sub={`We buy houses, but we also sell. ${site.name} renovates and resells homes across the Central Valley, and our brokerage, ${site.legacyRealEstate.name}, works with buyers every day. If you are looking for a house, an investment property, a building, or land, tell us what you want.`}
      />

      {listings.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <SectionHeader
            eyebrow="Available Now"
            title="Houses for Sale Right Now"
            sub={`${listings.length} ${listings.length === 1 ? "property" : "properties"} we own and are offering for sale right now. Open any listing for photos, a map, and the numbers.`}
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((p, i) => (
              <li key={p.slug}>
                <PropertyCard p={p} priority={i < 3} />
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href="/projects" className={`text-sm ${linkCls}`}>
              See Every Project →
            </Link>
          </div>
          {closed.length > 0 && (
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-gray-600">
              Already sold or rented:{" "}
              {closed.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 ? ", " : ""}
                  <Link href={`/projects/${p.slug}`} className="font-semibold text-brand-yellow-dark hover:underline">
                    {p.street}
                  </Link>
                </span>
              ))}
              .
            </p>
          )}
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-gray-500">
            Prices and availability are subject to change and nothing on this page is an offer. Estimated values are
            automated estimates, not appraisals. Square footage, lot size, and year built come from county records and
            should be verified by the buyer.
          </p>
        </section>
      )}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <SectionHeader eyebrow="Find Your Fit" title="What Are You Looking For?" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {buyPages.map((p) => (
              <Link
                key={p.slug}
                href={`/buy/${p.slug}`}
                className="group rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="text-lg font-bold text-brand-black group-hover:text-brand-yellow-dark">{p.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{p.metaDescription}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark group-hover:underline">
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-black">Renovated Homes</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                Every house we buy is renovated by our own licensed crew ({site.licenses.generalContractor}) and
                resold through {site.legacyRealEstate.name}. Because the same group handles every stage, you can ask
                what was repaired and what it cost. Ask us what we have coming up, including homes that are not on
                the MLS yet. See what we have already bought in{" "}
                <Link href="/projects" className="font-semibold text-brand-yellow-dark hover:underline">our projects</Link>.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-black">Why Buy From a Local Investor</h2>
              <p className="mt-3 leading-relaxed text-gray-600">
                We have bought, renovated, and resold {site.stats.homesBought} homes, and per SFR Analytics we are
                the {site.stats.sfrAnalyticsRank} investment group in Visalia by transaction volume. Inventory
                changes often, so the fastest way to see what is available is to call{" "}
                <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">{site.phone}</a>{" "}
                or send us your criteria.
              </p>
            </div>
            <p className="text-sm text-gray-500">
              Selling instead?{" "}
              <Link href="/we-buy-houses" className="font-semibold text-brand-yellow-dark hover:underline">See where we buy houses</Link>.
            </p>
          </div>
          <div>
            <BuyerInquiryForm topic="Property for sale" />
          </div>
        </div>
      </section>

      <ReviewsSection />
    </div>
  );
}
