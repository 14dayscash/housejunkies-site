"use client";

import { useMemo, useState } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import type { Property } from "@/lib/properties";

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

// One row of buttons: All, For Sale, then each city. Newest first, always.
// Filtering is client-side on purpose: the full list is still in the
// server-rendered HTML for search engines.
export function ProjectsExplorer({ properties, cityNames }: { properties: Property[]; cityNames: string[] }) {
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(() => {
    const list = properties.filter((p) =>
      filter === "All" ? true : filter === "For Sale" ? p.status === "For Sale" : p.city === filter,
    );
    return [...list].sort((a, b) => (a.purchased < b.purchased ? 1 : -1));
  }, [properties, filter]);

  const options = ["All", "For Sale", ...cityNames];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter properties">
        {options.map((o) => (
          <Chip key={o} active={filter === o} onClick={() => setFilter(o)}>
            {o}
          </Chip>
        ))}
      </div>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <li key={p.slug}>
            <PropertyCard p={p} priority={i < 3} />
          </li>
        ))}
      </ul>
    </div>
  );
}
