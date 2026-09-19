import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Reviews | ${site.name}`,
  description: `What homeowners say about selling their house to ${site.name}.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Reviews</h1>
      {/*
        TODO: embed the live Google review widget once GBP category/consolidation
        (Section 9/10 of the SEO report) is fixed and reviews accumulate. Do NOT
        put placeholder or fabricated testimonials here — that was exactly the
        problem with the old site. An honest empty state beats a fake full one.
      */}
      <p className="mt-4 text-gray-600">
        We're building our review history on Google. Read real reviews here once
        we've fixed our Google Business Profile.
      </p>
      <a
        href="https://www.google.com/maps/search/House+Junkies+Inc+801+West+Main+Street+Visalia+CA"
        className="mt-4 inline-block text-brand-green underline"
      >
        See us on Google
      </a>
    </div>
  );
}
