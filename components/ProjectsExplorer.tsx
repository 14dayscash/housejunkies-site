"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property, PropertyStatus } from "@/lib/properties";

type StatusFilter = "All" | PropertyStatus;
type Sort = "newest" | "price-high" | "price-low" | "sqft";

const statusFilters: StatusFilter[] = ["All", "For Sale", "Acquired", "Sold", "Rented"];

const sorts: { value: Sort; label: string }[] = [
  { value: "newest", label: "Newest purchase" },
  { value: "price-high", label: "Price: high to low" },
  { value: "price-low", label: "Price: low to high" },
  { value: "sqft", label: "Largest sq ft" },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-9 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow-dark ${
        active
          ? "border-brand-black bg-brand-black text-white"
          : "border-gray-300 text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
      }`}
    >
      {children}
    </button>
  );
}

// Filtering is client-side on purpose: 16 items, instant, and the full list is
// still in the server-rendered HTML for search engines.
export function ProjectsExplorer({ properties, cityNames }: { properties: Property[]; cityNames: string[] }) {
  const [status, setStatus] = useState<StatusFilter>("All");
  const [city, setCity] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("newest");

  const visible = useMemo(() => {
    const list = properties.filter(
      (p) => (status === "All" || p.status === status) && (city === "All" || p.city === city),
    );
    const price = (p: Property) => p.purchase;
    return [...list].sort((a, b) => {
      if (sort === "price-high") return price(b) - price(a);
      if (sort === "price-low") return price(a) - price(b);
      if (sort === "sqft") return b.sqft - a.sqft;
      return a.purchased < b.purchased ? 1 : -1;
    });
  }, [properties, status, city, sort]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: properties.length };
    for (const p of properties) c[p.status] = (c[p.status] ?? 0) + 1;
    return c;
  }, [properties]);

  return (
    <div>
      <div className="space-y-4 border-b border-gray-200 pb-6">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by status">
          {statusFilters.map((item) => (
            <Chip key={item} active={status === item} onClick={() => setStatus(item)}>
              {item}
              <span className="ml-1.5 text-xs opacity-70 tabular-nums">{counts[item] ?? 0}</span>
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by city">
            <Chip active={city === "All"} onClick={() => setCity("All")}>
              All Cities
            </Chip>
            {cityNames.map((name) => (
              <Chip key={name} active={city === name} onClick={() => setCity(name)}>
                {name}
              </Chip>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm text-gray-600">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow-dark"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-600" aria-live="polite">
        Showing <strong className="text-brand-black">{visible.length}</strong> of {properties.length} properties
      </p>

      {visible.length ? (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <li key={p.slug}>
              <PropertyCard p={p} priority={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-8 text-gray-600">
          Nothing matches that combination yet.{" "}
          <button
            type="button"
            className="font-semibold text-brand-yellow-dark underline underline-offset-4"
            onClick={() => {
              setStatus("All");
              setCity("All");
            }}
          >
            Reset filters
          </button>
        </p>
      )}
    </div>
  );
}
