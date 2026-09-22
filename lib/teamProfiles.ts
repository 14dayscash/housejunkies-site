import { site } from "./site";

// Expanded, detailed content for each individual /team/[slug] page. Pulls
// the base facts (name, title, phone, email, bio) from site.ts and adds
// real additional detail specific to the detailed page, nothing invented.

export type TeamProfile = {
  slug: string;
  name: string;
  title: string;
  photo: string;
  bio: string;
  phone: string | null;
  email: string | null;
  sections: { heading: string; body: string }[];
};

export const teamProfiles: TeamProfile[] = [
  {
    slug: "abel-ulloa",
    name: site.people.ceo.name,
    title: site.people.ceo.title,
    photo: "/images/team/abel.png",
    bio: site.people.ceo.bio,
    phone: site.people.ceo.phone,
    email: site.people.ceo.email,
    sections: [
      {
        heading: "Role at House Junkies",
        body: "Founder and CEO of House Junkies, and partner in Ulloa Investment Group, the parent company that also owns House Junkies Construction and Legacy Real Estate. Abel oversees the group's acquisitions strategy and capital deployment across all three entities.",
      },
      {
        heading: "Licensing",
        body: "Licensed realtor with Legacy Real Estate, Lic #01957925, in addition to his role running the acquisitions side of the business.",
      },
      {
        heading: "Track Record",
        body: "Per SFR Analytics' September 2026 Visalia investor ranking, Abel is personally named on three of the market's top entities by transaction volume: Ulloa Investment Group (#1, $16.0M across 110 deals), One Stop Investments (#6, $4.06M), and Legacy Faith Homes (#12, $1.99M), a combined $22M+ in verified volume across 147 deals.",
      },
    ],
  },
  {
    slug: "dominic-mcclelland",
    name: site.people.ops.name,
    title: site.people.ops.title,
    photo: "/images/team/dominic.png",
    bio: site.people.ops.bio,
    phone: site.people.ops.phone,
    email: site.people.ops.email,
    sections: [
      {
        heading: "Role at House Junkies",
        body: "Runs day-to-day acquisitions and operations for House Junkies and is a partner at Ulloa Investment Group. His work sits inside the fully vertically integrated stack: acquisitions, private funding, construction, and brokerage, with no banks, no outside brokers, and no out-of-town contractors involved in a deal from acquisition to resale.",
      },
      {
        heading: "Probate Program",
        body: "Leads the company's probate program, working alongside outside counsel and a paralegal on the legal side of probate and inherited-property transactions, so sellers dealing with an estate get a process that's handled correctly, not just quickly.",
      },
      {
        heading: "Background",
        body: "Entrepreneurial background outside real estate too: co-founded Quick Cars California in 2023 and ran it as CEO through January 2026, pivoting an auto detailing shop into a subscription model paired with auto sales. Earlier roles included sales at Visalia GMC and a general contracting apprenticeship, background that carries directly into evaluating renovation scope on acquisitions today.",
      },
    ],
  },
  {
    slug: "jenny-madrid",
    name: site.people.broker.name,
    title: site.people.broker.title,
    photo: "/images/team/jenny.png",
    bio: site.people.broker.bio,
    phone: site.people.broker.phone,
    email: site.people.broker.email,
    sections: [
      {
        heading: "Role at House Junkies",
        body: `Broker of record for ${site.legacyRealEstate.name} (${site.licenses.brokerage}), the brokerage arm of Ulloa Investment Group. Legacy is the largest brokerage in Tulare County, with ${site.legacyRealEstate.agentCount} agents averaging ${site.legacyRealEstate.monthlySales} home sales and over ${site.legacyRealEstate.monthlyVolume} in closed volume per month.`,
      },
      {
        heading: "Personal License",
        body: "Personally licensed as DRE #01882650, in addition to serving as Broker of Record for the brokerage as a whole.",
      },
      {
        heading: "How This Helps Sellers",
        body: "Because House Junkies and Legacy Real Estate share ownership, Jenny's team can tell a seller what their house would realistically list for on the open market and what House Junkies would pay for it off-market, from the same data, in the same conversation, rather than only ever hearing the pitch for one path.",
      },
    ],
  },
  {
    slug: "omar-ayon",
    name: site.people.projectManager.name,
    title: site.people.projectManager.title,
    photo: "/images/team/omar-tools.png",
    bio: site.people.projectManager.bio,
    phone: site.people.projectManager.phone,
    email: site.people.projectManager.email,
    sections: [
      {
        heading: "Role at House Junkies",
        body: `Runs every renovation and ADU project for House Junkies Construction, the in-house licensed crew (${site.licenses.generalContractor}) that rehabs each property before resale instead of subcontracting the work out piece by piece.`,
      },
      {
        heading: "Outside Clients",
        body: "Also takes on outside construction and ADU clients across Tulare, Kings, Kern, and Fresno counties, handling design, permitting, and construction under one roof.",
      },
      {
        heading: "ADU Program",
        body: "Manages both pre-approved ADU plans, already cleared for permitting in four counties, and fully custom builds sized to a property's specific lot and goals, which is a large part of why House Junkies Construction can move faster than starting from a blank page with a new architect.",
      },
    ],
  },
];

export function getTeamProfile(slug: string) {
  return teamProfiles.find((p) => p.slug === slug);
}
