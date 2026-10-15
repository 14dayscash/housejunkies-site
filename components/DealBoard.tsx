import Link from "next/link";
import { StatusBadge } from "@/components/PropertyCard";
import { money, newestFirst, shortDate, type Property } from "@/lib/properties";

/**
 * Paired bars per property: what we paid vs. the estimated value. Every bar has
 * its dollar figure printed beside it, so the chart never relies on color alone.
 */
export function DealBoard({ list }: { list: Property[] }) {
  const max = Math.max(...list.map((p) => Math.max(p.purchase, p.estValue)));
  const rows = newestFirst(list);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-5 rounded-[2px] bg-brand-black" aria-hidden="true" />
          Purchase price
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-5 rounded-[2px] bg-brand-yellow" aria-hidden="true" />
          Estimated value
        </span>
        <span className="text-xs text-gray-500">
          Newest purchase first. Estimates are automated valuations, not appraisals.
        </span>
      </div>

      <ul className="mt-6 divide-y divide-gray-100">
        {rows.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group grid items-center gap-x-6 gap-y-2 py-4 transition-colors hover:bg-gray-50 sm:grid-cols-[13rem_1fr] sm:px-2 lg:grid-cols-[15rem_1fr]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-brand-black group-hover:text-brand-yellow-dark">
                  {p.street}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                  <span>{p.city}</span>
                  <span className="text-gray-300">|</span>
                  <span className="tabular-nums">{shortDate(p.purchased)}</span>
                  <StatusBadge status={p.status} className="!px-1.5 !py-0.5 !text-[0.625rem]" />
                </p>
              </div>

              <div className="space-y-[3px]">
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1">
                    <div
                      className="h-full rounded-r-[4px] bg-brand-black"
                      style={{ width: `${(p.purchase / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right text-xs font-bold tabular-nums text-brand-black">
                    {money(p.purchase)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 flex-1">
                    <div
                      className="h-full rounded-r-[4px] bg-brand-yellow"
                      style={{ width: `${(p.estValue / max) * 100}%` }}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right text-xs tabular-nums text-gray-600">
                    {money(p.estValue)}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
