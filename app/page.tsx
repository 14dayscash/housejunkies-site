import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroOfferForm } from "@/components/HeroOfferForm";
import { site } from "@/lib/site";
import { FaqJsonLd } from "@/components/JsonLd";
import { SituationGrid, ReviewsSection, CompareMini, CountyGrid } from "@/components/sections/Shared";
import { SpecLine, StatusBadge } from "@/components/PropertyCard";
import { properties, money } from "@/lib/properties";


// Homepage purchase snapshot: Dominic's three picks.
const homePurchases = ["19667-avenue-195-strathmore", "40074-road-56-dinuba", "215-s-crumal-st-visalia"]
  .map((slug) => properties.find((p) => p.slug === slug))
  .filter((p): p is (typeof properties)[number] => !!p);



// Homepage FAQ picks (answers kept in line with the current standing facts:
// 14 days standard, as fast as 7, written offer within 24 hours).
const homeFaqs = [
  {
    question: "How does selling a home to House Junkies work?",
    answer:
      "Fill out the form or call us with your property address. We look at the house, run the numbers, and send a fair, no-obligation cash offer within 24 hours. If you accept, you pick the closing date and we handle the rest.",
  },
  {
    question: "Do I have to make any repairs before selling?",
    answer:
      "No. We buy houses as-is, in any condition, including major repairs, fire or water damage, code violations, and houses still full of belongings.",
  },
  {
    question: "Are there any fees or commissions?",
    answer:
      "No. You are selling directly to us, so there is no agent commission, and we pay the closing costs. The cash offer itself is always free.",
  },
  {
    question: "How fast do you close, who chooses the date?",
    answer:
      "Yes, you choose the date. Most of our deals close in 14 days, we can close as fast as 7 if you need to, or later if you need more time to move.",
  },
  {
    question: "How do you calculate my cash offer?",
    answer:
      "From four real numbers: what the house will be worth after repairs based on recent sales, what our own construction crew will spend to fix it, holding and closing costs, and our margin. We walk you through every one.",
  },
  {
    question: "Is House Junkies a legitimate company?",
    answer:
      "Yes. We are part of Ulloa Investment Group, along with House Junkies Construction (CA LIC#1077593) and Legacy Real Estate (DRE #02165291). We are BBB Accredited with an A+ rating, ranked #1 in Visalia by SFR Analytics, and you can visit our office at 801 W Main St in Visalia.",
  },
  {
    question: "Can I sell if I still owe money on the house?",
    answer:
      "Yes. Any mortgage or lien is paid off out of the sale at closing through escrow, and you get what is left. We go over those numbers with you before you accept anything.",
  },
  {
    question: "Do I need a realtor to sell my house for cash?",
    answer:
      "No. You can sell directly to us without hiring an agent, and you are always welcome to have your own agent or attorney look over the offer. If listing would net you more, our brokerage, Legacy Real Estate, can list it for you instead.",
  },
];


// SEO TEST (started 2026-10-08): the homepage had 12 clicks / 429 impressions
// at avg position 7.2 (Search Console). Previous title: "We Buy Houses in
// Visalia, CA | House Junkies". Compare CTR in Search Console after 3 weeks.
export const metadata: Metadata = {
  title: { absolute: "We Buy Houses in Visalia, CA | Cash Offer in 24 Hours" },
  description:
    "Local cash home buyers in Visalia, ranked #1 by volume (SFR Analytics). Written offer in 24 hours, no fees, no repairs. Call (559) 368-8956.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero (2026-11-06 overhaul, from Dominic's mockup): the House Junkies
          Main St office as the background with a dark overlay, Abel on the
          left with his name block, the offer card on the right. Mobile puts
          the card first, then Abel. */}
      <section className="relative isolate overflow-hidden bg-black text-white">
        {/* Desktop uses a tighter crop of the right end of the building so
            the House Junkies sign lands between Abel and the offer card.
            Phones keep the full-width photo (the card covers the top there). */}
        <Image
          src="/images/office/hero-office.jpg"
          alt="The House Junkies Inc. office building in the Central Valley"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center md:hidden"
        />
        <Image
          src="/images/office/hero-office-desktop.jpg"
          alt="The House Junkies Inc. office building with the House Junkies sign"
          fill
          priority
          sizes="100vw"
          className="-z-20 hidden object-cover object-[50%_18%] md:block"
        />
        <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden="true" />

        <div className="mx-auto grid max-w-7xl items-center gap-2 px-4 pt-3 md:h-[calc(100svh-68px)] md:max-h-[760px] md:min-h-[460px] md:grid-cols-[45fr_55fr] md:gap-8 md:px-8 md:pt-0 lg:h-[calc(100svh-76px)] lg:px-12">
          {/* Abel + name block */}
          <div className="relative order-2 mx-auto h-[170px] w-full max-w-sm self-end overflow-hidden md:order-1 md:overflow-visible md:mx-0 md:h-[min(500px,calc(100svh-96px))] md:max-w-none">
            <Image
              src="/images/team/abel-hero.png"
              alt="Abel Ulloa, CEO and Owner of House Junkies Inc."
              width={453}
              height={960}
              priority
              sizes="(min-width: 768px) 240px, 170px"
              className="absolute right-0 top-0 h-[340px] w-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)] md:bottom-0 md:left-[8%] md:right-auto md:top-auto md:h-full"
            />
            <div className="absolute left-0 top-3 rounded-lg bg-gradient-to-r from-black/70 via-black/40 to-transparent py-3 pl-4 pr-10 leading-snug [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] md:bottom-10 md:top-auto">
              <p className="text-[22px] font-bold md:text-2xl">Abel Ulloa</p>
              <p className="text-base italic text-white/90">CEO &amp; Owner</p>
              <p className="text-[15px] font-light text-white/80">House Junkies Inc.</p>
              <p className="text-[15px] font-light text-white/80">Ulloa Investment Group</p>
            </div>
          </div>

          {/* Offer card */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end md:py-4">
            <HeroOfferForm />
          </div>
        </div>
      </section>
      <div id="hero-end-sentinel" />

      {/* Trust bar - sourced stats only */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-1 px-2 py-4 text-center sm:gap-4 sm:px-4 md:gap-6 md:py-10">
          <div>
            <div className="text-xl font-bold leading-tight text-brand-black sm:text-3xl">{site.stats.homesBought}</div>
            <div className="mt-0.5 text-[10px] leading-tight text-gray-500 sm:mt-1 sm:text-sm">Homes Bought</div>
          </div>
          <div>
            <div className="text-xl font-bold leading-tight text-brand-black sm:text-3xl">{site.stats.yearsInBusiness}</div>
            <div className="mt-0.5 text-[10px] leading-tight text-gray-500 sm:mt-1 sm:text-sm">Years in Business</div>
          </div>
          <div>
            <div className="text-xl font-bold leading-tight text-brand-black sm:text-3xl">{site.stats.bbbRating}</div>
            <div className="mt-0.5 text-[10px] leading-tight text-gray-500 sm:mt-1 sm:text-sm">BBB Rating</div>
          </div>
          <div>
            <div className="text-xl font-bold leading-tight text-brand-black sm:text-3xl">{site.stats.sfrAnalyticsRank}</div>
            <div className="mt-0.5 text-[10px] leading-tight text-gray-500 sm:mt-1 sm:text-sm">Investor in Visalia</div>
          </div>
        </div>
        <div className="border-t border-gray-100 bg-gray-50 px-3 py-2 text-center text-[11px] leading-snug text-gray-600 sm:px-4 sm:py-3 sm:text-xs">
          <p>
            Ranked <strong className="font-bold text-gray-800">#1</strong> by transactions and volume in{" "}
            <strong className="font-bold text-gray-800">Visalia</strong> by{" "}
            <a
              href="https://sfranalytics.com/investors/ca/visalia-ca"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-gray-400 underline-offset-2 hover:text-brand-yellow-dark"
            >
              SFRAnalytics.com
            </a>
            , an independent
            third-party data source. House Junkies Inc. has bought, renovated, and resold{" "}
            <strong className="font-bold text-gray-800">{site.stats.homesBought}</strong> homes across the
            local Central Valley area.
          </p>
          <p className="mt-1 font-bold text-gray-800">
            Local. Vertically integrated. No fees or obligations. {site.licenses.generalContractor}
          </p>
        </div>
      </section>

      {/* How It Works - the simple process before we explain the company behind it */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">How It Works</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">
              Sell Your House in 3 Simple Steps
            </h2>
            <p className="mt-3 text-gray-600">
              No repairs, no showings, and no agent fees.
              <br />
              Just a fair cash offer from a local Visalia buyer.
            </p>
          </div>

          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            <li className="relative flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-lg font-bold text-black">1</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-brand-black">Tell Us About Your House</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Fill out the form or call {site.phone} and tell us about the property, in any condition. It
                only takes about a minute, and there is no cost or obligation.
              </p>
              <Link
                href="/get-offer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-yellow px-5 py-3 font-bold text-black transition-colors hover:bg-brand-yellow-dark md:mt-auto"
              >
                Start the Process <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li className="relative flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-lg font-bold text-black">2</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-brand-black">Get Your Cash Offer in 24 Hours</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                We look at the house with you, run the numbers on what it needs, and send a written,
                no-obligation cash offer within 24 hours. We show you exactly{" "}
                <Link href="/how-we-calculate-your-offer" className="font-semibold text-brand-yellow-dark hover:underline">
                  how we got to that number
                </Link>
                , so you are never guessing.
              </p>
            </li>
            <li className="relative flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-lg font-bold text-black">3</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-brand-black">Close on Your Timeline and Get Paid</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Pick a closing date that works for you. Most of our deals take 14 days, and we can close as
                fast as 7. We pay all the closing costs, there are no fees, and you can leave behind any
                items you don&apos;t want or need.
              </p>
            </li>
          </ol>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link href="#compare" className="font-semibold text-brand-yellow-dark hover:underline">
              Compare to Listing on the Market →
            </Link>
            <Link href="#faq" className="font-semibold text-brand-yellow-dark hover:underline">
              Read FAQs →
            </Link>
          </div>
        </div>
      </section>

      <SituationGrid />

      {/* Service areas (2026-11-07 revamp): one block per county with a free
          Unsplash stock photo (alt text describes the photo, it does not claim
          the place) and every city in that county as links. Tulare and Fresno
          get the wide blocks since they have the most cities. */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">Where We Buy</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">We Buy Houses Across the Central Valley</h2>
          <p className="mt-3 text-gray-600">
            From Visalia to Bakersfield and out to the coast, House Junkies buys houses across the Central Valley!
          </p>
        </div>
        <div className="mt-10">
          <CountyGrid />
        </div>
        <div className="mt-8 text-center">
          <Link href="/we-buy-houses" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
            Browse Every County and City We Serve →
          </Link>
        </div>
      </section>

      <ReviewsSection />

      {/* Recent purchases snapshot (2026-11-07): three hand-picked real
          purchases from lib/properties.ts, not the full projects preview. */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">Recent Purchases</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">Local Homes Bought by House Junkies</h2>
          <p className="mt-3 text-gray-600">
            Over {site.stats.homesBought} homes purchased across the Central Valley. Here are some of the recent ones.
          </p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {homePurchases.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-yellow-dark hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={`/images/properties/${p.slug}-sm.jpg`}
                    alt={`${p.street}, ${p.city} CA, ${p.type.toLowerCase()} purchased by House Junkies`}
                    width={p.img.smW}
                    height={p.img.smH}
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" aria-hidden="true" />
                  {/* Homepage snapshot always shows "Acquired" (Dominic, 2026-11-07), even
                      for listings, so the three cards match. Real status stays in
                      lib/properties.ts and on /projects and /buy. */}
                  <StatusBadge status="Acquired" className="absolute left-3 top-3 shadow-sm" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75">Purchased For</p>
                    <p className="font-display text-3xl font-extrabold leading-none tabular-nums">{money(p.purchase)}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-semibold leading-snug text-brand-black group-hover:text-brand-yellow-dark">
                    {p.street}
                  </p>
                  <p className="text-sm text-gray-500">
                    {p.city}, CA {p.zip} · {p.type}
                  </p>
                  <SpecLine p={p} className="mt-3 border-t border-gray-100 pt-3" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link href="/projects" className="font-semibold text-brand-yellow-dark hover:underline">
            Browse All Projects →
          </Link>
          <Link href="/buy" className="font-semibold text-brand-yellow-dark hover:underline">
            Houses for Sale →
          </Link>
        </div>
      </section>

      <CompareMini id="compare" />

      {/* Vertical integration (2026-11-07 rewrite): what one company with three
          teams means for the seller. Buy, fix, then list and sell after we buy. */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">One Company, Start to Finish</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">One Call, One Team</h2>
          <p className="mt-3 text-gray-600">
            Most cash buyers have to find a contractor, a lender, or another buyer before they can close on your
            house. We already have all three under one roof, so your offer does not change and your closing does
            not slip.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-1.5">
                  <img src="/images/logo-black.png" alt="House Junkies Inc. logo" className="h-full w-full object-contain" loading="lazy" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-brand-black">We Buy It</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">House Junkies Inc.</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">We close with our own capital, so there is no buyer's loan to fall through and no waiting on a bank. The offer we make is the offer we close on.</p>
              <div className="mt-5 border-t border-gray-100 pt-4 text-sm">
                <p className="font-bold text-brand-black">#1 Home Buyer in Visalia</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=801+West+Main+Street+Visalia+CA+93291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-brand-yellow-dark"
                >
                  801 W Main St, Visalia, CA 93291
                </a>
              </div>
            </div>
            <div className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-1.5">
                  <img src="/images/logos/construction.png" alt="House Junkies Construction logo" className="h-full w-full object-contain" loading="lazy" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-brand-black">We Fix It</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">House Junkies Construction</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">Our own licensed crew prices the repairs, so your offer is based on real numbers, not guesses. You never have to lift a hammer or hire a contractor.</p>
              <div className="mt-5 border-t border-gray-100 pt-4 text-sm">
                <p className="font-bold text-brand-black">{site.licenses.generalContractor}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1640+West+Mineral+King+Ave+Visalia+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-brand-yellow-dark"
                >
                  1640 W Mineral King Ave, Visalia, CA
                </a>
              </div>
            </div>
            <div className="flex flex-col rounded-xl border border-gray-200 border-t-4 border-t-brand-yellow bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white p-1.5">
                  <img src="/images/logos/legacy.png" alt="Legacy Real Estate logo" className="h-full w-full object-contain" loading="lazy" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-brand-black">We List It</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Legacy Real Estate</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">Once a house is renovated, our own brokerage lists it and sells it to the next family. That same team works the Central Valley market every day, so the numbers behind your offer come from real, current sales.</p>
              <div className="mt-5 border-t border-gray-100 pt-4 text-sm">
                <p className="font-bold text-brand-black">{site.licenses.brokerage}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=1814+West+Dorothea+Ave+Visalia+CA+93277"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-gray-500 underline decoration-gray-300 underline-offset-2 hover:text-brand-yellow-dark"
                >
                  1814 W Dorothea Ave, Visalia, CA 93277
                </a>
              </div>
            </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            All part of the{" "}
            <Link href="/about" className="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-2 hover:text-brand-yellow-dark">
              {site.parentOrganization}
            </Link>
          </p>
          <p className="mt-0.5">
            Led by{" "}
            <Link href="/team/abel-ulloa" className="font-semibold text-gray-700 underline decoration-gray-300 underline-offset-2 hover:text-brand-yellow-dark">
              Abel Ulloa, Owner and CEO
            </Link>
            .
          </p>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link href="/about" className="font-semibold text-brand-yellow-dark hover:underline">
            Read Our Full Story →
          </Link>
          <Link href="/team" className="font-semibold text-brand-yellow-dark hover:underline">
            Meet the Team →
          </Link>
        </div>
      </section>

      {/* Soft final CTA (2026-11-07): one plain-spoken push, dark like the hero. */}
      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center md:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">No Pressure, No Obligation</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Not Sure Yet? Get the Numbers First.</h2>
          <p className="mt-4 leading-relaxed text-white/75">
            Tell us about the house and what is going on, even if it needs work or is still full of stuff. We will
            look at it with you, show you how we got to our number, and send a written cash offer within 24 hours.
            If listing it would put more money in your pocket, we tell you that!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/get-offer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-yellow px-6 py-3 font-bold text-black transition-colors hover:bg-brand-yellow-dark sm:w-auto"
            >
              Get My Cash Offer <span aria-hidden="true">→</span>
            </Link>
            <a
              href={`tel:${site.phoneE164}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-white/80 px-6 py-2.5 font-bold text-white transition-colors hover:bg-white hover:text-black sm:w-auto"
            >
              Call or Text {site.phone}
            </a>
          </div>
          <div className="mx-auto mt-10 max-w-sm border-t border-white/15 pt-6 text-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Visit in Person</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=801+West+Main+Street+Visalia+CA+93291"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-semibold text-white underline decoration-white/40 underline-offset-2 hover:text-brand-yellow"
            >
              801 West Main Street, Visalia CA 93291
            </a>
            <p className="mt-1 text-white/70">Monday - Friday | 8AM to 5PM</p>
            <p className="mt-1 font-semibold text-white/90">¡Se habla español!</p>
          </div>
        </div>
      </section>

      {/* Homepage FAQ (2026-11-07): 8 picks from /faq plus one new one, as
          native dropdowns with FAQPage schema. Full list lives on /faq. */}
      <FaqJsonLd items={homeFaqs} />
      <section id="faq" className="scroll-mt-24 mx-auto max-w-3xl px-4 py-14 md:py-20">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">FAQ</p>
          <h2 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">House Junkies Frequently Asked Questions</h2>
        </div>
        <div className="mt-8 space-y-2">
          {homeFaqs.map((f) => (
            <details
              key={f.question}
              className="group rounded-lg border border-gray-200 bg-white shadow-sm open:border-brand-yellow/60"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 [&::-webkit-details-marker]:hidden">
                <h3 className="text-sm font-semibold text-brand-black md:text-base">{f.question}</h3>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                >
                  <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <p className="border-t border-gray-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-600">{f.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/faq" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
            Read All FAQs →
          </Link>
        </div>
      </section>

      {/* Explore the Site - the only link to /explore lives here, on purpose */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <Link
            href="/explore"
            className="inline-block rounded-full border-2 border-brand-yellow-dark bg-white px-6 py-3 font-semibold text-brand-black hover:bg-brand-yellow-dark hover:text-white"
          >
            See the Full Site Map →
          </Link>
        </div>
      </section>

    </div>
  );
}
