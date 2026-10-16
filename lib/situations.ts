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
  // Real, sourced Visalia / Tulare County detail. Paragraphs may contain
  // internal links written as [text](/path).
  localSection?: { heading: string; paragraphs: string[]; sources?: { label: string; url: string }[] };
  quickFacts: string[]; // 5 short, informational, search-relevant facts every situation page shows
};

export const situations: SituationData[] = [
  {
    slug: "inherited-property",
    navLabel: "Inherited",
    title: "Sell an Inherited House",
    metaTitle: "Sell an Inherited House in Visalia & Tulare County",
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
    metaTitle: "Sell an Inherited House During Probate in Visalia, CA",
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
      { question: "Where are probate cases handled for a Visalia house?", answer: "Probate is filed in the Superior Court of the county where the person lived when they passed. For someone who lived in Visalia or anywhere in Tulare County, that is the Tulare County Superior Court." },
      { question: "Can I sell a probate house that has back taxes or liens?", answer: "Yes. Unpaid property taxes, liens, and the mortgage are paid off out of the sale at closing, and what is left goes to the estate." },
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
    metaTitle: "Facing Foreclosure in Visalia, CA? Your 5 Options",
    metaDescription:
      "Behind on house payments in Visalia or Tulare County? Learn California's foreclosure timeline and your 5 options, including a fast cash sale to House Junkies.",
    summary:
      "Pre-foreclosure is the period after you fall behind on payments but before your home is actually sold. California is a non-judicial foreclosure state, and the realistic minimum from a first missed payment to an actual sale is around 230 days, roughly seven and a half months. That's not a reason to wait, it's time you can use. House Junkies, a Visalia company, can buy your house for cash before the sale date if selling is the route you choose.",
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
      { question: "Is my foreclosure public record in Tulare County?", answer: "Yes. The Notice of Default and the Notice of Trustee Sale are recorded with the Tulare County Clerk-Recorder, so anyone can look them up. That is why many homeowners start getting investor mail right after a notice is filed." },
      { question: "Can Tulare County sell my house for unpaid property taxes?", answer: "Yes. If property taxes go unpaid long enough, the Tulare County Tax Collector can sell the property at its online tax auction. Owners can stop it by paying what is owed before the County's deadline, which was 5:00 p.m. the day before the sale in 2026." },
      { question: "How fast can House Junkies close before my sale date?", answer: "Often within one to two weeks, depending on title and how fast your lender sends the payoff. The sooner you call, the more room there is to get it done before the sale." },
    ],
    legalDisclaimer:
      "This covers general information about the California foreclosure process and is not legal advice. Program availability and deadlines change - confirm your specific timeline with your loan servicer and consider a HUD-approved housing counselor or an attorney.",
    localSection: {
      heading: "Foreclosure in Visalia and Tulare County",
      paragraphs: [
        "In Tulare County, the paperwork that moves a foreclosure forward is public record. When a lender starts a foreclosure on a Visalia house, the Notice of Default and later the Notice of Trustee Sale are recorded with the Tulare County Clerk-Recorder, whose office is at 5951 S. Mooney Blvd. in Visalia. That is why many homeowners start getting letters, calls, and knocks on the door from investors right after a notice is filed. Anyone can look up those records, so it pays to know your options before a stranger explains them to you.",
        "There is also a second kind of foreclosure that has nothing to do with your mortgage. If property taxes go unpaid long enough, the property becomes subject to the Tulare County Tax Collector's power to sell, and the County auctions it online through GovEase. For 2026, the County's auction was March 3, the second sale for anything left over was May 19, and owners had until 5:00 p.m. on May 18 to pay what they owed and keep the property. If unpaid taxes or other liens are part of your situation, our page on [selling a house with liens](/sell-your-house/liens) walks through how they get paid off at closing.",
        "Help with the foreclosure process itself is free. A HUD-approved housing counselor can walk you through your options at no cost, and anyone who asks you to pay upfront for foreclosure help is breaking California law.",
        "House Junkies is a Visalia company, and we buy houses facing foreclosure across [Visalia](/we-buy-houses/visalia), [Tulare](/we-buy-houses/tulare), and the rest of [Tulare County](/counties/tulare-county). As long as the sale price covers what you owe, a cash sale pays off your loan and the past-due amount at closing, the foreclosure ends, and any equity left over goes to you instead of being lost at auction. If the house was inherited and is now behind on payments, see our [probate](/sell-your-house/probate) page. If it needs a lot of work, see [selling as-is](/sell-your-house/as-is).",
      ],
      sources: [
        { label: "Tulare County Clerk-Recorder", url: "https://www.tularecounty.ca.gov/assessorclerk-recorder/clerk-recorder" },
        { label: "Tulare County 2026 Tax Auction", url: "https://tularecounty.ca.gov/auditor/2026-tax-auction" },
      ],
    },
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
    metaTitle: "Selling a House During Divorce in Visalia",
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
    metaTitle: "Fire-Damaged House in Visalia? Sell It As-Is for Cash",
    metaDescription:
      "Had a house fire in Visalia or Tulare County? House Junkies buys fire-damaged houses as-is, with our own licensed crew (CA LIC#1077593). No repairs, no cleanup.",
    summary:
      "Fire damage changes what a house is worth and what it costs to fix. Because House Junkies renovates properties with our own licensed construction crew, we can evaluate fire-damaged homes realistically instead of walking away.",
    localSection: {
      heading: "Fire-Damaged Houses in Visalia and Tulare County",
      paragraphs: [
        "Rebuilding a burned house in Visalia means going through the City's Permit Counter at City Hall East, 315 E. Acequia Ave., (559) 713-4444. The City only issues permits to the property owner or a state-licensed contractor, and any construction or remodeling now has to meet the 2025 California Building Standards Code, which took effect January 1, 2026. Those newer code requirements are a big part of why insurance money so often comes up short of what a full rebuild actually costs.",
        "A burned house that is left open or falling apart can also draw complaints to the City's Code Enforcement team, which handles buildings that are unsafe to live in, at (559) 713-4534. On top of that, the Visalia Fire Department can send a notice for junk, debris, and overgrown weeds on the lot under Municipal Code Chapter 8.56. If the owner does not clean it up, the City can do it and bill the owner, and those costs become a lien on the property. Outside city limits, Tulare County RMA Code Compliance can order repairs and, for serious problems that never get fixed, move to abatement or demolition.",
        "House Junkies prices fire work every week, because our own licensed crew, House Junkies Construction (CA LIC#1077593), does the rebuilds on the houses we buy. A full rehab with fire damage runs us roughly $90 per square foot, and a badly burned house can run up to $135 per square foot, before permits, holding costs, and closing costs. We show you exactly how that turns into an offer on our page about [how we calculate your offer](/how-we-calculate-your-offer).",
        "We buy fire-damaged houses all over [Visalia](/we-buy-houses/visalia) and [Tulare County](/counties/tulare-county), with or without an open insurance claim. If the fire also left [water damage](/sell-your-house/water-damage) from putting it out, or the house now has [code violations](/sell-your-house/code-violations), we buy it as-is either way.",
      ],
      sources: [
        { label: "City of Visalia Permit Counter", url: "https://www.visalia.gov/224" },
        { label: "City of Visalia Code Enforcement", url: "https://www.visalia.gov/226" },
        { label: "Visalia Fire Department notice FAQ", url: "https://www.visalia.gov/m/faq?cat=25" },
        { label: "Tulare County RMA Code Compliance", url: "https://tularecounty.ca.gov/rma/code/substandard-housing" },
      ],
    },
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
      { question: "Do I need a permit to rebuild after a fire in Visalia?", answer: "Yes. Rebuilding needs permits from the City of Visalia Permit Counter at 315 E. Acequia Ave., and the City only issues them to the owner or a state-licensed contractor. If you sell to House Junkies, our licensed crew handles the permits." },
      { question: "Do I have to clean up the fire debris before selling?", answer: "No. We buy the house as-is, debris and all, and handle the cleanup after closing." },
      { question: "Can I sell a house that was red-tagged after a fire?", answer: "Yes. A red tag means nobody can live there until it is fixed, but you can still sell it. We buy red-tagged fire houses regularly." },
      { question: "How do you figure out an offer on a fire-damaged house?", answer: "We start with what the house would be worth fully rebuilt, then subtract the real rebuild cost from our own crew, plus holding and closing costs. Fire rebuilds usually run $90 to $135 per square foot." },
    ],
  },
  {
    slug: "water-damage",
    navLabel: "Water Damage",
    title: "Sell a Water-Damaged House",
    metaTitle: "Sell a Water-Damaged House in the Central Valley",
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
    metaTitle: "Code Violations in Visalia? Sell Your House As-Is for Cash",
    metaDescription:
      "Got a code violation, red tag, or city notice on a Visalia house? House Junkies buys houses with open violations as-is, in any condition, with no repairs.",
    summary:
      "Open code violations can make a house hard to finance and hard to insure, which shrinks the buyer pool fast. House Junkies buys these properties as-is and deals with the city or county process ourselves.",
    localSection: {
      heading: "Code Violations in Visalia and Tulare County",
      paragraphs: [
        "Inside Visalia city limits, code enforcement is handled by the City's Neighborhood Preservation Division, which most people just call Code Enforcement. It deals with things like construction done without permits, substandard living conditions, buildings that are unsafe to live in, abandoned or broken-down vehicles on private property, and swimming pools that are not secured or kept up. Anyone can report a property through the City's SeeClickFix system or by calling (559) 713-4534, so a lot of owners first hear about a problem when a notice shows up in the mail.",
        "In 2026 the City of Visalia updated its code enforcement rules in Visalia Municipal Code Chapter 1.13. Owners now have 60 working days to appeal after a violation is found and a notice of correction is issued. The old flat 10-day deadline to fix a problem is gone. Now the time you get depends on how serious the problem is, and a life-safety issue like a broken sewer line has to be fixed right away.",
        "Weeds, junk, and fire hazards are handled by the Visalia Fire Department under Municipal Code Chapter 8.56. If an owner does not clean up after a notice, the City can charge inspection and administrative fees or clean it up at the owner's expense. Under the City's own rules, all of those costs become a lien on the property. If you already have a lien on your house, our page on [selling a house with liens](/sell-your-house/liens) explains how that gets handled at closing.",
        "Outside city limits, in places like [Goshen](/we-buy-houses/goshen) and [Traver](/we-buy-houses/traver), it is Tulare County's Resource Management Agency (RMA) Code Compliance that steps in. The County sends a Notice of Violation and Order to Correct, comes back to inspect, and for serious problems that never get fixed, can move to abatement or even demolition. You can reach County Code Compliance at (559) 624-7060.",
        "House Junkies is based in Visalia, and our licensed crew, House Junkies Construction (CA LIC#1077593), pulls permits and works through these same city and county processes on the houses we renovate. That is why we can buy a house with open violations, a red tag, or unpaid code fees without asking you to fix anything first. See how we [buy houses in Visalia](/we-buy-houses/visalia) and across [Tulare County](/counties/tulare-county), or read about selling a [vacant house](/sell-your-house/vacant) or a [fire-damaged house](/sell-your-house/fire-damage).",
      ],
      sources: [
        { label: "City of Visalia Code Enforcement", url: "https://www.visalia.gov/226" },
        { label: "Valley Voice, May 2026", url: "https://www.ourvalleyvoice.com/2026/05/21/visalia-fixes-errors-in-update-to-code-enforcement-regs/" },
        { label: "Visalia Fire Department notice FAQ", url: "https://www.visalia.gov/m/faq?cat=25" },
        { label: "Tulare County RMA Code Compliance", url: "https://tularecounty.ca.gov/rma/code/substandard-housing" },
      ],
    },
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
      { question: "Do I have to fix the violations before I sell?", answer: "No. House Junkies buys houses with open code violations as-is. We price the repairs into our offer, and our own licensed crew handles the work and the permits after we close." },
      { question: "Who handles code enforcement in Visalia?", answer: "Inside city limits, it is the City of Visalia's Neighborhood Preservation Division, also called Code Enforcement, at (559) 713-4534. Weed and fire hazard notices come from the Visalia Fire Department. Outside city limits, Tulare County RMA Code Compliance handles it at (559) 624-7060." },
      { question: "How long do I have to fix a code violation in Visalia?", answer: "It depends on the problem. Since the City's 2026 update, the deadline is based on how serious the violation is, and safety problems have to be fixed right away. You also have 60 working days to appeal after a notice of correction is issued." },
      { question: "What if the city already put a lien on my house?", answer: "You can still sell. Code enforcement costs that the City turns into a lien are usually paid off out of the sale at closing, through escrow, before you get your money." },
    ],
  },
  {
    slug: "with-tenants",
    navLabel: "Tenants",
    title: "Sell a Rental With Tenants",
    metaTitle: "Sell a Rental Property With Tenants in Visalia",
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
      { question: "Does selling the house end my tenant's lease?", answer: "No. A sale does not cancel a lease. The buyer takes over as the landlord, and the tenant's rights stay the same. That is one reason most move-in buyers will not buy an occupied rental, and why House Junkies will." },
      { question: "Can I just ask my tenant to leave so I can sell?", answer: "Not always. Under California's Tenant Protection Act, many tenants who have been in place 12 months or more can only be asked to leave for a reason the law allows, and some no-fault move-outs require the owner to pay relocation help. Selling to us lets you skip that." },
      { question: "Do you buy duplexes and small apartment buildings with tenants?", answer: "Yes. We buy occupied single family rentals, duplexes, and small multi-family properties across Visalia and Tulare County." },
    ],
  },
  {
    slug: "vacant",
    navLabel: "Vacant",
    title: "Sell a Vacant House",
    metaTitle: "Vacant House in Visalia? Sell It As-Is for Cash",
    metaDescription:
      "Own an empty house in Visalia or Tulare County? House Junkies buys vacant houses as-is, no matter how long they have sat. No cleanup, no repairs, no fees.",
    summary:
      "A vacant house accumulates costs and risk the longer it sits: insurance, code enforcement attention, deferred maintenance. House Junkies buys vacant properties in any condition, no matter how long they have been sitting empty.",
    localSection: {
      heading: "Vacant Houses in Visalia and Tulare County",
      paragraphs: [
        "An empty house in Visalia is still the owner's responsibility. The Visalia Fire Department's rules say the property owner is responsible for keeping up the property, even when someone else lives there or uses it. Under Visalia Municipal Code Chapter 8.56, grass and weeds have to stay under 3 inches, junk and trash have to be hauled off, and dead trees and bushes have to be removed. A vacant house is often where those problems start piling up, because nobody is there to notice.",
        "If an owner does not handle a Fire Department notice, the City can charge inspection and administrative fees, or clean up the property and bill the owner. Under the City's rules, all of those costs become a lien on the property. The Fire Department can usually give up to two weeks of extra time if you call (559) 713-4026 before the deadline.",
        "Vacant houses also draw complaints to the City's Code Enforcement team, which handles buildings that are unsafe to live in and swimming pools that are not secured or kept up. A green pool behind an empty house is one of the most common reasons a neighbor calls it in. Code Enforcement takes reports through SeeClickFix or at (559) 713-4534. Outside city limits, Tulare County RMA Code Compliance handles these complaints, and for serious problems that never get fixed, the County can move to abatement or demolition.",
        "The property taxes do not stop either. If they go unpaid long enough, the property can end up in Tulare County's tax-defaulted property auction, which the County holds online through GovEase. In 2026 that auction was held March 3, with a second sale on May 19. If back taxes or other liens are part of your situation, read our page on [selling a house with liens](/sell-your-house/liens).",
        "House Junkies buys vacant houses all over [Visalia](/we-buy-houses/visalia) and [Tulare County](/counties/tulare-county), whether the house sat empty for a month or ten years. Weeds, junk, a green pool, broken windows, or belongings left behind are all fine. If the house is empty because you inherited it, see our pages on [inherited houses](/sell-your-house/inherited-property) and [probate](/sell-your-house/probate). If it has open city violations, see [selling a house with code violations](/sell-your-house/code-violations).",
      ],
      sources: [
        { label: "Visalia Fire Department notice FAQ", url: "https://www.visalia.gov/m/faq?cat=25" },
        { label: "City of Visalia Code Enforcement", url: "https://www.visalia.gov/226" },
        { label: "Tulare County RMA Code Compliance", url: "https://tularecounty.ca.gov/rma/code/substandard-housing" },
        { label: "Tulare County 2026 Tax Auction", url: "https://tularecounty.ca.gov/auditor/2026-tax-auction" },
      ],
    },
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
      { question: "Can the City of Visalia fine me for a vacant house?", answer: "Yes. If weeds, junk, or other hazards are not cleaned up after a Fire Department notice, the City can charge fees or clean the property itself at your expense, and those costs become a lien on the property." },
      { question: "What if my vacant house has a green pool?", answer: "That is common, and it is fine with us. Unsecured or unkept pools are a Code Enforcement issue in Visalia, but we buy the house as-is with the pool in whatever shape it is in." },
      { question: "Can I sell a vacant house that still has belongings in it?", answer: "Yes. Take anything you want to keep, and leave the rest. We handle the cleanout after closing." },
      { question: "What if I owe back property taxes on the vacant house?", answer: "You can still sell. Unpaid property taxes are paid off out of the sale at closing, and selling before the property reaches Tulare County's tax auction protects the equity you have left." },
    ],
  },
  {
    slug: "liens",
    navLabel: "Liens",
    title: "Sell a House With Liens or Back Taxes",
    metaTitle: "Sell a House With Liens or Tax Debt in Tulare County",
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
    slug: "hoarder-house",
    navLabel: "Hoarder House",
    title: "Sell a Hoarder House",
    metaTitle: "Sell a Hoarder House in Visalia & the Central Valley",
    metaDescription:
      "Packed house, no cleanout budget? We buy hoarder and heavily cluttered houses as-is in Visalia and the Central Valley. No cleaning, no judgment, cash offer in 24 hours.",
    summary:
      "A house full of belongings is one of the hardest things to sell the traditional way, and it is usually tied to something painful: a parent who passed, a family member who needs care, or years of things piling up. We buy hoarder houses as-is, with the contents still inside, and we handle the cleanout ourselves. No judgment, and no need to clean before we see it.",
    details: [
      "Most buyers and agents will not touch a house that is packed to the walls. Lenders and appraisers need to see the property, and a retail buyer is not going to pay full price for a house they cannot walk through. A cash buyer who plans to renovate can price the cleanout and repairs into the offer and skip all of that.",
      "If the house belonged to someone who passed away, the family often has to decide what to keep before anything can happen. We can give you time to go through the house, take what matters to you, and close on a date that works. If the property is part of an estate, we work with the executor and, where needed, with counsel on the probate side.",
    ],
    quickFacts: [
      "Hoarding disorder is a recognized condition in the DSM-5, which means it is not a character flaw and many families are dealing with it for the first time.",
      "A heavily cluttered house usually cannot be listed the normal way, since agents, photographers, and appraisers need safe access to every room.",
      "City code enforcement or the fire department can cite a property for clutter that blocks exits or creates a fire or sanitation hazard, and those citations can turn into fines or liens.",
      "A professional cleanout of a packed house can cost thousands of dollars before any repairs begin, which is why many owners sell as-is instead.",
      "You are not required to clean out a house before selling it to a cash buyer. Belongings can stay, and the buyer handles removal after closing.",
    ],
    faqs: [
      { question: "Do I need to clean out a hoarder house before selling?", answer: "No. We buy the house as-is with the contents still inside, and we handle the cleanout after closing. If there are items you want to keep, we will schedule time for you to take them first." },
      { question: "Can you buy a hoarder house that has code violations or a lien?", answer: "Yes. Citations, unpaid fines, and liens can usually be paid off from the sale proceeds at closing. See our pages on code violations and liens for how that works." },
      { question: "My parent is still living in the house. Can we still sell?", answer: "It depends on who holds title and who has legal authority to sign. We can walk you through your options. Call us for a private, no-pressure conversation." },
      { question: "Will you judge the condition of the house?", answer: "No. We walk through cluttered, damaged, and neglected houses regularly. Our job is to make a fair offer and make the process easy, not to comment on how the house got that way." },
    ],
  },
  {
    slug: "as-is",
    navLabel: "As-Is",
    title: "Sell As-Is, No Repairs",
    metaTitle: "Sell Your House As-Is in Visalia | No Repairs Needed",
    metaDescription:
      "Selling a fixer-upper? Skip the repair list. We buy houses as-is throughout the Central Valley, from small fixes to major renovation needs.",
    summary:
      "Not every seller has a specific hardship, some just don't want to deal with repairs, showings, or a drawn-out listing process. We buy as-is, in any condition, no repairs required. That includes fixer-uppers that need a new roof, flooring, kitchen, or a full renovation.",
    quickFacts: [
      "Selling \"as-is\" means the seller won't make repairs or price concessions for defects found after the offer.",
      "Cash investors are typically the buyers who can actually close on an as-is house without an appraisal or inspection contingency.",
      "FHA and VA financed buyers often can't use their loan on a house that doesn't meet minimum property condition standards, which rules them out for as-is sales.",
      "California law still generally requires disclosing known material defects, even in an as-is sale.",
      "An as-is sale usually closes faster than a listed sale, since there's no repair negotiation period.",
    ],
    faqs: [
      { question: "Do I have to disclose anything if I'm selling as-is?", answer: "Yes, California generally still requires disclosing known material defects even in an as-is sale." },
      { question: "Can I sell a fixer-upper without making any repairs?", answer: "Yes. We buy fixer-uppers as-is and price the repair work into our offer, so you do not spend money or time fixing a house you are about to sell." },
      { question: "Is an as-is sale always faster?", answer: "Usually, since there's no repair negotiation period, but the real speed comes from paying cash and skipping financing contingencies." },
      { question: "Will you still buy my house if it needs a new roof or foundation work?", answer: "Yes. Big repairs are exactly what we price in. Our own licensed crew, House Junkies Construction, does the work after we close." },
      { question: "Do I have to clean the house before you buy it?", answer: "No. Leave what you do not want, and we handle the cleanout after closing." },
    ],
  },
  {
    slug: "relocating",
    navLabel: "Relocating",
    title: "Sell Fast Because You're Relocating",
    metaTitle: "Relocating? Sell Your House Fast in Visalia",
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
