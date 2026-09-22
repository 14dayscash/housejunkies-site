// House Junkies' own blog, hosted directly on housejunkiesinc.org (separate
// from the dominicmcclelland.com summaries in lib/blogPosts.ts).
//
// This starts empty on purpose. Per Dominic: new posts get added here as he
// prompts them, the same workflow as dominicmcclelland.com's blog. Nothing
// gets invented to fill this out, an empty section with an honest note beats
// fake posts, same rule as everywhere else on this site.
//
// To add a post: append an entry here (title, slug, date, category, excerpt,
// body as an array of paragraphs) and it's live at /blog/[slug] plus listed
// on /blog automatically.
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
      "We rebuilt housejunkiesinc.org from the ground up. Here's what changed, and why.",
    body: [
      "If you've visited our site before, you'll notice it looks different. We rebuilt housejunkiesinc.org from scratch this year, and it was overdue.",
      "The old site had real problems. It made a claim about BBB accreditation that wasn't accurate, and we've corrected that. It reused the same three testimonials across every city page with just the city name swapped, which we've replaced with an honest reviews page showing exactly what's really on our Google Business Profile, nothing more. It also had almost no real information about how House Junkies actually works, the vertical integration between acquisitions, construction, and brokerage that's the whole reason we can pay more than a wholesaler and close faster than a company that has to shop your house to someone else first.",
      "The new site fixes all of that. You can read about our team, see how we actually calculate a cash offer, compare selling to us against listing with an agent, and browse every city and county we serve. We're also starting this blog, where we'll write about the real situations Central Valley homeowners deal with: probate, foreclosure, fire damage, inherited property, and more.",
      "This is the first post. It won't be the last. If there's something you'd want us to write about, from your own experience selling a house or from a question you've had about the process, call us and tell us, we're building this out as we go.",
    ],
  },
];

export function getHouseJunkiesPost(slug: string) {
  return houseJunkiesPosts.find((p) => p.slug === slug);
}
