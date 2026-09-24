import type { Metadata } from "next";
import { site } from "@/lib/site";
import { FaqJsonLd } from "@/components/JsonLd";
import { Linkify } from "@/components/Linkify";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${site.name}`,
  description: "Answers to the most common questions about selling your house for cash to House Junkies.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    question: "How does selling my house to House Junkies work?",
    answer: "Fill out our form or call us with your property address. We research the property and present a fair, no-obligation cash offer, usually within 24 hours. If you accept, you pick the closing date and we handle the rest.",
  },
  {
    question: "Do I have to make any repairs before selling?",
    answer: "No. We buy houses as-is, in any condition, including major repair needs, fire or water damage, and code violations.",
  },
  {
    question: "Are there any fees or commissions?",
    answer: "No. We cover closing costs and there are no agent commissions, since you're selling directly to us, not listing on the market.",
  },
  {
    question: "How fast can you close?",
    answer: "As little as 7 days, or up to 30 days if that fits your timeline better. You choose the date.",
  },
  {
    question: "How do you calculate my cash offer?",
    answer: "From four real numbers: after-repair value based on closed comps, our actual renovation cost estimate from our own construction crew, holding and closing costs, and our margin. See the full breakdown on our How We Calculate Your Offer page.",
  },
  {
    question: "Is House Junkies a legitimate company?",
    answer: `Yes. We're part of ${site.parentOrganization}, which includes House Junkies (acquisitions), House Junkies Construction (${site.licenses.generalContractor}), and ${site.legacyRealEstate.name} (${site.licenses.brokerage}). We're BBB Accredited with an ${site.stats.bbbRating} rating and are ranked ${site.stats.sfrAnalyticsRank} in Visalia by transaction volume per ${site.stats.sfrAnalyticsSource}.`,
  },
  {
    question: "What areas do you buy houses in?",
    answer: "Tulare, Kings, Fresno, and Kern counties, including Visalia, Tulare, Porterville, Fresno, Bakersfield, and the surrounding smaller cities. See our full service area for the complete list.",
  },
  {
    question: "Do you buy houses in any situation?",
    answer: "Yes: inherited property, probate, foreclosure, divorce, fire or water damage, code violations, tenant-occupied rentals, vacant properties, liens, and simple as-is sales. See our situations page for details on each.",
  },
  {
    question: "Will you buy my house if it's occupied by tenants?",
    answer: "Yes, we buy occupied rentals regularly and can work with the situation as-is, tenants included.",
  },
  {
    question: "What if my house is in probate or I inherited it?",
    answer: "We buy probate and inherited properties as-is, including homes still full of belongings. See our probate page for how California probate actually works and how we can help before it fully closes.",
  },
  {
    question: "Do you charge anything for the initial offer?",
    answer: "No. The cash offer is always free and comes with no obligation to accept it.",
  },
  {
    question: "Can I speak with someone in Spanish?",
    answer: "Yes, se habla espanol.",
  },
];

export default function FaqPage() {
  return (
    <div>
      <FaqJsonLd items={faqs} />
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            The most common questions we hear from Central Valley homeowners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div key={f.question} className="border-b border-gray-100 pb-6">
              <dt className="font-semibold text-brand-black">{f.question}</dt>
              <dd className="mt-2 text-gray-600"><Linkify text={f.answer} /></dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-center text-gray-600">
          Still have a question?{" "}
          <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">
            Call {site.phone}
          </a>
        </p>
      </section>
    </div>
  );
}
