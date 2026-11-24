// Deal calculator math for the internal /deals tool.
// Keep these numbers in one place so the form and the table always agree.

export const DEAL_TYPES = ["flip", "rental", "multifamily", "commercial"] as const;
export type DealType = (typeof DEAL_TYPES)[number];

export const DEAL_STATUSES = ["Lead", "Contract Sent", "Escrow", "Rehab", "Listed", "Sold", "Held"] as const;
export type DealStatus = (typeof DEAL_STATUSES)[number];

// Rehab cost per square foot by condition.
export const CONDITION_RATES = {
  cosmetic: 35,
  "cos-full": 45,
  full: 65,
  "full-burnt": 90,
  burnt: 135,
} as const;
export type Condition = keyof typeof CONDITION_RATES;
export const CONDITIONS = Object.keys(CONDITION_RATES) as Condition[];

export const CONDITION_LABELS: Record<Condition, string> = {
  cosmetic: "Cosmetic",
  "cos-full": "Cosmetic to full",
  full: "Full",
  "full-burnt": "Full to burnt",
  burnt: "Burnt",
};

export const INTEREST_RATES = [8, 10, 12] as const;
export const LOAN_MONTHS = [6, 9, 12] as const;

export const DEFAULT_CLOSING = 5000;
export const POINTS_RATE = 0.02;
export const LISTING_AGENT_RATE = 0.06;
export const TARGET_PROFIT_RATE = 0.2;

export type Deal = {
  id: string;
  created_at: string;
  created_by: string | null;
  address: string;
  deal_type: DealType;
  status: DealStatus;
  purchase_date: string | null;
  list_price: number | null;
  purchase_price: number | null;
  loan_total: number | null;
  sqft: number | null;
  condition: Condition | null;
  closing_costs: number | null;
  assignment_fee: number | null;
  months: number | null;
  interest_rate: number | null;
  arv: number | null;
  resale_price: number | null;
  resale_date: string | null;
  exit_notes: string | null;
};

export type CalcInput = {
  purchase: number;
  sqft: number;
  condition: Condition | null;
  closing: number;
  assignmentFee: number;
  ratePct: number;
  months: number;
  arv: number;
};

export type CalcResult = {
  rehab: number;
  subtotal: number;
  points: number;
  interest: number;
  allIn: number;
  listingAgent: number;
  profit: number;
  target: number;
  meetsTarget: boolean;
  mao: number;
  openingOffer: number;
};

// Round down to the nearest 500.
export function floor500(n: number) {
  return Math.floor(n / 500) * 500;
}

export function calcDeal(i: CalcInput): CalcResult {
  const rate = i.condition ? CONDITION_RATES[i.condition] : 0;
  const rehab = i.sqft * rate;
  const subtotal = i.purchase + rehab + i.closing + i.assignmentFee;
  const points = subtotal * POINTS_RATE;
  const interest = ((subtotal * (i.ratePct / 100)) / 12) * i.months;
  const allIn = subtotal + points + interest;
  const listingAgent = i.arv * LISTING_AGENT_RATE;
  const profit = i.arv - listingAgent - allIn;
  const target = allIn * TARGET_PROFIT_RATE;
  // MLS max offer: ((ARV x 0.94) / 1.284) - rehab - 5000 - 10000, down to the nearest 500.
  const mao = floor500((i.arv * 0.94) / 1.284 - rehab - 5000 - 10000);
  const openingOffer = floor500(mao * 0.9);
  return {
    rehab,
    subtotal,
    points,
    interest,
    allIn,
    listingAgent,
    profit,
    target,
    meetsTarget: profit >= target,
    mao,
    openingOffer,
  };
}

// Resale minus purchase, only when both are known.
export function dealSpread(d: Pick<Deal, "resale_price" | "purchase_price">): number | null {
  if (d.resale_price == null || d.purchase_price == null) return null;
  return d.resale_price - d.purchase_price;
}

export function usd(n: number | null | undefined) {
  if (n == null || Number.isNaN(n)) return "-";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function shortDate(iso: string | null) {
  if (!iso) return "-";
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(m)}/${Number(d)}/${y.slice(2)}`;
}
