import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";

const liveCities = cities;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-12 text-sm">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Image src="/images/logo-white.png" alt={site.name} width={36} height={36} className="h-9 w-9 object-contain" />
              <span className="font-bold text-white">{site.name}</span>
            </div>
            <p className="mt-3">{site.address.street}</p>
            <p>{site.address.city}, {site.address.region} {site.address.postalCode}</p>
            <p className="mt-2">
              <a href={`tel:${site.phoneE164}`} className="text-brand-yellow hover:underline">{site.phone}</a>
            </p>
            <p className="mt-4 text-xs text-white/60">
              Part of {site.parentOrganization}.
              <br />
              {site.stats.homesBought} homes bought, renovated, and resold.
              <br />
              {site.stats.sfrAnalyticsRank} in Visalia and Tulare County.
            </p>
            <div className="mt-4 flex gap-4">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-yellow" aria-label="Facebook">
                Facebook
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-yellow" aria-label="Instagram">
                Instagram
              </a>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-brand-yellow" aria-label="YouTube">
                YouTube
              </a>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white">We Buy Houses</div>
            <ul className="mt-2 space-y-1">
              {liveCities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/we-buy-houses/${c.slug}`} className="hover:text-brand-yellow">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white">Situations</div>
            <ul className="mt-2 space-y-1">
              {situations.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={`/sell-your-house/${s.slug}`} className="hover:text-brand-yellow">{s.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-white">Company</div>
            <ul className="mt-2 space-y-1">
              <li><Link href="/about" className="hover:text-brand-yellow">About</Link></li>
              <li><Link href="/reviews" className="hover:text-brand-yellow">Reviews</Link></li>
              <li><Link href="/how-it-works" className="hover:text-brand-yellow">How It Works</Link></li>
              <li><Link href="/how-we-calculate-your-offer" className="hover:text-brand-yellow">How We Calculate Your Offer</Link></li>
              <li><Link href="/partners/agents" className="hover:text-brand-yellow">Partner With Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-yellow">Contact</Link></li>
            </ul>
            <div className="mt-4 text-xs text-white/60">
              <p>{site.licenses.generalContractor}</p>
              <p>{site.licenses.brokerage}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            {" · "}
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
