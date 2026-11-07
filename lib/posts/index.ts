// Every new House Junkies blog post is its own file in this folder.
// To add one: create lib/posts/<slug>.ts exporting `post`, then add it to the
// list below. Order here does not matter, posts are sorted by date.
import type { HouseJunkiesPost } from "../houseJunkiesPosts";
import { post as sellInheritedHouseBeforeProbate } from "./sell-inherited-house-before-probate-california";
import { post as howMuchDoesProbateCost } from "./how-much-does-probate-cost-california";

export const postFiles: HouseJunkiesPost[] = [
  sellInheritedHouseBeforeProbate,
  howMuchDoesProbateCost,
];
