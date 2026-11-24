// Offer results shared by the Add Deal results screen and the deal page.
import { usd, type CalcResult } from "@/lib/deals/calc";

// Black card: Our Max Offer, You Will Make, Opening Offer.
export function OfferHeadline({ result: r, top }: { result: CalcResult; top?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-brand-black p-6 text-white shadow-sm sm:p-8">
      {top}
      <div className={`${top ? "mt-6" : ""} text-center`}>
        <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Our Max Offer</p>
        <p className="font-display text-5xl font-black sm:text-6xl">{r.works ? usd(r.maxOffer) : "-"}</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-brand-yellow p-4 text-center text-black">
          <p className="text-xs font-bold uppercase tracking-wide">You Will Make</p>
          <p className="font-display text-2xl font-black sm:text-3xl">{usd(r.findersFee)}</p>
        </div>
        <div className="rounded-xl bg-white p-4 text-center text-black">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Opening Offer</p>
          <p className="font-display text-2xl font-black sm:text-3xl">{r.works && r.openingOffer > 0 ? usd(r.openingOffer) : "-"}</p>
        </div>
      </div>
      {!r.works && (
        <p className="mt-5 rounded-xl bg-red-600 p-3 text-center text-sm font-bold">
          These numbers leave no room for an offer. Check the ARV, rehab and finders fee.
        </p>
      )}
    </div>
  );
}

// The line by line OFFER BREAKDOWN rows.
export function OfferRows({ result: r }: { result: CalcResult }) {
  const pct = (n: number) => (r.allIn > 0 ? `(${((n / r.allIn) * 100).toFixed(1)}%)` : "");
  return (
    <dl className="space-y-2 text-[15px]">
      <Row label="Purchase Price" value={r.maxOffer} />
      <Row label="Rehab Cost" value={r.rehab} />
      <Row label="Closing Cost" value={r.closing} />
      <Row label="Finders Fee" value={r.findersFee} />
      <Row label="Purchase Costs:" value={r.purchaseCosts} strong />
      <Divider />
      <Row label="Points (2%)" value={r.points} />
      <Row label={`Interest (${r.ratePct}%)`} value={r.interest} />
      <Row label="Holding Costs:" value={r.holdingCosts} strong />
      <Divider />
      <Row label="All In:" value={r.allIn} strong />
      <Divider />
      <Row label="After Repair Value" value={r.arv} />
      <Row label="Listing Agent" value={r.listingAgent} />
      <Divider />
      <Row label="Estimated Profit" value={r.profit} note={pct(r.profit)} strong />
      <Row label="Target Profit" value={r.target} note={pct(r.target)} />
    </dl>
  );
}

function Row({ label, value, strong, note }: { label: string; value: number; strong?: boolean; note?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={strong ? "font-extrabold text-brand-black" : "text-gray-600"}>{label}</dt>
      <dd className={strong ? "font-extrabold text-brand-black" : "font-semibold text-gray-900"}>
        {usd(value)}
        {note && <span className="ml-1.5 text-sm font-semibold text-gray-500">{note}</span>}
      </dd>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-gray-100" />;
}
