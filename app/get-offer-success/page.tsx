import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Thank You`,
  description: "Your request was received. We'll call you within 24 hours with your cash offer.",
  alternates: { canonical: "/get-offer-success" },
  robots: { index: false, follow: true },
};

export default function GetOfferSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl font-bold text-brand-black md:text-4xl">Got It, Thanks</h1>
      <p className="mt-3 text-lg text-gray-600">
        We'll call you within 24 hours to talk through your cash offer. No obligation, no fees.
      </p>
      <p className="mt-2 text-gray-500">
        Need to reach us sooner?{" "}
        <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">
          Call {site.phone}
        </a>
      </p>
      <Link href="/" className="mt-8 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
        ← Back to the homepage
      </Link>
    </div>
  );
}
