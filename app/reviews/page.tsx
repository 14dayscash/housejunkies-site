import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ReviewJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: `Reviews | ${site.name}`,
  description: `Real Google reviews for ${site.name} at ${site.address.street}, ${site.address.city}, CA.`,
  alternates: { canonical: "/reviews" },
};

// Pulled directly from the Google Business Profile at 801 W Main St, Visalia
// (the listing this website links to). Nothing here is written by us, only
// review text the reviewer actually posted gets quoted. Reviews with a star
// rating but no written text are shown as such, not filled in.
// Update this file by hand as new reviews come in.
const googleReviews = [
  { name: "Hannah Pendleton", rating: 5, text: "House Junkies has been very professional to work with, Dominic made the process very simple to understand their business model." },
  { name: "brian garcia", rating: 5, text: null },
  { name: "Demitri Monda", rating: 5, text: null },
];

const GBP_URL = "https://www.google.com/maps/search/House+Junkies+Inc+801+West+Main+Street+Visalia+CA";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" className={i < count ? "fill-brand-yellow" : "fill-gray-200"}>
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.2 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

export default function ReviewsPage() {
  const avg = googleReviews.reduce((sum, r) => sum + r.rating, 0) / googleReviews.length;
  const reviewsWithText = googleReviews
    .filter((r): r is { name: string; rating: number; text: string } => r.text !== null)
    .map((r) => ({ author: r.name, rating: r.rating, text: r.text }));

  return (
    <div>
      <ReviewJsonLd
        ratingValue={avg}
        reviewCount={googleReviews.length}
        reviews={reviewsWithText}
      />
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">Reviews</h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-4xl font-bold text-brand-yellow">{avg.toFixed(1)}</span>
            <div className="text-left">
              <Stars count={Math.round(avg)} />
              <p className="text-sm text-white/60">{googleReviews.length} Google reviews</p>
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/50">
            Pulled directly from our Google Business Profile at {site.address.street}. We're
            early in building this out, real reviews only, and we'll keep this page current with
            new ones weekly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {googleReviews.map((r) => (
            <div key={r.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-black text-sm font-bold text-brand-yellow">
                  {initials(r.name)}
                </div>
                <div>
                  <div className="font-semibold text-brand-black">{r.name}</div>
                  <Stars count={r.rating} />
                </div>
              </div>
              {r.text ? (
                <p className="mt-4 text-sm leading-relaxed text-gray-600">"{r.text}"</p>
              ) : (
                <p className="mt-4 text-sm italic text-gray-400">
                  Left a {r.rating}-star rating on Google, no written review yet.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-gray-50 p-8 text-center">
          <p className="text-lg font-semibold text-brand-black">Worked with us before?</p>
          <p className="mt-1 text-gray-600">
            A quick review helps other Visalia homeowners find us.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={GBP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-brand-yellow px-6 py-3 font-bold text-black hover:bg-brand-yellow-dark"
            >
              Leave a Google Review
            </a>
            <a
              href="https://www.bbb.org/pacific-southwest/customer-reviews/real-estate-investing/house-junkies-inc-in-visalia-ca-850058147/add/"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <img
                src="https://seal-central-northern-western-arizona.bbb.org/customer-reviews/badge-10-bbb-850058147.png"
                style={{ border: 0 }}
                alt="House Junkies Inc BBB Business Review"
              />
            </a>
          </div>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <Link href="/projects" className="font-semibold text-brand-yellow-dark hover:underline">
              See our projects →
            </Link>
            <Link href="/team" className="font-semibold text-brand-yellow-dark hover:underline">
              Meet the team →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
