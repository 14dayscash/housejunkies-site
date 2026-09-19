// City data for /we-buy-houses/[city] pages.
// visalia/tulare/porterville/fresno carried over from the existing Base44 app (housejunkiesinc.base44.app/src/data/cities.js) — that data was already accurate, no need to redo it.
// The rest are stubs: real neighborhoods, zip codes, and at least one closed-deal reference need to come from Dominic before these pages ship (Section 15 of the SEO report: a page ships only once it has one real local detail).

export type CityData = {
  slug: string;
  name: string;
  county: string;
  zipCodes: string[];
  neighborhoods: string[];
  population: string;
  description: string;
  needsRealContent?: boolean; // true = do not publish until filled in with real local detail + a project link
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
  },
  {
    slug: "dinuba",
    name: "Dinuba",
    county: "Tulare County",
    zipCodes: [],
    neighborhoods: [],
    population: "",
    description: "",
    needsRealContent: true,
  },
  {
    slug: "bakersfield",
    name: "Bakersfield",
    county: "Kern County",
    zipCodes: [],
    neighborhoods: [],
    population: "",
    description: "",
    needsRealContent: true,
  },
  {
    slug: "exeter",
    name: "Exeter",
    county: "Tulare County",
    zipCodes: [],
    neighborhoods: [],
    population: "",
    description: "",
    needsRealContent: true,
  },
  {
    slug: "farmersville",
    name: "Farmersville",
    county: "Tulare County",
    zipCodes: [],
    neighborhoods: [],
    population: "",
    description: "",
    needsRealContent: true,
  },
  {
    slug: "goshen",
    name: "Goshen",
    county: "Tulare County",
    zipCodes: [],
    neighborhoods: [],
    population: "",
    description: "",
    needsRealContent: true,
  },
  {
    slug: "hanford",
    name: "Hanford",
    county: "Kings County",
    zipCodes: [],
    neighborhoods: [],
    population: "",
    description: "",
    needsRealContent: true,
  },
];

export function getCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
