import type { Metadata } from "next";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase";
import { site } from "@/lib/site";
import { InstagramEmbed } from "@/components/InstagramEmbed";

export const metadata: Metadata = {
  title: "Projects — Before and After",
  description: "Real closed deals: the condition we bought in, the renovation, and the outcome.",
  alternates: { canonical: "/projects" },
};

export const revalidate = 3600;

// Real posts from @housejunkies.inc while the dedicated case-study archive
// (below, from Supabase) builds up. These are live Instagram embeds, not
// copies — pulled straight from the source, dates and all. Both of these
// happen to be from 2022, which says something true and worth acting on:
// it's been a while since a fresh "SOLD" post went up. The fix is publishing
// a new one within 7 days of every closing, per the SEO report's flywheel.
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
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Projects</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Real closed deals from across the Central Valley — the condition we bought
            in, the work, and the outcome.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        {(!projects || projects.length === 0) && (
          <div className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="font-semibold text-brand-black">
              We're building out our full case study archive.
            </p>
            <p className="mt-1 text-sm text-gray-600">
              In the meantime, here are two real closings from our Instagram.
            </p>
          </div>
        )}

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

        <h2 className="text-xl font-bold text-brand-black">From Our Instagram</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {instagramPosts.map((url) => (
            <InstagramEmbed key={url} permalink={url} />
          ))}
        </div>
        <p className="mt-6 text-center">
          <a
            href={`https://instagram.com/housejunkies.inc`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-yellow-dark hover:underline"
          >
            See more on Instagram @housejunkies.inc →
          </a>
        </p>
      </section>
    </div>
  );
}
