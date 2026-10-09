import type { Metadata } from "next";
import Link from "next/link";
import { buyPages } from "@/lib/buyPages";
import { BuyerInquiryForm } from "@/components/BuyerInquiryForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Property for Sale in Visalia, CA | Homes, Land & Investment Property",
  description:
    "Homes, investment property, buildings, and land for sale in Visalia and Tulare County from a local group that buys, renovates, and sells. Call (559) 368-8956.",
  alternates: { canonical: "/buy" },
};

export default function BuyHubPage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Buy Property", url: `${site.url}/buy` },
        ]}
      />
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Property for Sale in Visalia &amp; Tulare County</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            We buy houses, but we also sell. {site.name} renovates and resells homes across the Central
            Valley, and our brokerage, {site.legacyRealEstate.name}, works with buyers every day. If you
            are looking for a house, an investment property, a building, or land, tell us what you want.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-brand-black">What Are You Looking For?</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {buyPages.map((p) => (
              <Link key={p.slug} href={`/buy/${p.slug}`} className="rounded-lg border border-gray-200 p-5 hover:border-brand-yellow-dark">
                <div className="font-semibold text-brand-black">{p.title}</div>
                <p className="mt-2 text-sm text-gray-600">{p.metaDescription}</p>
              </Link>
            ))}
          </div>

          <h2 className="mt-10 text-xl font-bold text-brand-black">Renovated Homes</h2>
          <p className="mt-3 text-gray-600">
            Every house we buy is renovated by our own licensed crew ({site.licenses.generalContractor}) and
            resold through {site.legacyRealEstate.name}. Because the same group handles every stage, you can
            ask what was repaired and what it cost. Ask us what we have coming up, including homes that are
            not on the MLS yet.
          </p>

          <h2 className="mt-10 text-xl font-bold text-brand-black">Why Buy From a Local Investor</h2>
          <p className="mt-3 text-gray-600">
            We have bought, renovated, and resold {site.stats.homesBought} homes, and per SFR Analytics we are
            the {site.stats.sfrAnalyticsRank} investment group in Visalia by transaction volume. Inventory
            changes often, so the fastest way to see what is available is to call{" "}
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">{site.phone}</a>{" "}
            or send us your criteria.
          </p>
          <p className="mt-6 text-sm text-gray-500">
            Selling instead?{" "}
            <Link href="/we-buy-houses" className="font-semibold text-brand-yellow-dark hover:underline">See where we buy houses</Link>.
          </p>
        </div>
        <div>
          <BuyerInquiryForm topic="Property for sale" />
        </div>
      </section>
    </div>
  );
}
