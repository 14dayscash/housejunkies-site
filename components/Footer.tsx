import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-gray-600">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="font-bold text-gray-900">{site.name}</div>
            <p className="mt-2">{site.address.street}</p>
            <p>
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
            <p className="mt-2">
              <a href={`tel:${site.phoneE164}`} className="hover:underline">
                {site.phone}
              </a>
            </p>
          </div>
          <div>
            <div className="font-semibold text-gray-900">We Buy Houses In</div>
            <ul className="mt-2 space-y-1">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/we-buy-houses/${c.slug}`} className="hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Company</div>
            <ul className="mt-2 space-y-1">
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/reviews" className="hover:underline">Reviews</Link></li>
              <li><Link href="/how-it-works" className="hover:underline">How It Works</Link></li>
              <li><Link href="/how-we-calculate-your-offer" className="hover:underline">How We Calculate Your Offer</Link></li>
              <li><Link href="/partners/agents" className="hover:underline">Partner With Us</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Licenses</div>
            <p className="mt-2">{site.licenses.generalContractor}</p>
            <p>{site.licenses.brokerage}</p>
            <p className="mt-4 text-xs text-gray-400">
              Part of {site.parentOrganization}
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 text-xs text-gray-400">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved. ·{" "}
          <Link href="/privacy" className="hover:underline">Privacy</Link> ·{" "}
          <Link href="/terms" className="hover:underline">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
