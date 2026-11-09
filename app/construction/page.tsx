import type { Metadata } from "next";
import Link from "next/link";
import { BuyerInquiryForm } from "@/components/BuyerInquiryForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FaqList, PageHero, ReviewsSection, Section, SectionHeader, cardCls, linkCls } from "@/components/sections/Shared";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "General Contractor in Visalia, CA | Construction & Remodeling",
  description:
    "Licensed general contractor in Visalia (CA LIC#1077593): remodeling, bathrooms, kitchens, painting, flooring, and renovations. Call (559) 368-8956 for an estimate.",
  alternates: { canonical: "/construction" },
};

const services = [
  { name: "Whole-house renovations", body: "Full interior and exterior renovations, the same work our crew does on every house we buy and resell." },
  { name: "Bathroom remodeling", body: "Updates and full remodels, from fixtures and tile to layout changes." },
  { name: "Kitchen remodeling", body: "Cabinets, counters, flooring, lighting, and appliance hookups." },
  { name: "Interior and exterior painting", body: "Repaints for homes, rentals, and properties being prepared for sale." },
  { name: "Flooring", body: "Replacement of worn, damaged, or outdated flooring throughout a home." },
  { name: "ADU builds", body: "Accessory dwelling units built from the ground up, a way to add rental income or space for family." },
  { name: "Repairs and restoration", body: "Drywall, finish work, and repairs after fire or water damage." },
];

const constructionFaqs = [
  {
    question: "Is House Junkies Construction licensed?",
    answer: `Yes. House Junkies Construction is a licensed California general contractor, ${site.licenses.generalContractor}. You can check any California contractor license on the Contractors State License Board website.`,
  },
  {
    question: "Do you only work on houses you buy, or can I hire you for my own house?",
    answer: "Both. Our crew renovates the houses House Junkies buys, and we also take on outside remodeling, repair, and ADU projects for homeowners and property owners.",
  },
  {
    question: "Do you build ADUs?",
    answer: "Yes. We offer pre-approved ADU plans that are already cleared for permitting in four counties, and fully custom ADU builds sized to your lot. We handle design, permitting, and construction.",
  },
  {
    question: "What counties do you work in?",
    answer: "Tulare, Kings, Kern, and Fresno counties, with many projects in and around Visalia.",
  },
  {
    question: "Can you repair a house after fire or water damage?",
    answer: "Yes. Drywall, finish work, and repairs after fire or water damage are part of our repairs and restoration work.",
  },
  {
    question: "How do I get an estimate?",
    answer: `Use the form on this page or call ${site.phone}. Tell us what you want done and where the property is.`,
  },
];

export default function ConstructionPage() {
  const data = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: "House Junkies Construction",
    url: `${site.url}/construction`,
    telephone: site.phone,
    areaServed: ["Visalia, CA", "Tulare County, CA"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
    },
    parentOrganization: { "@id": `${site.url}/#organization` },
    identifier: site.licenses.generalContractor,
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Construction", url: `${site.url}/construction` },
        ]}
      />
      <PageHero
        eyebrow={site.licenses.generalContractor}
        title={<>Construction &amp; Remodeling<br className="hidden sm:block" /> in Visalia, CA</>}
        sub={
          <>
            House Junkies Construction is the licensed general contractor in our group. The same crew that
            renovates the houses we buy and resell also takes on remodeling and construction projects in
            Visalia and Tulare County.
          </>
        }
      />

      <Section>
        <SectionHeader eyebrow="Services" title="What We Build and Remodel" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className={cardCls}>
              <h3 className="font-bold text-brand-black">{s.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:py-20 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-brand-black">A Contractor That Renovates for a Living</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Most contractors do a handful of projects a year. Our crew renovates houses constantly, because
            we buy, renovate, and resell {site.stats.homesBought} homes. That means we price work from real
            numbers, know what finishes hold up in Central Valley rentals and resale, and keep projects
            moving. Dominic McClelland, COO of House Junkies Construction, runs day-to-day operations.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-brand-black">Licensed in California</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            House Junkies Construction operates under {site.licenses.generalContractor}. You can verify any
            California contractor license on the Contractors State License Board website. We are part of
            the same group as {site.name} and {site.legacyRealEstate.name}, based in Visalia.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-brand-black">ADUs: Pre-Approved Plans or a Custom Build</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            An ADU (accessory dwelling unit) is a second small home on the same lot, like a backyard
            unit or a garage conversion. It can add rental income or give family a place to live
            close by. House Junkies Construction offers two ways to do it: pre-approved ADU plans that
            are already cleared for permitting in four counties, or a fully custom build sized to your
            lot and your goals. We handle design, permitting, and construction under one roof, so you
            are not hiring an architect, an engineer, and a builder separately.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-brand-black">Counties We Build In</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Our office is at {site.entityAddresses.construction}, and we take outside construction and ADU
            clients across Tulare, Kings, Kern, and Fresno counties. Many of our projects are in and
            around Visalia. See our pages for{" "}
            <Link href="/we-buy-houses/visalia" className={linkCls}>Visalia</Link>,{" "}
            <Link href="/counties/tulare-county" className={linkCls}>Tulare County</Link>,{" "}
            <Link href="/counties/kings-county" className={linkCls}>Kings County</Link>,{" "}
            <Link href="/counties/kern-county" className={linkCls}>Kern County</Link>, and{" "}
            <Link href="/counties/fresno-county" className={linkCls}>Fresno County</Link>.
          </p>

          <h2 className="mt-12 text-2xl font-bold text-brand-black">Who Runs Your Project</h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            <Link href="/team/omar-ayon" className={linkCls}>Omar Ayon</Link>, Project
            Manager, runs every renovation and ADU project for House Junkies Construction.{" "}
            <Link href="/team/dominic-mcclelland" className={linkCls}>Dominic McClelland</Link>,
            COO, runs day-to-day operations. House Junkies Construction is part of {site.parentOrganization},
            along with {site.name} and {site.legacyRealEstate.name}. You can reach us at{" "}
            <a href={`tel:${site.phoneE164}`} className={linkCls}>{site.phone}</a>.
          </p>

          <p className="mt-8 text-sm text-gray-500">
            Looking to sell a house that needs work instead of fixing it?{" "}
            <Link href="/sell-your-house/as-is" className={linkCls}>We buy houses as-is</Link>.
            Need land to build on?{" "}
            <Link href="/buy/vacant-land" className={linkCls}>See land for sale</Link>.
          </p>
        </div>
        <div className="lg:col-span-2">
          <OfferCardConstruction />
        </div>
      </div>
      </section>

      <Section id="faq" narrow>
        <SectionHeader eyebrow="FAQ" title="Construction Questions" />
        <div className="mt-10">
          <FaqList items={constructionFaqs} />
        </div>
      </Section>

      <ReviewsSection />
    </div>
  );
}

function OfferCardConstruction() {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-t-lg bg-brand-black px-6 pb-4 pt-5 text-center text-white">
        <p className="text-xl font-bold">Get a Free Estimate</p>
        <p className="mt-1 text-sm text-white/70">Tell us what you want done and where.</p>
      </div>
      <div className="[&>form]:rounded-t-none">
        <BuyerInquiryForm topic="Construction / remodeling estimate" placeholder="What project do you have in mind?" />
      </div>
    </div>
  );
}
