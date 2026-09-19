import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-brand-blue/5 to-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Sell Your Visalia House As-Is. We Buy It, We Renovate It, We Cover Every Fee.
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {site.name} has bought, renovated, and resold 350+ homes across the Central
              Valley. We're not a lead service and we're not a wholesaler, we buy the
              property with our own capital and renovate it with our own licensed crew
              ({site.licenses.generalContractor}).
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>✓ No repairs, no cleaning, any condition</li>
              <li>✓ We cover escrow and closing costs</li>
              <li>✓ You choose the closing date, 7 to 30 days</li>
              <li>✓ Se habla espanol</li>
            </ul>
          </div>
          <LeadForm sourcePage="/" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">We Buy Houses in Any Situation</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {situations.map((s) => (
            <Link
              key={s.slug}
              href={`/sell-your-house/${s.slug}`}
              className="rounded-md border border-gray-200 px-4 py-3 text-center text-sm font-medium hover:border-brand-green hover:text-brand-green"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-2xl font-bold">Service Areas</h2>
          <p className="mt-2 text-gray-600">
            Proudly serving homeowners throughout Tulare, Kings, Fresno, and Kern counties.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/we-buy-houses/${c.slug}`}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-brand-green hover:text-brand-green"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Vertically Integrated, Start to Finish</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-semibold text-brand-green">Acquisitions</div>
            <p className="mt-2 text-sm text-gray-600">
              {site.name} buys directly with private capital. No banks, no outside brokers.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-semibold text-brand-green">Construction</div>
            <p className="mt-2 text-sm text-gray-600">
              Renovated by our own licensed general contractor, {site.licenses.generalContractor}, not an out-of-town crew.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-semibold text-brand-green">Brokerage</div>
            <p className="mt-2 text-sm text-gray-600">
              Resold through our own licensed brokerage, {site.licenses.brokerage}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
