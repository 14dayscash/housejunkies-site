import Link from "next/link";
import { ListingBroker } from "@/components/ListingBroker";
import Image from "next/image";
import {
  bedsBathsLabel,
  headlinePrice,
  secondaryPrice,
  money,
  num,
  type Property,
  type PropertyStatus,
} from "@/lib/properties";

const badgeStyles: Record<PropertyStatus, string> = {
  "For Sale": "bg-brand-yellow text-black",
  Sold: "bg-brand-black text-white",
  Rented: "bg-white text-brand-black ring-1 ring-inset ring-gray-300",
  Acquired: "bg-white/95 text-gray-700 ring-1 ring-inset ring-gray-300",
};

export function StatusBadge({ status, className = "" }: { status: PropertyStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${badgeStyles[status]} ${className}`}
    >
      {status}
    </span>
  );
}

/** Zillow-style spec line: bold numbers, thin dividers. */
export function SpecLine({ p, className = "" }: { p: Property; className?: string }) {
  const items = [...bedsBathsLabel(p), { value: num(p.sqft), unit: "sqft" }];
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600 ${className}`}>
      {items.map((item, i) => (
        <span key={item.unit} className="flex items-center gap-3">
          {i > 0 ? <span className="h-3.5 w-px bg-gray-300" aria-hidden="true" /> : null}
          <span>
            <strong className="font-bold text-brand-black">{item.value}</strong> {item.unit}
          </span>
        </span>
      ))}
    </p>
  );
}

export function PropertyCard({ p, priority = false }: { p: Property; priority?: boolean }) {
  const price = headlinePrice(p);

  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-brand-yellow-dark hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-yellow-dark"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={`/images/properties/${p.slug}-sm.jpg`}
          alt={`${p.street}, ${p.city} CA, ${p.type.toLowerCase()} purchased by House Junkies`}
          width={p.img.smW}
          height={p.img.smH}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <StatusBadge status={p.status} className="absolute left-3 top-3 shadow-sm" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{price.label}</p>
        <p className="mt-1 font-display text-3xl font-extrabold leading-none tabular-nums text-brand-black">
          {money(price.value)}
        </p>
        {secondaryPrice(p) ? (
          <p className="mt-2 text-sm font-semibold text-brand-yellow-dark">{secondaryPrice(p)}</p>
        ) : null}

        <p className="mt-4 text-base font-semibold leading-snug text-brand-black group-hover:text-brand-yellow-dark">
          {p.street}, {p.city}
        </p>
        <SpecLine p={p} className="mt-1" />

        {p.status === "For Sale" ? <ListingBroker compact className="mt-4 border-t border-gray-100 pt-4" /> : null}
      </div>
    </Link>
  );
}
