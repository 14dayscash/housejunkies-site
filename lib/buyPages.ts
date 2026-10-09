// Buyer-side pages: people searching for property to BUY in Visalia (building,
// land, investment property). House Junkies and Legacy Real Estate sell
// property too, so these pages capture that demand. No fake listings: current
// availability changes, so every page routes to a direct inquiry.

export type BuyPage = {
  slug: string;
  title: string; // H1
  metaTitle: string;
  metaDescription: string;
  summary: string;
  sections: { heading: string; paragraphs: string[] }[];
  quickFacts: string[];
  faqs: { question: string; answer: string }[];
};

export const buyPages: BuyPage[] = [
  {
    slug: "investment-property",
    title: "Investment Property for Sale in Visalia, CA",
    metaTitle: "Investment Property for Sale in Visalia, CA",
    metaDescription:
      "Looking for investment property in Visalia? Buy from a local group that owns, renovates, and sells its own properties, backed by Legacy Real Estate. Call (559) 368-8956.",
    summary:
      "House Junkies buys, renovates, and resells homes across the Central Valley, so we are always moving investment property. If you are looking for a flip, a rental, or a value-add deal in Visalia and Tulare County, tell us what you want and we will tell you what we have, including properties that never reach the MLS.",
    sections: [
      {
        heading: "Investment Property From Local Operators",
        paragraphs: [
          "We are not a listing aggregator. House Junkies has bought, renovated, and resold 350+ homes, and according to SFR Analytics we are the #1 investment group in Visalia by transaction volume. When you buy investment property from us, you are buying from the people who underwrote and renovated it, and who can tell you exactly what was done and what it costs to hold.",
          "Investors who work with us usually want one of three things: a finished, renovated house ready to rent, a property that still needs work so they can add value themselves, or a bulk of smaller deals over time. Tell us which one you are after and your price range, and we will match you as inventory comes through.",
        ],
      },
      {
        heading: "How Buying From Us Works",
        paragraphs: [
          "Because Legacy Real Estate, our brokerage, is part of the same group, the transaction runs through licensed professionals from the first conversation to escrow. You can bring your own agent, your own lender, or pay cash. We will walk you through the property, the repair history, and the numbers.",
        ],
      },
    ],
    quickFacts: [
      "Investment property in the Central Valley is commonly bought for buy-and-hold rentals, fix-and-flip, or long-term appreciation.",
      "Cash buyers can often close faster and negotiate better terms than financed buyers on the same property.",
      "Off-market deals are never posted publicly, so the best way to see them is to be on a local operator's buyer list.",
      "A property that needs renovation can often be bought below the price of a finished house, which is where flip and value-add margins come from.",
    ],
    faqs: [
      { question: "Do you have investment properties for sale right now?", answer: "Inventory changes often, and not everything is listed publicly. Send us your criteria or call (559) 368-8956 and we will tell you what is available or coming soon." },
      { question: "Do you sell off-market properties?", answer: "Yes. Many of the properties we buy are off-market, and we can share what we plan to resell with buyers who tell us what they are looking for." },
      { question: "Can I use my own agent?", answer: "Yes. You can bring your own agent, or work with Legacy Real Estate, the brokerage in our group." },
    ],
  },
  {
    slug: "commercial-buildings",
    title: "Commercial Buildings for Sale in Visalia, CA",
    metaTitle: "Commercial Buildings & Property for Sale in Visalia, CA",
    metaDescription:
      "Searching for a building or commercial property for sale in Visalia? Talk to a local investment group and brokerage that buys and sells property every week. Call (559) 368-8956.",
    summary:
      "If you are searching for a building for sale in Visalia, whether retail, office, mixed-use, or multifamily, we can help. Our group invests in Central Valley real estate, and our brokerage, Legacy Real Estate, works with commercial and residential buyers and sellers across Tulare County.",
    sections: [
      {
        heading: "Buildings and Commercial Property in Visalia",
        paragraphs: [
          "People searching for buildings in Visalia are usually looking for one of a few things: a storefront or small retail space for their own business, an office, a mixed-use building with an apartment above, or a multifamily property as an investment. The right answer depends on zoning, location, and what you plan to do with the space.",
          "We can talk through what is available, what is coming to market, and what a building is realistically worth. Because we invest in and renovate property ourselves, we can also give you an honest read on what condition a building is in and what repairs to expect before you commit.",
        ],
      },
      {
        heading: "Selling a Commercial Building Instead?",
        paragraphs: [
          "If you own a building in Visalia or Tulare County and want to sell it, tell us about the property and we will let you know whether it is a fit for us to buy or whether listing it with our brokerage makes more sense.",
        ],
      },
    ],
    quickFacts: [
      "Commercial real estate is priced and financed differently from residential, with lenders focused on income and use rather than only the property itself.",
      "Zoning controls what a building can be used for, so always confirm it with the City of Visalia before buying for a specific business use.",
      "Mixed-use and small multifamily buildings are popular first commercial purchases because the rent can help cover the cost of ownership.",
      "A cash purchase can close much faster than a financed commercial deal.",
    ],
    faqs: [
      { question: "Do you list commercial buildings?", answer: "Availability changes frequently. Call (559) 368-8956 or send your criteria and we will let you know what we have or what is coming up." },
      { question: "Do you buy commercial property too?", answer: "Our core business is residential, but send us the details on a building or small commercial or multifamily property and we will tell you whether it is a fit, or whether listing with our brokerage makes more sense." },
      { question: "Can you help me understand zoning for a building?", answer: "We can point you in the right direction, but zoning questions should always be confirmed directly with the City of Visalia planning department before you buy." },
    ],
  },
  {
    slug: "vacant-land",
    title: "Land for Sale in Visalia & Tulare County, CA",
    metaTitle: "Land for Sale in Visalia & Tulare County, CA",
    metaDescription:
      "Looking for vacant land or a lot for sale in Visalia or Tulare County? Talk to a local group that builds, buys, and sells. Call (559) 368-8956.",
    summary:
      "Whether you want a residential lot to build on, acreage in Tulare County, or a parcel to hold as an investment, we can talk through what is out there. We have a licensed general contractor and a brokerage in the same group, so we understand both the land and what it takes to build on it.",
    sections: [
      {
        heading: "Buying Land in Visalia and Tulare County",
        paragraphs: [
          "Land is different from a house. Before you buy, you want to know about access, utilities, zoning, flood zones, and whether the parcel can actually be built on. These are the questions we help buyers think through, because our construction company, House Junkies Construction, builds and renovates in this market.",
          "If you are planning to build, tell us about the project and we can help you think through both sides: finding the right parcel and understanding what the build will take.",
        ],
      },
      {
        heading: "Have Land to Sell?",
        paragraphs: [
          "If you own vacant land or a lot and want to sell, reach out. We buy property in Tulare County and the surrounding area, and can often move faster than a traditional listing.",
        ],
      },
    ],
    quickFacts: [
      "Before buying land, confirm zoning, utility access, road access, and flood zone status with the county or city.",
      "Land loans usually require a larger down payment than home loans, which is why many land purchases are cash.",
      "Rural parcels may need a well and septic system, which add cost and time before you can build.",
      "Impact fees and permit costs vary by jurisdiction and can be a meaningful part of the build budget.",
    ],
    faqs: [
      { question: "Do you have land for sale?", answer: "Inventory changes. Call (559) 368-8956 or send what you are looking for, and we will tell you what is available or coming up." },
      { question: "Can you help me build on the land after I buy it?", answer: "Our group includes House Junkies Construction, a licensed general contractor. Ask us about your project and we will tell you what we can take on." },
      { question: "Do you buy vacant land?", answer: "Yes, we look at land and lots in Tulare County and the surrounding area. Tell us about the parcel and we will get back to you." },
    ],
  },
];

export function getBuyPage(slug: string): BuyPage | undefined {
  return buyPages.find((p) => p.slug === slug);
}
