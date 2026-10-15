// Recent acquisitions: the real properties House Junkies has bought, with the
// numbers. This is the single source of truth for /projects, /projects/[slug],
// the listings on /buy, the "Recent Purchases" blocks on /we-buy-houses/[city],
// and the home page strip.
//
// Source: Dominic's property CSV (beds, baths, sq ft, lot, year built, entity,
// estimated value) plus the purchase / listing / sale / rental data he added by
// hand. Nothing here is estimated by us. "estValue" is an automated valuation
// supplied with the CSV, so every page labels it as an estimate, not an
// appraisal.
//
// To add a property: add one object to `properties` and drop two photos in
// public/images/properties as <slug>.jpg (about 1100px wide) and <slug>-sm.jpg
// (640px wide). Everything else on the site updates by itself.
//
// Status changes (For Sale -> Sold, etc.) are edited here too. When a listing
// sells, set status "Sold" and add soldPrice + soldDate, and it moves off /buy
// and onto the track-record sections automatically.

// These are NOT all of our purchases, just a selection of recent ones broken
// down in detail. Copy should frame them as "some of our most recent
// purchases" next to the 350+ homes bought claim (site.stats.homesBought),
// never as the full list, and never with a smaller total that undercuts 350+.

export type PropertyStatus = "Acquired" | "For Sale" | "Sold" | "Rented";
export type PropertyType =
  | "Single Family Home"
  | "Multi Family Property"
  | "Mobile Home"
  | "Church";

export type Property = {
  slug: string;
  street: string;
  city: string;
  zip: string;
  type: PropertyType;
  beds: number | null;
  baths: number | null;
  sqft: number;
  lotSqft: number;
  yearBuilt: number;
  entity?: string;
  estValue: number;
  purchase: number;
  purchased: string; // ISO date
  status: PropertyStatus;
  listPrice?: number;
  soldPrice?: number;
  soldDate?: string;
  rentPerMonth?: number;
  img: { w: number; h: number; smW: number; smH: number };
};

export const properties: Property[] = [
  {
    slug: "50-e-locust-ave-porterville",
    street: "50 E Locust Ave",
    city: "Porterville",
    zip: "93257",
    type: "Multi Family Property",
    beds: null,
    baths: null,
    sqft: 3526,
    lotSqft: 7912,
    yearBuilt: 1966,
    entity: "Legacy Faith Homes LLC",
    estValue: 475000,
    purchase: 250000,
    purchased: "2026-09-14",
    status: "Acquired",
    img: { w: 1037, h: 443, smW: 640, smH: 273 },
  },
  {
    slug: "220-s-dode-ave-farmersville",
    street: "220 S Dode Ave",
    city: "Farmersville",
    zip: "93223",
    type: "Single Family Home",
    beds: 1,
    baths: 1,
    sqft: 456,
    lotSqft: 2588,
    yearBuilt: 1950,
    entity: "Ulloa Investment Group LLC",
    estValue: 150000,
    purchase: 90000,
    purchased: "2026-07-21",
    status: "Acquired",
    img: { w: 771, h: 555, smW: 640, smH: 461 },
  },
  {
    slug: "32750-lincoln-rd-visalia",
    street: "32750 Lincoln Rd",
    city: "Visalia",
    zip: "93291",
    type: "Single Family Home",
    beds: 1,
    baths: 1,
    sqft: 550,
    lotSqft: 16317,
    yearBuilt: 1949,
    estValue: 275000,
    purchase: 165000,
    purchased: "2026-07-15",
    status: "Sold",
    soldPrice: 247500,
    soldDate: "2026-08-27",
    img: { w: 1059, h: 642, smW: 640, smH: 388 },
  },
  {
    slug: "343-westside-st-porterville",
    street: "343 Westside St",
    city: "Porterville",
    zip: "93257",
    type: "Mobile Home",
    beds: null,
    baths: null,
    sqft: 863,
    lotSqft: 7109,
    yearBuilt: 1900,
    entity: "Legacy Faith Homes LLC",
    estValue: 175000,
    purchase: 65000,
    purchased: "2026-07-24",
    status: "Acquired",
    img: { w: 725, h: 557, smW: 640, smH: 492 },
  },
  {
    slug: "921-s-cottage-st-porterville",
    street: "921 S Cottage St",
    city: "Porterville",
    zip: "93257",
    type: "Single Family Home",
    beds: 1,
    baths: 1,
    sqft: 915,
    lotSqft: 9900,
    yearBuilt: 1916,
    entity: "One Stop Investments LLC",
    estValue: 270000,
    purchase: 105000,
    purchased: "2026-08-23",
    status: "Acquired",
    img: { w: 1026, h: 704, smW: 640, smH: 439 },
  },
  {
    slug: "215-s-crumal-st-visalia",
    street: "215 S Crumal St",
    city: "Visalia",
    zip: "93292",
    type: "Single Family Home",
    beds: 3,
    baths: 2,
    sqft: 1150,
    lotSqft: 9112,
    yearBuilt: 1970,
    entity: "Legacy Faith Homes LLC",
    estValue: 335000,
    purchase: 220000,
    purchased: "2026-07-29",
    status: "Acquired",
    img: { w: 1179, h: 663, smW: 640, smH: 360 },
  },
  {
    slug: "2333-e-springville-ave-porterville",
    street: "2333 E Springville Ave",
    city: "Porterville",
    zip: "93257",
    type: "Single Family Home",
    beds: 2,
    baths: 1,
    sqft: 1000,
    lotSqft: 56424,
    yearBuilt: 1950,
    entity: "Ulloa Investment Group LLC",
    estValue: 255000,
    purchase: 190000,
    purchased: "2026-09-13",
    status: "Acquired",
    img: { w: 1151, h: 828, smW: 640, smH: 460 },
  },
  {
    slug: "756-s-oliver-st-tulare",
    street: "756 S Oliver St",
    city: "Tulare",
    zip: "93274",
    type: "Single Family Home",
    beds: 3,
    baths: 1,
    sqft: 936,
    lotSqft: 6793,
    yearBuilt: 1957,
    entity: "One Stop Investments LLC",
    estValue: 280000,
    purchase: 175000,
    purchased: "2026-09-24",
    status: "For Sale",
    listPrice: 279900,
    img: { w: 1179, h: 712, smW: 640, smH: 386 },
  },
  {
    slug: "40074-road-56-dinuba",
    street: "40074 Road 56",
    city: "Dinuba",
    zip: "93618",
    type: "Single Family Home",
    beds: 3,
    baths: 2,
    sqft: 2347,
    lotSqft: 124146,
    yearBuilt: 1969,
    entity: "Ulloa Investment Group LLC",
    estValue: 600000,
    purchase: 250000,
    purchased: "2026-09-18",
    status: "Acquired",
    img: { w: 1179, h: 623, smW: 640, smH: 338 },
  },
  {
    slug: "41-chess-terrace-st-porterville",
    street: "41 Chess Terrace St",
    city: "Porterville",
    zip: "93257",
    type: "Multi Family Property",
    beds: 2,
    baths: 2,
    sqft: 1297,
    lotSqft: 12773,
    yearBuilt: 1939,
    entity: "One Stop Investments LLC",
    estValue: 270000,
    purchase: 190000,
    purchased: "2026-09-12",
    status: "Acquired",
    img: { w: 1179, h: 635, smW: 640, smH: 345 },
  },
  {
    slug: "765-s-c-st-tulare",
    street: "765 S C St",
    city: "Tulare",
    zip: "93274",
    type: "Single Family Home",
    beds: 3,
    baths: 2,
    sqft: 1032,
    lotSqft: 6428,
    yearBuilt: 1972,
    entity: "Ulloa Investment Group LLC",
    estValue: 300000,
    purchase: 206000,
    purchased: "2026-10-05",
    status: "For Sale",
    listPrice: 299990,
    img: { w: 703, h: 575, smW: 640, smH: 523 },
  },
  {
    slug: "19667-avenue-195-strathmore",
    street: "19667 Avenue 195",
    city: "Strathmore",
    zip: "93267",
    type: "Church",
    beds: 0,
    baths: 2,
    sqft: 1640,
    lotSqft: 13050,
    yearBuilt: 1901,
    entity: "Legacy Faith Homes LLC",
    estValue: 100000,
    purchase: 125000,
    purchased: "2026-07-27",
    status: "For Sale",
    listPrice: 209990,
    img: { w: 1179, h: 663, smW: 640, smH: 360 },
  },
  {
    slug: "207-pleasant-st-lindsay",
    street: "207 Pleasant St",
    city: "Lindsay",
    zip: "93247",
    type: "Multi Family Property",
    beds: 1,
    baths: 1,
    sqft: 1176,
    lotSqft: 7848,
    yearBuilt: 1941,
    entity: "Ulloa Investment Group LLC",
    estValue: 295000,
    purchase: 150000,
    purchased: "2026-08-27",
    status: "Acquired",
    img: { w: 901, h: 541, smW: 640, smH: 384 },
  },
  {
    slug: "27266-avenue-146-porterville",
    street: "27266 Avenue 146",
    city: "Porterville",
    zip: "93257",
    type: "Mobile Home",
    beds: 3,
    baths: 2,
    sqft: 1170,
    lotSqft: 7380,
    yearBuilt: 1930,
    entity: "Ulloa Investment Group LLC",
    estValue: 170000,
    purchase: 129000,
    purchased: "2026-08-17",
    status: "Acquired",
    img: { w: 805, h: 489, smW: 640, smH: 389 },
  },
  {
    slug: "425-w-willow-st-exeter",
    street: "425 W Willow St",
    city: "Exeter",
    zip: "93221",
    type: "Single Family Home",
    beds: 2,
    baths: 1,
    sqft: 680,
    lotSqft: 5070,
    yearBuilt: 1944,
    entity: "Ulloa Investment Group LLC",
    estValue: 230000,
    purchase: 160000,
    purchased: "2026-08-13",
    status: "Rented",
    rentPerMonth: 1600,
    img: { w: 1024, h: 666, smW: 640, smH: 416 },
  },
  {
    slug: "24215-avenue-216-lindsay",
    street: "24215 Avenue 216",
    city: "Lindsay",
    zip: "93247",
    type: "Single Family Home",
    beds: 5,
    baths: 2,
    sqft: 3020,
    lotSqft: 65340,
    yearBuilt: 1959,
    entity: "Legacy Faith Homes LLC",
    estValue: 425000,
    purchase: 350000,
    purchased: "2026-08-20",
    status: "Acquired",
    img: { w: 989, h: 662, smW: 640, smH: 428 },
  },
];

/* ---------------------------------------------------------------- */
/* Lookups                                                          */
/* ---------------------------------------------------------------- */

export function getProperty(slug: string | undefined) {
  return properties.find((p) => p.slug === slug);
}

export function propertiesIn(cityName: string) {
  return properties.filter((p) => p.city === cityName);
}

export function forSaleProperties() {
  return properties.filter((p) => p.status === "For Sale");
}

export function newestFirst(list: Property[] = properties) {
  return [...list].sort((a, b) => (a.purchased < b.purchased ? 1 : -1));
}

/** City slug as used by /we-buy-houses/[city] (lib/cities.ts). */
export function citySlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/** Distinct city names that have at least one property, most properties first. */
export function propertyCityNames() {
  const counts = new Map<string, number>();
  for (const p of properties) counts.set(p.city, (counts.get(p.city) ?? 0) + 1);
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name]) => name);
}

/* ---------------------------------------------------------------- */
/* Formatting                                                       */
/* ---------------------------------------------------------------- */

export function money(n: number) {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function moneyShort(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2).replace(/0$/, "")}M`;
  return `$${Math.round(n / 1000).toLocaleString("en-US")}K`;
}

export function num(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

export function acresLabel(lotSqft: number) {
  const a = lotSqft / 43560;
  if (a >= 1) return `${a.toFixed(2)} acre`;
  return `${num(lotSqft)} sq ft`;
}

export function fullAddress(p: Property) {
  return `${p.street}, ${p.city}, CA ${p.zip}`;
}

export function mapsEmbed(p: Property, satellite = false) {
  const q = encodeURIComponent(fullAddress(p));
  return `https://maps.google.com/maps?q=${q}${satellite ? "&t=k&z=19" : "&z=17"}&output=embed`;
}

export function mapsLink(p: Property) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress(p))}`;
}

export function shortDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function longDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function monthYear(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function daysBetween(a: string, b: string) {
  return Math.round(
    (new Date(`${b}T12:00:00Z`).getTime() - new Date(`${a}T12:00:00Z`).getTime()) / 86_400_000,
  );
}

export function pricePerSqft(price: number, sqft: number) {
  return sqft > 0 ? price / sqft : 0;
}

/** The headline number on every card and page is what we paid. */
export function headlinePrice(p: Property): { label: string; value: number; suffix?: string } {
  return { label: "Purchased For", value: p.purchase };
}

/** The smaller line under the headline: list price, sale price, or rent. */
export function secondaryPrice(p: Property): string | null {
  if (p.status === "For Sale" && p.listPrice) return `Listed at ${money(p.listPrice)}`;
  if (p.status === "Sold" && p.soldPrice) return `Sold for ${money(p.soldPrice)}`;
  if (p.status === "Rented" && p.rentPerMonth) return `Rented at ${money(p.rentPerMonth)}/mo`;
  return null;
}

/** Beds / baths pieces. Skips 0 beds (the church) and null (not applicable). */
export function bedsBathsLabel(p: Property): { value: string; unit: string }[] {
  const parts: { value: string; unit: string }[] = [];
  if (p.beds !== null && p.beds > 0) parts.push({ value: String(p.beds), unit: "bd" });
  if (p.baths !== null) parts.push({ value: String(p.baths), unit: "ba" });
  return parts;
}

/** County records list placeholder build years (1900, 1930) for mobile homes, so hide them. */
export function showYearBuilt(p: Property) {
  return p.type !== "Mobile Home";
}

export function portfolioStats(list: Property[] = properties) {
  const count = list.length;
  const purchaseTotal = list.reduce((s, p) => s + p.purchase, 0);
  const estTotal = list.reduce((s, p) => s + p.estValue, 0);
  const sqftTotal = list.reduce((s, p) => s + p.sqft, 0);
  const cityCount = new Set(list.map((p) => p.city)).size;
  return {
    count,
    purchaseTotal,
    estTotal,
    sqftTotal,
    cityCount,
    avgPurchase: count ? purchaseTotal / count : 0,
    avgPpsf: sqftTotal ? purchaseTotal / sqftTotal : 0,
    forSale: list.filter((p) => p.status === "For Sale").length,
    sold: list.filter((p) => p.status === "Sold").length,
    rented: list.filter((p) => p.status === "Rented").length,
  };
}

export function propertyBlurb(p: Property) {
  const rooms = [
    p.beds ? `${p.beds} bedroom${p.beds === 1 ? "" : "s"}` : "",
    p.baths ? `${p.baths} bathroom${p.baths === 1 ? "" : "s"}` : "",
  ]
    .filter(Boolean)
    .join(", ");
  const built = showYearBuilt(p) ? `, built in ${p.yearBuilt}` : "";
  const entity = p.entity ? ` through ${p.entity}` : "";
  return `${p.street} is a ${rooms ? rooms + " " : ""}${p.type.toLowerCase()} in ${p.city}, CA ${p.zip}, with ${num(
    p.sqft,
  )} square feet on a ${acresLabel(p.lotSqft)} lot${built}. House Junkies bought it${entity} for ${money(
    p.purchase,
  )} on ${longDate(p.purchased)}.`;
}

/* ---------------------------------------------------------------- */
/* City FAQ, built from the data so every city page is different     */
/* ---------------------------------------------------------------- */

function plural(n: number, word: string) {
  if (n === 1) return `${n} ${word}`;
  return `${n} ${word.endsWith("y") ? `${word.slice(0, -1)}ies` : `${word}s`}`;
}

export function cityFaq(cityName: string): { question: string; answer: string }[] {
  const list = propertiesIn(cityName);
  if (!list.length) return [];
  const stats = portfolioStats(list);
  const byPrice = [...list].sort((a, b) => a.purchase - b.purchase);
  const lowest = byPrice[0];
  const highest = byPrice[byPrice.length - 1];
  const first = [...list].sort((a, b) => (a.purchased < b.purchased ? -1 : 1))[0];
  const types = Array.from(new Set(list.map((p) => p.type.toLowerCase())));
  const range =
    list.length > 1
      ? `priced from ${money(lowest.purchase)} (${lowest.street}) to ${money(highest.purchase)} (${highest.street})`
      : `at ${money(lowest.purchase)} (${lowest.street})`;

  return [
    {
      question: `Has House Junkies bought houses in ${cityName} recently?`,
      answer: `Yes. ${plural(stats.count, "of our purchase")} in ${cityName} since ${monthYear(
        first.purchased,
      )} ${stats.count === 1 ? "is" : "are"} on our Projects page, with photos, square footage, lot size, and the price we paid for each one. They are a handful of the 350+ homes House Junkies has bought, renovated, and resold.`,
    },
    {
      question: `What kinds of properties do you buy in ${cityName}?`,
      answer: `Our recent ${cityName} purchases include ${types.join(", ")}, ${range}. We buy as-is for cash, in any condition.`,
    },
  ];
}
