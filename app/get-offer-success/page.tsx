import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ReviewsSection, linkCls } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Thank You`,
  description: "Your request was received. We'll call you within 24 hours with your cash offer.",
  alternates: { canonical: "/get-offer-success" },
  robots: { index: false, follow: true },
};

export default function GetOfferSuccessPage() {
  return (
    <div>
      <section className="bg-brand-black px-4 py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-6 text-3xl font-bold md:text-5xl">Got It, Thanks</h1>
          <p className="mt-4 text-lg text-white/80">
            We&apos;ll call you within 24 hours to talk through your cash offer.
            <br />
            No obligation, no fees.
          </p>
          <p className="mt-4 text-white/60">
            Need to reach us sooner?{" "}
            <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow hover:underline">
              Call {site.phone}
            </a>
          </p>
        </div>
      </section>
      <section className="px-4 py-12 text-center">
        <p className="text-sm font-semibold text-brand-black">While You Wait</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/how-we-calculate-your-offer" className={linkCls}>How We Calculate Your Offer →</Link>
          <Link href="/projects" className={linkCls}>See Our Projects →</Link>
          <Link href="/team" className={linkCls}>Meet the Team →</Link>
          <Link href="/" className={linkCls}>Back to the Homepage →</Link>
        </div>
      </section>
      <ReviewsSection />
    </div>
  );
}
