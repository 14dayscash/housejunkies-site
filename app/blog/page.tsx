import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blogPosts";
import { houseJunkiesPosts } from "@/lib/houseJunkiesPosts";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description: "Notes on selling, probate, foreclosure, and real estate in Visalia and Tulare County.",
  alternates: { canonical: "/blog" },
};

const recentDominicPosts = blogPosts.slice(0, 3);
const olderDominicPosts = blogPosts.slice(3);

export default function BlogPage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Notes on selling, probate, foreclosure, and real estate in Visalia and Tulare County.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-brand-black">Latest From Dominic McClelland</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {recentDominicPosts.map((post) => (
            <article key={post.url} className="rounded-lg border border-brand-yellow/40 bg-brand-yellow/5 p-5">
              <p className="text-xs text-gray-400">{post.date}</p>
              <h3 className="mt-1 font-bold text-brand-black">{post.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{post.summary}</p>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline"
              >
                Read the full post →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-brand-black">House Junkies Blog</h2>
          {houseJunkiesPosts.length === 0 ? (
            <p className="mt-4 text-gray-600">
              Our own blog, written directly on housejunkiesinc.org, starts here. Check back soon
              for new posts.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {houseJunkiesPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-lg border border-gray-200 bg-white p-5 hover:border-brand-yellow-dark"
                >
                  <p className="text-xs text-gray-400">{post.date} · {post.category}</p>
                  <h3 className="mt-1 font-bold text-brand-black">{post.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {olderDominicPosts.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-lg font-bold text-brand-black">More From Dominic McClelland</h2>
          <div className="mt-4 space-y-4">
            {olderDominicPosts.map((post) => (
              <article key={post.url} className="rounded-lg border border-gray-200 p-5">
                <p className="text-xs text-gray-400">{post.date}</p>
                <h3 className="mt-1 font-bold text-brand-black">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{post.summary}</p>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline"
                >
                  Read the full post on dominicmcclelland.com →
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-14">
          <h2 className="text-center text-xl font-bold text-brand-black">
            Have a Property You Need to Sell?
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Skip the reading, talk to us directly. We respond within 24 hours.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
