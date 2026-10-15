import Link from "next/link";
import { ListingBroker } from "@/components/ListingBroker";
import Image from "next/image";
import {
  acresLabel,
  bedsBathsLabel,
  headlinePrice,
  secondaryPrice,
  money,
  num,
  shortDate,
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
        <span className="absolute bottom-3 left-3 rounded bg-brand-black/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {p.type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-3xl font-extrabold leading-none tabular-nums text-brand-black">
            {money(price.value)}
            {price.suffix ? <span className="text-base font-semibold text-gray-500">{price.suffix}</span> : null}
          </p>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{price.label}</p>
        </div>

        {secondaryPrice(p) ? (
          <p className="mt-2 text-sm font-semibold text-gray-700">{secondaryPrice(p)}</p>
        ) : null}

        <SpecLine p={p} className="mt-4" />

        <p className="mt-4 text-base font-semibold leading-snug text-brand-black group-hover:text-brand-yellow-dark">
          {p.street}
        </p>
        <p className="text-sm text-gray-600">
          {p.city}, CA {p.zip}
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 text-xs">
          <div>
            <dt className="text-gray-500">Est. Value</dt>
            <dd className="mt-1 font-bold tabular-nums text-brand-black">{money(p.estValue)}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Lot</dt>
            <dd className="mt-1 font-bold tabular-nums text-brand-black">{acresLabel(p.lotSqft)}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Purchased</dt>
            <dd className="mt-1 font-bold tabular-nums text-brand-black">{shortDate(p.purchased)}</dd>
          </div>
        </dl>

        {p.status === "For Sale" ? <ListingBroker compact className="mt-4 border-t border-gray-100 pt-4" /> : null}
      </div>
    </Link>
  );
}
