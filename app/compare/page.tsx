import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Cash Offer vs. Listing | ${site.name}`,
  description: "A real, honest side-by-side of what selling to House Junkies looks like versus listing your house with an agent.",
  alternates: { canonical: "/compare" },
};

const rows = [
  { label: "Timeline to close", cash: "7 to 30 days, your choice", listing: "Typically 60 to 90+ days after an accepted offer" },
  { label: "Repairs required", cash: "None, sold as-is", listing: "Often required by buyer's lender or negotiated after inspection" },
  { label: "Showings", cash: "None", listing: "Multiple, on an ongoing basis until sold" },
  { label: "Agent commission", cash: "None", listing: "Typically 5-6% of sale price, split between agents" },
  { label: "Closing costs", cash: "Covered by House Junkies", listing: "Typically paid by the seller" },
  { label: "Financing risk", cash: "None, we buy with our own capital", listing: "Buyer's loan can fall through, restarting the process" },
  { label: "Certainty of sale", cash: "Firm offer once accepted", listing: "Can fall out of escrow over inspection, appraisal, or financing issues" },
];

export default function ComparePage() {
  return (
    <div>
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <h1 className="text-3xl font-bold md:text-4xl">Cash Offer vs. Listing</h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Selling for cash isn't automatically the right move for every seller, and we'll tell
            you that on the phone. Here's an honest look at the actual tradeoff.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="py-3 pr-4 font-semibold text-brand-black"> </th>
                <th className="py-3 pr-4 font-semibold text-brand-yellow-dark">Sell to House Junkies</th>
                <th className="py-3 font-semibold text-gray-500">List with an Agent</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-b border-gray-100">
                  <td className="py-3 pr-4 font-medium text-brand-black">{row.label}</td>
                  <td className="py-3 pr-4 text-gray-700">{row.cash}</td>
                  <td className="py-3 text-gray-500">{row.listing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-xl font-bold text-brand-black">A Worked Example</h2>
        <p className="mt-3 text-gray-600">
          Say a house would sell for $320,000 fully repaired and listed on the open market. Here's
          roughly how the two paths compare, using typical Central Valley numbers:
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-5">
            <div className="font-semibold text-brand-black">Listing With an Agent</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Repaired sale price: $320,000</li>
              <li>Agent commission (5-6%): -$17,600</li>
              <li>Seller-paid closing costs: -$3,200</li>
              <li>Repairs to get it market-ready: -$15,000 to $30,000+</li>
              <li>Time to close: 60 to 90+ days, plus repair time</li>
            </ul>
          </div>
          <div className="rounded-lg border border-brand-yellow/40 bg-brand-yellow/5 p-5">
            <div className="font-semibold text-brand-black">Selling to House Junkies</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Cash offer accounts for repairs upfront, see our exact formula</li>
              <li>Closing costs: $0, we cover them</li>
              <li>Commission: $0</li>
              <li>Repairs: $0, sold as-is</li>
              <li>Time to close: 7 to 30 days, your choice</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          The exact numbers depend on your specific property. See{" "}
          <a href="/how-we-calculate-your-offer" className="text-brand-yellow-dark hover:underline">
            how we calculate your offer
          </a>{" "}
          for the real formula, or call {site.phone} and we'll run the numbers on your house
          specifically.
        </p>

        <h2 className="mt-12 text-xl font-bold text-brand-black">When Listing Might Net You More</h2>
        <p className="mt-3 text-gray-600">
          If your house is in good condition, you're not on a tight timeline, and you can afford
          to wait through showings and a financed buyer's process, listing on the open market can
          net a higher final price. Because {site.name} is part of {site.parentOrganization},
          which also owns {site.legacyRealEstate.name}, we can tell you honestly which path fits
          your situation, even if that means listing instead of selling to us directly.
        </p>
      </section>
    </div>
  );
}
