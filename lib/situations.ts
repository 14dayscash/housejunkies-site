// Situation data for /sell-your-house/[situation] pages.
// Copy here is deliberately general/process-level, not a specific claim ("we bought 40 of these").
// Every situation page should eventually link to at least one real /projects/ case study
// in that situation once the case-study archive has one — that's what the SEO report calls
// the moat. Don't add a specific number or testimonial here that isn't backed by a real,
// checkable case study.

export type SituationData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
};

export const situations: SituationData[] = [
  {
    slug: "inherited-property",
    title: "Sell an Inherited House",
    metaTitle: "Sell an Inherited House in Visalia & Tulare County | House Junkies",
    metaDescription:
      "Inherited a house in the Central Valley? We buy inherited properties as-is, in any condition, and can work alongside the probate process.",
    summary:
      "Inheriting a house often means inheriting decisions you didn't ask for: what condition it's in, who else has a claim on it, and whether it's worth fixing up before selling. We buy inherited properties as-is and can close on your timeline.",
  },
  {
    slug: "probate",
    title: "Sell a House in Probate",
    metaTitle: "Sell a House in Probate | Tulare County | House Junkies",
    metaDescription:
      "Selling a house during California probate has its own timeline and rules. We buy probate properties and work with the process, not against it.",
    summary:
      "California probate has real timelines and real paperwork. We buy houses that are in or entering probate, and we're comfortable working alongside the executor, the attorney, and the court's process rather than pressuring anyone to skip steps.",
  },
  {
    slug: "foreclosure",
    title: "Sell Before Foreclosure",
    metaTitle: "Facing Foreclosure in Visalia? We Buy Houses Fast | House Junkies",
    metaDescription:
      "Behind on your mortgage in the Central Valley? We buy houses in pre-foreclosure and can often close before a trustee sale date.",
    summary:
      "Pre-foreclosure has a clock attached to it. We buy houses in this situation and move at the pace the timeline requires, with a cash offer and no repairs needed.",
  },
  {
    slug: "divorce",
    title: "Sell a House During Divorce",
    metaTitle: "Selling a House During Divorce in Visalia | House Junkies",
    metaDescription:
      "A fast, neutral cash sale can simplify dividing a shared property during divorce. We buy houses as-is throughout the Central Valley.",
    summary:
      "A house is often the largest shared asset in a divorce, and agreeing on a buyer can be simpler than agreeing on almost anything else. A quick, neutral cash sale takes the property off the table so both parties can move forward.",
  },
  {
    slug: "fire-damage",
    title: "Sell a Fire-Damaged House",
    metaTitle: "Sell a Fire-Damaged House in the Central Valley | House Junkies",
    metaDescription:
      "We buy fire-damaged properties as-is. Our in-house licensed construction crew (CA Lic #1077593) means we understand real rebuild costs.",
    summary:
      "Fire damage changes what a house is worth and what it costs to fix. Because we renovate properties with our own licensed construction crew, we can evaluate fire-damaged homes realistically instead of walking away.",
  },
  {
    slug: "water-damage",
    title: "Sell a Water-Damaged House",
    metaTitle: "Sell a Water-Damaged House in the Central Valley | House Junkies",
    metaDescription:
      "We buy water-damaged and flood-affected properties as-is throughout the Central Valley.",
    summary:
      "Water damage, whether from a burst pipe, a roof leak, or flooding, can be expensive to remediate. We buy these properties as-is and handle the renovation ourselves.",
  },
  {
    slug: "code-violations",
    title: "Sell a House With Code Violations",
    metaTitle: "Sell a House With Code Violations in Visalia | House Junkies",
    metaDescription:
      "Red-tagged or facing code enforcement? We buy houses with open violations, in any condition, throughout the Central Valley.",
    summary:
      "Open code violations can make a house hard to finance and hard to insure, which shrinks the buyer pool fast. We buy these properties as-is and deal with the city or county process ourselves.",
  },
  {
    slug: "with-tenants",
    title: "Sell a Rental With Tenants",
    metaTitle: "Sell a Rental Property With Tenants in Visalia | House Junkies",
    metaDescription:
      "Tired landlord? We buy occupied rental properties, including ones with problem tenants, throughout the Central Valley.",
    summary:
      "Selling an occupied rental property, especially with a difficult tenant situation, narrows your options fast with a traditional buyer. We buy rental properties as-is, tenants and all.",
  },
  {
    slug: "vacant",
    title: "Sell a Vacant House",
    metaTitle: "Sell a Vacant House in the Central Valley | House Junkies",
    metaDescription:
      "We buy vacant properties as-is, no matter how long they've been sitting empty.",
    summary:
      "A vacant house accumulates costs and risk the longer it sits: insurance, code enforcement attention, deferred maintenance. We buy vacant properties in any condition.",
  },
  {
    slug: "liens",
    title: "Sell a House With Liens or Back Taxes",
    metaTitle: "Sell a House With Liens or Tax Debt in Tulare County | House Junkies",
    metaDescription:
      "We buy houses with liens, judgments, or delinquent property taxes attached, and can help work through what's owed at closing.",
    summary:
      "Liens and delinquent property taxes get resolved at closing more often than people expect. We buy properties in this situation and work with escrow to sort out what's owed.",
  },
  {
    slug: "as-is",
    title: "Sell As-Is, No Repairs",
    metaTitle: "Sell Your House As-Is in Visalia | No Repairs Needed | House Junkies",
    metaDescription:
      "Skip the repair list. We buy houses as-is throughout the Central Valley, from small fixes to major renovation needs.",
    summary:
      "Not every seller has a specific hardship, some just don't want to deal with repairs, showings, or a drawn-out listing process. We buy as-is, in any condition, no repairs required.",
  },
];

export function getSituation(slug: string): SituationData | undefined {
  return situations.find((s) => s.slug === slug);
}
