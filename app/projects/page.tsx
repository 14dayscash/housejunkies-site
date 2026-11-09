import type { Metadata } from "next";
import Link from "next/link";
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
import { PageHero, SectionHeader, ReviewsSection, btnYellow, linkCls } from "@/components/sections/Shared";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const stats = portfolioStats(properties);

export const metadata: Metadata = {
  title: `Projects: ${stats.count} Recent Purchases Broken Down, Tulare County`,
  description: `House Junkies has bought ${site.stats.homesBought} homes. Here are ${stats.count} of our most recent purchases with photos, square footage, lot size, purchase price, and estimated value across ${stats.cityCount} Tulare County cities.`,
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

      {/* 2026-11-08 overhaul: intro kept, stat line removed, Featured
          Renovation removed, Instagram given its own section, reviews added. */}
      <PageHero
        eyebrow="Recent Purchases"
        title="Houses We Just Bought"
        sub={`We have bought ${site.stats.homesBought} homes. Here are some of our newest, and exactly what we paid.`}
      />

      <section id="properties" className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <ProjectsExplorer properties={properties} cityNames={propertyCityNames()} />

        {projects && projects.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-5 shadow-sm hover:border-brand-yellow-dark"
              >
                <div className="text-sm font-semibold text-brand-yellow-dark">{p.city}</div>
                <div className="mt-1 font-medium text-brand-black">{p.address_or_area}</div>
                <p className="mt-2 text-sm text-gray-600">{p.outcome_summary}</p>
              </Link>
            ))}
          </div>
        )}

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-600">
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
        </p>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:py-16">
          <SectionHeader
            eyebrow="About the Numbers"
            title="Why We Pay Less Than the Estimate"
            sub={
              <>
                The estimate is what a house is worth fixed up and sold the normal way. Most houses we buy need a lot
                of work. Fixing one up costs us $35 to $135 per square foot, plus loan costs, closing costs, and agent
                fees when we sell.
              </>
            }
          />
          <Link href="/how-we-calculate-your-offer" className={`mt-5 inline-block text-sm ${linkCls}`}>
            See How We Figure Your Offer →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeader
          eyebrow="@housejunkies.inc"
          title="From Our Instagram"
          sub="Walkthroughs, before and afters, and the houses we are working on right now."
        />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {instagramPosts.map((url) => (
            <InstagramEmbed key={url} permalink={url} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com/housejunkies.inc"
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm ${linkCls}`}
          >
            See More on Instagram @housejunkies.inc →
          </a>
        </div>
      </section>

      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:py-16">
          <SectionHeader
            dark
            eyebrow="Your House Could Be Next"
            title="Want an Offer on Your House?"
            sub="We buy as-is, in any condition, with no fees and no repairs. You choose the closing date."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/get-offer" className={`${btnYellow} w-full sm:w-auto`}>
              Get My Cash Offer <span aria-hidden="true">→</span>
            </Link>
            <a
              href={`tel:${site.phoneE164}`}
              className="inline-flex w-full items-center justify-center rounded-lg border-2 border-white/80 px-6 py-2.5 font-bold text-white transition-colors hover:bg-white hover:text-black sm:w-auto"
            >
              Call or Text {site.phone}
            </a>
          </div>
        </div>
      </section>

      <ReviewsSection gray={false} />
    </div>
  );
}
