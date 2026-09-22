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

export const houseJunkiesPosts: HouseJunkiesPost[] = [];

export function getHouseJunkiesPost(slug: string) {
  return houseJunkiesPosts.find((p) => p.slug === slug);
}
