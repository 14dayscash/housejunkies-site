import Image from "next/image";
import { site } from "@/lib/site";

// Listing disclosure for properties we have for sale: Legacy Real Estate
// logo and DRE, plus the broker of record. Plain elements (no links) so it
// can sit inside a PropertyCard, which is itself a link.
const BROKER_DRE = "DRE #01882650";

export function ListingBroker({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const broker = site.people.broker;
  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <Image src="/images/logos/legacy.png" alt={site.legacyRealEstate.name} width={28} height={28} className="h-7 w-7 rounded-full object-contain" />
        <Image src="/images/team/jenny.png" alt={broker.name} width={28} height={28} className="h-7 w-7 rounded-full object-cover object-top" />
        <p className="text-[11px] leading-snug text-gray-500">
          Listed by {site.legacyRealEstate.name}, {site.legacyRealEstate.dre}
          <br />
          {broker.name}, Broker, {BROKER_DRE}
        </p>
      </div>
    );
  }
  return (
    <div className={`flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 ${className}`}>
      <Image src="/images/logos/legacy.png" alt={site.legacyRealEstate.name} width={48} height={48} className="h-12 w-12 rounded-full object-contain" />
      <Image src="/images/team/jenny.png" alt={broker.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover object-top" />
      <div className="text-sm">
        <p className="font-semibold text-brand-black">Listed by {site.legacyRealEstate.name}</p>
        <p className="text-gray-600">{site.legacyRealEstate.dre}</p>
        <p className="mt-1 text-gray-600">
          Broker: {broker.name}, {BROKER_DRE}
        </p>
      </div>
    </div>
  );
}
