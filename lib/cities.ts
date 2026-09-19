// City data for /we-buy-houses/[city] pages.
// Population and zip codes are sourced from the 2020 U.S. Census / USPS ZIP
// data (public, verifiable facts) - not invented. Descriptions are written
// in-house, not copied from any competitor. What's deliberately NOT here:
// fake testimonials, fake "we've bought X houses in this city" claims, or
// fabricated local proof - that gets added for real once a case study exists
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
  quickFacts: string[]; // 5 short, real, locally-relevant facts
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
    quickFacts: [
      "Visalia is often called the gateway to Sequoia and Kings Canyon National Parks, about a 45-minute drive from downtown.",
      "Downtown Visalia is home to the restored 1930s Visalia Fox Theatre and a walkable historic Main Street district.",
      "Mooney Grove Park and the Rawhide Ballpark (home of the Visalia Rawhide minor league team) are two of the city's most-visited spots.",
      "Visalia has more Valley Oak trees than any other city in California's San Joaquin Valley.",
      "As the Tulare County seat, Visalia is the administrative and economic hub for the surrounding smaller cities.",
    ],
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
    quickFacts: [
      "Tulare hosts the World Ag Expo every February at the International Agri-Center, one of the largest annual outdoor agricultural expositions in the world.",
      "Tulare County is consistently ranked among the top agricultural-producing counties in the entire country.",
      "The city's historic downtown includes tree-lined streets, murals, and the Tulare Historical Museum.",
      "Tulare sits along Highway 99, roughly midway between Fresno and Bakersfield.",
      "The Tulare Outlet Center draws shoppers from across the surrounding smaller Tulare County cities.",
    ],
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
    quickFacts: [
      "Porterville sits closer to the Sierra Nevada foothills than Visalia or Tulare, making it a gateway to Sequoia National Forest.",
      "It's the largest city on the east side of Tulare County.",
      "The Zalud House, a preserved Victorian-era home, is one of the city's notable historic landmarks.",
      "Porterville's economy leans heavily on citrus and other agriculture, similar to much of the county.",
      "The Tule River runs through the city, feeding into Lake Success just east of town.",
    ],
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
    quickFacts: [
      "Fresno is the largest city in the Central Valley and the fifth-largest in California.",
      "The Tower District is Fresno's historic entertainment and arts neighborhood, built around the 1930s Tower Theatre.",
      "Fresno State (California State University, Fresno) is a major anchor for the city's northeast side.",
      "Woodward Park, one of the largest parks in Fresno, includes the Shinzen Japanese Garden.",
      "Fresno sits at the crossroads of Highway 99 and Highway 41, making it the transportation hub of the Valley.",
    ],
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
    quickFacts: [
      "Dinuba is nicknamed \"Raisin City\" for its long agricultural history in raisin and grape production.",
      "The city was incorporated in 1906 and has kept a historic downtown core from that era.",
      "The Alta District Museum, housed in a restored railroad station, covers Dinuba's local history.",
      "Dinuba sits along Highway 201, connecting it to both Visalia and Reedley.",
      "Agriculture and food processing remain the backbone of the local economy.",
    ],
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
    quickFacts: [
      "Bakersfield is the ninth-largest city in California and the seat of Kern County.",
      "The city is closely associated with country music history as the birthplace of the \"Bakersfield Sound,\" made famous by Buck Owens and Merle Haggard.",
      "Kern County is one of the top oil-producing counties in the country, and oil remains a major part of Bakersfield's economy alongside agriculture.",
      "Downtown Bakersfield has been undergoing a revitalization push in recent years, adding restaurants and mixed-use development.",
      "Bakersfield sits at the southern end of the San Joaquin Valley, about an hour and a half south of Visalia.",
    ],
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
    quickFacts: [
      "Exeter is known locally for its collection of large outdoor murals depicting the area's agricultural history, spread throughout downtown.",
      "The city sits in the foothills east of Visalia, closer to the Sierra Nevada than most other Tulare County cities.",
      "Exeter was incorporated in 1911 and has kept a small, historic downtown core.",
      "Citrus growing has historically been central to Exeter's economy, given its foothill location.",
      "The city is small enough that most of its housing stock is within a few minutes of downtown.",
    ],
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
    quickFacts: [
      "Farmersville was incorporated in 1960 and borders Visalia directly on the east side of Tulare County.",
      "The city's economy is closely tied to agriculture, consistent with much of the surrounding area.",
      "Farmersville is one of the more affordable housing markets in Tulare County.",
      "Its small size means most residents rely on nearby Visalia for larger shopping and services.",
      "The median age in Farmersville skews younger than the county overall.",
    ],
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
    quickFacts: [
      "Goshen is an unincorporated community about five miles west of Visalia, governed directly by Tulare County rather than its own city government.",
      "Tulare County is currently working on a Goshen Community Plan update, which points to real growth and change coming to the area.",
      "Goshen sits along Highway 99, making it a logistics and industrial corridor for the wider Visalia area.",
      "Because it's unincorporated, some services and permitting in Goshen route through the county rather than a city hall.",
      "Goshen is one of the smallest communities House Junkies serves by population.",
    ],
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
    quickFacts: [
      "Hanford is the seat of Kings County and the largest city in the Hanford-Corcoran area.",
      "Its historic China Alley district, dating to the 1800s, includes the Taoist Temple, one of the oldest Chinese temples in California.",
      "The restored Hanford Fox Theatre anchors the city's historic downtown.",
      "Hanford's Courthouse Square, built around the old Kings County Courthouse, is the center of downtown dining and events.",
      "Agriculture and dairy remain major parts of the Kings County economy surrounding Hanford.",
    ],
  },
];

export function getCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
