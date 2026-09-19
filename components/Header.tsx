import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { href: "/we-buy-houses/visalia", label: "We Buy Houses" },
  { href: "/sell-your-house/inherited-property", label: "Situations" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-brand-green">
          {site.shortName}
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-700 hover:text-brand-green">
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={`tel:${site.phoneE164}`}
          className="rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green/90"
        >
          Call {site.phone}
        </a>
      </div>
    </header>
  );
}
