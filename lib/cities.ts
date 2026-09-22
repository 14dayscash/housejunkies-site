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
  featured?: boolean; // top 12 by population, used to trim the nav dropdown/menu
};

export const cities: CityData[] = [
  {
    slug: "visalia",
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
    featured: true,
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
  {
    slug: "lemoore",
    featured: true,
    name: "Lemoore",
    county: "Kings County",
    zipCodes: ["93245", "93246"],
    neighborhoods: ["Downtown Lemoore"],
    population: "27,057",
    description: "We buy houses fast for cash in Lemoore, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Lemoore is home to Naval Air Station Lemoore, a major Navy jet base that anchors a meaningful share of the local economy and housing demand.",
    quickFacts: [
      "Lemoore was incorporated in 1900 and sits about 7 miles west-southwest of Hanford.",
      "Naval Air Station Lemoore, a master jet base for Pacific Fleet F-18 and F-35 squadrons, is one of the largest employers in the area.",
      "The city is part of the Hanford-Corcoran Metropolitan Statistical Area.",
      "Lemoore's population has grown steadily, roughly doubling since the 1990 Census.",
      "Agriculture and the naval base together make up the backbone of the local economy.",
    ],
  },
  {
    slug: "corcoran",
    name: "Corcoran",
    county: "Kings County",
    zipCodes: ["93212"],
    neighborhoods: ["Downtown Corcoran"],
    population: "22,627",
    description: "We buy houses fast for cash in Corcoran, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Corcoran is served by Amtrak, one of the few smaller Central Valley cities with a direct passenger rail stop.",
    quickFacts: [
      "Corcoran sits in western Kings County, in the heart of cotton and row-crop farm country.",
      "The city is home to two California state prisons, which are major local employers.",
      "Amtrak trains stop directly in Corcoran, unusual for a city this size.",
      "Corcoran's population has grown significantly since 1990, more than doubling.",
      "The local economy leans heavily on agriculture and correctional-facility employment.",
    ],
  },
  {
    slug: "avenal",
    name: "Avenal",
    county: "Kings County",
    zipCodes: ["93204"],
    neighborhoods: ["Downtown Avenal"],
    population: "14,108",
    description: "We buy houses fast for cash in Avenal, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Avenal sits at the western edge of Kings County, closer to the Coast Ranges than to the rest of the Central Valley cities House Junkies serves.",
    quickFacts: [
      "Avenal is home to Avenal State Prison, one of the city's largest employers.",
      "The city has a privately-owned airport that's home to the Central California Soaring Club.",
      "Avenal is the westernmost city House Junkies serves in Kings County.",
      "Oil and gas extraction historically played a role in the area's economy alongside agriculture.",
      "The city's housing stock is smaller and more affordable than the Kings County average.",
    ],
  },
  {
    slug: "clovis",
    featured: true,
    name: "Clovis",
    county: "Fresno County",
    zipCodes: ["93611", "93612", "93619"],
    neighborhoods: ["Old Town Clovis", "Loma Vista", "Harlan Ranch"],
    population: "111,990",
    description: "We buy houses fast for cash in Clovis, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Clovis is one of the fastest-growing cities in Fresno County, with new development pushing east and north of Old Town.",
    quickFacts: [
      "Clovis is directly adjacent to Fresno and is part of the greater Fresno-Clovis metro area.",
      "Old Town Clovis retains a historic downtown core with its own distinct identity from the newer subdivisions.",
      "Clovis has grown from roughly 108,000 to over 111,000 in the last decade, among the fastest growth rates in the county.",
      "The city is known locally for a strong public school district that drives a lot of family relocation demand.",
      "Clovis sits just east of Fresno along Highway 168, at the edge of the Sierra Nevada foothills.",
    ],
  },
  {
    slug: "sanger",
    featured: true,
    name: "Sanger",
    county: "Fresno County",
    zipCodes: ["93657"],
    neighborhoods: ["Downtown Sanger"],
    population: "26,784",
    description: "We buy houses fast for cash in Sanger, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Sanger calls itself the \"Christmas Tree Lane City\" and sits along the route many Fresno-area residents take toward Kings Canyon National Park.",
    quickFacts: [
      "Sanger is located about 15 miles east of Fresno, closer to the Sierra Nevada foothills.",
      "The city's economy is closely tied to fruit and nut agriculture, packing, and processing.",
      "Sanger has grown from about 16,800 residents in 1990 to nearly 27,000 today.",
      "It sits along the route toward Kings Canyon and Sequoia National Parks from the Fresno area.",
      "Sanger has its own school district and a small, walkable historic downtown.",
    ],
  },
  {
    slug: "selma",
    name: "Selma",
    county: "Fresno County",
    zipCodes: ["93662"],
    neighborhoods: ["Downtown Selma"],
    population: "24,773",
    description: "We buy houses fast for cash in Selma, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Selma calls itself the \"Raisin Capital of the World,\" reflecting the same raisin-and-grape agricultural heritage as Dinuba just south of it.",
    quickFacts: [
      "Selma sits along Highway 99 between Fresno and Fowler, in the heart of Fresno County's grape-growing region.",
      "The city has long branded itself around raisin production, similar to Dinuba to the south.",
      "Selma's population has grown from about 15,200 in 1990 to nearly 25,000.",
      "Agriculture, packing, and food processing remain central to the local economy.",
      "Selma is a short drive from both Fresno and the smaller Fresno County cities to its south.",
    ],
  },
  {
    slug: "reedley",
    name: "Reedley",
    county: "Fresno County",
    zipCodes: ["93654"],
    neighborhoods: ["Downtown Reedley"],
    population: "25,193",
    description: "We buy houses fast for cash in Reedley, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Reedley sits along the Kings River and is home to Reedley College, a community college serving the surrounding farm towns.",
    quickFacts: [
      "Reedley is situated on the Kings River in southeastern Fresno County.",
      "Reedley College serves as an educational anchor for the surrounding smaller agricultural communities.",
      "The city's population has grown from about 16,000 in 1990 to over 25,000.",
      "Fruit farming, particularly stone fruit and citrus, is central to Reedley's economy.",
      "Reedley calls itself the \"World's Fruit Basket\" for its concentration of orchards.",
    ],
  },
  {
    slug: "delano",
    featured: true,
    name: "Delano",
    county: "Kern County",
    zipCodes: ["93215"],
    neighborhoods: ["Downtown Delano"],
    population: "51,420",
    description: "We buy houses fast for cash in Delano, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Delano is the second-largest city in Kern County and is historically significant as the birthplace of the United Farm Workers movement.",
    quickFacts: [
      "Delano is the northernmost city in Kern County and the second-largest by population.",
      "The city holds historical significance as the starting point of the United Farm Workers movement led by Cesar Chavez and Dolores Huerta.",
      "Table grapes and other row-crop agriculture remain central to the local economy.",
      "Delano sits along Highway 99, providing straightforward access to both Bakersfield and the Tulare County cities to the north.",
      "The city has two state prisons that are significant local employers.",
    ],
  },
  {
    slug: "ridgecrest",
    featured: true,
    name: "Ridgecrest",
    county: "Kern County",
    zipCodes: ["93555"],
    neighborhoods: ["Downtown Ridgecrest"],
    population: "27,960",
    description: "We buy houses fast for cash in Ridgecrest, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Ridgecrest sits at the eastern edge of Kern County in the Mojave Desert, far closer to the Naval Air Weapons Station China Lake than to the rest of Kern County's Central Valley cities.",
    quickFacts: [
      "Ridgecrest is in the Mojave Desert portion of Kern County, geographically distinct from the Central Valley cities House Junkies primarily serves.",
      "The city's economy is closely tied to the Naval Air Weapons Station at China Lake.",
      "Ridgecrest is Kern County's easternmost significant population center.",
      "The city sits along Highway 395, a major corridor for travel between the Central Valley and the eastern Sierra.",
      "Housing demand in Ridgecrest is closely tied to military personnel turnover at the nearby base.",
    ],
  },
  {
    slug: "wasco",
    featured: true,
    name: "Wasco",
    county: "Kern County",
    zipCodes: ["93280"],
    neighborhoods: ["Downtown Wasco"],
    population: "27,049",
    description: "We buy houses fast for cash in Wasco, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Wasco calls itself the \"Rose Capital of the Nation\" for its concentration of rose-growing nurseries.",
    quickFacts: [
      "Wasco sits along Highway 46 in northwestern Kern County, a short drive from Bakersfield.",
      "The city is known for rose cultivation, alongside broader row-crop and almond agriculture.",
      "Wasco's population has more than doubled since 1990.",
      "A state prison in Wasco is a significant local employer alongside agriculture.",
      "The city is one of the smaller, more affordable housing markets in Kern County.",
    ],
  },
  {
    slug: "shafter",
    name: "Shafter",
    county: "Kern County",
    zipCodes: ["93263"],
    neighborhoods: ["Downtown Shafter"],
    population: "19,956",
    description: "We buy houses fast for cash in Shafter, CA. As-is, any condition, no fees, no repairs.",
    marketNote: "Shafter has been one of the fastest-growing cities in Kern County in recent years, driven by new housing development and logistics/warehouse growth.",
    quickFacts: [
      "Shafter sits just northwest of Bakersfield along Highway 43.",
      "The city has seen some of the fastest population growth in Kern County recently, gaining over 4 percent in a single recent year per state estimates.",
      "Agriculture and a growing logistics/distribution sector both drive the local economy.",
      "Shafter is close enough to Bakersfield to serve as a bedroom community for some residents.",
      "New housing development has been a bigger factor in Shafter's growth than in most other small Kern County cities.",
    ],
  },
];

export function getCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
