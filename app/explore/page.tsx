import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SiteWebDiagram } from "@/components/SiteWebDiagram";

export const metadata: Metadata = {
  title: `Explore the Site | ${site.name}`,
  description: "Every page on housejunkiesinc.org, laid out visually.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Explore the Site</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Every real page on housejunkiesinc.org, laid out as a tree. Click anything.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <SiteWebDiagram />
      </section>
    </div>
  );
}
