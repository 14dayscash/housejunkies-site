// Situation data for /sell-your-house/[situation] pages.
// Copy here is deliberately general/process-level, not a specific claim ("we bought 40 of these").
// Every situation page should eventually link to at least one real /projects/ case study
// in that situation once the case-study archive has one - that's what the SEO report calls
// the moat. Don't add a specific number or testimonial here that isn't backed by a real,
// checkable case study.

export type SituationData = {
  slug: string;
  title: string;
  navLabel: string; // one word, for the header dropdown
  metaTitle: string;
  metaDescription: string;
  summary: string;
  // Optional richer content, used only where we have real, sourced detail to
  // back it up (adapted from Dominic's own dominicmcclelland.com posts, which
  // cover California law in real depth). Situations without this just show
  // the summary - we don't pad every page to the same length artificially.
  details?: string[];
  keySteps?: { title: string; body: string }[];
  faqs?: { question: string; answer: string }[];
  legalDisclaimer?: string;
  quickFacts: string[]; // 5 short, informational, search-relevant facts every situation page shows
};

export const situations: SituationData[] = [
  {
    slug: "inherited-property",
    navLabel: "Inherited",
    title: "Sell an Inherited House",
    metaTitle: "Sell an Inherited House in Visalia & Tulare County | House Junkies",
    metaDescription:
      "Inherited a house in the Central Valley? We buy inherited properties as-is, in any condition, and can work alongside the probate process.",
    summary:
      "Inheriting a house often means inheriting decisions you didn't ask for: what condition it's in, who else has a claim on it, and whether it's worth fixing up before selling. We buy inherited properties as-is and can close on your timeline.",
    quickFacts: [
      "A house you inherit generally gets a stepped-up tax basis to its value on the date of death, which can reduce capital gains if you sell soon after.",
      "An existing mortgage on an inherited house doesn't disappear, an heir who keeps the home typically has to keep making payments or refinance.",
      "Multiple heirs who don't agree on whether to sell is one of the most common reasons an inherited house sits vacant for months.",
      "You aren't required to use a realtor to sell an inherited house, an off-market cash sale skips the listing process entirely.",
      "There's no fixed deadline to sell an inherited house in California, though ongoing taxes, insurance, and upkeep make sitting on it expensive.",
    ],
    faqs: [
      { question: "Do I have to go through probate to sell an inherited house?", answer: "Only if there's no trust and no other automatic way the property passes, like joint tenancy. If the house is in a living trust, you may be able to sell without probate at all." },
      { question: "What if my siblings and I disagree about selling?", answer: "This comes up often. We can work with whoever has legal authority to act, or structure a deal where one heir's interest is bought out while others are still deciding." },
    ],
  },
  {
    slug: "probate",
    navLabel: "Probate",
    title: "Sell a House in Probate",
    metaTitle: "Sell an Inherited House During Probate in Visalia, CA | House Junkies",
    metaDescription:
      "How California probate actually works, and how House Junkies can get you paid faster than waiting out a full 12 to 18 month probate.",
    summary:
      "When someone dies owning property with no trust in place, it generally has to go through probate before anyone can sell it. Formal probate typically runs 12 to 18 months, but a lot of families qualify for a faster path without realizing it, and we can often move before probate fully closes.",
    details: [
      "California has simplified procedures for smaller estates. A Petition to Determine Succession to Primary Residence (Probate Code §§13150-13157) lets a decedent's primary residence, valued up to $750,000, transfer through a shortened court petition instead of full probate. There's also a small estate affidavit for personal property, and a simplified process for other real property valued at roughly $69,625 or less.",
      "If you're an heir with a right to a share of an estate that hasn't closed yet, you can assign that interest to us for a cash payment now instead of waiting out the process. California courts (Probate Code §11604) actively review these assignments to make sure the consideration is fair, and we do them by the book, in writing, reviewed by counsel.",
      "We don't wing the legal side. On paperwork and filings, we work with a paralegal and an attorney to make sure assignments and deed transfers happen correctly and in order. You're always welcome to have your own independent counsel review anything before you sign.",
    ],
    keySteps: [
      { title: "Info", body: "Tell us about the property: is there a will, has a personal representative been appointed, are there other heirs." },
      { title: "Consult", body: "We walk through your specific situation, whether you likely qualify for a small estate procedure or an assignment of interest." },
      { title: "Process", body: "We coordinate whatever paperwork the specific path requires: small estate petition, assignment agreement, or standard purchase contract." },
      { title: "Escrow & Close", body: "We open escrow with a local Tulare County title company once the legal path is clear, and you get paid." },
    ],
    faqs: [
      { question: "Do I need my own attorney if I sell to House Junkies during probate?", answer: "You're not required to, but we recommend it, especially for an assignment of interest. It's your inheritance, and a fair, independent second opinion is worth having." },
      { question: "Can you buy the house before probate is finished?", answer: "Sometimes, through an assignment of interest if you're an heir with a right to a share. Whether that fits depends on where the estate is in the process." },
      { question: "Does the house need to be cleaned out or repaired first?", answer: "No. We buy as-is, including probate properties still full of belongings. Take what you want, leave the rest." },
    ],
    legalDisclaimer:
      "This is general information based on current California probate law, not legal advice. Thresholds and procedures change, and every estate is different - talk to a licensed probate attorney about your specific situation.",
    quickFacts: [
      "Formal probate in California typically runs 12 to 18 months from filing to close.",
      "A decedent's primary residence valued up to $750,000 may qualify for a simplified court petition instead of full probate.",
      "Personal property estates in the low $200,000s can often use a small estate affidavit instead of formal probate.",
      "An heir with a right to a share of an estate can assign that interest for cash before probate fully closes.",
      "We buy probate properties as-is, including homes still full of belongings, no cleanout required.",
    ],
  },
  {
    slug: "foreclosure",
    navLabel: "Foreclosure",
    title: "Sell Before Foreclosure",
    metaTitle: "Facing Foreclosure in Visalia? What California Law Says, and Your 5 Options | House Junkies",
    metaDescription:
      "California's foreclosure process has real deadlines built in. Most homeowners have more time and more options than they think, at every stage.",
    summary:
      "Pre-foreclosure is the period after you fall behind on payments but before your home is actually sold. California is a non-judicial foreclosure state, and the realistic minimum from a first missed payment to an actual sale is around 230 days, roughly seven and a half months. That's not a reason to wait, it's time you can use.",
    details: [
      "The timeline: after 120+ days delinquent, a Notice of Default gets recorded, opening a 90-day window to reinstate the loan by paying what you owe (you can actually reinstate up until 5 business days before the eventual sale date). If the default isn't cured, a Notice of Trustee Sale can be recorded, which has to happen at least 20 days before the sale itself. California gives no redemption period after the sale.",
      "As of January 1, 2025, California law (AB 2424) added a real tool for homeowners who want to sell instead of losing the house at auction: if you submit a signed listing agreement with a licensed California real estate broker at least 5 business days before your scheduled trustee sale, the trustee has to postpone the sale by 45 days so the property can be marketed.",
      "Never pay anyone upfront for mortgage relief help - that's illegal in California under SB 94. A HUD-approved housing counselor can tell you what assistance is available, and it's always free.",
    ],
    keySteps: [
      { title: "1. Reinstatement", body: "Pay the full past-due amount and the foreclosure stops outright. The hard part is having that amount available all at once." },
      { title: "2. Loan Modification", body: "Your lender adjusts the terms of your existing mortgage. Stops foreclosure and lowers your payment, but restructures what you owe rather than erasing it." },
      { title: "3. Bankruptcy", body: "Filing generally triggers an automatic stay that halts foreclosure, at least temporarily. A serious step with long-term credit impact - talk to a bankruptcy attorney, not a blog post." },
      { title: "4. List the Property", body: "List with a licensed brokerage and let the market pay what the house is worth. No guaranteed closing date, and typically takes 60-90 days, but AB 2424 can buy time if you're close to a sale date." },
      { title: "5. Cash Offer", body: "Sell as-is directly to House Junkies. Fast, certain, closing in as little as 14 days, no closing costs or fees." },
    ],
    faqs: [
      { question: "How does foreclosure work in California?", answer: "Non-judicial, through a trustee, no courtroom in most cases. A Notice of Default starts a 90-day reinstatement window, then a Notice of Trustee Sale requires at least 20 days' notice before the sale." },
      { question: "Can I stop a foreclosure sale once the Notice of Trustee Sale has been filed?", answer: "Yes, more than one way: reinstate the loan up until 5 business days before the sale, submit a signed listing agreement to trigger the AB 2424 postponement, or sell for cash before the sale date." },
      { question: "Do I need a foreclosure attorney?", answer: "Not always, but for bankruptcy, deed-in-lieu negotiations, or a dispute with your servicer, it's worth the conversation. For a straightforward sale, that's where we can help without needing one." },
    ],
    legalDisclaimer:
      "This covers general information about the California foreclosure process and is not legal advice. Program availability and deadlines change - confirm your specific timeline with your loan servicer and consider a HUD-approved housing counselor or an attorney.",
    quickFacts: [
      "California foreclosure is non-judicial, meaning it runs through a trustee, not a courtroom.",
      "A Notice of Default opens a 90-day window to reinstate your loan by paying what's past due.",
      "Under AB 2424, a signed listing agreement filed 5+ business days before your trustee sale can trigger a 45-day postponement.",
      "It's illegal in California (SB 94) for anyone to charge you upfront for foreclosure or mortgage relief help.",
      "The realistic minimum from a first missed payment to an actual trustee sale is around 230 days, time you can use.",
    ],
  },
  {
    slug: "divorce",
    navLabel: "Divorce",
    title: "Sell a House During Divorce",
    metaTitle: "Selling a House During Divorce in Visalia | House Junkies",
    metaDescription:
      "A fast, neutral cash sale can simplify dividing a shared property during divorce. We buy houses as-is throughout the Central Valley.",
    summary:
      "A house is often the largest shared asset in a divorce, and agreeing on a buyer can be simpler than agreeing on almost anything else. A quick, neutral cash sale takes the property off the table so both parties can move forward.",
    quickFacts: [
      "California is a community property state, meaning most property acquired during the marriage is generally split 50/50.",
      "Selling before a divorce is final versus after can affect timing, taxes, and who has to sign off on the sale.",
      "Both spouses on title generally have to agree to and sign for a sale, even if only one is living in the house.",
      "A married couple selling a primary residence may each be able to exclude up to $250,000 of capital gains, subject to the usual ownership and use rules.",
      "A direct buyout (one spouse pays the other for their share) is a different path than an outright sale to a third party, and either can work depending on the situation.",
    ],
    faqs: [
      { question: "Can I sell the house before the divorce is finalized?", answer: "Sometimes, if both spouses agree and are willing to sign. Otherwise it usually has to wait until the settlement addresses the property." },
      { question: "Does a cash sale affect how the proceeds get split?", answer: "No. A faster sale just converts the asset to cash sooner, how it's split is still determined by your settlement or the court." },
    ],
  },
  {
    slug: "fire-damage",
    navLabel: "Fire Damage",
    title: "Sell a Fire-Damaged House",
    metaTitle: "Sell a Fire-Damaged House in the Central Valley | House Junkies",
    metaDescription:
      "We buy fire-damaged properties as-is. Our in-house licensed construction crew (CA Lic #1077593) means we understand real rebuild costs.",
    summary:
      "Fire damage changes what a house is worth and what it costs to fix. Because we renovate properties with our own licensed construction crew, we can evaluate fire-damaged homes realistically instead of walking away.",
    quickFacts: [
      "Insurance proceeds after a house fire often fall short of full rebuild cost once code-required upgrades are factored in.",
      "A fire-damaged house can usually be sold as-is without repairing it first, though the buyer pool narrows to cash buyers.",
      "Rebuilding after a fire typically requires new permits, even for a like-for-like reconstruction.",
      "Traditional, financed buyers often can't get a loan approved on a house with significant fire damage.",
      "Because House Junkies renovates with our own licensed crew, we can accurately price fire-damaged properties instead of guessing.",
    ],
    faqs: [
      { question: "Do I need to file an insurance claim before selling?", answer: "Not necessarily. We can factor an in-progress claim into the offer, or buy the property as-is if you'd rather not deal with the claims process at all." },
      { question: "Will the fire damage need to be disclosed?", answer: "Yes, California generally requires disclosing known material defects, including fire damage, regardless of who you sell to." },
    ],
  },
  {
    slug: "water-damage",
    navLabel: "Water Damage",
    title: "Sell a Water-Damaged House",
    metaTitle: "Sell a Water-Damaged House in the Central Valley | House Junkies",
    metaDescription:
      "We buy water-damaged and flood-affected properties as-is throughout the Central Valley.",
    summary:
      "Water damage, whether from a burst pipe, a roof leak, or flooding, can be expensive to remediate. We buy these properties as-is and handle the renovation ourselves.",
    quickFacts: [
      "Undetected water damage can lead to mold, which gets more expensive to remediate the longer it's left.",
      "Standard homeowners insurance and flood insurance are different policies, and not all water damage is covered the same way.",
      "A water-damaged house can be sold as-is, without repairing plumbing, flooring, or drywall first.",
      "Water damage findings during a buyer's inspection are one of the most common reasons a traditional sale falls through.",
      "We buy water-damaged properties in any condition and handle the repair ourselves after closing.",
    ],
    faqs: [
      { question: "What if there's visible mold?", answer: "We still buy properties with mold, in any condition. Just let us know so we can plan for it in the offer." },
      { question: "Do I need a mold inspection before selling to you?", answer: "No, we don't require inspections or appraisals of any kind." },
    ],
  },
  {
    slug: "code-violations",
    navLabel: "Violations",
    title: "Sell a House With Code Violations",
    metaTitle: "Sell a House With Code Violations in Visalia | House Junkies",
    metaDescription:
      "Red-tagged or facing code enforcement? We buy houses with open violations, in any condition, throughout the Central Valley.",
    summary:
      "Open code violations can make a house hard to finance and hard to insure, which shrinks the buyer pool fast. We buy these properties as-is and deal with the city or county process ourselves.",
    quickFacts: [
      "A red-tagged property generally can't be occupied until the violation is resolved, which can force a fast decision.",
      "Open code violations often show up in a title search and can complicate financing for a traditional buyer.",
      "Unresolved violations can turn into liens recorded by the city or county against the property.",
      "You can sell a house with open permits or violations, it usually just narrows your buyer pool to cash buyers.",
      "Because House Junkies Construction deals with local code enforcement regularly, we can evaluate violation properties realistically.",
    ],
    faqs: [
      { question: "Can I sell a house that's currently red-tagged?", answer: "Yes, we buy red-tagged and code-violation properties regularly." },
      { question: "Will the violations show up when you research my property?", answer: "Likely yes, and that's fine, our construction arm is used to working through the local code enforcement process." },
    ],
  },
  {
    slug: "with-tenants",
    navLabel: "Tenants",
    title: "Sell a Rental With Tenants",
    metaTitle: "Sell a Rental Property With Tenants in Visalia | House Junkies",
    metaDescription:
      "Tired landlord? We buy occupied rental properties, including ones with problem tenants, throughout the Central Valley.",
    summary:
      "Selling an occupied rental property, especially with a difficult tenant situation, narrows your options fast with a traditional buyer. We buy rental properties as-is, tenants and all.",
    quickFacts: [
      "California landlord-tenant law generally requires advance written notice before entering an occupied rental, even to show it for sale.",
      "A cash-for-keys agreement pays a tenant to move out voluntarily and can be faster than a formal eviction.",
      "You can sell a rental with a tenant still in place, the buyer takes over as the new landlord under the existing lease.",
      "A property with a difficult tenant situation often scares off traditional buyers who plan to move in themselves.",
      "We buy occupied rentals regularly and handle the tenant situation after closing.",
    ],
    faqs: [
      { question: "Do I need to evict my tenant before selling?", answer: "No, we buy occupied rentals and can work with the situation as-is." },
      { question: "What happens to my tenant after closing?", answer: "That depends on the deal, options include a cash-for-keys arrangement or simply taking over as the new landlord." },
    ],
  },
  {
    slug: "vacant",
    navLabel: "Vacant",
    title: "Sell a Vacant House",
    metaTitle: "Sell a Vacant House in the Central Valley | House Junkies",
    metaDescription:
      "We buy vacant properties as-is, no matter how long they've been sitting empty.",
    summary:
      "A vacant house accumulates costs and risk the longer it sits: insurance, code enforcement attention, deferred maintenance. We buy vacant properties in any condition.",
    quickFacts: [
      "A vacant house is a more attractive target for vandalism and, in some cases, squatters, the longer it sits empty.",
      "Some California cities require vacant properties to be registered, with fees or inspections attached.",
      "Standard homeowners insurance policies often limit or exclude coverage once a house has been vacant past a certain number of days.",
      "A vacant house still accrues property taxes, insurance, and utility costs even while producing no income.",
      "We buy vacant properties in any condition, no matter how long they've been sitting empty.",
    ],
    faqs: [
      { question: "How long can a vacant house sit before it becomes a problem for insurance?", answer: "It varies by policy, but many insurers restrict or void coverage after 30 to 60 days of vacancy, worth checking your policy directly." },
      { question: "Do I need to winterize or secure the property before selling?", answer: "No, we buy vacant properties as-is, in whatever condition they're currently in." },
    ],
  },
  {
    slug: "liens",
    navLabel: "Liens",
    title: "Sell a House With Liens or Back Taxes",
    metaTitle: "Sell a House With Liens or Tax Debt in Tulare County | House Junkies",
    metaDescription:
      "We buy houses with liens, judgments, or delinquent property taxes attached, and can help work through what's owed at closing.",
    summary:
      "Liens and delinquent property taxes get resolved at closing more often than people expect. We buy properties in this situation and work with escrow to sort out what's owed.",
    quickFacts: [
      "Common lien types include property tax liens, mechanic's liens from unpaid contractors, and judgment liens from lawsuits.",
      "Liens generally get paid off out of sale proceeds at closing through escrow, not before you can sell.",
      "You can sell a house with a lien on it, the title company resolves it as part of the closing process.",
      "Delinquent property taxes in California can eventually lead to a tax default and, if unresolved long enough, a county tax sale.",
      "A title search almost always surfaces liens before closing, so it's better to know about them upfront than be surprised at the table.",
    ],
    faqs: [
      { question: "Will I still get paid if there's a lien on the property?", answer: "In most cases, yes. The lien is paid off out of the proceeds at closing, and you receive what's left." },
      { question: "What if the lien is more than the property is worth?", answer: "We can still evaluate the deal, though the numbers may not work in every case, that's part of the free consult." },
    ],
  },
  {
    slug: "as-is",
    navLabel: "As-Is",
    title: "Sell As-Is, No Repairs",
    metaTitle: "Sell Your House As-Is in Visalia | No Repairs Needed | House Junkies",
    metaDescription:
      "Skip the repair list. We buy houses as-is throughout the Central Valley, from small fixes to major renovation needs.",
    summary:
      "Not every seller has a specific hardship, some just don't want to deal with repairs, showings, or a drawn-out listing process. We buy as-is, in any condition, no repairs required.",
    quickFacts: [
      "Selling \"as-is\" means the seller won't make repairs or price concessions for defects found after the offer.",
      "Cash investors are typically the buyers who can actually close on an as-is house without an appraisal or inspection contingency.",
      "FHA and VA financed buyers often can't use their loan on a house that doesn't meet minimum property condition standards, which rules them out for as-is sales.",
      "California law still generally requires disclosing known material defects, even in an as-is sale.",
      "An as-is sale usually closes faster than a listed sale, since there's no repair negotiation period.",
    ],
    faqs: [
      { question: "Do I have to disclose anything if I'm selling as-is?", answer: "Yes, California generally still requires disclosing known material defects even in an as-is sale." },
      { question: "Is an as-is sale always faster?", answer: "Usually, since there's no repair negotiation period, but the real speed comes from paying cash and skipping financing contingencies." },
    ],
  },
  {
    slug: "relocating",
    navLabel: "Relocating",
    title: "Sell Fast Because You're Relocating",
    metaTitle: "Relocating? Sell Your House Fast in Visalia | House Junkies",
    metaDescription:
      "Moving for work or family and need to sell on a tight timeline? We buy houses as-is throughout the Central Valley and close on your schedule.",
    summary:
      "A job change or family move often comes with a deadline the traditional listing process can't match. We buy houses as-is and can close in as little as 7 days, so the house isn't the thing holding up your move.",
    quickFacts: [
      "Selling before a job relocation avoids carrying two mortgages, selling after gives you more time to prepare the house.",
      "A house can be sold long-distance, with a local buyer and title company handling the details without you present.",
      "A cash sale can close in as little as 7 days, which matters when a relocation date is fixed.",
      "Renting out the house instead of selling is an option, but comes with ongoing landlord responsibilities from out of the area.",
      "Temporary housing near your new job while the sale finalizes is common when timelines don't line up perfectly.",
    ],
    faqs: [
      { question: "Can you close before I actually move?", answer: "Yes, we can typically close in as little as 7 days, well ahead of most relocation timelines." },
      { question: "What if I've already moved out of state?", answer: "That's fine, the whole process can be handled remotely with a local title company handling the closing." },
    ],
  },
];

export function getSituation(slug: string): SituationData | undefined {
  return situations.find((s) => s.slug === slug);
}
