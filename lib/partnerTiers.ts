// Five partnership tiers, adapted from dominicmcclelland.com/partner (Dominic's
// own content, reused for House Junkies). Real ranges, real terms, with the
// same risk disclaimer carried over since this touches investment offers.

export type PartnerTier = {
  name: string;
  range: string;
  youBring: string;
  involvement: string;
  body: string;
  bestFor: string;
};

export const partnerTiers: PartnerTier[] = [
  {
    name: "Deal Finder",
    range: "$2,000 - $10,000",
    youBring: "Property address + any information",
    involvement: "Nothing after the intro",
    body: "Know a house that needs to sell? Bring us the address. You don't need a real estate license, capital, or a contract of your own. If we're able to act on it and the deal closes, you get paid, typically between $2,000 and $10,000 depending on the size and margin of the deal.",
    bestFor: "Anyone plugged into a community, real estate adjacent or not, who hears about properties before they hit the market.",
  },
  {
    name: "Agent Partner",
    range: "$5,000 - $15,000+",
    youBring: "Property address + real estate license",
    involvement: "Represent House Junkies on the transaction",
    body: "If you hold a California real estate license, you can represent us as our agent on acquisitions instead of just sending a referral. That means working the transaction itself and earning agent-level compensation instead of a flat referral fee.",
    bestFor: "Licensed agents who want repeat, reliable transaction volume from an active buyer instead of chasing one-off listings.",
  },
  {
    name: "JV Partner",
    range: "$20,000 - $50,000+",
    youBring: "Property under contract + available capital",
    involvement: "Partner on acquisition, list on the backend if licensed",
    body: "A step past Deal Finder. You bring the property and contribute capital toward the acquisition itself. We cover 100% of construction costs and partner with you directly on the purchase. Licensed agents can also list the finished property for their commission.",
    bestFor: "Agents or connected investors ready to move from a flat fee to an actual stake in a deal's upside.",
  },
  {
    name: "Equity Partner",
    range: "$35,000 - $100,000+",
    youBring: "Available capital + 50/50 investment",
    involvement: "Partner on purchase and renovation, share in the profit",
    body: "You bring capital as an equal partner on a specific property. We run the entire operation, acquisitions, construction, and the sale through Legacy Real Estate, and split the profit 50/50 once the property sells.",
    bestFor: "Investors who want a direct stake in a specific flip without running the operation themselves.",
  },
  {
    name: "Funding Partner",
    range: "$100,000+/yr",
    youBring: "Allocated lending capital",
    involvement: "Fully passive, interest-only returns backed by real estate",
    body: "You're not finding deals or touching construction. You're providing capital against our flips as a lender, earning an interest-only, passive return while your money is deployed. Terms are negotiated individually per agreement.",
    bestFor: "Investors with capital sitting in low-return accounts who want real-estate-backed returns without operational involvement.",
  },
];

export const partnerFaqs = [
  { question: "What is the difference between a JV Partner and an Equity Partner?", answer: "A JV Partner finds the deal themselves and contributes capital toward the acquisition, with us covering construction. An Equity Partner is a straight 50/50 split on a deal we're already running end to end." },
  { question: "Do I need a real estate license to partner with House Junkies?", answer: "No, not for Deal Finder, JV, Equity, or Funding Partner. A license is only required for the Agent Partner track, and it opens up the ability to list properties on the back end of a JV deal too." },
  { question: "How fast do Deal Finder payouts happen?", answer: "Once the deal you send closes, typically the day after, via cash, check, or wire transfer." },
  { question: "Is this open to investors outside of Visalia or Tulare County?", answer: "Yes. Deal Finder works best with local knowledge, but Equity and Funding Partner arrangements are open to outside capital regardless of location." },
  { question: "What happens if a JV or Equity deal doesn't perform as expected?", answer: "Real estate carries real risk, including the risk of loss. Every JV and Equity arrangement is documented in a written agreement that spells out how costs, delays, and outcomes are handled before either side commits capital." },
];

export const partnerDisclaimer =
  "Partnership terms, including Equity Partner and Funding Partner arrangements, are negotiated individually and documented in a separate written agreement. The ranges above are general and not a specific offer. Real estate investing carries risk, including the risk of loss, and past performance does not guarantee future results. Nothing on this page is an offer to sell securities.";
