import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";
import { counties } from "@/lib/counties";
import { teamProfiles } from "@/lib/teamProfiles";
import { houseJunkiesPosts } from "@/lib/houseJunkiesPosts";
import { SiteWebDiagram } from "@/components/SiteWebDiagram";

export const metadata: Metadata = {
  title: `Explore the Site | ${site.name}`,
  description: "Every page on housejunkiesinc.org, laid out visually.",
  alternates: { canonical: "/explore" },
};

function PillGroup({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-brand-black">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Explore the Site</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Every real page on housejunkiesinc.org, in one place.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <SiteWebDiagram />
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 pb-14">
        <PillGroup
          title="Main Pages"
          links={[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Our Team", href: "/team" },
            { label: "Reviews", href: "/reviews" },
            { label: "Projects", href: "/projects" },
            { label: "Blog", href: "/blog" },
            { label: "FAQ", href: "/faq" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "How We Calculate Your Offer", href: "/how-we-calculate-your-offer" },
            { label: "Cash Offer vs. Listing", href: "/compare" },
            { label: "Partner With Us", href: "/partners/agents" },
            { label: "Contact", href: "/contact" },
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ]}
        />

        <PillGroup
          title="Our Team"
          links={teamProfiles.map((p) => ({ label: p.name, href: `/team/${p.slug}` }))}
        />

        <PillGroup
          title="We Buy Houses"
          links={[
            { label: "All Cities Overview", href: "/we-buy-houses" },
            ...cities.map((c) => ({ label: c.name, href: `/we-buy-houses/${c.slug}` })),
          ]}
        />

        <PillGroup
          title="Counties"
          links={counties.map((c) => ({ label: c.name, href: `/counties/${c.slug}` }))}
        />

        <PillGroup
          title="Sell Your House"
          links={[
            { label: "All Situations Overview", href: "/sell-your-house" },
            ...situations.map((s) => ({ label: s.title, href: `/sell-your-house/${s.slug}` })),
          ]}
        />

        {houseJunkiesPosts.length > 0 && (
          <PillGroup
            title="Blog Posts"
            links={houseJunkiesPosts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }))}
          />
        )}
      </section>
    </div>
  );
}
