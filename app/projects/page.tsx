import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects — Before and After",
  description: "Real closed deals: the condition we bought in, the renovation, and the outcome.",
  alternates: { canonical: "/projects" },
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const supabase = supabaseServer();
  const { data: projects } = await supabase
    .from("projects")
    .select("slug, city, situation, address_or_area, outcome_summary")
    .eq("voided", false)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">Projects</h1>
      <p className="mt-2 text-gray-600">Real closed deals from across the Central Valley.</p>
      {!projects || projects.length === 0 ? (
        <p className="mt-8 text-gray-500">
          Our first case studies are on the way. Check back soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="rounded-lg border border-gray-200 p-4 hover:border-brand-green"
            >
              <div className="text-sm font-semibold text-brand-green">{p.city}</div>
              <div className="mt-1 font-medium">{p.address_or_area}</div>
              <p className="mt-2 text-sm text-gray-600">{p.outcome_summary}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
