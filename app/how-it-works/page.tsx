import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `How It Works | ${site.name}`,
  description: "The 4-step process for selling your house for cash to House Junkies.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  { title: "Submit Your Info", body: "Fill out our form or call. Share the address, condition, and your situation. No appraisal or inspection needed at this stage." },
  { title: "Get Your Cash Offer", body: "We research the property and local comps. Within 24 hours you get a fair, no-obligation cash offer." },
  { title: "Accept & Close", body: "Pick the closing date that works for you. We handle the paperwork and cover closing costs." },
  { title: "Get Paid", body: "Close in as little as 7 to 30 days and walk away with cash." },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">How It Works</h1>
      <ol className="mt-8 space-y-8">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-yellow font-bold text-black">
              {i + 1}
            </div>
            <div>
              <div className="font-semibold">{s.title}</div>
              <p className="mt-1 text-gray-600">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-gray-100 pt-6 text-sm">
        <Link href="/how-we-calculate-your-offer" className="font-semibold text-brand-yellow-dark hover:underline">
          How we calculate your offer →
        </Link>
        <Link href="/compare" className="font-semibold text-brand-yellow-dark hover:underline">
          Cash offer vs. listing →
        </Link>
        <Link href="/faq" className="font-semibold text-brand-yellow-dark hover:underline">
          Read our FAQ →
        </Link>
      </div>
    </div>
  );
}
