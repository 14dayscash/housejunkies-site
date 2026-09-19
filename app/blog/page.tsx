import type { Metadata } from "next";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blogPosts";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description: "Notes on selling, probate, foreclosure, and real estate in Visalia and Tulare County, from Dominic McClelland.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-white/70">
            Notes on selling, probate, foreclosure, and real estate in Visalia and Tulare
            County. Full posts live on dominicmcclelland.com, we summarize them here.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <article key={post.url} className="rounded-lg border border-gray-200 p-6">
              <p className="text-xs text-gray-400">{post.date}</p>
              <h2 className="mt-1 text-lg font-bold text-brand-black">{post.title}</h2>
              <p className="mt-2 text-gray-600">{post.summary}</p>
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

      <section className="bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-14">
          <h2 className="text-xl font-bold text-brand-black text-center">
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
