import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  CompareMini,
  PageHero,
  ReviewsSection,
  Section,
  SituationGrid,
  btnYellow,
  cardCls,
  linkCls,
} from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `How It Works`,
  description: "The 4-step process for selling your house for cash to House Junkies.",
  alternates: { canonical: "/how-it-works" },
};

const steps = [
  { title: "Submit My Info", body: "Fill out our form or call. Share the address, condition, and your situation. No appraisal or inspection needed at this stage." },
  { title: "Get My Cash Offer", body: "We research the property and local comps. Within 24 hours you get a fair, no-obligation cash offer." },
  { title: "Accept & Close", body: "Pick the closing date that works for you. We handle the paperwork and cover closing costs." },
  { title: "Get Paid", body: "Close in as little as 7 to 30 days and walk away with cash." },
];

export default function HowItWorksPage() {
  return (
    <div>
      <PageHero
        eyebrow="Simple. Fast. Fair."
        title="How It Works"
        sub={<>Four steps from your first call to cash in hand.<br className="hidden sm:block" /> No repairs, no fees, no obligation.</>}
      />

      <Section>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className={cardCls}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow font-bold text-black">{i + 1}</span>
              <h2 className="mt-4 text-lg font-bold text-brand-black">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Link href="/get-offer" className={btnYellow}>
            Start the Process <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Or call <a href={`tel:${site.phoneE164}`} className={linkCls}>{site.phone}</a>
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-gray-100 pt-6 text-sm">
          <Link href="/how-we-calculate-your-offer" className={linkCls}>How We Calculate Your Offer →</Link>
          <Link href="/compare" className={linkCls}>Cash Offer vs. Listing →</Link>
          <Link href="/faq" className={linkCls}>Read Our FAQ →</Link>
        </div>
      </Section>

      <SituationGrid />
      <CompareMini />
      <ReviewsSection gray={false} />
    </div>
  );
}
