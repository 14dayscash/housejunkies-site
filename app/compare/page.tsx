import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Cash Offer vs. Listing | ${site.name}`,
  description: "A real, honest side-by-side of what selling to House Junkies looks like versus listing your house with an agent.",
  alternates: { canonical: "/compare" },
};

const rows = [
  { label: "Timeline to Close", cash: "7 to 30 Days, You Choose", listing: "Typically 60 to 90+ Days After an Accepted Offer" },
  { label: "Repairs Required", cash: "None, Sold As-Is", listing: "Often Required by Buyer's Lender or Negotiated After Inspection" },
  { label: "Showings", cash: "None", listing: "Multiple, on an Ongoing Basis Until Sold" },
  { label: "Agent Commission", cash: "None", listing: "Typically 5-6% of Sale Price, Split Between Agents" },
  { label: "Closing Costs", cash: "Covered by House Junkies", listing: "Typically Paid by the Seller" },
  { label: "Financing Risk", cash: "None, We Buy With Our Own Capital", listing: "Buyer's Loan Can Fall Through, Restarting the Process" },
  { label: "Certainty of Sale", cash: "Firm Offer Once Accepted", listing: "Can Fall Out of Escrow Over Inspection, Appraisal, or Financing Issues" },
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
            <div className="font-semibold text-brand-black">Listing with an Agent</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Repaired Sale Price: $320,000</li>
              <li>Agent Commission (5-6%): -$17,600</li>
              <li>Seller-Paid Closing Costs: -$3,200</li>
              <li>Repairs to Get It Market-Ready: -$15,000 to $30,000+</li>
              <li>Time to Close: 60 to 90+ Days, Plus Repair Time</li>
            </ul>
          </div>
          <div className="rounded-lg border border-brand-yellow/40 bg-brand-yellow/5 p-5">
            <div className="font-semibold text-brand-black">Selling to House Junkies</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>Cash Offer Accounts for Repairs Upfront, See Our Exact Formula</li>
              <li>Closing Costs: $0, We Cover Them</li>
              <li>Commission: $0</li>
              <li>Repairs: $0, Sold As-Is</li>
              <li>Time to Close: 7 to 30 Days, You Choose</li>
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
          net a higher final price. Because {site.name} is part of{" "}
          <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
            {site.parentOrganization}
          </Link>
          , which also owns{" "}
          <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
            {site.legacyRealEstate.name}
          </Link>
          , we can tell you honestly which path fits
          your situation, even if that means listing instead of selling to us directly.
        </p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/faq" className="font-semibold text-brand-yellow-dark hover:underline">
            Read our FAQ →
          </Link>
          <Link href="/how-it-works" className="font-semibold text-brand-yellow-dark hover:underline">
            See how it works →
          </Link>
        </div>
      </section>
    </div>
  );
}
