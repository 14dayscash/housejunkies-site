// Deal calculator math for the internal /deals tool.
// Every number the wizard, results screen and dashboard show comes from here.

export const DEAL_TYPES = ["flip", "rental", "multifamily", "land", "commercial"] as const;
export type DealType = (typeof DEAL_TYPES)[number];
// The four choices on the Add Deal screen ("commercial" is kept for older rows).
export const PICKER_TYPES: DealType[] = ["flip", "rental", "multifamily", "land"];
export const TYPE_LABELS: Record<DealType, string> = {
  flip: "Flip",
  rental: "Rental",
  multifamily: "Multifamily",
  land: "Land",
  commercial: "Commercial",
};

export const DEAL_STATUSES = ["New Lead", "Contacted", "Offer Sent", "Contract Signed", "Escrow Opened", "Closed"] as const;
export type DealStatus = (typeof DEAL_STATUSES)[number];

// Rehab cost per square foot.
export const CONDITION_RATES = {
  "clean-out": 15,
  cosmetic: 35,
  "cos-full": 45,
  full: 65,
  "full-burnt": 90,
  burnt: 135,
} as const;
export type Condition = keyof typeof CONDITION_RATES;
export const CONDITIONS = Object.keys(CONDITION_RATES) as Condition[];
export const CONDITION_LABELS: Record<Condition, string> = {
  "clean-out": "Clean Out",
  cosmetic: "Cosmetic Rehab",
  "cos-full": "Cos-Full Rehab",
  full: "Full Rehab",
  "full-burnt": "Full-Burnt Rehab",
  burnt: "Burnt Rehab",
};

export const HOLD_MONTHS = [3, 6, 9, 12] as const;
export const INTEREST_RATE = 10; // percent a year, always assumed
export const CLOSING_COSTS = 5000;
export const POINTS_RATE = 0.02;
export const MIN_FINDERS_FEE = 2000;
export const MAO_PROFIT = 0.2; // our max offer leaves 20% profit on the all-in
export const OPENING_PROFIT = 0.25; // opening offer leaves 25%

export const LISTING_OPTIONS = {
  legacy: { label: "Legacy Real Estate", rate: 0.06 },
  self: { label: "Myself (Agent Partners)", rate: 0.03 },
} as const;
export type ListingBy = keyof typeof LISTING_OPTIONS;

export type Comp = { address: string; price: number | null; date: string; sqft: number | null };

export type Deal = {
  id: string;
  created_at: string;
  created_by: string | null;
  address: string;
  deal_type: DealType;
  status: DealStatus;
  arv: number | null;
  comps: Comp[] | null;
  sqft: number | null;
  condition: Condition | null;
  assignment_fee: number | null;
  months: number | null;
  interest_rate: number | null;
  closing_costs: number | null;
  listing_by: ListingBy | null;
  max_offer: number | null;
  opening_offer: number | null;
  // CRM fields
  purchase_date: string | null;
  list_price: number | null;
  purchase_price: number | null;
  loan_total: number | null;
  resale_price: number | null;
  resale_date: string | null;
  exit_notes: string | null;
  apn: string | null;
  lot_sqft: number | null;
  year_built: number | null;
  beds: number | null;
  baths: number | null;
  closing_date: string | null;
  seller_name: string | null;
  seller_phone: string | null;
  seller_email: string | null;
  lead_source: string | null;
  occupancy: string | null;
  mortgage_balance: number | null;
  motivation: string | null;
  follow_up_date: string | null;
  notes: string | null;
};

// What every team member can see about any deal (from the deal_directory function).
export type DirectoryRow = {
  id: string;
  address: string;
  status: DealStatus;
  deal_type: DealType;
  deal_date: string | null;
  owner_name: string;
  is_mine: boolean;
};

export type CalcInput = {
  arv: number;
  sqft: number;
  condition: Condition | null;
  findersFee: number;
  months: number;
  listingBy: ListingBy;
};

export type CalcResult = {
  works: boolean; // false when the numbers leave no room for an offer
  maxOffer: number;
  openingOffer: number;
  rehab: number;
  closing: number;
  findersFee: number;
  purchaseCosts: number; // purchase + rehab + closing + finders fee
  points: number;
  interest: number;
  holdingCosts: number; // points + interest
  allIn: number;
  arv: number;
  listingAgent: number;
  profit: number;
  target: number;
};

// Round down to the nearest 500.
export function floor500(n: number) {
  return Math.floor(n / 500) * 500;
}

export function rehabCost(sqft: number | null, condition: Condition | null) {
  if (!sqft || !condition) return null;
  return sqft * CONDITION_RATES[condition];
}

// The purchase price works backward from the profit we want:
//   subtotal = purchase + rehab + closing + finders fee
//   all-in   = subtotal + points (2%) + interest (10% a year for the hold)
//   profit   = ARV - listing agent - all-in
// Solve for the purchase price where profit = all-in x target.
export function calcDeal(i: CalcInput): CalcResult {
  const rehab = i.sqft * (i.condition ? CONDITION_RATES[i.condition] : 0);
  const closing = CLOSING_COSTS;
  const carry = 1 + POINTS_RATE + (INTEREST_RATE / 100 / 12) * i.months;
  const listingAgent = i.arv * LISTING_OPTIONS[i.listingBy].rate;
  const net = i.arv - listingAgent;
  const purchaseFor = (target: number) => net / ((1 + target) * carry) - rehab - closing - i.findersFee;

  const maxOffer = floor500(purchaseFor(MAO_PROFIT));
  const openingOffer = floor500(purchaseFor(OPENING_PROFIT));

  const subtotal = maxOffer + rehab + closing + i.findersFee;
  const points = subtotal * POINTS_RATE;
  const interest = subtotal * (INTEREST_RATE / 100 / 12) * i.months;
  const allIn = subtotal + points + interest;
  return {
    works: maxOffer > 0,
    maxOffer,
    openingOffer,
    rehab,
    closing,
    findersFee: i.findersFee,
    purchaseCosts: subtotal,
    points,
    interest,
    holdingCosts: points + interest,
    allIn,
    arv: i.arv,
    listingAgent,
    profit: net - allIn,
    target: allIn * MAO_PROFIT,
  };
}

// Estimated profit for a saved deal, using the real purchase price once it
// is entered, otherwise our max offer.
export function savedDealProfit(d: Deal): number | null {
  const purchase = d.purchase_price ?? d.max_offer;
  if (purchase == null || !d.arv || !d.listing_by) return null;
  const subtotal = purchase + (rehabCost(d.sqft, d.condition) ?? 0) + (d.closing_costs ?? CLOSING_COSTS) + (d.assignment_fee ?? 0);
  const rate = d.interest_rate ?? INTEREST_RATE;
  const allIn = subtotal * (1 + POINTS_RATE + (rate / 100 / 12) * (d.months ?? 6));
  return d.arv - d.arv * LISTING_OPTIONS[d.listing_by].rate - allIn;
}

export function usd(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return "-";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function shortDate(iso: string | null | undefined) {
  if (!iso) return "-";
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(m)}/${Number(d)}/${y.slice(2)}`;
}

// "765 S C St, Tulare, CA 93274" -> ["765 S C St", "Tulare, CA 93274"]
export function addressLines(address: string): [string, string] {
  const i = address.indexOf(",");
  if (i === -1) return [address.trim(), ""];
  return [address.slice(0, i).trim(), address.slice(i + 1).trim()];
}
