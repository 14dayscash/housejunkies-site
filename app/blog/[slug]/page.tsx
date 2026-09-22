import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { houseJunkiesPosts, getHouseJunkiesPost } from "@/lib/houseJunkiesPosts";
import { ContactForm } from "@/components/ContactForm";

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
        <div className="space-y-4 text-gray-600">
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
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
