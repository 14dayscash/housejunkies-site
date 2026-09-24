// House Junkies doesn't run a second CMS for this. These summarize Dominic's
// real posts on dominicmcclelland.com, in our own words, and link back to the
// original for the full read, per Dominic's instruction to avoid duplicate
// content across the two sites.

export type BlogPostSummary = {
  title: string;
  url: string;
  date: string;
  summary: string;
};

export const blogPosts: BlogPostSummary[] = [
  {
    title: "How Our Partner and Referral Programs Actually Pay Out",
    url: "https://www.dominicmcclelland.com/blog/partner-referral-programs-payout",
    date: "September 23, 2026",
    summary:
      "How House Junkies' partner and referral programs actually work in Visalia, from a one-time $2,000 referral to funding flips as a passive capital partner.",
  },
  {
    title: "What It Actually Costs to List Your House vs. Selling As-Is to House Junkies",
    url: "https://www.dominicmcclelland.com/blog/listing-repairs-vs-as-is-visalia",
    date: "September 17, 2026",
    summary:
      "Before you list, know what it actually costs to get a house market-ready in Visalia, roof, HVAC, commissions, and more, and what House Junkies covers instead when you sell as-is.",
  },
  {
    title: "Facing Foreclosure in Visalia? What California Law Actually Says, and Your 5 Real Options",
    url: "https://www.dominicmcclelland.com/blog/facing-foreclosure-visalia",
    date: "September 16, 2026",
    summary:
      "A full breakdown of California's non-judicial foreclosure timeline, the 2025 law (AB 2424) that lets a listing agreement pause a scheduled sale by 45 days, and all 5 real options a homeowner has before a trustee sale.",
  },
  {
    title: "How to Spot a Fake 'We Buy Houses' Company in Visalia",
    url: "https://www.dominicmcclelland.com/blog/we-buy-houses-scams-visalia",
    date: "September 15, 2026",
    summary:
      "Most of the texts and postcards flooding Visalia mailboxes are wholesalers, not real buyers. Here's how to tell the difference, and how assignment clauses get misused to waste sellers' time.",
  },
  {
    title: "California's New 2026 ADU Laws: What They Mean for Visalia, Tulare, Dinuba, Farmersville, and Exeter",
    url: "https://www.dominicmcclelland.com/blog/california-adu-laws-2026-tulare-county",
    date: "September 14, 2026",
    summary:
      "What actually changed in 2026 ADU law (AB 976 permanently removed owner-occupancy requirements, SB 543 clarified unit counts), plus a city-by-city breakdown of how Visalia, Tulare, Dinuba, Farmersville, and Exeter each handle ADU permitting differently.",
  },
  {
    title: "Selling an Inherited House in Visalia: How Probate Actually Works and How We Help",
    url: "https://www.dominicmcclelland.com/blog/probate-house-sale-visalia",
    date: "September 13, 2026",
    summary:
      "How California probate actually works, the small-estate shortcuts most families don't know they qualify for, and how House Junkies can get you paid faster than waiting out a full 12 to 18 month probate.",
  },
  {
    title: "Visalia's Top Real Estate Investors by Volume: The Data Behind the #1 Ranking",
    url: "https://www.dominicmcclelland.com/blog/sfr-analytics-top-visalia-investors-2026",
    date: "September 11, 2026",
    summary:
      "The full SFR Analytics report behind the #1-in-Visalia claim, verified deed and transaction records showing Ulloa Investment Group at $16.0M across 110 transactions, nearly double the runner-up.",
  },
  {
    title: "What Vertical Integration Actually Means When You Sell a House in Visalia",
    url: "https://www.dominicmcclelland.com/blog/vertical-integration-real-estate-visalia",
    date: "September 6, 2026",
    summary:
      "A plain-language breakdown of the three-branch Ulloa Investment Group structure (House Junkies, House Junkies Construction, Legacy Real Estate) and why owning all three protects sellers, not just the company.",
  },
  {
    title: "How to Sell a House Fast in Visalia Without Listing It",
    url: "https://www.dominicmcclelland.com/blog/selling-a-house-fast-in-visalia",
    date: "September 5, 2026",
    summary:
      "The real tradeoff behind an off-market cash sale (speed and certainty for a discount off retail), the exact 4-number formula behind every offer, and the specific situations where selling off-market beats listing.",
  },
];
