// Real, sourced local facts used by the city + situation combo pages
// (/we-buy-houses/[city]/[situation]). Every entry here came from an official
// city or county website, or a named news source, checked in October 2026.
// If a city has no entry, the pages fall back to plain, true, general wording
// instead of inventing a department or phone number. Add facts here, not in
// the page templates.

export type Source = { label: string; url: string };

export type CountyFacts = {
  court: string; // where probate for a resident is filed
  recorder: string; // where deeds and foreclosure notices are recorded
  codeAgency?: string; // who handles code problems outside city limits
  taxSale?: string; // extra, sourced detail about the county's tax-defaulted sale
  sources: Source[];
};

export const countyFacts: Record<string, CountyFacts> = {
  "Tulare County": {
    court: "Tulare County Superior Court",
    recorder: "Tulare County Clerk-Recorder at 5951 S. Mooney Blvd. in Visalia",
    codeAgency: "Tulare County RMA Code Compliance at (559) 624-7060",
    taxSale:
      "Tulare County holds its tax-defaulted property auction online through GovEase. In 2026 the main auction was March 3, with a second sale on May 19, and owners had until 5:00 p.m. on May 18 to pay what they owed and keep the property.",
    sources: [
      { label: "Tulare County Clerk-Recorder", url: "https://www.tularecounty.ca.gov/assessorclerk-recorder/clerk-recorder" },
      { label: "Tulare County RMA Code Compliance", url: "https://tularecounty.ca.gov/rma/code/substandard-housing" },
      { label: "Tulare County 2026 Tax Auction", url: "https://tularecounty.ca.gov/auditor/2026-tax-auction" },
    ],
  },
  "Fresno County": {
    court: "Fresno County Superior Court",
    recorder: "Fresno County Recorder",
    codeAgency: "Fresno County Code Enforcement, part of Public Works and Planning, at (559) 600-4550",
    sources: [
      { label: "Fresno County Code Enforcement", url: "https://fresnocountyca.gov/Departments/Public-Works-and-Planning/code-enforcement" },
      { label: "Fresno County Recorder", url: "https://www.fresnocountyca.gov/Departments/Recorder/Recorded-Documents" },
    ],
  },
  "Kern County": {
    court: "Kern County Superior Court",
    recorder: "Kern County Recorder",
    codeAgency: "Kern County Public Works Code Compliance",
    sources: [{ label: "Kern County Public Works Code Compliance", url: "https://www.kernpublicworks.com/services/development/code-compliance" }],
  },
  "Kings County": {
    court: "Kings County Superior Court",
    recorder: "Kings County Clerk-Recorder",
    sources: [],
  },
  "Merced County": {
    court: "Merced County Superior Court",
    recorder: "Merced County Recorder",
    sources: [],
  },
  "Madera County": {
    court: "Madera County Superior Court",
    recorder: "Madera County Recorder",
    sources: [],
  },
};

export type CityCodeFacts = {
  agency: string; // who handles code enforcement inside city limits
  phone?: string;
  details: string; // one or two plain sentences, sourced
  source: Source;
};

export const cityCodeFacts: Record<string, CityCodeFacts> = {
  visalia: {
    agency: "the City of Visalia's Neighborhood Preservation Division, which most people call Code Enforcement",
    phone: "(559) 713-4534",
    details:
      "It handles construction done without permits, substandard living conditions, buildings that are unsafe to live in, abandoned or broken-down vehicles, and pools that are not secured or kept up. In 2026 the City changed its rules so the time you get to fix a problem depends on how serious it is, and owners get 60 working days to appeal a notice of correction.",
    source: { label: "City of Visalia Code Enforcement", url: "https://www.visalia.gov/226" },
  },
  tulare: {
    agency: "the City of Tulare's Code Enforcement team, part of General Services",
    phone: "(559) 687-2288",
    details:
      "Its main job is nuisance abatement: broken-down vehicles on private property, tall weeds, and conditions that hurt a neighborhood's look or safety. The City says repeat or serious violators can face fines and penalties.",
    source: { label: "City of Tulare Code Enforcement", url: "https://www.tulare.ca.gov/government/departments/office-of-safety-compliance-facilities/code-enforcement" },
  },
  porterville: {
    agency: "the City of Porterville's Community Development Department",
    details:
      "The Porterville Recorder reported that the City gets around 3,000 code enforcement complaints a year, and that in one three-month stretch about 13% of complaints ended in an administrative citation.",
    source: { label: "Porterville Recorder", url: "https://www.pressreader.com/usa/porterville-recorder/20171109/281547996170281" },
  },
  fresno: {
    agency: "the City of Fresno's Code Enforcement team, which works out of the City Attorney's Office",
    phone: "(559) 621-8400",
    details:
      "It handles blight, substandard and vacant buildings, work done without permits, junk vehicles, and overgrown weeds. An inspector has to see the problem in person, owners usually get a notice first, and if the problem is not fixed the City can move to fines, citations, or a civil injunction.",
    source: { label: "City of Fresno Code Enforcement", url: "https://www.fresno.gov/services/code-enforcement/" },
  },
  bakersfield: {
    agency: "the City of Bakersfield's Code Enforcement team",
    phone: "(661) 326-3712",
    details:
      "Outside city limits, Kern County Public Works Code Compliance handles abandoned vehicles, building and housing problems, weeds, junk, and illegal dumping.",
    source: { label: "Kern County Public Works", url: "https://www.kernpublicworks.com/services/development/code-compliance" },
  },
  hanford: {
    agency: "the Code Compliance Section of the City of Hanford's Community Development Department",
    phone: "(559) 585-2633",
    details:
      "Complaints are ranked by how big a health or safety risk they are, and the City says first inspections usually happen within two to five working days of a complaint.",
    source: { label: "City of Hanford Code Compliance FAQ", url: "https://hanfordca.gov/m/faq?cat=27" },
  },
  selma: {
    agency: "the City of Selma's Code Enforcement team, part of Community Development",
    phone: "(559) 891-2207",
    details:
      "Its list includes abandoned or foreclosed homes, building and property complaints, and abandoned vehicles.",
    source: { label: "City of Selma Code Enforcement", url: "https://cityofselma.com/departments/community_development/code_enforcement.php" },
  },
  dinuba: {
    agency: "the Code Enforcement division of the City of Dinuba's Planning and Development department",
    phone: "(559) 591-5921",
    details:
      "It enforces city, zoning, and building codes, including substandard housing and abandoned vehicles. Dinuba also makes homeowners responsible for keeping up the alley behind their house.",
    source: { label: "City of Dinuba Code Enforcement", url: "https://2023.dinuba.org/code-enforcement" },
  },
  merced: {
    agency: "the City of Merced's Code Enforcement Program",
    phone: "(209) 385-6237",
    details:
      "It handles houses and buildings that are dangerous, substandard, blighted, or vacant, including problems like unsafe wiring or plumbing, no heat or running water, and pest infestations.",
    source: { label: "City of Merced Code Enforcement", url: "https://cityofmerced.org/departments/police/code-enforcement" },
  },
  madera: {
    agency: "the City of Madera's Code Enforcement office at 330 S. C St.",
    phone: "(559) 661-5114",
    details:
      "It handles upkeep of foreclosed houses, vacant buildings and weedy vacant lots, and the City's rental registration program, which includes routine inspections of rental properties.",
    source: { label: "City of Madera Code Enforcement", url: "https://madera.gov/home/departments/code-enforcement" },
  },
  lemoore: {
    agency: "the Lemoore Police Department's Code Enforcement unit",
    phone: "(559) 924-9574",
    details: "It handles dumped junk and trash, abandoned or broken-down vehicles, and zoning violations.",
    source: { label: "City of Lemoore Code Enforcement", url: "https://lemoore.com/code-enforcement/" },
  },
};
