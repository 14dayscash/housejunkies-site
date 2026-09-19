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
    ceo: { name: "Abel Ulloa", title: "CEO" },
    ops: { name: "Dominic McClelland", title: "Operations Manager" },
  },

  parentOrganization: "Ulloa Investment Group",

  sameAs: [
    "https://www.facebook.com/housejunkiesinc/",
    "https://www.instagram.com/housejunkies.inc/", // TODO: confirm this is the one handle you're keeping
    "https://www.youtube.com/@HouseJunkiesYT",
    // TODO: add company LinkedIn page once created
    // TODO: add BBB profile link once website field is fixed
  ],
} as const;
