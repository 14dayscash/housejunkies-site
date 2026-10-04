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
};

export const houseJunkiesPosts: HouseJunkiesPost[] = [
  {
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
  {
    slug: "house-junkies-earns-bbb-accreditation",
    title: "House Junkies Inc. Earns BBB Accreditation",
    date: "September 22, 2026",
    category: "Company News",
    author: "House Junkies Inc.",
    excerpt:
      "House Junkies Inc. has earned accreditation from the Better Business Bureau, Mountain West & Pacific Southwest.",
    summary: [
      "House Junkies Inc. is now BBB Accredited, backed by the BBB's A+ rating.",
      "The company has been in business 7 years and operates as part of Ulloa Investment Group, alongside House Junkies Construction and Legacy Real Estate.",
      "House Junkies Inc. buys houses for cash throughout Tulare, Kings, Fresno, and Kern counties, and beyond.",
    ],
    body: [
      "House Junkies Inc., a Visalia-based real estate investment company, announced this week that it has earned accreditation from the Better Business Bureau, Mountain West & Pacific Southwest. As a BBB Accredited Business, House Junkies Inc. is dedicated to promoting trust in the marketplace and upholding high standards for honest business behavior, backed by the BBB's A+ rating.",
      "Customers need to trust the companies they do business with, and BBB is committed to advancing that trust in the marketplace. BBB Accreditation is an honor, and not every business qualifies. The standard House Junkies Inc. has met to earn this accreditation reflects the company's commitment to both its customers and the Central Valley community it operates in.",
      "\"We are pleased to join a community of businesses committed to doing things the right way,\" said Abel Ulloa, Owner/CEO of House Junkies Inc. \"We value building trust with our customers, and our BBB Accreditation is a public display of our commitment to excellence and maintaining high ethical standards.\"",
      "BBB Accredited Businesses adhere to BBB's Standards for Trust, a comprehensive set of policies, procedures, and best practices representing trustworthiness in the marketplace. The standards call for building trust, embodying integrity, advertising honestly, telling the truth, being transparent, honoring promises, being responsive, and safeguarding privacy.",
      "House Junkies Inc. has been in business for 7 years and operates as part of Ulloa Investment Group, a vertically integrated real estate operation that also includes House Junkies Construction, a licensed general contractor, and Legacy Real Estate, a licensed brokerage. The company purchases residential properties for cash, in any condition, throughout Tulare, Kings, Fresno, and Kern counties, and beyond. Common seller situations include inherited property, probate, foreclosure, and homes needing repair.",
      "House Junkies Inc. is led by Abel Ulloa (Owner/CEO), Dominic McClelland (Operations Manager), Jenny Madrid (Broker, Legacy Real Estate), and Omar Ayon (Project Manager, House Junkies Construction). The company operates four offices across the Central Valley: 801 West Main Street and 1814 West Dorothea Avenue in Visalia, 601 South Main Street in Porterville, and 151 North N Street in Tulare.",
      "To learn more about House Junkies Inc., visit the company's BBB Business Profile, or visit housejunkiesinc.org. House Junkies Inc. can also be reached at (559) 368-8956 or info@housejunkiesinc.org.",
      "House Junkies Inc. also does business as First American Investments L.L.C., Legacy Faith Homes L.L.C., One Stop Investments L.L.C., and Ulloa Investment Group L.L.C.",
    ],
    links: [
      { label: "House Junkies Inc. BBB Business Profile", url: "https://www.bbb.org/us/ca/visalia/profile/real-estate-investing/house-junkies-inc-1126-850058147" },
      { label: "Better Business Bureau, Mountain West & Pacific Southwest", url: "https://www.bbb.org/" },
      { label: "BBB Ethical Community Profile", url: "https://www.ethicalcommunity.org/housejunkiesinc" },
      { label: "housejunkiesinc.org", url: "https://housejunkiesinc.org" },
    ],
  },
];

export function getHouseJunkiesPost(slug: string) {
  return houseJunkiesPosts.find((p) => p.slug === slug);
}
