import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Reviews | ${site.name}`,
  description: `Real Google reviews for ${site.name} at ${site.address.street}, ${site.address.city}, CA.`,
  alternates: { canonical: "/reviews" },
};

// Pulled directly from the Google Business Profile at 801 W Main St, Visalia
// (the listing this website links to). Nothing here is written by us — only
// review text the reviewer actually posted gets quoted; reviews with a star
// rating but no written text are listed as such, not filled in.
// Update this file by hand whenever new reviews come in, or wire it to the
// GBP API once that access is set up.
const googleReviews = [
  {
    name: "Hannah Pendleton",
    rating: 5,
    text: "House Junkies has been very professional to work with, Dominic made the process very simple to understand their business model.",
  },
  { name: "brian garcia", rating: 5, text: null },
  { name: "Demitri Monda", rating: 5, text: null },
];

const GBP_URL =
  "https://www.google.com/maps/search/House+Junkies+Inc+801+West+Main+Street+Visalia+CA";

export default function ReviewsPage() {
  const avg =
    googleReviews.reduce((sum, r) => sum + r.rating, 0) / googleReviews.length;

  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Reviews</h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-bold text-brand-yellow">{avg.toFixed(1)}</span>
            <span className="text-white/70">from {googleReviews.length} Google reviews</span>
          </div>
          <p className="mt-2 text-sm text-white/50">
            Pulled directly from our Google Business Profile at {site.address.street}. We're
            early in building this out, real reviews only, no exceptions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-4">
          {googleReviews.map((r) => (
            <div key={r.name} className="rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-brand-black">{r.name}</span>
                <span className="text-brand-yellow-dark">{"★".repeat(r.rating)}</span>
              </div>
              {r.text ? (
                <p className="mt-2 text-gray-600">{r.text}</p>
              ) : (
                <p className="mt-2 text-sm italic text-gray-400">
                  Left a {r.rating}-star rating, no written review yet.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="font-semibold text-brand-black">Worked with us before?</p>
          <p className="mt-1 text-sm text-gray-600">
            A quick Google review helps other Visalia homeowners find us.
          </p>
          <a
            href={GBP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-md bg-brand-yellow px-5 py-2.5 font-bold text-black hover:bg-brand-yellow-dark"
          >
            Leave a Google Review
          </a>
        </div>
      </section>
    </div>
  );
}
