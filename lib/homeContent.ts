// Shared content for the site-wide sections first built for the homepage
// (2026-11-07 revamp). Edit here and every page that uses them updates.
import { googleReviews } from "./reviews";

export const compareUs: [string, string][] = [
  ["Sell It As-Is", "No repairs, no cleaning, no property clean-out. Leave the house exactly how it is, and leave behind anything you do not want."],
  ["No Commissions or Fees", "There is no agent to pay and nothing comes out of your check for us. The number on the offer is the number you get."],
  ["We Pay the Closing Costs", "Escrow, title, and closing costs are on us, so there are no surprises at the closing table."],
  ["A Cash Offer That Holds", "We close with our own capital, so there is no buyer's loan to fall through and no lender appraisal to blow up the deal."],
  ["You Pick the Closing Date", "Most deals close in 14 days, as fast as 7 if you need to, or later if you need time to move."],
];
export const compareListing: [string, string][] = [
  ["Repairs and Prep First", "Buyers and their inspectors expect a house that is ready to go. Fixes, cleaning, and staging usually come out of your pocket."],
  ["Commissions Come Out of Your Sale", "Agent commissions usually run 5-6% of the sale price, plus marketing and other costs."],
  ["Seller Closing Costs", "Title, escrow, transfer tax, and any repair credits the buyer asks for after inspection get paid out of your proceeds."],
  ["Deals Can Fall Through", "Most buyers need a loan. If their financing or the appraisal falls short, you can end up back on the market when you need to move."],
  ["Longer, Less Certain Timeline", "Showings, offers, inspections, and loan approval often take 60 to 90 days or more, with open houses along the way."],
];

// Dominic's five review picks, in his order, used by every review slider.
export const reviewPicks = ["J N", "Corey Loewen", "Eli Stephens", "Hannah Pendleton", "Michael"]
  .map((n) => googleReviews.find((r) => r.name === n))
  .filter((r): r is { name: string; rating: number; text: string } => !!r && !!r.text);

// Counties kept off the shared county grid (their own pages still exist).
export const hiddenCounties = ["san-benito-county", "inyo-county", "monterey-county"];

// Free Unsplash stock photos for the county blocks, taken in or near one of
// each county's top cities where Unsplash had one (Dominic, 2026-11-07).
export const countyPhotos: Record<string, { src: string; alt: string; pos?: string }> = {
  "tulare-county": { src: "https://images.unsplash.com/photo-1753635555129-3529087a7da2?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "The Darling Hotel in downtown Visalia against a bright blue sky", pos: "object-[50%_85%]" },
  "fresno-county": { src: "https://images.unsplash.com/photo-1648742022394-34575e15bcf7?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A building with a sign on the side of it" },
  "kern-county": { src: "https://images.unsplash.com/photo-1610820438019-b2688a6d9308?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "The Bakersfield sign" },
  "kings-county": { src: "https://images.unsplash.com/photo-1647927082960-025da25544ba?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A tall building with a clock on the front" },
  "madera-county": { src: "https://images.unsplash.com/photo-1681618314193-fb7379527a1b?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A red, white and blue barn in a field" },
  "merced-county": { src: "https://images.unsplash.com/photo-1595800881132-9571d9aa9019?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A green grass field under a blue sky" },
  "monterey-county": { src: "https://images.unsplash.com/photo-1757715628829-34cd468203b6?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A coastal town with buildings along the oceanfront" },
  "san-luis-obispo-county": { src: "https://images.unsplash.com/photo-1642958707285-405685996700?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A dirt road going through a lush green valley" },
  "inyo-county": { src: "https://images.unsplash.com/photo-1649042250663-4d8ad5551e02?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A mountain range in the distance" },
  "san-benito-county": { src: "https://images.unsplash.com/photo-1639691000349-c3d2c4b503af?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A town with mountains behind it" },
};
