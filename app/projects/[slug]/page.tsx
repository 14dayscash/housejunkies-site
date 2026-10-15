import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import {
  acresLabel,
  citySlug,
  getProperty,
  headlinePrice,
  secondaryPrice,
  longDate,
  daysBetween,
  money,
  num,
  properties,
  propertiesIn,
  propertyBlurb,
  showYearBuilt,
  type Property,
} from "@/lib/properties";
import { cities } from "@/lib/cities";
import { PropertyCard, StatusBadge } from "@/components/PropertyCard";
import { PropertyMap } from "@/components/PropertyMap";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ListingBroker } from "@/components/ListingBroker";
import { BuyerInquiryForm } from "@/components/BuyerInquiryForm";
import { ContactForm } from "@/components/ContactForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProperty(params.slug);
  if (!p) return {};
  const price = headlinePrice(p);
  const verb =
    p.status === "For Sale" ? "For Sale" : p.status === "Sold" ? "Sold" : p.status === "Rented" ? "Rented" : "Purchased";
  const title = `${p.street}, ${p.city} CA | ${p.type} ${verb}`;
  return {
    title,
    description: `${p.street}, ${p.city}, CA ${p.zip}: ${num(p.sqft)} sq ft ${p.type.toLowerCase()} on ${acresLabel(
      p.lotSqft,
    )}. ${price.label} ${money(price.value)}.${secondaryPrice(p) ? ` ${secondaryPrice(p)}.` : ""} Photos, numbers, and map from House Junkies.`,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { images: [`/images/properties/${p.slug}.jpg`] },
  };
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <dd className="font-display text-xl font-extrabold leading-none tabular-nums text-brand-black sm:text-2xl">
        {value}
      </dd>
      <dt className="mt-3 text-xs text-gray-600">{label}</dt>
    </div>
  );
}

function Timeline({ p }: { p: Property }) {
  const steps: { date?: string; title: string; text: string; strong?: boolean }[] = [
    {
      date: p.purchased,
      title: "Purchased",
      text: `${money(p.purchase)}${p.entity ? ` through ${p.entity}` : ""}`,
    },
  ];
  if (p.status === "For Sale" && p.listPrice)
    steps.push({ title: "Listed for sale", text: money(p.listPrice), strong: true });
  if (p.status === "Sold" && p.soldDate && p.soldPrice)
    steps.push({
      date: p.soldDate,
      title: "Sold",
      text: `${money(p.soldPrice)} after ${daysBetween(p.purchased, p.soldDate)} days`,
      strong: true,
    });
  if (p.status === "Rented" && p.rentPerMonth)
    steps.push({ title: "Rented", text: `${money(p.rentPerMonth)} per month`, strong: true });

  return (
    <ol className="relative space-y-6 border-l-2 border-gray-200 pl-6">
      {steps.map((s) => (
        <li key={s.title} className="relative">
          <span
            className={`absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full ${
              s.strong ? "bg-brand-yellow ring-2 ring-brand-yellow-dark" : "bg-brand-black"
            }`}
            aria-hidden="true"
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {s.date ? longDate(s.date) : "Current status"}
          </p>
          <p className="mt-1 font-semibold text-brand-black">{s.title}</p>
          <p className="text-sm text-gray-600">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export default function PropertyPage({ params }: { params: { slug: string } }) {
  const p = getProperty(params.slug);
  if (!p) notFound();

  const price = headlinePrice(p);
  const others = propertiesIn(p.city).filter((o) => o.slug !== p.slug);
  const more = (
    others.length ? others : properties.filter((o) => o.slug !== p.slug && o.status === p.status)
  ).slice(0, 3);
  const cityPage = cities.find((c) => c.slug === citySlug(p.city));
  const forSale = p.status === "For Sale";

  const outcome =
    p.status === "For Sale"
      ? " It is for sale now."
      : p.status === "Sold" && p.soldPrice && p.soldDate
        ? ` It sold on ${longDate(p.soldDate)} for ${money(p.soldPrice)}.`
        : p.status === "Rented" && p.rentPerMonth
          ? ` It rents for ${money(p.rentPerMonth)} a month now.`
          : "";

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Projects", url: `${site.url}/projects` },
          { name: p.street, url: `${site.url}/projects/${p.slug}` },
        ]}
      />

      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href="/projects" className="hover:text-white">
              ← Projects
            </Link>
            {cityPage ? (
              <>
                <span className="text-white/30">/</span>
                <Link href={`/we-buy-houses/${cityPage.slug}`} className="hover:text-white">
                  {p.city}
                </Link>
              </>
            ) : null}
            <span className="text-white/30">/</span>
            <span className="text-white">{p.street}</span>
          </nav>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div>
              <StatusBadge status={p.status} />
              <h1 className="mt-4 text-3xl font-bold md:text-4xl">
                {p.street}, {p.city}
              </h1>
              <p className="mt-2 text-white/70">
                {p.city}, CA {p.zip} | {p.type}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{price.label}</p>
              <p className="mt-2 font-display text-4xl font-extrabold leading-none tabular-nums text-brand-yellow sm:text-5xl">
                {money(price.value)}
                {price.suffix ? <span className="text-xl text-white/60">{price.suffix}</span> : null}
              </p>
              {secondaryPrice(p) ? <p className="mt-2 text-sm font-semibold text-white/80">{secondaryPrice(p)}</p> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <figure className="lg:col-span-8">
            <div
              className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
              style={{ aspectRatio: Math.min(Math.max(p.img.w / p.img.h, 1.33), 2.2) }}
            >
              <Image
                src={`/images/properties/${p.slug}.jpg`}
                alt={`${p.street}, ${p.city} CA, ${p.type.toLowerCase()} purchased by House Junkies`}
                width={p.img.w}
                height={p.img.h}
                sizes="(min-width: 1024px) 760px, 100vw"
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-500">
              {p.street}, {p.city}, CA {p.zip}
            </figcaption>
          </figure>

          <dl className="grid grid-cols-2 content-start gap-3 lg:col-span-4">
            {p.beds !== null && p.beds > 0 ? <Spec label="Beds" value={String(p.beds)} /> : null}
            {p.baths !== null ? <Spec label="Baths" value={String(p.baths)} /> : null}
            <Spec label="Square Feet" value={num(p.sqft)} />
            <Spec label="Lot Size" value={acresLabel(p.lotSqft)} />
            {showYearBuilt(p) ? <Spec label="Year Built" value={String(p.yearBuilt)} /> : null}
            <Spec label="Estimated Value" value={money(p.estValue)} />
          </dl>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-bold text-brand-black">About This House</h2>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-gray-600">
                {propertyBlurb(p)}
                {outcome}
              </p>

              <p className="mt-3 max-w-[62ch] text-xs leading-relaxed text-gray-500">
                The estimated value is a computer estimate, not an appraisal.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <h2 className="text-2xl font-bold text-brand-black">Timeline</h2>
              <div className="mt-6">
                <Timeline p={p} />
              </div>

              {forSale ? <ListingBroker className="mt-10" /> : null}

              <div className={`${forSale ? "mt-4" : "mt-10"} rounded-lg border border-brand-yellow/60 bg-white p-6`}>
                <p className="font-bold text-brand-black">
                  {forSale ? "Want to see this house?" : "Want to sell your house?"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {forSale
                    ? "Call or text us to set up a showing."
                    : `We buy houses in ${p.city} in any condition. No repairs, no fees. Call or text and we will make you an offer.`}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`tel:${site.phoneE164}`}
                    className="inline-flex h-11 items-center rounded-md bg-brand-yellow px-5 text-sm font-bold text-black hover:bg-brand-yellow-dark"
                  >
                    Call {site.phone}
                  </a>
                  <a
                    href={`sms:${site.phoneE164}`}
                    className="inline-flex h-11 items-center rounded-md border border-gray-300 px-5 text-sm font-semibold text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
                  >
                    Text
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <h2 className="text-2xl font-bold text-brand-black">
          Location
          <span className="ml-3 text-base font-normal text-gray-500">
            {p.street}, {p.city}
          </span>
        </h2>
        <div className="mt-6">
          <PropertyMap p={p} />
        </div>
      </section>

      {more.length ? (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-brand-black">
                {others.length ? `More Houses We Bought in ${p.city}` : "More Houses We Bought"}
              </h2>
              <Link href="/projects" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
                See all →
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((o) => (
                <li key={o.slug}>
                  <PropertyCard p={o} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-2xl px-4 py-14">
        <h2 className="text-center text-xl font-bold text-brand-black">
          {forSale ? `Ask About ${p.street}` : `Get a Cash Offer on Your ${p.city} House`}
        </h2>
        <div className="mt-6">
          {forSale ? <BuyerInquiryForm topic={`Listing: ${p.street}, ${p.city}`} placeholder="Showing times, offer, questions" /> : <ContactForm />}
        </div>
      </section>
    </div>
  );
}
