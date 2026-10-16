import type { Metadata } from "next";
import { site } from "@/lib/site";
import { FaqJsonLd } from "@/components/JsonLd";
import { RichText } from "@/components/RichText";

export const metadata: Metadata = {
  title: `Frequently Asked Questions`,
  description: "Answers to the most common questions about selling your house for cash to House Junkies, from how fast we close to what happens with probate, liens, tenants, and repairs.",
  alternates: { canonical: "/faq" },
};

type Faq = { question: string; answer: string };
type FaqGroup = { heading: string; intro?: string; items: Faq[] };

// Answers can carry real internal links written as [text](/path). The visible
// page renders them as links; the FAQ schema gets the plain text version.
const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

const groups: FaqGroup[] = [
  {
    heading: "The Basics",
    items: [
      {
        question: "How does selling my house to House Junkies work?",
        answer: "Fill out our form or call us with your property address. We research the property and present a fair, no-obligation cash offer, usually within 24 hours. If you accept, you pick the closing date and we handle the rest. The four steps are laid out on our [How It Works](/how-it-works) page.",
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
        answer: "From four real numbers: after-repair value based on closed comps, our actual renovation cost estimate from our own construction crew, holding and closing costs, and our margin. See the full breakdown on our [How We Calculate Your Offer](/how-we-calculate-your-offer) page.",
      },
      {
        question: "Do you charge anything for the initial offer?",
        answer: "No. The cash offer is always free and comes with no obligation to accept it.",
      },
      {
        question: "Can I speak with someone in Spanish?",
        answer: "Yes, se habla espanol.",
      },
    ],
  },
  {
    heading: "About House Junkies",
    items: [
      {
        question: "Is House Junkies a legitimate company?",
        answer: `Yes. We're part of ${site.parentOrganization}, which includes House Junkies (acquisitions), House Junkies Construction (${site.licenses.generalContractor}), and ${site.legacyRealEstate.name} (${site.licenses.brokerage}). We're BBB Accredited with an ${site.stats.bbbRating} rating and are ranked ${site.stats.sfrAnalyticsRank} in Visalia by transaction volume per ${site.stats.sfrAnalyticsSource}.`,
      },
      {
        question: "How long has House Junkies been buying houses?",
        answer: `House Junkies was incorporated in ${site.foundingYear} and has bought ${site.stats.homesBought} homes over ${site.stats.yearsInBusiness} years in the Central Valley. Our office is at ${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}, and you can walk in during business hours (${site.hours.weekday}).`,
      },
      {
        question: "Who will I actually talk to?",
        answer: `You will talk to our team in Visalia. [Abel Ulloa](/team/abel-ulloa) is the Owner and CEO, and [Dominic McClelland](/team/dominic-mcclelland) runs day-to-day operations. You can call ${site.phone} and ask for either of them. You can see everyone on our [team page](/team).`,
      },
      {
        question: "How are House Junkies, House Junkies Construction, and Legacy Real Estate connected?",
        answer: "All three are owned by Ulloa Investment Group. House Junkies buys houses. House Junkies Construction is the licensed general contractor that renovates them. Legacy Real Estate is the brokerage that lists them for sale. Because they share ownership, we can tell you what your house would list for on the open market and what we would pay for it as-is, in the same conversation.",
      },
      {
        question: "Are you a real buyer, or do you just pass my contract to someone else?",
        answer: `We renovate the houses we buy with our own licensed crew (${site.licenses.generalContractor}) and sell them through our own brokerage. We are not just passing your contract to a stranger. You can see real houses we have bought on our [recent purchases](/projects) page.`,
      },
      {
        question: "Can I see houses you have actually bought?",
        answer: "Yes. Our [projects page](/projects) shows real houses we have bought, with what we paid for each one. We have bought 350+ homes over 7+ years, and that page is a snapshot of recent ones.",
      },
    ],
  },
  {
    heading: "Where We Buy",
    items: [
      {
        question: "What areas do you buy houses in?",
        answer: "Tulare, Kings, Fresno, and Kern counties, and beyond, including Visalia, Tulare, Porterville, Fresno, Bakersfield, and the surrounding smaller cities. See our [full service area](/we-buy-houses) for the complete list.",
      },
      {
        question: "Do you buy houses in small towns, not just big cities?",
        answer: "Yes. We buy in small Central Valley towns as well as the larger cities. If you do not see your town listed, call us anyway and tell us where the house is.",
      },
      {
        question: "Do you buy houses outside the Central Valley?",
        answer: "We also buy on the Central Coast and in the Eastern Sierra. Our [service area page](/we-buy-houses) lists every city we have a page for, and you can also browse by [county](/explore). If your house is somewhere else, call us and ask.",
      },
      {
        question: "I do not live in Visalia. Do I have to come to your office?",
        answer: `No. You can start with a phone call or our online form. Escrow can arrange for signing with a notary, so you do not have to be in town to sell. If you live out of the area, read about [selling when you are relocating](/sell-your-house/relocating).`,
      },
    ],
  },
  {
    heading: "Your Situation",
    intro: "Every one of these has its own page with more detail.",
    items: [
      {
        question: "Do you buy houses in any situation?",
        answer: "Yes: inherited property, probate, foreclosure, divorce, fire or water damage, code violations, tenant-occupied rentals, vacant properties, liens, and simple as-is sales. See our [situations page](/sell-your-house) for details on each.",
      },
      {
        question: "Will you buy my house if it's occupied by tenants?",
        answer: "Yes, we buy occupied rentals regularly and can work with the situation as-is, tenants included. More on that is on our page about [selling a house with tenants](/sell-your-house/with-tenants).",
      },
      {
        question: "What if my house is in probate or I inherited it?",
        answer: "We buy probate and inherited properties as-is, including homes still full of belongings. See our [probate page](/sell-your-house/probate) for how California probate actually works and how we can help before it fully closes. We also have a page for [inherited property](/sell-your-house/inherited-property).",
      },
      {
        question: "Can I sell if I still owe money on the house?",
        answer: "Yes. If there is a mortgage or a lien on the house, the payoff is taken out of the sale at closing through escrow and you get what is left. We walk through the numbers with you before you accept anything. Read more about [selling a house with liens](/sell-your-house/liens).",
      },
      {
        question: "What if I am behind on my payments or facing foreclosure?",
        answer: "Call us as early as you can. Foreclosure has deadlines, and the more time there is, the more choices you have. We make cash offers on houses in default and can close fast. Our [foreclosure page](/sell-your-house/foreclosure) explains the stages. We are not a law firm, so for legal advice about your loan, talk to an attorney.",
      },
      {
        question: "Do you buy houses with code violations?",
        answer: "Yes. We buy houses with open code violations and unpermitted work. You do not have to fix anything first. Read more on our [code violations page](/sell-your-house/code-violations).",
      },
      {
        question: "Will you buy a house that has fire or water damage?",
        answer: "Yes. We buy houses with fire damage and water damage as-is. Our own construction crew does the repair work, so we price it from real numbers. See our pages on [fire damage](/sell-your-house/fire-damage) and [water damage](/sell-your-house/water-damage).",
      },
      {
        question: "What if the house is full of belongings or hoarded?",
        answer: "You do not have to clean it out first. We buy houses that are still full of belongings, and we do not judge. Read more on our page about [selling a hoarder house](/sell-your-house/hoarder-house).",
      },
      {
        question: "Can I sell if the house is vacant?",
        answer: "Yes. Vacant houses can be a headache because of theft, damage, and city notices, and we buy them as-is. See our page on [selling a vacant house](/sell-your-house/vacant).",
      },
      {
        question: "What if we are selling because of a divorce?",
        answer: "We buy houses in divorce situations and can work around both sides' schedules. Our [divorce page](/sell-your-house/divorce) covers it in more detail.",
      },
    ],
  },
  {
    heading: "Cash Offer vs. Listing",
    items: [
      {
        question: "Why is a cash offer usually lower than what I could list for?",
        answer: "A listed house usually needs repairs, showings, a commission, and 60 to 90 days or more to close. A cash offer skips all of that, and we have to cover our renovation costs and a margin. If listing would net you more, we will tell you. See the side-by-side on our [Cash Offer vs. Listing](/compare) page.",
      },
      {
        question: "Would I be better off listing my house?",
        answer: "Sometimes, yes. If your house is in good shape and you are not in a hurry, listing can net more. Because we are connected to Legacy Real Estate, we can tell you honestly which way fits your situation, even if that means listing it.",
      },
      {
        question: "What does selling as-is actually mean?",
        answer: "It means you sell the house in the condition it is in today. No repairs, no repainting, no cleaning, no staging, and no fixing things an inspector might find. See our [as-is page](/sell-your-house/as-is).",
      },
    ],
  },
];

const allFaqs = groups.flatMap((g) => g.items);

export default function FaqPage() {
  return (
    <div>
      <FaqJsonLd items={allFaqs.map((f) => ({ question: f.question, answer: plain(f.answer) }))} />
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            The most common questions we hear from Central Valley homeowners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        {groups.map((g, gi) => (
          <div key={g.heading} className={gi === 0 ? "" : "mt-12"}>
            <h2 className="text-xl font-bold text-brand-black">{g.heading}</h2>
            {g.intro && <p className="mt-2 text-gray-600">{g.intro}</p>}
            <dl className="mt-4 space-y-6">
              {g.items.map((f) => (
                <div key={f.question} className="border-b border-gray-100 pb-6">
                  <dt className="font-semibold text-brand-black">{f.question}</dt>
                  <dd className="mt-2 text-gray-600"><RichText text={f.answer} /></dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
        <p className="mt-10 text-center text-gray-600">
          Still have a question?{" "}
          <a href={`tel:${site.phoneE164}`} className="font-semibold text-brand-yellow-dark hover:underline">
            Call {site.phone}
          </a>
        </p>
      </section>
    </div>
  );
}
