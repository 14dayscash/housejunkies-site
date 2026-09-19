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

  // Each entity in the group has its own real address — the old Base44 site
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
    monthlySales: "80+",
    monthlyVolume: "$30,000,000+",
  },

  geo: {
    latitude: 36.3298857,
    longitude: -119.3001446,
  },

  hours: {
    weekday: "8:00 AM - 5:00 PM",
    weekend: "By appointment",
  },

  licenses: {
    generalContractor: "CA GC Lic #1077593",
    brokerage: "DRE #02165291",
  },

  people: {
    ceo: { name: "Abel Ulloa", title: "CEO", bio: "Leads House Junkies Inc. and Ulloa Investment Group. Principal on the BBB file since the company's founding in 2019." },
    ops: { name: "Dominic McClelland", title: "Operations Manager", bio: "Runs day-to-day acquisitions and operations. Partner at Ulloa Investment Group, currently pursuing a Business Administration degree at College of the Sequoias." },
    broker: { name: "Jenny Madrid", title: "Broker", bio: "Broker of record for the House Junkies brokerage arm, DRE #02165291." },
    projectManager: { name: "Omar Ayon", title: "Project Manager, House Junkies Construction", bio: "Runs renovation projects for House Junkies Construction, the in-house licensed crew that rehabs every property before resale." },
  },

  parentOrganization: "Ulloa Investment Group",

  foundingYear: 2019, // BBB profile lists 7 years in business as of Sept 2026
  yearsInBusiness: 7,

  // Sourced, checkable numbers only. Every figure here should be traceable to a
  // real source (BBB profile, SFR Analytics report, GBP) — never round up or
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

  sameAs: [
    "https://www.facebook.com/housejunkiesinc/",
    "https://www.instagram.com/housejunkies.inc/", // TODO: confirm this is the one handle you're keeping
    "https://www.youtube.com/@HouseJunkiesYT",
    // TODO: add company LinkedIn page once created
    // TODO: add BBB profile link once website field is fixed
  ],
} as const;
