import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { houseJunkiesPosts } from "@/lib/houseJunkiesPosts";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, ReviewsSection, Section, SectionHeader, cardCls, linkCls } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Blog`,
  description: "Notes on selling, probate, foreclosure, and real estate in Visalia and Tulare County.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="House Junkies Blog"
        title="Blog"
        sub={<>Notes on selling, probate, foreclosure, and real estate<br className="hidden sm:block" /> in Visalia and Tulare County.</>}
      />

      <Section narrow>
        <SectionHeader title="House Junkies Blog" />
        {houseJunkiesPosts.length === 0 ? (
          <p className="mt-6 text-center text-gray-600">
            Our own blog, written directly on housejunkiesinc.org, starts here. Check back soon
            for new posts.
          </p>
        ) : (
          <div className="mt-10 space-y-4">
            {houseJunkiesPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className={`${cardCls} group block transition-shadow hover:shadow-md`}>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{post.date} · {post.category}</p>
                <h3 className="mt-2 text-lg font-bold text-brand-black">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark group-hover:underline">Read the Full Post →</span>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section gray>
        <SectionHeader eyebrow="dominicmcclelland.com" title="From Dominic McClelland" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.url} className={cardCls}>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{post.date}</p>
              <h3 className="mt-2 font-bold text-brand-black">{post.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{post.summary}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer" className={`mt-3 inline-block text-sm ${linkCls}`}>
                Read the Full Post →
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section narrow>
        <SectionHeader
          title="Have a Property You Need to Sell?"
          sub={<>Skip the reading, talk to us directly.<br />We respond within 24 hours.</>}
        />
        <div className="mt-8">
          <ContactForm />
        </div>
      </Section>

      <ReviewsSection />
    </div>
  );
}
