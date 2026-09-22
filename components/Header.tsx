"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";

const liveCities = cities;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
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

        <nav className="hidden items-center gap-1 text-sm font-medium text-white/80 md:flex">
          <div className="group/cities relative">
            <button aria-haspopup="true" className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white">
              We Buy Houses
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-0.5">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full grid w-56 grid-cols-2 gap-1 rounded-md border border-white/10 bg-brand-charcoal p-2 opacity-0 shadow-xl transition group-hover/cities:visible group-hover/cities:opacity-100 group-focus-within/cities:visible group-focus-within/cities:opacity-100">
              <Link
                href="/we-buy-houses"
                className="col-span-2 rounded px-3 py-2 text-sm font-semibold text-brand-yellow hover:bg-white/10"
              >
                All Areas →
              </Link>
              {liveCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/we-buy-houses/${c.slug}`}
                  className="rounded px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-brand-yellow focus-visible:bg-white/10 focus-visible:text-brand-yellow"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="group/situations relative">
            <button aria-haspopup="true" className="flex items-center gap-1 rounded-md px-3 py-2 hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:text-white">
              Situations
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="mt-0.5">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full grid w-52 grid-cols-2 gap-1 rounded-md border border-white/10 bg-brand-charcoal p-2 opacity-0 shadow-xl transition group-hover/situations:visible group-hover/situations:opacity-100 group-focus-within/situations:visible group-focus-within/situations:opacity-100">
              {situations.map((s) => (
                <Link
                  key={s.slug}
                  href={`/sell-your-house/${s.slug}`}
                  className="rounded px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-brand-yellow focus-visible:bg-white/10 focus-visible:text-brand-yellow"
                >
                  {s.navLabel}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/projects" className="rounded-md px-3 py-2 hover:bg-white/10 hover:text-white">Projects</Link>
          <Link href="/blog" className="rounded-md px-3 py-2 hover:bg-white/10 hover:text-white">Blog</Link>
          <Link href="/about" className="rounded-md px-3 py-2 hover:bg-white/10 hover:text-white">About</Link>
          <Link href="/reviews" className="rounded-md px-3 py-2 hover:bg-white/10 hover:text-white">Reviews</Link>
          <Link href="/contact" className="rounded-md px-3 py-2 hover:bg-white/10 hover:text-white">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneE164}`}
            className="hidden rounded-md bg-brand-yellow px-4 py-2 text-sm font-bold text-black hover:bg-brand-yellow-dark sm:block"
          >
            Call {site.phone}
          </a>
          <button
            aria-label="Menu"
            className="rounded-md p-2 text-white md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-black px-4 pb-4 md:hidden">
          <div className="flex flex-col pt-2 text-sm text-white/80">
            <Link href="/projects" onClick={() => setMobileOpen(false)} className="rounded-md py-3">Projects</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="rounded-md py-3">Blog</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="rounded-md py-3">About</Link>
            <Link href="/reviews" onClick={() => setMobileOpen(false)} className="rounded-md py-3">Reviews</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-md py-3">Contact</Link>
          </div>

          <div className="pt-4 text-xs font-semibold uppercase tracking-wide text-white/60">We Buy Houses</div>
          <div className="mt-1 flex flex-wrap gap-2">
            <Link href="/we-buy-houses" onClick={() => setMobileOpen(false)} className="rounded-full bg-brand-yellow px-3 py-1 text-sm font-semibold text-black">
              All Areas
            </Link>
            {liveCities.map((c) => (
              <Link key={c.slug} href={`/we-buy-houses/${c.slug}`} onClick={() => setMobileOpen(false)} className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/80">
                {c.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 text-xs font-semibold uppercase tracking-wide text-white/60">Situations</div>
          <div className="mt-1 flex flex-wrap gap-2">
            {situations.map((s) => (
              <Link key={s.slug} href={`/sell-your-house/${s.slug}`} onClick={() => setMobileOpen(false)} className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/80">
                {s.navLabel}
              </Link>
            ))}
          </div>

          <a href={`tel:${site.phoneE164}`} className="mt-4 block rounded-md bg-brand-yellow px-4 py-2 text-center font-bold text-black">
            Call {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}
