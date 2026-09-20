// Single source of truth for name, contact info, licenses, and social links.
// Update here, not in individual pages. Every JSON-LD block and footer pulls from this file.

export const site = {
  name: "House Junkies Inc.",
  shortName: "House Junkies",
  url: "https://housejunkiesinc.org",
  description:
    "Cash home buyer in Visalia and the Central Valley. We buy, renovate, and resell properties with our own licensed construction crew.",

  phone: "(559) 368-8956",
  phoneE164: "+15593688956",
  email: "info@housejunkiesinc.org", // TODO: set up a branded inbox before launch, not a personal Gmail

  address: {
    street: "801 W Main Street",
    city: "Visalia",
    region: "CA",
    postalCode: "93291",
    country: "US",
  },

  // Each entity in the group has its own real address - the old Base44 site
  // conflated these into one schema block, which is exactly what the SEO
  // audit flagged. Keep them distinct.
  entityAddresses: {
    acquisitions: "801 West Main Street, Visalia, CA", // House Junkies Inc.
    construction: "1640 West Mineral King Ave, Visalia, CA", // House Junkies Construction
    brokerage: "1814 West Dorothea Ave, Visalia, CA", // Legacy Real Estate
  },

  legacyRealEstate: {
    name: "Legacy Real Estate",
    dre: "DRE #02165291",
    agentCount: "220+",
    countyRank: "the largest brokerage in Tulare County",
    monthlySales: "80+",
    monthlyVolume: "$30,000,000+",
  },

  geo: {
    latitude: 36.3298857,
    longitude: -119.3001446,
  },

  hours: {
    weekday: "8:00 AM - 5:00 PM",
    weekend: "by appointment",
  },

  licenses: {
    generalContractor: "CA LIC#1077593",
    brokerage: "DRE #02165291",
  },

  people: {
    ceo: {
      name: "Abel Ulloa",
      title: "CEO",
      bio: "Founder and CEO of House Junkies Inc. and partner in Ulloa Investment Group. Also a licensed realtor with Legacy Real Estate (Lic #01957925). Per SFR Analytics' September 2026 Visalia investor ranking, Abel is personally named on three of the market's top entities, Ulloa Investment Group (#1, $16.0M), One Stop Investments (#6, $4.06M), and Legacy Faith Homes (#12, $1.99M), totaling over $22M in verified transaction volume across 147 deals.",
      phone: "(559) 310-5004",
      email: "14dayscash@gmail.com",
    },
    ops: {
      name: "Dominic McClelland",
      title: "Operations Manager",
      bio: "Runs day-to-day acquisitions and operations for House Junkies Inc. and is a partner at Ulloa Investment Group. His work sits inside the fully vertically integrated stack, acquisitions, private funding, construction, and brokerage, with no banks, no outside brokers, and no out-of-town contractors involved in a deal from acquisition to resale. Leads the company's probate program alongside outside counsel.",
      phone: "(559) 368-8956",
      email: "dominicmccllelland@gmail.com",
    },
    broker: {
      name: "Jenny Madrid",
      title: "Broker, Owner",
      bio: "Broker of record for Legacy Real Estate (DRE #02165291), the brokerage arm of Ulloa Investment Group and the largest brokerage in Tulare County, leading a team of 220+ agents averaging 80+ home sales and $30,000,000+ in closed volume per month. Personally licensed as DRE #01882650. Because House Junkies and Legacy Real Estate share ownership, Jenny's team can tell a seller what their house would list for and what House Junkies would pay off-market, from the same data, in the same conversation.",
      phone: "(559) 737-7363",
      email: "jennymadridre@gmail.com",
    },
    projectManager: {
      name: "Omar Ayon",
      title: "Project Manager, House Junkies Construction",
      bio: "Runs every renovation and ADU project for House Junkies Construction, the in-house licensed crew (CA LIC#1077593) that rehabs each property before resale instead of subcontracting the work out piece by piece. Also takes on outside construction and ADU clients across Tulare, Kings, Kern, and Fresno counties, handling design, permitting, and construction under one roof so projects move faster than starting from a blank page with a new architect. Manages both pre-approved ADU plans, already cleared for permitting in four counties, and fully custom builds sized to a property's specific lot and goals.",
      phone: "(559) 350-1804",
      email: null as string | null,
    },
  },

  parentOrganization: "Ulloa Investment Group",

  foundingYear: 2019, // BBB profile lists 7 years in business as of Sept 2026
  yearsInBusiness: 7,

  // Sourced, checkable numbers only. Every figure here should be traceable to a
  // real source (BBB profile, SFR Analytics report, GBP) - never round up or
  // invent a number that isn't backed by something a seller could verify.
  stats: {
    homesBought: "350+",
    yearsInBusiness: "7+",
    sfrAnalyticsRank: "#1",
    sfrAnalyticsVolume: "$16.0M",
    sfrAnalyticsDeals: "110",
    sfrAnalyticsSource: "SFR Analytics, Sept 2026",
    bbbRating: "A+",
  },

  social: {
    facebook: "https://www.facebook.com/housejunkiesinc/",
    instagram: "https://www.instagram.com/housejunkies.inc/",
    youtube: "https://www.youtube.com/@HouseJunkiesYT",
  },

  // Direct lines for Abel and Dominic, as used on the Partner page. Carried
  // over from the Base44 site at Dominic's request. Worth knowing: the SEO
  // audit flagged dominicmccllelland@gmail.com (three L's) as a likely typo
  // and 14dayscash@gmail.com as a personal-looking inbox for a CEO to list
  // publicly. Kept as-is here since that's what was asked for; worth a look
  // before this goes live if it wasn't intentional.
  directContacts: {
    ceo: { name: "Abel Ulloa", title: "CEO", phone: "(559) 310-5004", email: "14dayscash@gmail.com" },
    ops: { name: "Dominic McClelland", title: "Operations Manager", phone: "(559) 368-8956", email: "dominicmccllelland@gmail.com" },
  },

  officeLocations: [
    { label: "Main Office", street: "801 West Main Street", city: "Visalia", region: "CA", postalCode: "93291" },
    { label: "Legacy Real Estate", street: "1814 West Dorothea Ave", city: "Visalia", region: "CA", postalCode: "93277" },
    { label: "Porterville", street: "601 South Main Street", city: "Porterville", region: "CA", postalCode: "93257" },
    { label: "Tulare", street: "151 North N Street", city: "Tulare", region: "CA", postalCode: "93274" },
  ],

  sameAs: [
    "https://www.facebook.com/housejunkiesinc/",
    "https://www.instagram.com/housejunkies.inc/",
    "https://www.youtube.com/@HouseJunkiesYT",
    // TODO: add company LinkedIn page once created
    // TODO: add BBB profile link once website field is fixed
  ],
} as const;
