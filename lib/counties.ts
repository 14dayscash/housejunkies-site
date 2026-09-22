import { cities } from "./cities";

// County hub pages sit between the homepage and individual city pages,
// rolling up the cities in each county. Every county below has real city
// pages behind it (see lib/cities.ts) - this file just groups and describes
// them, it doesn't add new facts of its own.

export type CountyData = {
  slug: string;
  name: string; // matches the `county` field on CityData entries
  description: string;
};

export const counties: CountyData[] = [
  {
    slug: "tulare-county",
    name: "Tulare County",
    description:
      "House Junkies is based in Tulare County and buys houses across all of its cities, from Visalia and Tulare down to the smaller communities like Exeter, Farmersville, and Goshen.",
  },
  {
    slug: "kings-county",
    name: "Kings County",
    description:
      "We buy houses throughout Kings County, from the county seat of Hanford out to Lemoore, Corcoran, and Avenal.",
  },
  {
    slug: "fresno-county",
    name: "Fresno County",
    description:
      "We buy houses across Fresno County, from the city of Fresno itself out to Clovis, Sanger, Selma, and Reedley.",
  },
  {
    slug: "kern-county",
    name: "Kern County",
    description:
      "We buy houses throughout Kern County, from Bakersfield out to Delano, Ridgecrest, Wasco, and Shafter.",
  },
];

export function getCounty(slug: string) {
  return counties.find((c) => c.slug === slug);
}

export function citiesInCounty(countyName: string) {
  return cities.filter((c) => c.county === countyName);
}
