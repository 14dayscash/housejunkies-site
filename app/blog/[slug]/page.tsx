import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { houseJunkiesPosts, getHouseJunkiesPost } from "@/lib/houseJunkiesPosts";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";
import { ContactForm } from "@/components/ContactForm";
import { Linkify } from "@/components/Linkify";

export function generateStaticParams() {
  return houseJunkiesPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getHouseJunkiesPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getHouseJunkiesPost(params.slug);
  if (!post) notFound();

  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-3xl px-4 py-14">
          <p className="text-xs text-white/50">{post.date} · {post.category} · By {post.author}</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">{post.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        {post.summary && post.summary.length > 0 && (
          <div className="mb-8 rounded-lg border border-brand-yellow/40 bg-brand-yellow/5 p-5">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">
              Quick Summary
            </div>
            <ul className="mt-3 space-y-2">
              {post.summary.map((point, i) => (
                <li key={i} className="flex gap-2 text-gray-700">
                  <span className="mt-1 text-brand-yellow-dark">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4 text-gray-600">
          {post.body.map((paragraph, i) => (
            <p key={i}><Linkify text={paragraph} /></p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-4">
        <h2 className="text-lg font-bold text-brand-black">Top Cities We Buy In</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {cities.filter((c) => c.featured).slice(0, 5).map((c) => (
            <Link
              key={c.slug}
              href={`/we-buy-houses/${c.slug}`}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
            >
              {c.name}
            </Link>
          ))}
        </div>
        <Link href="/we-buy-houses" className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          See every city we serve →
        </Link>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <h2 className="text-lg font-bold text-brand-black">Common Situations</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {situations.slice(0, 5).map((s) => (
            <Link
              key={s.slug}
              href={`/sell-your-house/${s.slug}`}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
            >
              {s.navLabel}
            </Link>
          ))}
        </div>
        <Link href="/sell-your-house" className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          See every situation we buy →
        </Link>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-14">
          <h2 className="text-center text-xl font-bold text-brand-black">
            Have a Property You Need to Sell?
          </h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
