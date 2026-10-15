"use client";

import { useState } from "react";
import { mapsEmbed, mapsLink, type Property } from "@/lib/properties";

export function PropertyMap({ p }: { p: Property }) {
  const [view, setView] = useState<"map" | "satellite">("map");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["map", "satellite"] as const).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
            className={`h-9 rounded-full border px-4 text-sm font-medium capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow-dark ${
              view === v
                ? "border-brand-black bg-brand-black text-white"
                : "border-gray-300 text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
            }`}
          >
            {v}
          </button>
        ))}
        <a
          href={mapsLink(p)}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm font-semibold text-brand-yellow-dark hover:underline"
        >
          Open in Google Maps ↗
        </a>
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
        <iframe
          key={view}
          title={`Map of ${p.street}, ${p.city}`}
          src={mapsEmbed(p, view === "satellite")}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[22rem] w-full border-0 sm:h-[28rem]"
          allowFullScreen
        />
      </div>
    </div>
  );
}
