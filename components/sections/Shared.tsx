// Shared page sections (2026-11-08 site-wide overhaul). These are the exact
// sections built for the homepage revamp, so every page matches it:
// SectionHeader, ReviewsSection, CompareMini, SituationGrid, CountyGrid,
// FaqList. Content lives in lib/homeContent.ts, lib/situations.ts,
// lib/counties.ts and lib/reviews.ts.
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { situations } from "@/lib/situations";
import { counties, citiesInCounty } from "@/lib/counties";
import { compareUs, compareListing, reviewPicks, countyPhotos, hiddenCounties } from "@/lib/homeContent";
import { ReviewSlider } from "@/components/ReviewSlider";
import { SituationIcon } from "@/components/SituationIcon";
import { FaqJsonLd } from "@/components/JsonLd";

export const linkCls = "font-semibold text-brand-yellow-dark hover:underline";
export const btnYellow =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-6 py-3 font-bold text-black transition-colors hover:bg-brand-yellow-dark";

// Small yellow all-caps label, big heading, optional subheading. Centered.
export function SectionHeader({
  eyebrow,
  title,
  sub,
  dark = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  dark?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className={`text-xs font-bold uppercase tracking-widest ${dark ? "text-brand-yellow" : "text-brand-yellow-dark"}`}>
          {eyebrow}
        </p>
      )}
      <Tag className={`mt-2 text-3xl font-bold md:text-4xl ${dark ? "text-white" : "text-brand-black"}`}>{title}</Tag>
      {sub && <p className={`mt-3 ${dark ? "text-white/70" : "text-gray-600"}`}>{sub}</p>}
    </div>
  );
}

// Dark page hero used by the inner pages: eyebrow, H1, sub, optional extras.
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-brand-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
        {eyebrow && <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">{eyebrow}</p>}
        <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-2xl text-white/75">{sub}</p>}
        {children}
      </div>
    </section>
  );
}

// Google review slider section. Goes at the bottom of every major page.
export function ReviewsSection({
  gray = true,
  title = "What People Say About House Junkies",
  sub,
  children,
}: {
  gray?: boolean;
  title?: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={gray ? "bg-gray-50" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeader eyebrow="Reviews" title={title} sub={sub} />
        <div className="mt-10">
          <ReviewSlider reviews={reviewPicks} />
        </div>
        {children}
      </div>
    </section>
  );
}

// Standard page section: alternating white / gray, same padding everywhere.
export function Section({
  id,
  gray = false,
  narrow = false,
  border = false,
  children,
}: {
  id?: string;
  gray?: boolean;
  narrow?: boolean;
  border?: boolean; // thin top line when two same-color sections meet
  children: ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${gray ? "bg-gray-50" : ""} ${border ? "border-t border-gray-200" : ""}`}>
      <div className={`mx-auto px-4 py-14 md:py-20 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>{children}</div>
    </section>
  );
}

// Yellow-top white card.
export const cardCls = "rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm";

// Centered pill links (cities, situations, combos).
export function Pills({ items }: { items: { href: string; label: ReactNode }[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-brand-black transition-colors hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
        >
          {i.label}
        </Link>
      ))}
    </div>
  );
}

// Yellow check list (same check as the comparison cards).
export function CheckList({ items, className = "" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-700">
          <Check />
          <span className="pt-0.5">{t}</span>
        </li>
      ))}
    </ul>
  );
}

// Yellow dot fact list, two columns on desktop.
export function FactList({ items, single = false }: { items: ReactNode[]; single?: boolean }) {
  return (
    <ul className={`grid gap-3 ${single ? "" : "sm:grid-cols-2"}`}>
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-600 shadow-sm">
          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-yellow" aria-hidden="true" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

// Offer form card for page sidebars, with the "Get Your FREE Offer" top.
export function OfferCard({ children }: { children: ReactNode }) {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-t-lg border border-b-0 border-gray-200 bg-brand-black px-6 pb-4 pt-5 text-center text-white">
        <p className="text-xl font-bold">
          Get Your <span className="underline decoration-2 underline-offset-4">FREE</span> Offer
        </p>
        <p className="mt-1 text-sm text-white/70">Written cash offer in less than 24 hours.</p>
      </div>
      <div className="[&>form]:rounded-t-none [&>form]:shadow-md">{children}</div>
    </div>
  );
}

// Small source line under sourced local content.
export function Sources({ items }: { items: { url: string; label: string }[] }) {
  if (!items.length) return null;
  return (
    <p className="mt-4 text-xs text-gray-500">
      Sources:{" "}
      {items.map((s, i) => (
        <span key={s.url}>
          {i > 0 ? ", " : ""}
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-yellow-dark">
            {s.label}
          </a>
        </span>
      ))}
    </p>
  );
}

function Check() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-black">
        <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
function Cross() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-black">
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 text-white">
        <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// The two side-by-side cards (checks vs X marks). `us`/`listing` default to
// the homepage points; pages with more detail (like /compare) pass their own.
export function CompareCards({
  us = compareUs,
  listing = compareListing,
  cta = true,
}: {
  us?: [string, string][];
  listing?: [string, string][];
  cta?: boolean;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-stretch">
      <div className="relative rounded-2xl border-2 border-brand-yellow bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:p-8">
        <span className="absolute -top-3 left-6 rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
          Our Way
        </span>
        <h3 className="text-2xl font-bold text-brand-black">Selling to {site.name}</h3>
        <ul className="mt-6 space-y-5">
          {us.map(([title, body]) => (
            <li key={title} className="flex gap-3">
              <Check />
              <div>
                <p className="font-bold text-brand-black">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{body}</p>
              </div>
            </li>
          ))}
        </ul>
        {cta && (
          <Link href="/get-offer" className={`${btnYellow} mt-8 w-full`}>
            Get My Cash Offer <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-500">Listing With an Agent</h3>
        <ul className="mt-6 space-y-5">
          {listing.map(([title, body]) => (
            <li key={title} className="flex gap-3">
              <Cross />
              <div>
                <p className="font-bold text-brand-black">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// The homepage mini comparison section, as-is.
export function CompareMini({ id, gray = true, fullLink = true }: { id?: string; gray?: boolean; fullLink?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-24 ${gray ? "bg-gray-50" : ""}`}>
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeader
          eyebrow="Cash Offer vs. Listing"
          title="Why Sell to House Junkies Instead of a Market Listing"
          sub="Listing will get you top dollar with the right timing and a house that is market ready. For homes that need work, here is how the options actually stack up."
        />
        <div className="mt-10">
          <CompareCards />
        </div>
        {fullLink && (
          <div className="mt-8 text-center">
            <Link href="/compare" className={`text-sm ${linkCls}`}>
              See the Full Cash Offer vs. Listing Comparison →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// Dark situations grid with icons, the homepage section.
export function SituationGrid({
  eyebrow = "Any Situation. Any Condition.",
  title = "We Buy Central Valley Houses in Any Situation",
  sub = "Whatever the reason you need to sell, House Junkies can make you a fair cash offer on the house as it sits. No repairs, no listing, no hidden fees.",
  as = "h2",
  otherToPage = true,
}: {
  eyebrow?: string;
  title?: ReactNode;
  sub?: ReactNode;
  as?: "h1" | "h2";
  otherToPage?: boolean; // false on /sell-your-house itself: last card calls instead
}) {
  const OtherTag = otherToPage ? Link : "a";
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      <img
        src="https://images.unsplash.com/photo-1758304480344-f8d0de5f4f25?fm=jpg&q=70&w=1920&auto=format&fit=crop"
        alt=""
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/75 to-black/90" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeader eyebrow={eyebrow} title={title} sub={sub} dark as={as} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map((sit) => (
            <Link
              key={sit.slug}
              href={`/sell-your-house/${sit.slug}`}
              className="group flex gap-4 rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:border-brand-yellow/70 hover:bg-white/[0.1]"
            >
              <SituationIcon slug={sit.slug} className="h-9 w-9 shrink-0 text-brand-yellow" />
              <div>
                <h3 className="text-lg font-bold">{sit.navLabel}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{sit.homeCard}</p>
                <span className="mt-2 inline-block text-sm font-semibold text-brand-yellow group-hover:underline">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
          <OtherTag
            href={otherToPage ? "/sell-your-house" : `tel:${site.phoneE164}`}
            className="group flex gap-4 rounded-xl border border-brand-yellow/60 bg-brand-yellow/10 p-5 backdrop-blur-sm transition-colors hover:bg-brand-yellow/20 lg:col-span-2"
          >
            <SituationIcon slug="other" className="h-9 w-9 shrink-0 text-brand-yellow" />
            <div>
              <h3 className="text-lg font-bold">Something Else?</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Bankruptcy, a bad neighborhood, a house you just want gone. If it is a house in the Central Valley,
                call us at {site.phone}. Every situation gets a real answer and a real offer.
              </p>
              <span className="mt-2 inline-block text-sm font-semibold text-brand-yellow group-hover:underline">
                {otherToPage ? "See Every Situation We Solve →" : `Call or Text ${site.phone} →`}
              </span>
            </div>
          </OtherTag>
        </div>
      </div>
    </section>
  );
}

function topCities(countyName: string, n: number) {
  return [...citiesInCounty(countyName)]
    .sort(
      (x, y) =>
        Number(!!y.featured) - Number(!!x.featured) ||
        Number(String(y.population).replace(/\D/g, "")) - Number(String(x.population).replace(/\D/g, "")),
    )
    .slice(0, n);
}

// County cards with stock photos. `maxCities` 3 on the homepage; the
// /we-buy-houses page passes Infinity and shows every county.
export function CountyGrid({ maxCities = 3, showAll = false }: { maxCities?: number; showAll?: boolean }) {
  const list = showAll ? counties : counties.filter((c) => !hiddenCounties.includes(c.slug));
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((county) => {
        const photo = countyPhotos[county.slug];
        const cityList = topCities(county.name, maxCities);
        const wide = !showAll && (county.slug === "tulare-county" || county.slug === "fresno-county");
        return (
          <div
            key={county.slug}
            className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${wide ? "lg:col-span-2" : ""}`}
          >
            <Link href={`/counties/${county.slug}`} className="group relative block h-36 overflow-hidden bg-brand-black">
              {photo && (
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={`h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105 ${photo.pos ?? ""}`}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                <h3 className="text-xl font-bold">{county.name}</h3>
                <span className="text-sm font-semibold text-brand-yellow group-hover:underline">View All Cities →</span>
              </div>
            </Link>
            <div className="flex flex-wrap gap-2 p-4">
              {cityList.map((c) => (
                <Link
                  key={c.slug}
                  href={`/we-buy-houses/${c.slug}`}
                  className="rounded-full border border-gray-300 px-3 py-1 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// FAQ dropdowns (native details/summary) + FAQPage schema.
export function FaqList({ items, schema = true }: { items: { question: string; answer: ReactNode; text?: string }[]; schema?: boolean }) {
  return (
    <>
      {schema && (
        <FaqJsonLd
          items={items.map((f) => ({ question: f.question, answer: f.text ?? (typeof f.answer === "string" ? f.answer : "") }))}
        />
      )}
      <div className="space-y-2">
        {items.map((f) => (
          <details
            key={f.question}
            className="group rounded-lg border border-gray-200 bg-white shadow-sm open:border-brand-yellow/60"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 [&::-webkit-details-marker]:hidden">
              <h3 className="text-sm font-semibold text-brand-black md:text-base">{f.question}</h3>
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180">
                <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="border-t border-gray-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-600">{f.answer}</div>
          </details>
        ))}
      </div>
    </>
  );
}
