import type { Metadata } from "next";
import { SituationGrid, ReviewsSection } from "@/components/sections/Shared";

export const metadata: Metadata = {
  title: `Every Situation We Buy Houses In`,
  description: "Inherited property, probate, foreclosure, divorce, fire damage, and every other situation House Junkies buys houses in.",
  alternates: { canonical: "/sell-your-house" },
};

// 2026-11-08 overhaul: the homepage Situations section, as this page's H1
// section, then the review slider.
export default function SellYourHousePage() {
  return (
    <div>
      <SituationGrid
        as="h1"
        title="Every Situation We Buy Houses In"
        sub="Whatever the situation, House Junkies buys houses as-is across the Central Valley. No repairs, no fees, no listing. Pick yours below."
        otherToPage={false}
      />
      <ReviewsSection gray={false} />
    </div>
  );
}
