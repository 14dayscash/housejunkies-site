"use client";

import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";
import { OfferForm } from "./StickyOfferBar";

const liveCities = cities.filter((c) => c.featured);

// mobileOpen is lifted up (controlled by the parent StickyTop wrapper)
// rather than local state, so the sticky offer bar below it can hide
// itself while the mobile menu is open, instead of the two overlapping.
export function Header({
  mobileOpen,
  setMobileOpen,
  showOffer = false,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  showOffer?: boolean; // desktop: offer form takes the nav's place (see StickyOfferBar.tsx)
}) {
  return (
    <header className="border-b border-white/10 bg-black">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:px-8 lg:h-[76px] lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/logo-white.png"
            alt={site.name}
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <span className="text-lg font-bold tracking-tight text-white">
            {site.name}
          </span>
        </Link>

        {showOffer && <OfferForm id="header_address" className="mx-8 hidden max-w-2xl flex-1 lg:flex" />}

        <nav
          className={`items-center gap-7 text-[15px] font-medium text-white xl:gap-8 ${
            showOffer ? "hidden" : "hidden lg:flex"
          }`}
        >
          {[
            ["/about", "About"],
            ["/faq", "FAQ"],
            ["/reviews", "Reviews"],
            ["/projects", "Projects"],
            ["/blog", "Blog"],
            ["/partners/agents", "Partner"],
            ["/contact", "Contact"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="border-b-2 border-transparent py-1 transition-colors hover:border-brand-yellow hover:text-brand-yellow"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneE164}`}
            className="hidden items-center gap-2 rounded-lg bg-brand-yellow px-5 py-3 text-[15px] font-bold text-black transition-colors hover:bg-brand-yellow-dark sm:flex"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
            </svg>
            {site.phone}
          </a>
          <button
            aria-label="Menu"
            className="rounded-md p-2 text-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[85vh] overflow-y-auto border-t border-white/10 bg-brand-black px-4 pb-4 lg:hidden">
          <div className="pt-2 text-xs font-semibold uppercase tracking-wide text-brand-yellow">Explore</div>
          <div className="grid grid-cols-4 gap-x-3 text-sm text-white/80">
            <Link href="/about" onClick={() => setMobileOpen(false)} className="rounded-md py-1.5">About</Link>
            <Link href="/faq" onClick={() => setMobileOpen(false)} className="rounded-md py-1.5">FAQ</Link>
            <Link href="/reviews" onClick={() => setMobileOpen(false)} className="rounded-md py-1.5">Reviews</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-md py-1.5">Contact</Link>
            <Link href="/projects" onClick={() => setMobileOpen(false)} className="rounded-md py-1.5">Projects</Link>
            <Link href="/partners/agents" onClick={() => setMobileOpen(false)} className="rounded-md py-1.5">Partner</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="rounded-md py-1.5">Blog</Link>
            <Link href="/buy" onClick={() => setMobileOpen(false)} className="rounded-md py-1.5">For Sale</Link>
          </div>

          <div className="pt-2 text-xs font-semibold uppercase tracking-wide text-white/60">We Buy Houses</div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Link href="/we-buy-houses" onClick={() => setMobileOpen(false)} className="rounded-full bg-brand-yellow px-3 py-0.5 text-sm font-semibold text-black">
              All Cities
            </Link>
            {liveCities.slice(0, 11).map((c) => (
              <Link key={c.slug} href={`/we-buy-houses/${c.slug}`} onClick={() => setMobileOpen(false)} className="rounded-full border border-white/20 px-3 py-0.5 text-sm text-white/80">
                {c.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 text-xs font-semibold uppercase tracking-wide text-white/60">Situations</div>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Link href="/sell-your-house" onClick={() => setMobileOpen(false)} className="rounded-full bg-brand-yellow px-3 py-0.5 text-sm font-semibold text-black">
              All Situations
            </Link>
            {situations.map((s) => (
              <Link key={s.slug} href={`/sell-your-house/${s.slug}`} onClick={() => setMobileOpen(false)} className="rounded-full border border-white/20 px-3 py-0.5 text-sm text-white/80">
                {s.navLabel}
              </Link>
            ))}
          </div>

          <a href={`tel:${site.phoneE164}`} className="mt-3 block rounded-md bg-brand-yellow px-4 py-2 text-center font-bold text-black">
            Call {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}
