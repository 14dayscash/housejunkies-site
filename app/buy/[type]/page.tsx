import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buyPages, getBuyPage } from "@/lib/buyPages";
import { BuyerInquiryForm } from "@/components/BuyerInquiryForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FactList, FaqList, PageHero, Pills, ReviewsSection, Section, SectionHeader, linkCls } from "@/components/sections/Shared";
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: site.url },
          { name: "Buy Property", url: `${site.url}/buy` },
          { name: page.title, url: `${site.url}/buy/${page.slug}` },
        ]}
      />
      <PageHero eyebrow="Buy Property" title={page.title} sub={<Linkify text={page.summary} />} />

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          {page.sections.map((s, si) => (
            <div key={s.heading} className={si > 0 ? "mt-12" : ""}>
              <h2 className="text-2xl font-bold text-brand-black">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-gray-600"><Linkify text={p} /></p>
              ))}
            </div>
          ))}

          <h2 className="mt-12 text-2xl font-bold text-brand-black">Quick Facts</h2>
          <div className="mt-5">
            <FactList single items={page.quickFacts} />
          </div>

          <p className="mt-10 text-sm text-gray-500">
            Brokerage services are provided through {site.legacyRealEstate.name} ({site.licenses.brokerage}).
            Property availability changes frequently. Call{" "}
            <a href={`tel:${site.phoneE164}`} className={linkCls}>{site.phone}</a> for current inventory.
          </p>
        </div>
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <BuyerInquiryForm topic={page.title} />
          </div>
        </div>
      </section>

      <Section gray id="faq" narrow>
        <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-10">
          <FaqList items={page.faqs} />
        </div>
      </Section>

      <Section>
        <SectionHeader title="More Ways to Buy With Us" />
        <div className="mt-8">
          <Pills
            items={[
              ...others.map((o) => ({ href: `/buy/${o.slug}`, label: o.title.split(" for Sale")[0] })),
              { href: "/buy", label: "All Property for Sale" },
              { href: "/we-buy-houses", label: "Selling Instead? We Buy Houses" },
            ]}
          />
        </div>
      </Section>

      <ReviewsSection />
    </div>
  );
}
