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
    body: [
      "House Junkies has been buying, renovating, and reselling homes across the Central Valley for 7+ years. Until now, our website hasn't kept up with what we actually do day to day, so we rebuilt it from the ground up.",
      "On the new site you can read about our team, see how we actually calculate a cash offer, compare selling to us against listing with an agent, and browse every city and county we serve. We're also starting this blog, where we'll write about the real situations Central Valley homeowners deal with: probate, foreclosure, fire damage, inherited property, and more.",
      "This is our first post, and it won't be the last. If there's something you'd want us to write about, from your own experience selling a house or from a question you've had about the process, call us and tell us, we're building this out as we go.",
    ],
  },
];

export function getHouseJunkiesPost(slug: string) {
  return houseJunkiesPosts.find((p) => p.slug === slug);
}
