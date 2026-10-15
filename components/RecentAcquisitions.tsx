import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyStats } from "@/components/PropertyStats";
import { newestFirst, properties, type Property } from "@/lib/properties";
import { site } from "@/lib/site";

// Home-page strip. Shows the six newest purchases (three on phones) plus the
// portfolio stats. Pass `list` and `heading` to reuse it for a single city.
export function RecentAcquisitions({
  list = properties,
  heading = "Houses We Just Bought",
  intro = `We have bought ${site.stats.homesBought} homes. Here are a few of our newest, and what we paid.`,
  id,
}: {
  list?: Property[];
  heading?: string;
  intro?: string;
  id?: string;
}) {
  const latest = newestFirst(list).slice(0, 6);

  return (
    <section id={id} className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-brand-black">{heading}</h2>
            <p className="mt-2 max-w-2xl text-gray-600">{intro}</p>
          </div>
          <Link href="/projects" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
            See them all →
          </Link>
        </div>

        <div className="mt-8">
          <PropertyStats list={list} />
        </div>

        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <li key={p.slug} className={i >= 3 ? "hidden sm:block" : undefined}>
              <PropertyCard p={p} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <Link href="/projects" className="font-semibold text-brand-yellow-dark hover:underline">
            See more houses →
          </Link>
          <Link href="/buy" className="font-semibold text-brand-yellow-dark hover:underline">
            Houses for sale →
          </Link>
        </div>
      </div>
    </section>
  );
}
