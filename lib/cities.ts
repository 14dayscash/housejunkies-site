// City data for /we-buy-houses/[city] pages.
// Population and zip codes are sourced from the 2020 U.S. Census / USPS ZIP
// data (public, verifiable facts) — not invented. Descriptions are written
// in-house, not copied from any competitor. What's deliberately NOT here:
// fake testimonials, fake "we've bought X houses in this city" claims, or
// fabricated local proof — that gets added for real once a case study exists
// (see /projects), per lib/situations.ts's note on the same rule.

export type CityData = {
  slug: string;
  name: string;
  county: string;
  zipCodes: string[];
  neighborhoods: string[];
  population: string;
  description: string;
  marketNote: string; // one real, sourced fact about the local housing market
};

export const cities: CityData[] = [
  {
    slug: "visalia",
    name: "Visalia",
    county: "Tulare County",
    zipCodes: ["93277", "93291", "93292"],
    neighborhoods: ["Downtown Visalia", "North Visalia", "Mooney", "Cottage Grove"],
    population: "141,000",
    description:
      "We buy houses fast for cash in Visalia, CA. From downtown to north Visalia, we purchase properties in any condition and close on your timeline.",
    marketNote:
      "Visalia is the county seat of Tulare County and the largest city House Junkies operates in, with a housing stock that spans historic downtown homes to newer construction on the north side.",
  },
  {
    slug: "tulare",
    name: "Tulare",
    county: "Tulare County",
    zipCodes: ["93274", "93261"],
    neighborhoods: ["Downtown Tulare", "North Tulare", "South Tulare"],
    population: "70,000",
    description:
      "Sell your Tulare house fast for cash. We buy homes as-is throughout Tulare, no repairs, no fees, no hassle.",
    marketNote:
      "Tulare sits just south of Visalia along Highway 99 and has a strong base of older, established housing stock alongside newer subdivisions.",
  },
  {
    slug: "porterville",
    name: "Porterville",
    county: "Tulare County",
    zipCodes: ["93257", "93258"],
    neighborhoods: ["Downtown Porterville", "West Porterville", "East Porterville"],
    population: "63,000",
    description:
      "Get a fair cash offer for your Porterville home. We buy houses in any condition and close on your timeline.",
    marketNote:
      "Porterville is the largest city in Tulare County's east side, closer to the Sierra foothills, with a mix of agricultural-adjacent properties and in-town housing.",
  },
  {
    slug: "fresno",
    name: "Fresno",
    county: "Fresno County",
    zipCodes: ["93701", "93702", "93703", "93704", "93705", "93710", "93711"],
    neighborhoods: ["Downtown Fresno", "Tower District", "Fig Garden", "North Fresno", "Woodward Park"],
    population: "545,000",
    description:
      "Sell your Fresno house fast for cash. We buy homes as-is throughout Fresno County, from Tower District to North Fresno.",
    marketNote:
      "Fresno is the largest city in the Central Valley and the anchor of the region's housing market, with everything from century-old Tower District bungalows to newer north Fresno development.",
  },
  {
    slug: "dinuba",
    name: "Dinuba",
    county: "Tulare County",
    zipCodes: ["93618"],
    neighborhoods: ["Downtown Dinuba", "Alta District"],
    population: "24,563",
    description:
      "We buy houses fast for cash in Dinuba, CA. As-is, any condition, no fees, no repairs.",
    marketNote:
      "Dinuba, nicknamed \"Raisin City\" for its agricultural roots, is one of Tulare County's larger cities by population, incorporated in 1906 with a housing stock that reflects that long history.",
  },
  {
    slug: "bakersfield",
    name: "Bakersfield",
    county: "Kern County",
    zipCodes: ["93301", "93304", "93305", "93306", "93307", "93309", "93311", "93312", "93313", "93314"],
    neighborhoods: ["Downtown Bakersfield", "Southwest Bakersfield", "Northeast Bakersfield", "Oleander"],
    population: "400,000+",
    description:
      "We buy houses fast for cash in Bakersfield, CA. As-is, any condition, no fees, no repairs.",
    marketNote:
      "Bakersfield is the ninth-largest city in California and the seat of Kern County, with a large enough footprint that it spans over a dozen ZIP codes and housing stock ranging from historic downtown properties to large newer subdivisions in the southwest.",
  },
  {
    slug: "exeter",
    name: "Exeter",
    county: "Tulare County",
    zipCodes: ["93221"],
    neighborhoods: ["Downtown Exeter"],
    population: "10,321",
    description:
      "We buy houses fast for cash in Exeter, CA. As-is, any condition, no fees, no repairs.",
    marketNote:
      "Exeter sits in the foothills of the Sierra Nevada east of Visalia, known locally for its historic downtown murals and a smaller, tighter-knit housing market than the larger Valley cities.",
  },
  {
    slug: "farmersville",
    name: "Farmersville",
    county: "Tulare County",
    zipCodes: ["93223"],
    neighborhoods: ["Downtown Farmersville"],
    population: "10,397",
    description:
      "We buy houses fast for cash in Farmersville, CA. As-is, any condition, no fees, no repairs.",
    marketNote:
      "Farmersville is a small city bordering Visalia on the east side of Tulare County, incorporated in 1960, with one of the more affordable housing markets in the county.",
  },
  {
    slug: "goshen",
    name: "Goshen",
    county: "Tulare County",
    zipCodes: ["93227"],
    neighborhoods: ["Goshen"],
    population: "4,968",
    description:
      "We buy houses fast for cash in Goshen, CA. As-is, any condition, no fees, no repairs.",
    marketNote:
      "Goshen is an unincorporated community about five miles west of Visalia. Tulare County is currently working on a Goshen Community Plan update, which points to real growth and change coming to the area.",
  },
  {
    slug: "hanford",
    name: "Hanford",
    county: "Kings County",
    zipCodes: ["93230"],
    neighborhoods: ["Downtown Hanford", "China Alley"],
    population: "57,000",
    description:
      "We buy houses fast for cash in Hanford, CA. As-is, any condition, no fees, no repairs.",
    marketNote:
      "Hanford is the county seat of Kings County and the largest city in the Hanford-Corcoran area, with a historic downtown (China Alley, the Fox Theatre) and a housing market that mixes century-old homes with newer growth on the city's edges.",
  },
];

export function getCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
