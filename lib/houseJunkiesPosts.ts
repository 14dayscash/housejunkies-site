// House Junkies' own blog, hosted directly on housejunkiesinc.org (separate
// from the dominicmcclelland.com summaries in lib/blogPosts.ts).
//
// STANDING RULE, effective immediately: no post goes live here without
// Dominic's sign-off first. Draft new posts as a plain .txt file and
// present it for approval before adding anything to this array or pushing.
// Never publish a draft straight to the array on the same turn it's written.
//
// Also standing: nothing here criticizes the old site, names past mistakes
// (BBB claims, testimonials, etc.), or airs internal history publicly.
// Positive, forward-facing framing only, this is a public-facing page.
//
// This started empty on purpose, and stays honest the same way: nothing
// gets invented to fill it out, an empty section beats a fake post, same
// rule as everywhere else on this site.
//
// Standing instruction: any time this site gets updated, check
// dominicmcclelland.com/blog for new posts first (lib/blogPosts.ts covers
// those), independently of whether a new House Junkies-authored post is
// added here.

export type HouseJunkiesPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  summary?: string[]; // 3 short bullet points shown at the top of the post
  body: string[];
  links?: { label: string; url: string }[]; // real clickable citations/backlinks, shown at the end
  heroImage?: { src: string; alt: string }; // optional image shown at the top of the post
};

export const houseJunkiesPosts: HouseJunkiesPost[] = [
  {
    slug: "16-recent-purchases-tulare-county",
    title: "A Snapshot of What We Have Been Buying: 16 Tulare County Houses and What We Paid",
    date: "October 14, 2026",
    category: "Company News",
    author: "Dominic McClelland",
    excerpt:
      "House Junkies has bought, renovated, and resold 350+ homes over 7+ years, and we have bought 25+ more since July 2026 alone. Here is a snapshot of 16 of them, what we paid, and what we are doing with each one.",
    summary: [
      "House Junkies has bought, renovated, and resold 350+ homes over 7+ years, and we have purchased 25+ more properties since July 2026 alone.",
      "This is a snapshot of 16 of those recent buys across eight Tulare County cities, from a $65,000 mobile home to a $350,000 home on 1.5 acres.",
      "Some are already sold, rented, or listed. The rest are under construction or still being planned out right now.",
    ],
    body: [
      "House Junkies has bought, renovated, and resold 350+ homes over 7+ years, and we have not slowed down: we have purchased 25+ more properties since July 2026 alone. This post is a snapshot, not the whole picture. We pulled 16 of those recent buys, put them on our Projects page with photos and the price we paid, and we want to walk you through what is actually happening with them. Most people only ever see the before and the after. This is the middle.",
      "The 16 in this snapshot add up to $2,820,000 across eight Tulare County cities: Porterville, Visalia, Tulare, Lindsay, Dinuba, Exeter, Farmersville, and Strathmore. The average purchase was $176,250. The smallest was an 863 square foot mobile home in Porterville for $65,000, and the largest was a 5-bedroom, 3,020 square foot home on 1.5 acres in Lindsay for $350,000.",
      "Visalia is home base, but only two of these 16 were in Visalia. Porterville led with six. If you own a house outside Visalia and figured no serious buyer would make you an offer, this list says otherwise. Each city in the list has its own page on our site, and those pages now show the real purchases we made in that city.",
      "They are not all the same kind of house either. Ten are single family homes, three are multi-family properties, two are mobile homes, and one is a church. Six are under 1,000 square feet and three sit on more than an acre. Small houses, big lots, mobile homes, and unusual properties are exactly where a retail buyer's lender tends to slow things down or back out, and where a cash buyer that renovates with its own licensed crew can still make a deal work.",
      "Start with the fastest one. We bought 32750 Lincoln Rd in Visalia on July 15. It is a small place, 550 square feet, but it sits on more than a third of an acre, and that lot was a big part of why it made sense. Forty-three days later it sold for $247,500. That is about as clean as this business gets: buy it, fix what needs fixing, get it back on the market, and move on to the next one.",
      "Then there is the newest one. We closed on 765 S C St in Tulare on October 5, and it is already listed at $299,990. Across town, 756 S Oliver St, which we bought on September 24, is listed at $279,900. Some houses need a full gut. Some just need the right buyer. When the work is light, a house can go from our closing to the market in a matter of days, and that speed is a big part of how we keep buying at this pace.",
      "Not everything gets flipped. 425 W Willow St in Exeter, a 680 square foot two-bedroom, is rented out now. Some houses make more sense held for the long run than sold, and the plan for each one comes down to the numbers on that specific property, not a rule we follow every time.",
      "Then there are the ones that do not fit in a box. 19667 Avenue 195 in Strathmore is a church, bought in July for $125,000 and now listed at $209,990. Most buyers would not know what to do with a building like that. We saw 1,640 square feet on a 13,050 square foot lot in a small town, and a buyer out there who needs exactly that kind of space.",
      "The big lots are where it gets interesting. 40074 Road 56 in Dinuba is a 2,347 square foot house on 2.85 acres. 24215 Avenue 216 in Lindsay is a 5-bedroom on 1.5 acres, and 2333 E Springville Ave in Porterville sits on about 1.3 acres. With that much land, the house is only part of the story. These are the properties we look at for more than a flip, whether that means adding units, splitting off land, or redeveloping down the road, if the city and the numbers allow it.",
      "The multi-family properties play a different game. 50 E Locust Ave in Porterville is a 3,526 square foot building, and we also picked up 41 Chess Terrace St in Porterville and 207 Pleasant St in Lindsay. Income properties like these are the kind we may renovate, rent out, and refinance to pull our money back out and put it into the next deal. That is one of the ways a company keeps buying at this pace without slowing down.",
      "And the rest are in the middle of the work right now. Eleven of the 16 have not been listed yet. Some are under construction with our crew at House Junkies Construction, and some are still being planned out: what to fix, what to keep, and whether each one ends up a flip, a rental, or something bigger. As they finish, they will show up on our Projects page, and the ones we sell will show up on our Property for Sale page.",
      "You will notice every property page shows an estimated value, and it is usually a lot higher than what we paid. That estimate assumes a house that is already fixed up and sold the normal way. Fixing one up costs our crew anywhere from about $35 a square foot for cosmetic work to $135 a square foot for a house that burned, and that is before loan costs, holding costs, closing costs, and agent fees when we resell. If your house is already in good shape and you are not in a rush, listing it may get you more, and we will tell you that straight.",
      "Behind every one of these 16 is an owner who decided they were done with the house, whatever the reason. If you have a house, a duplex, a mobile home, a church, or a piece of land you are done dealing with anywhere in Tulare County, this is what we do every week. Call or text, we look at it, you get a written offer within 24 hours, and you pick the closing date. We cover the closing costs and there are no commissions.",
      "If you are a buyer, three of these are for sale right now, with more coming. And if you know someone who needs to sell, our partner program pays when a referred deal closes. Call or text us at (559) 368-8956.",
    ],
    links: [
      { label: "See all 16 on our Projects page", url: "https://housejunkiesinc.org/projects" },
      { label: "Houses for sale now", url: "https://housejunkiesinc.org/buy" },
      { label: "We buy houses in Porterville", url: "https://housejunkiesinc.org/we-buy-houses/porterville" },
      { label: "We buy houses in Tulare County", url: "https://housejunkiesinc.org/counties/tulare-county" },
      { label: "Cash Offer vs. Listing", url: "https://housejunkiesinc.org/compare" },
      { label: "Partner With Us", url: "https://housejunkiesinc.org/partners/agents" },
    ],
  },
  {
    slug: "house-junkies-earns-bbb-accreditation",
    title: "House Junkies Inc. Earns BBB Accreditation",
    date: "September 22, 2026",
    category: "Company News",
    author: "House Junkies Inc.",
    heroImage: { src: "/images/bbb-accredited-badge.jpg", alt: "We're proud to be a BBB Accredited Business" },
    excerpt:
      "House Junkies Inc. has earned accreditation from the Better Business Bureau, Mountain West & Pacific Southwest, backed by an A+ rating.",
    summary: [
      "House Junkies Inc. is now a BBB Accredited Business with an A+ rating, effective September 22, 2026.",
      "The company has operated continuously for 7 years (BBB file opened June 15, 2020; incorporated May 29, 2019) as part of Ulloa Investment Group, alongside House Junkies Construction and Legacy Real Estate.",
      "House Junkies Inc. buys houses for cash throughout Visalia, Tulare, Kings, Fresno, and Kern counties, and a broader Central California service area.",
    ],
    body: [
      "FOR IMMEDIATE RELEASE",
      "VISALIA, CA - House Junkies Inc., a Visalia-based real estate investment company, announced this week that it has earned accreditation from the Better Business Bureau, Mountain West & Pacific Southwest, effective September 22, 2026. As a BBB Accredited Business, House Junkies Inc. is dedicated to promoting trust in the marketplace and upholding high standards for honest business behavior, backed by the BBB's A+ rating.",
      "Customers need to trust the companies they do business with, and BBB is committed to advancing that trust in the marketplace. BBB Accreditation is an honor, and not every business qualifies. The dedication House Junkies Inc. has displayed to earn this accreditation shows the high level of commitment the company has for not only its customers, but for the community in which it operates.",
      "\"We are pleased to join a community of businesses committed to doing things the right way,\" said Abel Ulloa, Owner/CEO of House Junkies Inc. \"We value building trust with our customers, and our BBB Accreditation is a public display of our commitment to excellence and maintaining high ethical standards.\"",
      "BBB Accredited Businesses adhere to BBB's Standards for Trust, a comprehensive set of policies, procedures, and best practices representing trustworthiness in the marketplace. The standards call for building trust, embodying integrity, advertising honestly, telling the truth, being transparent, honoring promises, being responsive, and safeguarding privacy.",
      "House Junkies Inc. holds an open BBB file dating back to June 15, 2020, and has operated continuously since its incorporation on May 29, 2019, as a California corporation, 7 years in business. The company is led by Abel Ulloa, Owner/CEO and Principal Contact, and Dominic McClelland, Operations Manager and Customer Contact.",
      "House Junkies Inc. is a real estate investment company that purchases residential properties for cash, in any condition, throughout Visalia, Tulare, Kings, Fresno, and Kern counties, and a broader Central California service area that now also includes Madera, Merced, Monterey, San Benito, San Luis Obispo, and Inyo counties. Properties are renovated by the company's affiliated licensed general contractor and resold through its affiliated real estate brokerage. Common seller situations include inherited property, probate, foreclosure, divorce, fire and water damage, tenant-occupied rentals, vacant properties, liens, and homes needing repair. The company's registered products and services with the BBB are listed under CA Real Estate: cash purchases of residential properties in any condition, renovation, and resale.",
      "House Junkies Inc. operates as part of Ulloa Investment Group, a vertically integrated structure under which the company also does business as First American Investments L.L.C., Legacy Faith Homes L.L.C., One Stop Investments L.L.C., and Ulloa Investment Group L.L.C. The group includes House Junkies Construction, a licensed general contractor (CA LIC#1077593) that handles every renovation in-house, and Legacy Real Estate, a licensed brokerage (DRE #02165291) and the largest brokerage in Tulare County, that lists and resells finished properties.",
      "House Junkies Inc. is led by Abel Ulloa (Owner/CEO), Dominic McClelland (Operations Manager), Jenny Madrid (Broker, Legacy Real Estate), and Omar Ayon (Project Manager, House Junkies Construction). The company operates four offices across the Central Valley: 801 West Main Street and 1814 West Dorothea Avenue in Visalia, CA 93291 and 93277, 601 South Main Street in Porterville, CA 93257, and 151 North N Street in Tulare, CA 93274.",
      "To learn more about House Junkies Inc., please visit the company's BBB Business Profile, or contact the company at (559) 368-8956 or 801 West Main Street, Visalia, CA 93291. House Junkies Inc. can also be reached online at housejunkiesinc.org, by email at info@housejunkiesinc.org, and maintains an additional profile at ethicalcommunity.org, as well as social media presence on YouTube, Facebook, and Instagram.",
      "About House Junkies Inc.",
      "House Junkies Inc. has been in business since May 29, 2019. Headquartered in Visalia, California, the company provides cash offers on residential real estate across multiple Central California counties and partners with its own affiliated licensed contractors and real estate professionals to renovate and resell properties, rather than outsourcing that work to outside parties. House Junkies Inc. also does business as First American Investments L.L.C., Legacy Faith Homes L.L.C., One Stop Investments L.L.C., and Ulloa Investment Group L.L.C. Learn more at housejunkiesinc.org.",
      "About BBB Mountain West & Pacific Southwest",
      "As the leader in advancing marketplace trust, Better Business Bureau serves over 29,000 Accredited Businesses across the Mountain West and Pacific Southwest, with hubs in Fresno, Phoenix, and San Diego. BBB connects businesses with customers, supports ethical students, and helps companies improve daily. Through media studios and resources like the BBB Breakthrough Accelerator and workspaces, BBB gives businesses a voice while fostering ethical growth. Better Business starts here. Better Business starts with us.",
      "Media Contact: Dominic McClelland, Operations Manager, House Junkies Inc., 801 West Main Street, Visalia, CA 93291, (559) 368-8956.",
      "###",
    ],
    links: [
      { label: "House Junkies Inc. BBB Business Profile", url: "https://www.bbb.org/us/ca/visalia/profile/real-estate-investing/house-junkies-inc-1126-850058147" },
      { label: "Better Business Bureau, Mountain West & Pacific Southwest", url: "https://www.bbb.org/" },
      { label: "BBB Ethical Community Profile", url: "https://www.ethicalcommunity.org/housejunkiesinc" },
      { label: "housejunkiesinc.org", url: "https://housejunkiesinc.org" },
      { label: "Medium: How to Vet a Cash Home Buyer in California (and What BBB Accreditation Actually Tells You)", url: "https://medium.com/@housejunkiesinc/how-to-vet-a-cash-home-buyer-in-california-and-what-bbb-accreditation-actually-tells-you-97780b445fe8" },
      { label: "PRLog press release: House Junkies Inc. of Visalia Earns BBB Accreditation With A+ Rating", url: "https://www.prlog.org/13175565-house-junkies-inc-of-visalia-earns-bbb-accreditation-with-rating.html" },
      { label: "LinkedIn: Why We Earned BBB Accreditation, and What It Means for Agents, Attorneys, and Partners", url: "https://www.linkedin.com/pulse/why-we-earned-bbb-accreditation-what-means-agents-attorneys-coe4c/" },
    ],
  },  {
    slug: "welcome-to-the-new-house-junkies-site",
    title: "Welcome to the New House Junkies Website",
    date: "September 21, 2026",
    category: "Company News",
    author: "Dominic McClelland",
    excerpt:
      "House Junkies has been buying houses across the Central Valley for 7+ years. We're finally building the online presence to match.",
    summary: [
      "House Junkies has bought, renovated, and resold homes across the Central Valley for 7+ years.",
      "The new site includes a full team page, a real cash-offer calculator, and a city-by-city guide to every area we serve.",
      "We're starting this blog to cover real homeowner situations: probate, foreclosure, fire damage, and more.",
    ],
    body: [
      "House Junkies has been buying, renovating, and reselling homes across the Central Valley for 7+ years. Until now, our website hasn't kept up with what we actually do day to day, so we rebuilt it from the ground up.",
      "On the new site you can read about our team, see how we actually calculate a cash offer, compare selling to us against listing with an agent, and browse every city and county we serve. We're also starting this blog, where we'll write about the real situations Central Valley homeowners deal with: probate, foreclosure, fire damage, inherited property, and more.",
      "What makes House Junkies different is that we're not just a buyer. We're part of Ulloa Investment Group, which also owns House Junkies Construction, our own licensed general contractor crew, and Legacy Real Estate, the largest brokerage in Tulare County. That means when we buy your house, we're not shopping it to someone else, we renovate it ourselves and resell it ourselves. That's also why we can move faster and pay more than companies that have to bring in an outside investor or contractor for every deal.",
      "According to SFR Analytics' independent, third-party investor rankings, House Junkies is the #1 investment group in Visalia by transaction volume, $16.0 million across 110 deals as of their most recent report. That's not a number we made up for a website, it's from public deed and transaction records.",
      "We buy houses throughout Tulare, Kings, Fresno, and Kern counties, and beyond, from Visalia and Tulare out to Fresno, Bakersfield, and the smaller cities in between. Wherever you are in the Central Valley, there's a good chance we already buy houses near you, and if we don't yet, call us anyway.",
      "Every homeowner's situation is different, and we've built out dedicated pages for the most common ones: inherited property and probate, foreclosure, divorce, fire and water damage, tenant-occupied rentals, vacant properties, liens, and more. If you're dealing with one of those right now, there's a good chance we've already written something that answers your specific questions.",
      "We're a local company, not a national franchise. Our office is in Visalia, our crew works in Visalia, and the team behind this site lives here too. As we keep building this blog out, expect real, specific writing about the Central Valley market, not generic advice that could apply to any city in the country.",
      "This is our first post, and it won't be the last. If there's something you'd want us to write about, from your own experience selling a house or from a question you've had about the process, call us and tell us, we're building this out as we go.",
    ],
  },

];

export function getHouseJunkiesPost(slug: string) {
  return houseJunkiesPosts.find((p) => p.slug === slug);
}
