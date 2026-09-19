import type { Metadata } from "next";
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase";
import { InstagramEmbed } from "@/components/InstagramEmbed";

export const metadata: Metadata = {
  title: "Projects - Before and After",
  description: "Real closed deals from across the Central Valley.",
  alternates: { canonical: "/projects" },
};

export const revalidate = 3600;

// Real posts from @housejunkies.inc, via Instagram's own embed widget, not
// copies. Add more permalinks here as they come in.
const instagramPosts = [
  "https://www.instagram.com/p/Cmaf_avLLv4/",
  "https://www.instagram.com/p/ClNklDvOjy2/",
  "https://www.instagram.com/p/DdEm_F0IFvc/",
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
            Real closed deals from across the Central Valley
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
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

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
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
      </section>
    </div>
  );
}
