// Sourced local data for city pages. Nothing here is estimated by us.
//
// source "quickfacts": U.S. Census Bureau QuickFacts (2020 Census population,
//   July 2025 population estimate, and 2020-2024 American Community Survey
//   estimates for home value, owner rate, rent, income, household size and
//   education). The sourceUrl is the exact QuickFacts table used.
// source "census2020-wikipedia": places too small for QuickFacts (it only
//   covers places with 5,000+ people, so Census data for these is limited to
//   the 2020 Census count). Population, area, elevation and history come from
//   the town's Wikipedia page, which cites the Census Bureau. sourceUrl is that page.
//
// "about" lines are short facts rewritten from those pages. Add to a city by
// adding a line here, never in the template. If a fact cannot be sourced, leave
// it out. Pulled October 16, 2026.

export type CityFacts = {
  source: "quickfacts" | "census2020-wikipedia";
  sourceUrl: string;
  pop2020: number;
  popEstimate2025?: number;
  medianHomeValue?: number;
  ownerOccupiedRate?: number;
  medianRent?: number;
  medianHouseholdIncome?: number;
  incomeLabel?: string;
  personsPerHousehold?: number;
  bachelorsOrHigher?: number;
  landAreaSqMi?: number;
  densityPerSqMi?: number;
  elevationFt?: number;
  incorporated?: string;
  about?: string[];
};

export type Baseline = {
  medianHomeValue: number;
  ownerOccupiedRate: number;
  medianRent: number;
  medianHouseholdIncome: number;
  personsPerHousehold: number;
  bachelorsOrHigher: number;
};

// U.S. Census Bureau QuickFacts, 2020-2024 estimates (pulled October 16, 2026).
export const californiaBaseline: Baseline = {
  "medianHomeValue": 734700,
  "ownerOccupiedRate": 55.9,
  "medianRent": 2036,
  "medianHouseholdIncome": 99122,
  "personsPerHousehold": 2.84,
  "bachelorsOrHigher": 37.1
};
export const usBaseline: Baseline = {
  "medianHomeValue": 332700,
  "ownerOccupiedRate": 65.2,
  "medianRent": 1413,
  "medianHouseholdIncome": 80734,
  "personsPerHousehold": 2.53,
  "bachelorsOrHigher": 35.7
};

export const cityFacts: Record<string, CityFacts> = {
  "atwater": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/atwatercitycalifornia/PST045224",
    "pop2020": 31970,
    "popEstimate2025": 32133,
    "medianHomeValue": 363400,
    "ownerOccupiedRate": 52.1,
    "medianRent": 1279,
    "medianHouseholdIncome": 64472,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.24,
    "bachelorsOrHigher": 12.9,
    "landAreaSqMi": 6.57,
    "densityPerSqMi": 4868.3
  },
  "avenal": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/avenalcitycalifornia/PST045224",
    "pop2020": 13696,
    "popEstimate2025": 13479,
    "medianHomeValue": 228900,
    "ownerOccupiedRate": 45.5,
    "medianRent": 1015,
    "medianHouseholdIncome": 54741,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.66,
    "bachelorsOrHigher": 2.8,
    "landAreaSqMi": 19.48,
    "densityPerSqMi": 703.0,
    "incorporated": "September 11, 1979",
    "elevationFt": 807,
    "about": [
      "Oil found in the nearby Kettleman Hills in 1928 turned Avenal into a boomtown.",
      "Avenal State Prison opened in 1987 and provides about 1,000 jobs. Farming is also a big part of the local economy.",
      "The Avenal Gliderport hosts a soaring contest each spring.",
      "The city sits on the Kettleman Plain between the Kettleman Hills and the Chalk Buttes."
    ]
  },
  "avila-beach": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Avila_Beach,_California",
    "pop2020": 1576,
    "landAreaSqMi": 6.09,
    "elevationFt": 430,
    "about": [
      "The name honors Miguel Avila, who was granted Rancho San Miguelito in 1842.",
      "The town grew in the late 1800s as the main shipping port for San Luis Obispo.",
      "The Point San Luis Lighthouse was built in 1890 after a series of shipping accidents.",
      "Tourism is now the main industry, though a working commercial fishing pier and inland apple orchards remain.",
      "Point San Luis blocks the prevailing northwest winds, so the beach is usually warmer than other Central Coast beaches."
    ]
  },
  "bakersfield": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/bakersfieldcitycalifornia/PST045224",
    "pop2020": 403455,
    "popEstimate2025": 422165,
    "medianHomeValue": 371700,
    "ownerOccupiedRate": 60.6,
    "medianRent": 1472,
    "medianHouseholdIncome": 80540,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.14,
    "bachelorsOrHigher": 23.6,
    "landAreaSqMi": 149.78,
    "densityPerSqMi": 2693.7
  },
  "big-pine": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Big_Pine,_California",
    "pop2020": 1875,
    "landAreaSqMi": 2.95,
    "elevationFt": 4019,
    "medianHouseholdIncome": 52647,
    "incomeLabel": "2023 Census Bureau estimate",
    "about": [
      "The Big Pine post office opened in 1870.",
      "The Owens Valley Radio Observatory was established just north of town in 1958.",
      "Glacier Lodge Road leads up Big Pine Creek into the Sierra Nevada.",
      "The Big Pine Paiute tribe's headquarters is in town."
    ]
  },
  "bishop": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Bishop,_California",
    "pop2020": 3819,
    "landAreaSqMi": 1.86,
    "elevationFt": 4150,
    "incorporated": "May 6, 1903",
    "medianHouseholdIncome": 82205,
    "incomeLabel": "2023 Census Bureau estimate",
    "about": [
      "Samuel Addison Bishop brought cattle to the valley in 1861 to supply beef to the mining camp of Aurora.",
      "Bishop Mule Days, a week-long festival, has been held since 1969 during Memorial Day week.",
      "Bishop is the only incorporated city in Inyo County.",
      "The town sits on U.S. Route 395 at the north end of the Owens Valley, east of the Sierra Nevada."
    ]
  },
  "carmel": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Carmel-by-the-Sea,_California",
    "pop2020": 3220,
    "landAreaSqMi": 1.06,
    "elevationFt": 223,
    "incorporated": "October 31, 1916",
    "medianHouseholdIncome": 115729,
    "incomeLabel": "2023 Census Bureau estimate",
    "about": [
      "The town grew into an art colony and seaside resort in the early 1900s.",
      "Landmarks include Mission San Carlos Borromeo de Carmelo, the Forest Theater, the Sunset Center, and Devendorf Park.",
      "Carmel is on the Monterey Peninsula, near Point Lobos and Carmel Bay."
    ]
  },
  "chowchilla": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/chowchillacitycalifornia/PST045224",
    "pop2020": 19039,
    "popEstimate2025": 18730,
    "medianHomeValue": 364000,
    "ownerOccupiedRate": 57.3,
    "medianRent": 1178,
    "medianHouseholdIncome": 66514,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.29,
    "bachelorsOrHigher": 15.6,
    "landAreaSqMi": 11.09,
    "densityPerSqMi": 1717.4
  },
  "clovis": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/clovisCitycalifornia/PST045224",
    "pop2020": 120124,
    "popEstimate2025": 129347,
    "medianHomeValue": 482700,
    "ownerOccupiedRate": 65.4,
    "medianRent": 1792,
    "medianHouseholdIncome": 99241,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.95,
    "bachelorsOrHigher": 36.6,
    "landAreaSqMi": 25.42,
    "densityPerSqMi": 4726.5
  },
  "coalinga": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/coalingacitycalifornia/PST045224",
    "pop2020": 17590,
    "popEstimate2025": 17281,
    "medianHomeValue": 262400,
    "ownerOccupiedRate": 53.6,
    "medianRent": 1093,
    "medianHouseholdIncome": 75451,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.98,
    "bachelorsOrHigher": 12.7,
    "landAreaSqMi": 6.85,
    "densityPerSqMi": 2569.0
  },
  "corcoran": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/corcorancitycalifornia/PST045224",
    "pop2020": 22339,
    "popEstimate2025": 22358,
    "medianHomeValue": 236100,
    "ownerOccupiedRate": 52.8,
    "medianRent": 1160,
    "medianHouseholdIncome": 59905,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.47,
    "bachelorsOrHigher": 3.7,
    "landAreaSqMi": 7.46,
    "densityPerSqMi": 2995.3
  },
  "delano": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/delanocitycalifornia/PST045224",
    "pop2020": 51428,
    "popEstimate2025": 52334,
    "medianHomeValue": 301900,
    "ownerOccupiedRate": 62.8,
    "medianRent": 1199,
    "medianHouseholdIncome": 67010,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.7,
    "bachelorsOrHigher": 7.3,
    "landAreaSqMi": 14.72,
    "densityPerSqMi": 3494.7
  },
  "dinuba": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/dinubacitycalifornia/PST045224",
    "pop2020": 24563,
    "popEstimate2025": 25949,
    "medianHomeValue": 275000,
    "ownerOccupiedRate": 58.4,
    "medianRent": 1209,
    "medianHouseholdIncome": 59484,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.76,
    "bachelorsOrHigher": 14.1,
    "landAreaSqMi": 6.51,
    "densityPerSqMi": 3773.1,
    "incorporated": "January 6, 1906",
    "elevationFt": 335,
    "about": [
      "Dinuba was first called Sibleyville, after James Sibley, who deeded 240 acres to the Pacific Improvement Company.",
      "No one knows for sure where the name Dinuba came from.",
      "The Alta District Museum, in a restored railroad station, shows local history.",
      "Ruiz Foods is the city's top employer with 1,400 employees, according to Dinuba's 2025 financial report."
    ]
  },
  "earlimart": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/earlimartcdpcalifornia/PST045224",
    "pop2020": 7679,
    "medianHomeValue": 264200,
    "ownerOccupiedRate": 56.7,
    "medianRent": 965,
    "medianHouseholdIncome": 52881,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 4.04,
    "bachelorsOrHigher": 3.9,
    "landAreaSqMi": 2.9,
    "densityPerSqMi": 2645.2
  },
  "exeter": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/exetercitycalifornia/PST045224",
    "pop2020": 10321,
    "popEstimate2025": 10122,
    "medianHomeValue": 307600,
    "ownerOccupiedRate": 54.7,
    "medianRent": 1286,
    "medianHouseholdIncome": 75769,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.12,
    "bachelorsOrHigher": 13.9,
    "landAreaSqMi": 2.46,
    "densityPerSqMi": 4193.8
  },
  "farmersville": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/farmersvillecitycalifornia/PST045224",
    "pop2020": 10397,
    "popEstimate2025": 10326,
    "medianHomeValue": 248500,
    "ownerOccupiedRate": 64.4,
    "medianRent": 1114,
    "medianHouseholdIncome": 60804,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 4.03,
    "bachelorsOrHigher": 6.1,
    "landAreaSqMi": 2.2,
    "densityPerSqMi": 4723.8
  },
  "fresno": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/fresnocitycalifornia/PST045224",
    "pop2020": 542107,
    "popEstimate2025": 555549,
    "medianHomeValue": 374800,
    "ownerOccupiedRate": 50.1,
    "medianRent": 1421,
    "medianHouseholdIncome": 70991,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.97,
    "bachelorsOrHigher": 25.5,
    "landAreaSqMi": 115.18,
    "densityPerSqMi": 4706.8,
    "incorporated": "October 21, 1885",
    "elevationFt": 308,
    "about": [
      "Fresno started in 1872 as a Central Pacific Railroad station and was incorporated in 1885.",
      "Fulton Street became one of the first pedestrian malls in the country in 1964.",
      "Fresno is an economic hub for Fresno County and the San Joaquin Valley, with much of the region tied to large-scale farming.",
      "In 1958 Bank of America launched BankAmericard in Fresno, which later became Visa.",
      "The city sits near the geographic center of California and covers about 116 square miles."
    ]
  },
  "goshen": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Goshen,_California",
    "pop2020": 4968,
    "landAreaSqMi": 2.82,
    "elevationFt": 285,
    "medianHouseholdIncome": 72813,
    "incomeLabel": "2023 Census Bureau estimate",
    "about": [
      "Goshen was founded in the 1870s.",
      "In the early 1890s, Chris Evans and John Sontag robbed a Southern Pacific Railroad train at Goshen.",
      "Until the 1900s, Goshen was an island in a marsh at the edge of Tulare Lake.",
      "Goshen is right next to Visalia."
    ]
  },
  "grover-beach": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/groverbeachcitycalifornia/PST045224",
    "pop2020": 12701,
    "popEstimate2025": 12456,
    "medianHomeValue": 727500,
    "ownerOccupiedRate": 50.5,
    "medianRent": 2061,
    "medianHouseholdIncome": 86458,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.54,
    "bachelorsOrHigher": 28.7,
    "landAreaSqMi": 2.31,
    "densityPerSqMi": 5493.5
  },
  "gustine": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/gustinecitycalifornia/PST045224",
    "pop2020": 6110,
    "popEstimate2025": 6112,
    "medianHomeValue": 441700,
    "ownerOccupiedRate": 56.6,
    "medianRent": 1395,
    "medianHouseholdIncome": 59532,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.45,
    "bachelorsOrHigher": 7.9,
    "landAreaSqMi": 1.55,
    "densityPerSqMi": 3939.4
  },
  "hanford": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/hanfordcitycalifornia/PST045224",
    "pop2020": 57990,
    "popEstimate2025": 62229,
    "medianHomeValue": 349400,
    "ownerOccupiedRate": 62.1,
    "medianRent": 1309,
    "medianHouseholdIncome": 76461,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.01,
    "bachelorsOrHigher": 18.1,
    "landAreaSqMi": 17.4,
    "densityPerSqMi": 3332.2
  },
  "hollister": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/hollistercitycalifornia/PST045224",
    "pop2020": 41678,
    "popEstimate2025": 45695,
    "medianHomeValue": 717500,
    "ownerOccupiedRate": 65.4,
    "medianRent": 1914,
    "medianHouseholdIncome": 111834,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.46,
    "bachelorsOrHigher": 19.1,
    "landAreaSqMi": 7.96,
    "densityPerSqMi": 5234.6,
    "incorporated": "August 6, 1872",
    "elevationFt": 289,
    "about": [
      "Hollister was founded on November 19, 1868 by William Welles Hollister on the former Rancho San Justo land grant.",
      "The town is known for Blenheim apricots, olive oil, vineyards, pomegranates, and chocolate.",
      "A 1947 motorcycle rally riot in Hollister was the basis for the 1953 film The Wild One, and a rally has been held around the Fourth of July on and off since.",
      "The Calaveras Fault runs north and south through the city, and Hollister sits in the western foothills of the Diablo Range."
    ]
  },
  "independence": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Independence,_California",
    "pop2020": 593,
    "landAreaSqMi": 4.86,
    "elevationFt": 3904,
    "about": [
      "Charles Putnam founded a trading post here in 1861, and Camp Independence was set up on July 4, 1862.",
      "Independence became the Inyo County seat in 1866.",
      "Sights include the Inyo County Courthouse and the Eastern California Museum.",
      "Independence is a popular resupply stop for Pacific Crest Trail hikers."
    ]
  },
  "kettleman-city": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Kettleman_City,_California",
    "pop2020": 1242,
    "landAreaSqMi": 0.21,
    "elevationFt": 253,
    "about": [
      "Real estate developer A. Manford Brown founded the town in 1929, a year after oil was found in the nearby Kettleman Hills.",
      "A Tesla Supercharger station opened at the Interstate 5 and State Route 41 junction in 2017, with 40 chargers.",
      "Many residents work in agriculture."
    ]
  },
  "kingsburg": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/kingsburgcitycalifornia/PST045224",
    "pop2020": 12380,
    "popEstimate2025": 13249,
    "medianHomeValue": 373800,
    "ownerOccupiedRate": 71.9,
    "medianRent": 1277,
    "medianHouseholdIncome": 76913,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.87,
    "bachelorsOrHigher": 18.0,
    "landAreaSqMi": 3.72,
    "densityPerSqMi": 3330.6
  },
  "lemoore": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/lemoorecitycalifornia/PST045224",
    "pop2020": 27038,
    "popEstimate2025": 27291,
    "medianHomeValue": 328300,
    "ownerOccupiedRate": 51.6,
    "medianRent": 1555,
    "medianHouseholdIncome": 83724,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.08,
    "bachelorsOrHigher": 19.5,
    "landAreaSqMi": 8.81,
    "densityPerSqMi": 3067.6
  },
  "lindsay": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/lindsaycitycalifornia/PST045224",
    "pop2020": 12659,
    "popEstimate2025": 12578,
    "medianHomeValue": 286400,
    "ownerOccupiedRate": 49.5,
    "medianRent": 1009,
    "medianHouseholdIncome": 53201,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.46,
    "bachelorsOrHigher": 5.7,
    "landAreaSqMi": 2.72,
    "densityPerSqMi": 4647.2
  },
  "livingston": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/livingstoncitycalifornia/PST045224",
    "pop2020": 14172,
    "popEstimate2025": 14690,
    "medianHomeValue": 372700,
    "ownerOccupiedRate": 62.6,
    "medianRent": 1315,
    "medianHouseholdIncome": 74494,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 4.14,
    "bachelorsOrHigher": 10.9,
    "landAreaSqMi": 3.68,
    "densityPerSqMi": 3856.3
  },
  "lone-pine": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Lone_Pine,_California",
    "pop2020": 2014,
    "landAreaSqMi": 19.04,
    "elevationFt": 4203,
    "about": [
      "A March 26, 1872 earthquake destroyed most of the town.",
      "The Alabama Hills, west of town, have been used for many film productions.",
      "Manzanar National Historic Site is north of town on Highway 395.",
      "Tourism is a major part of the local economy, because Lone Pine sits between Mount Whitney, Sequoia and Kings Canyon National Parks, and Death Valley National Park."
    ]
  },
  "los-banos": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/losbanoscitycalifornia/PST045224",
    "pop2020": 45532,
    "popEstimate2025": 49614,
    "medianHomeValue": 440900,
    "ownerOccupiedRate": 59.8,
    "medianRent": 1557,
    "medianHouseholdIncome": 68171,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.54,
    "bachelorsOrHigher": 12.5,
    "landAreaSqMi": 9.99,
    "densityPerSqMi": 4556.4,
    "incorporated": "May 8, 1907",
    "elevationFt": 115,
    "about": [
      "The first Anglo-American settler, Uriah Wood, built a cabin in the area in 1859.",
      "Henry Miller Plaza downtown honors the rancher Henry Miller, and the town holds an annual May Day Fair in the first week of May.",
      "The Los Banos Unified School District was the city's largest employer in its 2018 financial report, with 1,082 employees.",
      "Los Banos sits on the west side of the San Joaquin Valley, about 26 miles southwest of Merced, where State Routes 152 and 165 meet."
    ]
  },
  "madera": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/maderacitycalifornia/PST045224",
    "pop2020": 66224,
    "popEstimate2025": 69017,
    "medianHomeValue": 359900,
    "ownerOccupiedRate": 54.7,
    "medianRent": 1353,
    "medianHouseholdIncome": 63933,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.82,
    "bachelorsOrHigher": 10.9,
    "landAreaSqMi": 16.48,
    "densityPerSqMi": 4019.7
  },
  "madera-ranchos": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Madera_Ranchos,_California",
    "pop2020": 3623,
    "landAreaSqMi": 2.61,
    "elevationFt": 341,
    "about": [
      "Madera Ranchos is an unincorporated community in Madera County.",
      "It first appeared as its own census-designated place in the 2020 Census, after Bonadelle Ranchos-Madera Ranchos was split into two."
    ]
  },
  "marina": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/marinacitycalifornia/PST045224",
    "pop2020": 22359,
    "popEstimate2025": 23256,
    "medianHomeValue": 818700,
    "ownerOccupiedRate": 42.9,
    "medianRent": 2101,
    "medianHouseholdIncome": 95955,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.69,
    "bachelorsOrHigher": 37.9,
    "landAreaSqMi": 8.91,
    "densityPerSqMi": 2510.0
  },
  "merced": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/mercedcitycalifornia/PST045224",
    "pop2020": 86333,
    "popEstimate2025": 99724,
    "medianHomeValue": 372600,
    "ownerOccupiedRate": 45.9,
    "medianRent": 1393,
    "medianHouseholdIncome": 63122,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.25,
    "bachelorsOrHigher": 20.2,
    "landAreaSqMi": 23.25,
    "densityPerSqMi": 3712.6,
    "incorporated": "April 1, 1889",
    "elevationFt": 171,
    "about": [
      "The first Merced post office opened in 1870.",
      "UC Merced, the 10th University of California campus, opened in 2005.",
      "Castle Air Force Base, a big part of the local economy, closed in September 1995.",
      "Milk was the top commodity in 2019, worth about $905 million.",
      "Merced is known as the Gateway to Yosemite, less than two hours by car from Yosemite National Park."
    ]
  },
  "monterey": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/montereycitycalifornia/PST045224",
    "pop2020": 30218,
    "popEstimate2025": 28953,
    "medianHomeValue": 1076300,
    "ownerOccupiedRate": 36.2,
    "medianRent": 2353,
    "medianHouseholdIncome": 102846,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.1,
    "bachelorsOrHigher": 52.9,
    "landAreaSqMi": 8.65,
    "densityPerSqMi": 3495.4
  },
  "oakhurst": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/oakhurstcdpcalifornia/PST045224",
    "pop2020": 5945,
    "medianHomeValue": 392600,
    "ownerOccupiedRate": 82.7,
    "medianRent": 1728,
    "medianHouseholdIncome": 82056,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.74,
    "bachelorsOrHigher": 26.2,
    "landAreaSqMi": 33.45,
    "densityPerSqMi": 177.7
  },
  "orosi": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/orosicdpcalifornia/PST045224",
    "pop2020": 8329,
    "medianHomeValue": 227100,
    "ownerOccupiedRate": 55.6,
    "medianRent": 1204,
    "medianHouseholdIncome": 54604,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 4.13,
    "bachelorsOrHigher": 4.4,
    "landAreaSqMi": 2.58,
    "densityPerSqMi": 3233.3
  },
  "parlier": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/parliercitycalifornia/PST045224",
    "pop2020": 14576,
    "popEstimate2025": 14622,
    "medianHomeValue": 256400,
    "ownerOccupiedRate": 45.9,
    "medianRent": 1105,
    "medianHouseholdIncome": 52357,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 4.03,
    "bachelorsOrHigher": 5.6,
    "landAreaSqMi": 2.41,
    "densityPerSqMi": 6050.6
  },
  "paso-robles": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/elpasoderoblespasoroblescitycalifornia/PST045224",
    "pop2020": 31490,
    "popEstimate2025": 31626,
    "medianHomeValue": 687200,
    "ownerOccupiedRate": 61.3,
    "medianRent": 1981,
    "medianHouseholdIncome": 92228,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.6,
    "bachelorsOrHigher": 29.7,
    "landAreaSqMi": 19.65,
    "densityPerSqMi": 1602.5
  },
  "pismo-beach": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/pismobeachcitycalifornia/PST045224",
    "pop2020": 8072,
    "popEstimate2025": 7911,
    "medianHomeValue": 1021300,
    "ownerOccupiedRate": 64.6,
    "medianRent": 2232,
    "medianHouseholdIncome": 118072,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 1.94,
    "bachelorsOrHigher": 51.7,
    "landAreaSqMi": 3.5,
    "densityPerSqMi": 2308.3
  },
  "porterville": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/portervillecitycalifornia/PST045224",
    "pop2020": 62623,
    "popEstimate2025": 63088,
    "medianHomeValue": 285700,
    "ownerOccupiedRate": 54.3,
    "medianRent": 1148,
    "medianHouseholdIncome": 60461,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.21,
    "bachelorsOrHigher": 14.5,
    "landAreaSqMi": 18.65,
    "densityPerSqMi": 3358.3
  },
  "reedley": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/reedleycitycalifornia/PST045224",
    "pop2020": 25227,
    "popEstimate2025": 26982,
    "medianHomeValue": 334800,
    "ownerOccupiedRate": 56.4,
    "medianRent": 1288,
    "medianHouseholdIncome": 63307,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.45,
    "bachelorsOrHigher": 16.0,
    "landAreaSqMi": 5.51,
    "densityPerSqMi": 4579.2
  },
  "ridgecrest": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/ridgecrestcitycalifornia/PST045224",
    "pop2020": 27959,
    "popEstimate2025": 28333,
    "medianHomeValue": 253900,
    "ownerOccupiedRate": 58.8,
    "medianRent": 1186,
    "medianHouseholdIncome": 89250,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.47,
    "bachelorsOrHigher": 30.9,
    "landAreaSqMi": 20.86,
    "densityPerSqMi": 1340.3
  },
  "ridgemark": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Ridgemark,_California",
    "pop2020": 3212,
    "landAreaSqMi": 2.57,
    "elevationFt": 489,
    "medianHouseholdIncome": 127117,
    "incomeLabel": "2023 Census Bureau estimate",
    "about": [
      "Development began in the early 1970s.",
      "Ridgemark is a private, gated golf community with just over 1,000 homes.",
      "It sits next to the southeast edge of Hollister."
    ]
  },
  "salinas": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/salinascitycalifornia/PST045224",
    "pop2020": 163542,
    "popEstimate2025": 159134,
    "medianHomeValue": 654100,
    "ownerOccupiedRate": 47.0,
    "medianRent": 1991,
    "medianHouseholdIncome": 91908,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.65,
    "bachelorsOrHigher": 16.5,
    "landAreaSqMi": 23.52,
    "densityPerSqMi": 6954.8,
    "incorporated": "March 4, 1874",
    "about": [
      "American settlers opened a post office at a stagecoach junction in 1854 and named the town Salinas.",
      "The railroad arrived in 1868, a major turning point for the town's economy.",
      "The National Steinbeck Center is in Oldtown Salinas, the historic downtown.",
      "Salinas is known as the Salad Bowl of the World for its large farming industry.",
      "The city sits at the mouth of the Salinas Valley, about eight miles from the Pacific Ocean."
    ]
  },
  "san-juan-bautista": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/San_Juan_Bautista,_California",
    "pop2020": 2089,
    "landAreaSqMi": 0.78,
    "elevationFt": 217,
    "about": [
      "Franciscan priest Fermin de Lasuen founded Mission San Juan Bautista in 1797.",
      "San Juan Bautista State Historic Park and the cultural group El Teatro Campesino are in town.",
      "The San Andreas Fault runs through the town."
    ]
  },
  "san-luis-obispo": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/sanluisobispocitycalifornia/PST045224",
    "pop2020": 47063,
    "popEstimate2025": 50636,
    "medianHomeValue": 935100,
    "ownerOccupiedRate": 40.3,
    "medianRent": 1965,
    "medianHouseholdIncome": 73685,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.31,
    "bachelorsOrHigher": 54.4,
    "landAreaSqMi": 13.31,
    "densityPerSqMi": 3537.2,
    "about": [
      "Junipero Serra founded Mission San Luis Obispo de Tolosa in 1772, and the town grew up around it.",
      "Voters closed part of Monterey Street in front of the mission in a 1968 referendum, creating Mission Plaza.",
      "The city is a regional center for education, government, health care, and tourism.",
      "San Luis Obispo sits in a valley drained by San Luis Obispo Creek, between the Santa Lucia Range and the coastal hills."
    ]
  },
  "sanger": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/sangercitycalifornia/PST045224",
    "pop2020": 26617,
    "popEstimate2025": 27228,
    "medianHomeValue": 364800,
    "ownerOccupiedRate": 64.4,
    "medianRent": 1209,
    "medianHouseholdIncome": 77500,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.62,
    "bachelorsOrHigher": 13.5,
    "landAreaSqMi": 5.77,
    "densityPerSqMi": 4615.4
  },
  "seaside": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/seasidecitycalifornia/PST045224",
    "pop2020": 32366,
    "popEstimate2025": 31636,
    "medianHomeValue": 787100,
    "ownerOccupiedRate": 35.4,
    "medianRent": 2409,
    "medianHouseholdIncome": 85311,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 2.91,
    "bachelorsOrHigher": 29.6,
    "landAreaSqMi": 8.92,
    "densityPerSqMi": 3627.3
  },
  "selma": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/selmacitycalifornia/PST045224",
    "pop2020": 24674,
    "popEstimate2025": 24702,
    "medianHomeValue": 315300,
    "ownerOccupiedRate": 60.4,
    "medianRent": 1232,
    "medianHouseholdIncome": 60241,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.32,
    "bachelorsOrHigher": 10.0,
    "landAreaSqMi": 5.81,
    "densityPerSqMi": 4248.3,
    "incorporated": "March 15, 1893",
    "elevationFt": 308,
    "about": [
      "Selma grew up around farming and the Southern Pacific Railroad, which started building its branch line in the 1870s.",
      "Groundwater irrigation began here, when a pumping plant first tapped the San Joaquin Valley's groundwater.",
      "In 1963 Selma adopted the slogan Raisin Capital of the World, since about 90 percent of U.S. raisins came from within eight miles.",
      "Selma is 16 miles southeast of Fresno."
    ]
  },
  "shafter": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/shaftercitycalifornia/PST045224",
    "pop2020": 19953,
    "popEstimate2025": 23871,
    "medianHomeValue": 335800,
    "ownerOccupiedRate": 64.7,
    "medianRent": 1253,
    "medianHouseholdIncome": 71215,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.64,
    "bachelorsOrHigher": 12.2,
    "landAreaSqMi": 38.7,
    "densityPerSqMi": 515.6,
    "incorporated": "1938",
    "elevationFt": 348,
    "about": [
      "Shafter began as a loading dock on a Santa Fe Railroad right-of-way and was named for General William Rufus Shafter.",
      "Minter Field opened in June 1941 and was heavily used in World War II, with about 7,000 troops stationed there.",
      "The human-powered Gossamer Condor won the Kremer prize at Minter Field on August 23, 1977, and a California State Monument marks the event.",
      "Farming built the local economy, and the city has grown into a hub for manufacturing, logistics, and energy.",
      "Shafter is on State Route 43, about 18 miles west-northwest of Bakersfield."
    ]
  },
  "shoshone": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Shoshone,_California",
    "pop2020": 22,
    "landAreaSqMi": 28.71,
    "elevationFt": 1585,
    "about": [
      "Ralph Jacobus Fairbanks, known as Dad Fairbanks, founded the town in 1910.",
      "Shoshone was a stop on the Tonopah and Tidewater Railroad, which shut down in 1940.",
      "It is a southern gateway to Death Valley National Park.",
      "The town sits at the junction of State Routes 127 and 178."
    ]
  },
  "springville": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Springville,_California",
    "pop2020": 967,
    "landAreaSqMi": 4.18,
    "elevationFt": 1024,
    "about": [
      "Settler William Daunt opened the first store in 1860, and the town was called Daunt until it was renamed Springville in January 1911.",
      "Key scenes of Alfred Hitchcock's 1942 film Saboteur were shot at a ranch in Springville.",
      "Summer temperatures can top 100 degrees."
    ]
  },
  "strathmore": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Strathmore,_California",
    "pop2020": 2830,
    "landAreaSqMi": 1.41,
    "elevationFt": 400,
    "medianHouseholdIncome": 42705,
    "incomeLabel": "2023 Census Bureau estimate",
    "about": [
      "The Scottish company Balfour Guthrie named Strathmore in 1908, after a Scottish word that means broad valley.",
      "Earlier names for the place were Roth Spur and Santos."
    ]
  },
  "three-rivers": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Three_Rivers,_California",
    "pop2020": 2053,
    "landAreaSqMi": 30.98,
    "elevationFt": 843,
    "medianHouseholdIncome": 83614,
    "incomeLabel": "2023 Census Bureau estimate",
    "about": [
      "Utopian socialists founded the Kaweah Colony along the North Fork of the Kaweah River in 1886. They were ordered off the land in 1891, after Congress created Sequoia National Park.",
      "Three Rivers sits near the entrances to Sequoia and Kings Canyon National Parks.",
      "The town lies in the Kaweah River canyon, just above Lake Kaweah."
    ]
  },
  "tipton": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Tipton,_California",
    "pop2020": 2519,
    "landAreaSqMi": 1.73,
    "elevationFt": 276,
    "medianHouseholdIncome": 51389,
    "incomeLabel": "2023 Census Bureau estimate",
    "about": [
      "When Southern Pacific Railroad construction stopped in 1872, a community formed at the end of the line and people called it Tip Town.",
      "The post office changed the name to Tipton in 1873."
    ]
  },
  "traver": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Traver,_California",
    "pop2020": 731,
    "landAreaSqMi": 0.67,
    "elevationFt": 289,
    "about": [
      "Traver first appeared as a census-designated place in the 2000 Census, when its population was 732."
    ]
  },
  "tres-pinos": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Tres_Pinos,_California",
    "pop2020": 443,
    "landAreaSqMi": 3.6,
    "elevationFt": 531,
    "about": [
      "The Southern Pacific Railroad reached the Tres Pinos station on March 12, 1873.",
      "Bolado Park hosts the San Benito County Fair and the San Benito County Saddle Horse Show & Rodeo.",
      "Tres Pinos is on State Route 25, about 4 miles south of Hollister."
    ]
  },
  "tulare": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/tularecitycalifornia/PST045224",
    "pop2020": 68875,
    "popEstimate2025": 73907,
    "medianHomeValue": 329800,
    "ownerOccupiedRate": 58.5,
    "medianRent": 1435,
    "medianHouseholdIncome": 72410,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.38,
    "bachelorsOrHigher": 11.8,
    "landAreaSqMi": 20.39,
    "densityPerSqMi": 3378.7
  },
  "visalia": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/visaliacitycalifornia/PST045224",
    "pop2020": 141384,
    "popEstimate2025": 146541,
    "medianHomeValue": 371500,
    "ownerOccupiedRate": 61.1,
    "medianRent": 1490,
    "medianHouseholdIncome": 81989,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.02,
    "bachelorsOrHigher": 24.1,
    "landAreaSqMi": 37.94,
    "densityPerSqMi": 3727.0
  },
  "wasco": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/wascocitycalifornia/PST045224",
    "pop2020": 27047,
    "popEstimate2025": 26525,
    "medianHomeValue": 273600,
    "ownerOccupiedRate": 58.3,
    "medianRent": 1089,
    "medianHouseholdIncome": 51727,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.57,
    "bachelorsOrHigher": 6.2,
    "landAreaSqMi": 9.39,
    "densityPerSqMi": 2881.3
  },
  "woodlake": {
    "source": "quickfacts",
    "sourceUrl": "https://www.census.gov/quickfacts/fact/table/woodlakecitycalifornia/PST045224",
    "pop2020": 7419,
    "popEstimate2025": 8073,
    "medianHomeValue": 300200,
    "ownerOccupiedRate": 55.1,
    "medianRent": 968,
    "medianHouseholdIncome": 46266,
    "incomeLabel": "2020-2024, in 2024 dollars",
    "personsPerHousehold": 3.5,
    "bachelorsOrHigher": 10.8,
    "landAreaSqMi": 2.61,
    "densityPerSqMi": 2838.2
  },
  "yosemite-lakes": {
    "source": "census2020-wikipedia",
    "sourceUrl": "https://en.wikipedia.org/wiki/Yosemite_Lakes,_California",
    "pop2020": 5022,
    "landAreaSqMi": 20.9,
    "elevationFt": 1230,
    "about": [
      "Titan Group developed the area in the 1970s.",
      "The community has an equestrian center, a clubhouse, and three man-made lakes.",
      "It lies in the Sierra Nevada foothills, about 34 miles north of Fresno."
    ]
  }
};
