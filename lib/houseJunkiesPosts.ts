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
      "We buy houses throughout Tulare, Kings, Fresno, and Kern counties, from Visalia and Tulare out to Fresno, Bakersfield, and the smaller cities in between. Wherever you are in the Central Valley, there's a good chance we already buy houses near you, and if we don't yet, call us anyway.",
      "Every homeowner's situation is different, and we've built out dedicated pages for the most common ones: inherited property and probate, foreclosure, divorce, fire and water damage, tenant-occupied rentals, vacant properties, liens, and more. If you're dealing with one of those right now, there's a good chance we've already written something that answers your specific questions.",
      "We're a local company, not a national franchise. Our office is in Visalia, our crew works in Visalia, and the team behind this site lives here too. As we keep building this blog out, expect real, specific writing about the Central Valley market, not generic advice that could apply to any city in the country.",
      "This is our first post, and it won't be the last. If there's something you'd want us to write about, from your own experience selling a house or from a question you've had about the process, call us and tell us, we're building this out as we go.",
    ],
  },
];

export function getHouseJunkiesPost(slug: string) {
  return houseJunkiesPosts.find((p) => p.slug === slug);
}
