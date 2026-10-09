import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { buyPages, getBuyPage } from "@/lib/buyPages";
import { BuyerInquiryForm } from "@/components/BuyerInquiryForm";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { Linkify } from "@/components/Linkify";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return buyPages.map((p) => ({ type: p.slug }));
}

export function generateMetadata({ params }: { params: { type: string } }): Metadata {
  const page = getBuyPage(params.type);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/buy/${page.slug}` },
  };
}

export default function BuyTypePage({ params }: { params: { type: string } }) {
  const page = getBuyPage(params.type);
  if (!page) notFound();
  const others = buyPages.filter((p) => p.slug !== page.slug);

  return (
    <div>
      <FaqJsonLd items={page.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Buy Property", url: `${site.url}/buy` },
          { name: page.title, url: `${site.url}/buy/${page.slug}` },
        ]}
      />
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-yellow">Buy Property</p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">{page.title}</h1>
          <p className="mt-4 max-w-2xl text-white/70"><Linkify text={page.summary} /></p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="md:col-span-2">
          {page.sections.map((s) => (
            <div key={s.heading} className="mb-8">
              <h2 className="text-xl font-bold text-brand-black">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-3 text-gray-600"><Linkify text={p} /></p>
              ))}
            </div>
          ))}

          <h2 className="text-xl font-bold text-brand-black">Quick Facts</h2>
          <ul className="mt-4 space-y-3">
            {page.quickFacts.map((f, i) => (
              <li key={i} className="flex gap-3 text-gray-600">
                <span className="mt-1 text-brand-yellow-dark">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-bold text-brand-black">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-5">
            {page.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="font-semibold text-brand-black">{f.question}</h3>
                <p className="mt-1 text-gray-600">{f.answer}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-gray-500">
            Brokerage services are provided through {site.legacyRealEstate.name} ({site.licenses.brokerage}).
            Property availability changes frequently. Call{" "}
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">{site.phone}</a>{" "}
            for current inventory.
          </p>
        </div>
        <div>
          <BuyerInquiryForm topic={page.title} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-lg font-bold text-brand-black">More Ways to Buy With Us</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {others.map((o) => (
            <Link key={o.slug} href={`/buy/${o.slug}`} className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark">
              {o.title.split(" for Sale")[0]}
            </Link>
          ))}
          <Link href="/buy" className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark">
            All property for sale
          </Link>
          <Link href="/we-buy-houses" className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark">
            Selling instead? We buy houses
          </Link>
        </div>
      </section>
    </div>
  );
}
