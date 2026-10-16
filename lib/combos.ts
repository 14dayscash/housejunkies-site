// City + situation combo pages: /we-buy-houses/[city]/[situation].
// Only the top cities get these, and only for the situations people actually
// search. Each page mixes three layers so no two read the same:
//   1. the situation basics (shared on purpose, the rules are the same statewide)
//   2. real local facts from lib/localFacts.ts (county court, recorder, the
//      city's own code enforcement office) and lib/cities.ts (market note,
//      neighborhoods, zip codes)
//   3. real House Junkies purchases in that city from lib/properties.ts
// Paragraphs may contain internal links written as [text](/path).

import { cities, type CityData } from "./cities";
import { countyFacts, cityCodeFacts, type Source } from "./localFacts";
import { propertiesIn } from "./properties";

export const comboCitySlugs = [
  "visalia", "tulare", "porterville", "fresno", "bakersfield", "hanford", "clovis", "dinuba",
  "selma", "exeter", "lindsay", "merced", "madera", "lemoore", "delano",
] as const;

export const comboSituationSlugs = [
  "probate", "foreclosure", "as-is", "fire-damage", "with-tenants", "code-violations",
] as const;

export type ComboSituation = (typeof comboSituationSlugs)[number];

export const comboLabels: Record<ComboSituation, string> = {
  probate: "Probate & Inherited",
  foreclosure: "Foreclosure",
  "as-is": "As-Is",
  "fire-damage": "Fire Damage",
  "with-tenants": "Rental With Tenants",
  "code-violations": "Code Violations",
};

export function isComboCity(slug: string) {
  return (comboCitySlugs as readonly string[]).includes(slug);
}
export function isComboSituation(slug: string): slug is ComboSituation {
  return (comboSituationSlugs as readonly string[]).includes(slug);
}

export function comboParams() {
  return comboCitySlugs.flatMap((city) => comboSituationSlugs.map((situation) => ({ city, situation })));
}

export type ComboContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  localHeading: string;
  local: string[];
  faqs: { question: string; answer: string }[];
  sources: Source[];
};

const rehabTiers =
  "about $35 per square foot for cosmetic work, $45 for heavier cosmetic work, $65 for a full rehab, $90 for a full rehab with fire damage, and up to $135 per square foot for a badly burned house";

function areaLine(c: CityData) {
  const hoods = c.neighborhoods.length ? c.neighborhoods.join(", ") : "";
  const zips = c.zipCodes.length ? c.zipCodes.join(", ") : "";
  if (hoods && zips) return `including ${hoods}, in zip codes ${zips}`;
  if (zips) return `in zip codes ${zips}`;
  return "";
}

function codeSentence(c: CityData) {
  const f = cityCodeFacts[c.slug];
  if (!f) return `Inside ${c.name} city limits, code problems are handled by the City of ${c.name}.`;
  return `Inside ${c.name} city limits, code problems go to ${f.agency}${f.phone ? `, reachable at ${f.phone}` : ""}. ${f.details}`;
}

function countyCodeSentence(c: CityData) {
  const k = countyFacts[c.county];
  if (!k?.codeAgency) return `Just outside city limits, ${c.county} handles code problems instead of the City.`;
  return `Just outside city limits, it is ${k.codeAgency} that handles code problems instead of the City.`;
}

const factIndex: Record<ComboSituation, number> = {
  probate: 0, foreclosure: 1, "as-is": 2, "fire-damage": 3, "with-tenants": 4, "code-violations": 0,
};

function snapshot(c: CityData, situation: ComboSituation) {
  const fact = c.quickFacts.length ? c.quickFacts[factIndex[situation] % c.quickFacts.length] : "";
  const bought = propertiesIn(c.name);
  const buys = bought.length
    ? ` House Junkies has bought ${bought.length === 1 ? "a house" : `${bought.length} houses`} in ${c.name} recently, including ${bought
        .slice(0, 2)
        .map((p) => p.street)
        .join(" and ")}, and you can see what we paid below.`
    : "";
  return `${fact}${buys}`.trim();
}

export function buildCombo(citySlug: string, situation: ComboSituation): ComboContent | null {
  const c = cities.find((x) => x.slug === citySlug);
  if (!c) return null;
  const snap = snapshot(c, situation);
  const k = countyFacts[c.county];
  const court = k?.court ?? `${c.county} Superior Court`;
  const recorder = k?.recorder ?? `${c.county} Recorder`;
  const code = cityCodeFacts[c.slug];
  const sources: Source[] = [...(k?.sources ?? [])];
  if (code && (situation === "code-violations" || situation === "fire-damage" || situation === "as-is" || situation === "with-tenants")) {
    sources.unshift(code.source);
  }
  const area = areaLine(c);
  const city = c.name;
  const countyLink = `/counties/${c.county.toLowerCase().replace(/\s+/g, "-")}`;

  switch (situation) {
    case "probate":
      return {
        metaTitle: `Sell an Inherited or Probate House in ${city}, CA`,
        metaDescription: `Inherited a house in ${city}? House Junkies buys probate and inherited houses as-is for cash, even full of belongings. Probate in ${c.county} explained.`,
        h1: `Sell a Probate or Inherited House in ${city}, CA`,
        intro: [
          `If you inherited a house in ${city}, or you are the executor of an estate that owns one, House Junkies can buy it as-is for cash, with the belongings still inside if that is easier. We are based in Visalia, we buy all over ${c.county}, and we have bought, renovated, and resold 350+ homes.`,
          c.marketNote,
          snap,
        ].filter(Boolean),
        localHeading: `How Probate Works for a ${city} House`,
        local: [
          `Because ${city} is in ${c.county}, a probate case for someone who lived there is filed with the ${court}. Formal probate in California usually takes 12 to 18 months. Some families qualify for a faster path: a primary residence worth up to $750,000 may be able to go through a shorter court petition instead of full probate.`,
          `Once the executor or administrator has the court's authority to sell, the deed and the sale paperwork are recorded with the ${recorder}. Any mortgage, unpaid property taxes, and liens on the house are paid off out of the sale at closing, and what is left goes to the estate.`,
          `If you are an heir and the estate has not closed yet, you may be able to assign your share for cash now instead of waiting it out. We work with a paralegal and an attorney on the legal side, and you are always welcome to have your own attorney look over anything before you sign. Read our full [probate guide](/sell-your-house/probate) and our page on [selling an inherited house](/sell-your-house/inherited-property).`,
          `We buy inherited houses all over ${city}${area ? `, ${area}` : ""}, and across [${c.county}](${countyLink}).`,
        ],
        faqs: [
          { question: `Where is probate filed for a house in ${city}?`, answer: `Probate is filed in the Superior Court of the county where the person lived. For ${city}, that is the ${court}.` },
          { question: `Can I sell an inherited house in ${city} before probate is finished?`, answer: `Sometimes. If the estate qualifies for a shorter process, or if you are an heir who can assign your share, a sale can happen sooner. We will walk you through which path fits your situation.` },
          { question: "Do I have to clean out the house before selling?", answer: "No. Take what you want to keep and leave the rest. House Junkies handles the cleanout after closing." },
          { question: `How fast can House Junkies close on an inherited ${city} house?`, answer: "Once the person signing has legal authority to sell, we can usually close in one to two weeks, depending on title." },
        ],
        sources,
      };

    case "foreclosure":
      return {
        metaTitle: `Facing Foreclosure in ${city}, CA? Sell Before the Sale`,
        metaDescription: `Behind on payments on a ${city} house? See how foreclosure works in ${c.county} and how House Junkies can buy your house for cash before the sale date.`,
        h1: `Facing Foreclosure in ${city}, CA? Your Options`,
        intro: [
          `If you are behind on payments on a ${city} house, you likely have more time and more options than you think. House Junkies, a Visalia company, can buy your house for cash before the sale date. As long as the sale covers what you owe, your loan and the past-due amount are paid off at closing, the foreclosure stops, and any equity left over goes to you.`,
          c.marketNote,
          snap,
        ].filter(Boolean),
        localHeading: `Foreclosure in ${city} and ${c.county}`,
        local: [
          `Most California foreclosures run through a trustee, not a courtroom. For a ${city} house, the Notice of Default and later the Notice of Trustee Sale are recorded with the ${recorder}, which makes them public record. That is why many ${city} homeowners start getting letters and calls from investors right after a notice is filed. The realistic minimum from a first missed payment to an actual sale is around 230 days, and you can stop the process by catching up on the past-due amount up until 5 business days before the sale.`,
          `Unpaid property taxes are a separate risk. If they go unpaid long enough, the ${c.county} Tax Collector can sell the property at a tax-defaulted property auction. ${k?.taxSale ?? ""}`.trim(),
          `Help with the process itself is free. A HUD-approved housing counselor can walk you through your options at no cost, and anyone who asks you to pay upfront for foreclosure help is breaking California law. Our full [California foreclosure guide](/sell-your-house/foreclosure) covers all 5 options, including the 2025 law that lets a signed listing agreement push back a sale date. If back taxes or other liens are part of it, see [selling a house with liens](/sell-your-house/liens).`,
          `We buy houses facing foreclosure all over ${city}${area ? `, ${area}` : ""}, and across [${c.county}](${countyLink}).`,
        ],
        faqs: [
          { question: `How long does foreclosure take on a ${city} house?`, answer: "California foreclosures usually take at least about 230 days from the first missed payment to a sale, and often longer. That is time you can use." },
          { question: `Is my foreclosure public record in ${c.county}?`, answer: `Yes. The Notice of Default and the Notice of Trustee Sale are recorded with the ${recorder}, so anyone can look them up.` },
          { question: `What if I owe more on my ${city} house than it is worth?`, answer: "Then the lender has to agree to take less, which is called a short sale. Call us and we will tell you honestly whether a cash sale can work." },
          { question: "How fast can House Junkies close before my sale date?", answer: "Often within one to two weeks, depending on title and how fast your lender sends the payoff. The sooner you call, the more room there is." },
        ],
        sources,
      };

    case "as-is":
      return {
        metaTitle: `Sell Your House As-Is in ${city}, CA | No Repairs`,
        metaDescription: `Sell your ${city} house as-is for cash. No repairs, no cleaning, no showings. House Junkies buys fixer-uppers and houses that need a full rehab.`,
        h1: `Sell Your House As-Is in ${city}, CA`,
        intro: [
          `No repairs, no cleaning, no showings. House Junkies buys ${city} houses as-is, from small fixer-uppers to houses that need a full gut, and our own licensed crew, House Junkies Construction (CA LIC#1077593), does the work after we close.`,
          c.marketNote,
          snap,
        ].filter(Boolean),
        localHeading: `Selling an As-Is House in ${city}`,
        local: [
          `We buy as-is houses all over ${city}${area ? `, ${area}` : ""}. Population is about ${c.population}, and the city sits in ${c.county}, where we have been buying for years.`,
          `Many ${city} buyers use FHA or VA loans, and those loans usually cannot be used on a house that does not meet the lender's condition standards. That is why as-is houses mostly sell to cash buyers. California still requires sellers to share known problems with the house, even in an as-is sale.`,
          `We price repairs from real numbers, because our crew does the work: ${rehabTiers}. See exactly how that turns into a number on [how we calculate your offer](/how-we-calculate-your-offer), and compare it with listing on [cash offer vs. listing](/compare).`,
          `${codeSentence(c)} If your house has open city violations, see [selling a house with code violations](/sell-your-house/code-violations).`,
        ],
        faqs: [
          { question: `Will you buy my ${city} house if it needs a new roof or foundation work?`, answer: "Yes. Big repairs are exactly what we price in. Our own licensed crew does the work after we close." },
          { question: "Do I have to clean the house first?", answer: "No. Leave what you do not want, and we handle the cleanout after closing." },
          { question: "Do I still have to disclose problems in an as-is sale?", answer: "Yes. California generally requires sellers to share known problems with the house, even when it is sold as-is." },
          { question: `How do you figure out your offer on a ${city} house?`, answer: `We start with what the house would sell for fixed up in ${city}, subtract our real repair cost, holding costs, and closing costs, and show you the numbers.` },
        ],
        sources,
      };

    case "fire-damage":
      return {
        metaTitle: `Sell a Fire-Damaged House in ${city}, CA`,
        metaDescription: `Had a house fire in ${city}? House Junkies buys fire-damaged houses as-is, with or without an open insurance claim. Our own licensed crew does the rebuild.`,
        h1: `Sell a Fire-Damaged House in ${city}, CA`,
        intro: [
          `A house fire changes what a house is worth and what it costs to fix. House Junkies buys fire-damaged houses in ${city} as-is, with or without an open insurance claim, and our own licensed crew, House Junkies Construction (CA LIC#1077593), does the rebuild after we close.`,
          c.marketNote,
          snap,
        ].filter(Boolean),
        localHeading: `After a House Fire in ${city}`,
        local: [
          c.slug === "visalia"
            ? "Rebuilding a burned house in Visalia means going through the City's Permit Counter at City Hall East, 315 E. Acequia Ave., (559) 713-4444, and the City only issues permits to the owner or a state-licensed contractor."
            : `Rebuilding a burned house in ${city} takes permits from the City of ${city}, and the work has to be done by the owner or a state-licensed contractor.`,
          "All new construction and remodeling in California now has to meet the 2025 California Building Standards Code, which took effect January 1, 2026. Those code upgrades are a big reason insurance money so often falls short of what a full rebuild really costs.",
          `A burned house that sits open or falling apart can also draw code complaints. ${codeSentence(c)} ${countyCodeSentence(c)}`,
          `Fire rebuilds run our crew roughly $90 per square foot, and up to $135 per square foot for a badly burned house, before permits, holding costs, and closing costs. That is how we can make a real offer instead of walking away. See [how we calculate your offer](/how-we-calculate-your-offer), or read our full page on [selling a fire-damaged house](/sell-your-house/fire-damage).`,
        ],
        faqs: [
          { question: `Can I sell my ${city} house before the insurance claim is settled?`, answer: "Yes. We can factor an open claim into the offer, or buy the house as-is if you would rather not deal with the claim at all." },
          { question: `Do I need permits to rebuild after a fire in ${city}?`, answer: `Yes. Rebuilding needs permits from the City of ${city}. If you sell to House Junkies, our licensed crew handles the permits.` },
          { question: "Do I have to clean up the fire debris before selling?", answer: "No. We buy the house as-is, debris and all, and handle the cleanup after closing." },
          { question: "Can I sell a house that was red-tagged after the fire?", answer: "Yes. A red tag means nobody can live there until it is fixed, but you can still sell it to us." },
        ],
        sources,
      };

    case "with-tenants":
      return {
        metaTitle: `Sell a Rental With Tenants in ${city}, CA`,
        metaDescription: `Tired of being a landlord in ${city}? House Junkies buys rentals, duplexes, and small multi-family properties with tenants in place, as-is, for cash.`,
        h1: `Sell a Rental Property With Tenants in ${city}, CA`,
        intro: [
          `Tired of being a landlord in ${city}? House Junkies buys occupied rentals, from single family houses to duplexes and small multi-family buildings, with the tenants still in place. No evictions, no repairs, and no showings that disrupt your tenants for months.`,
          c.marketNote,
          snap,
        ].filter(Boolean),
        localHeading: `Selling an Occupied Rental in ${city}`,
        local: [
          `A sale does not end a lease. In ${city}, like everywhere in California, the buyer takes over as the landlord and the tenant's rights stay the same. Under California's Tenant Protection Act, many tenants who have lived in a unit for 12 months or more can only be asked to leave for a reason the law allows, and some no-fault move-outs require the owner to pay relocation help.`,
          c.slug === "madera"
            ? `Madera also runs a rental registration program, and registered rentals get routine inspections from the City's Code Enforcement office at (559) 661-5114. An older rental that would not pass an inspection is a common reason Madera landlords decide to sell.`
            : "California also generally requires written notice before you enter an occupied rental, including to show it to buyers, which is one more reason listing an occupied rental is slow and hard.",
          `Because we buy as-is with tenants in place, none of that has to happen before you sell. After closing, we either take over as landlord or work out a fair, voluntary move-out with the tenant. Read more on [selling a rental with tenants](/sell-your-house/with-tenants), or see how we [buy houses in ${city}](/we-buy-houses/${c.slug}).`,
        ],
        faqs: [
          { question: `Do I need to evict my ${city} tenant before selling?`, answer: "No. We buy occupied rentals and take over the situation after closing." },
          { question: "Can I sell if my tenant is behind on rent?", answer: "Yes. Problem tenants and unpaid rent are common reasons landlords sell to us. We price the situation in." },
          { question: `Do you buy duplexes and small apartment buildings in ${city}?`, answer: `Yes. We buy single family rentals, duplexes, and small multi-family properties across ${city} and ${c.county}.` },
          { question: "Will my tenant have to move right after the sale?", answer: "Not automatically. The lease carries over to us, and any move-out follows California law and the terms of the lease." },
        ],
        sources,
      };

    case "code-violations":
      return {
        metaTitle: `Sell a House With Code Violations in ${city}, CA`,
        metaDescription: `Got a code violation or city notice on a ${city} house? House Junkies buys houses with open violations as-is. See who handles code enforcement in ${city}.`,
        h1: `Sell a House With Code Violations in ${city}, CA`,
        intro: [
          `Open code violations make a house hard to finance and hard to insure, which scares off most buyers. House Junkies buys ${city} houses with open violations, red tags, and unpaid code fees as-is, and handles the city process ourselves after we close.`,
          c.marketNote,
          snap,
        ].filter(Boolean),
        localHeading: `Code Enforcement in ${city}`,
        local: [
          codeSentence(c),
          countyCodeSentence(c),
          "Code enforcement costs that go unpaid can turn into a lien on the property. A lien does not stop a sale. It gets paid off out of the sale at closing, through escrow, before you get your money. Our page on [selling a house with liens](/sell-your-house/liens) explains how that works.",
          `Our licensed crew, House Junkies Construction (CA LIC#1077593), pulls permits and works through city processes like these on every house we renovate. That is why we can buy a ${city} house with open violations without asking you to fix anything first. See our full page on [selling a house with code violations](/sell-your-house/code-violations).`,
        ],
        faqs: [
          {
            question: `Who handles code enforcement in ${city}?`,
            answer: code
              ? `Inside city limits, it is ${code.agency}${code.phone ? ` at ${code.phone}` : ""}. Outside city limits, ${c.county} handles it.`
              : `Inside city limits, the City of ${city} handles it. Outside city limits, ${c.county} does.`,
          },
          { question: "Do I have to fix the violations before I sell?", answer: "No. We buy houses with open violations as-is and price the repairs into our offer." },
          { question: "What if the city already put a lien on my house?", answer: "You can still sell. The lien is paid off out of the sale at closing through escrow." },
          { question: `Can I sell a red-tagged house in ${city}?`, answer: "Yes. A red tag means nobody can live there until it is fixed, but you can still sell it to us as-is." },
        ],
        sources,
      };
  }
}
