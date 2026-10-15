import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabaseServer } from "@/lib/supabase";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import {
  newestFirst,
  portfolioStats,
  propertyCityNames,
  properties,
  moneyShort,
  citySlug,
} from "@/lib/properties";
import { PropertyStats } from "@/components/PropertyStats";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const stats = portfolioStats(properties);

export const metadata: Metadata = {
  title: `Projects: ${stats.count} Recent Purchases Broken Down, Tulare County`,
  description: `House Junkies has bought ${site.stats.homesBought} homes. Here are ${stats.count} of our most recent purchases with photos, square footage, lot size, purchase price, and estimated value, ${moneyShort(stats.purchaseTotal)} combined across ${stats.cityCount} cities.`,
  alternates: { canonical: "/projects" },
};

export const revalidate = 3600;

// Real posts from @housejunkies.inc, via Instagram's own embed widget, not
// copies. Add more permalinks here as they come in.
const instagramPosts = [
  "https://www.instagram.com/p/Cmaf_avLLv4/",
  "https://www.instagram.com/p/ClNklDvOjy2/",
];

export default async function ProjectsPage() {
  const supabase = supabaseServer();
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, city, situation, address_or_area, outcome_summary")
    .eq("voided", false)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Projects", url: `${site.url}/projects` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Recent House Junkies purchases in Tulare County",
            numberOfItems: properties.length,
            itemListElement: newestFirst().map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/projects/${p.slug}`,
              name: `${p.street}, ${p.city}, CA ${p.zip}`,
            })),
          }),
        }}
      />

      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Houses We Just Bought</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">
            We have bought {site.stats.homesBought} homes. Here are some of our newest, and exactly what we paid.
          </p>
          <div className="mt-8 max-w-2xl">
            <PropertyStats list={properties} tone="dark" />
          </div>
        </div>
      </section>

      <section id="properties" className="mx-auto max-w-6xl px-4 py-10">
        <ProjectsExplorer properties={properties} cityNames={propertyCityNames()} />
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-bold text-brand-black">Why We Pay Less Than the Estimate</h2>
          <p className="mt-4 text-gray-600">
            The estimate is what a house is worth fixed up and sold the normal way. Most houses we buy need a lot of
            work. Fixing one up costs us $35 to $135 per square foot, plus loan costs, closing costs, and agent fees
            when we sell.{" "}
            <Link href="/how-we-calculate-your-offer" className="font-semibold text-brand-yellow-dark hover:underline">
              See how we figure your offer
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-12 text-sm text-gray-600">
        We buy houses in{" "}
        {propertyCityNames()
          .map((name) => cities.find((c) => c.slug === citySlug(name)))
          .filter((c): c is NonNullable<typeof c> => Boolean(c))
          .map((c, i, arr) => (
            <span key={c.slug}>
              <Link href={`/we-buy-houses/${c.slug}`} className="font-semibold text-brand-yellow-dark hover:underline">
                {c.name}
              </Link>
              {i < arr.length - 2 ? ", " : i === arr.length - 2 ? ", and " : ""}
            </span>
          ))}
        , and all over the Central Valley.
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-xl font-bold text-brand-black">Featured Renovation</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <Image
                src="/images/projects/property-1/before.jpg"
                alt="Property before renovation"
                width={1600}
                height={1067}
                className="w-full object-cover"
              />
            </div>
            <p className="mt-2 text-center text-sm font-semibold uppercase tracking-wide text-gray-400">Before</p>
          </div>
          <div>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <Image
                src="/images/projects/property-1/after.jpg"
                alt="Property after renovation"
                width={1600}
                height={1067}
                className="w-full object-cover"
              />
            </div>
            <p className="mt-2 text-center text-sm font-semibold uppercase tracking-wide text-brand-yellow-dark">After</p>
          </div>
        </div>

        {projects && projects.length > 0 && (
          <div className="mb-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="rounded-lg border border-gray-200 p-4 hover:border-brand-yellow-dark"
              >
                <div className="text-sm font-semibold text-brand-yellow-dark">{p.city}</div>
                <div className="mt-1 font-medium text-brand-black">{p.address_or_area}</div>
                <p className="mt-2 text-sm text-gray-600">{p.outcome_summary}</p>
              </Link>
            ))}
          </div>
        )}

        <h2 className="mt-12 text-xl font-bold text-brand-black">From Our Instagram</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {instagramPosts.map((url) => (
            <InstagramEmbed key={url} permalink={url} />
          ))}
        </div>
        <p className="mt-8 text-center">
          <a
            href="https://instagram.com/housejunkies.inc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-yellow-dark hover:underline"
          >
            See more on Instagram @housejunkies.inc →
          </a>
        </p>
        <p className="mt-4 flex justify-center gap-6 text-sm">
          <Link href="/reviews" className="font-semibold text-brand-yellow-dark hover:underline">
            Read our reviews →
          </Link>
          <Link href="/team" className="font-semibold text-brand-yellow-dark hover:underline">
            Meet the team →
          </Link>
        </p>
      </section>
    </div>
  );
}
