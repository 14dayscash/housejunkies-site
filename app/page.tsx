import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SituationIcon } from "@/components/SituationIcon";
import { HeroOfferForm } from "@/components/HeroOfferForm";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";
import { situations } from "@/lib/situations";
import { counties, citiesInCounty } from "@/lib/counties";
import { ReviewSlider } from "@/components/ReviewSlider";
import { SpecLine, StatusBadge } from "@/components/PropertyCard";
import { properties, money } from "@/lib/properties";
import { googleReviews } from "@/lib/reviews";

// Homepage review slider: Dominic's five picks, in his order.
const homeReviews = ["J N", "Corey Loewen", "Eli Stephens", "Hannah Pendleton", "Michael"]
  .map((n) => googleReviews.find((r) => r.name === n))
  .filter((r): r is { name: string; rating: number; text: string } => !!r && !!r.text);

// Homepage purchase snapshot: Dominic's three picks.
const homePurchases = ["19667-avenue-195-strathmore", "40074-road-56-dinuba", "215-s-crumal-st-visalia"]
  .map((slug) => properties.find((p) => p.slug === slug))
  .filter((p): p is (typeof properties)[number] => !!p);

// Free Unsplash stock photos for the county blocks, taken in or near one of
// each county's top cities where Unsplash had one (Dominic, 2026-11-07).
const countyPhotos: Record<string, { src: string; alt: string }> = {
  "tulare-county": { src: "https://images.unsplash.com/photo-1753635555129-3529087a7da2?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "The Darling Hotel in downtown Visalia against a bright blue sky" },
  "fresno-county": { src: "https://images.unsplash.com/photo-1648742022394-34575e15bcf7?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A building with a sign on the side of it" },
  "kern-county": { src: "https://images.unsplash.com/photo-1610820438019-b2688a6d9308?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "The Bakersfield sign" },
  "kings-county": { src: "https://images.unsplash.com/photo-1647927082960-025da25544ba?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A tall building with a clock on the front" },
  "madera-county": { src: "https://images.unsplash.com/photo-1681618314193-fb7379527a1b?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A red, white and blue barn in a field" },
  "merced-county": { src: "https://images.unsplash.com/photo-1595800881132-9571d9aa9019?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A green grass field under a blue sky" },
  "monterey-county": { src: "https://images.unsplash.com/photo-1757715628829-34cd468203b6?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A coastal town with buildings along the oceanfront" },
  "san-luis-obispo-county": { src: "https://images.unsplash.com/photo-1642958707285-405685996700?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A dirt road going through a lush green valley" },
  "inyo-county": { src: "https://images.unsplash.com/photo-1649042250663-4d8ad5551e02?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A mountain range in the distance" },
  "san-benito-county": { src: "https://images.unsplash.com/photo-1639691000349-c3d2c4b503af?fm=jpg&q=70&w=1200&auto=format&fit=crop", alt: "A town with mountains behind it" },
};

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
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 text-center md:grid-cols-4">
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.homesBought}</div>
            <div className="mt-1 text-sm text-gray-500">Homes Bought & Renovated</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.yearsInBusiness}</div>
            <div className="mt-1 text-sm text-gray-500">Years in Business</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.bbbRating}</div>
            <div className="mt-1 text-sm text-gray-500">BBB Accredited Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-black">{site.stats.sfrAnalyticsRank}</div>
            <div className="mt-1 text-sm text-gray-500">Investor in Visalia</div>
          </div>
        </div>
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 text-center text-xs text-gray-600">
          <p>
            Ranked <strong className="font-bold text-gray-800">#1</strong> by transactions and volume in{" "}
            <strong className="font-bold text-gray-800">Visalia</strong> by SFRAnalytics.com, an independent
            third-party data source. We&apos;ve bought, renovated, and resold{" "}
            <strong className="font-bold text-gray-800">{site.stats.homesBought}</strong> homes across the
            Central Valley using our own capital, real estate brokerage and licensed construction crew.
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
            <Link href="/compare" className="font-semibold text-brand-yellow-dark hover:underline">
              Compare to Listing on the Market →
            </Link>
            <Link href="/faq" className="font-semibold text-brand-yellow-dark hover:underline">
              Read FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Situations (2026-11-07 revamp): every situation as a card with an
          icon and a short blurb from lib/situations.ts (homeCard), on a dark
          photo background. Card copy lives in the data file, not here. */}
      <section className="relative isolate overflow-hidden bg-black text-white">
        <img
          src="https://images.unsplash.com/photo-1758304480344-f8d0de5f4f25?fm=jpg&q=70&w=1920&auto=format&fit=crop"
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-black/75 to-black/90" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Any Situation. Any Condition.</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">We Buy Central Valley Houses in Any Situation</h2>
            <p className="mt-3 text-white/70">
              Whatever the reason you need to sell, House Junkies can make you a fair cash offer on the house as it
              sits. No repairs, no listing, no hidden fees.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {situations.map((sit) => (
              <Link
                key={sit.slug}
                href={`/sell-your-house/${sit.slug}`}
                className="group flex gap-4 rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition-colors hover:border-brand-yellow/70 hover:bg-white/[0.1]"
              >
                <SituationIcon slug={sit.slug} className="h-9 w-9 shrink-0 text-brand-yellow" />
                <div>
                  <h3 className="text-lg font-bold">{sit.navLabel}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{sit.homeCard}</p>
                  <span className="mt-2 inline-block text-sm font-semibold text-brand-yellow group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
            <Link
              href="/sell-your-house"
              className="group flex gap-4 rounded-xl border border-brand-yellow/60 bg-brand-yellow/10 p-5 backdrop-blur-sm transition-colors hover:bg-brand-yellow/20 lg:col-span-2"
            >
              <SituationIcon slug="other" className="h-9 w-9 shrink-0 text-brand-yellow" />
              <div>
                <h3 className="text-lg font-bold">Something Else?</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  Bankruptcy, a bad neighborhood, a house you just want gone. If it is a house in the Central
                  Valley, call us at {site.phone}. Every situation gets a real answer and a real offer.
                </p>
                <span className="mt-2 inline-block text-sm font-semibold text-brand-yellow group-hover:underline">
                  See every situation we buy →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

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
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {counties
            // Kept off the homepage (Dominic, 2026-11-07); their pages still exist.
            .filter((c) => !["san-benito-county", "inyo-county", "monterey-county"].includes(c.slug))
            .map((county) => {
            const photo = countyPhotos[county.slug];
            // Top 3: featured cities first, then by population.
            const list = [...citiesInCounty(county.name)]
              .sort(
                (x, y) =>
                  Number(!!y.featured) - Number(!!x.featured) ||
                  Number(String(y.population).replace(/\D/g, "")) - Number(String(x.population).replace(/\D/g, "")),
              )
              .slice(0, 3);
            const wide = county.slug === "tulare-county" || county.slug === "fresno-county";
            return (
              <div
                key={county.slug}
                className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${wide ? "lg:col-span-2" : ""}`}
              >
                <Link href={`/counties/${county.slug}`} className="group relative block h-36 overflow-hidden bg-brand-black">
                  {photo && (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <h3 className="text-xl font-bold">{county.name}</h3>
                    <span className="text-sm font-semibold text-brand-yellow group-hover:underline">
                      View All Cities →
                    </span>
                  </div>
                </Link>
                <div className="flex flex-wrap gap-2 p-4">
                  {list.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/we-buy-houses/${c.slug}`}
                      className="rounded-full border border-gray-300 px-3 py-1 text-sm text-brand-black hover:border-brand-yellow-dark hover:text-brand-yellow-dark"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/we-buy-houses" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
            Browse Every County and City We Serve →
          </Link>
        </div>
      </section>

      {/* Google reviews slider (2026-11-07). Five real reviews, word for word
          from lib/reviews.ts, picked by Dominic. */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">Reviews</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-black md:text-4xl">What People Say About House Junkies</h2>
          </div>
          <div className="mt-10">
            <ReviewSlider reviews={homeReviews} />
          </div>
        </div>
      </section>

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
                  <StatusBadge status={p.status} className="absolute left-3 top-3 shadow-sm" />
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

      {/* Condensed comparison table, full version lives on /compare */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">Why Sell to Us Instead of Listing</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-brand-yellow/40 bg-brand-yellow/5 p-6">
            <div className="font-bold text-brand-black">Selling to {site.name}</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li>✓ No Repairs, Sold As-Is</li>
              <li>✓ No Agent Commissions</li>
              <li>✓ We Cover Closing Costs</li>
              <li>✓ No Financing Contingencies</li>
              <li>✓ Close in 7 to 30 Days, My Choice</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="font-bold text-gray-500">Listing With an Agent</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>• Repairs Often Required</li>
              <li>• Typically 5-6% in Commissions</li>
              <li>• Closing Costs Paid by the Seller</li>
              <li>• Can Fall Through on Financing</li>
              <li>• Typically 60 to 90+ Days</li>
            </ul>
          </div>
        </div>
        <Link href="/compare" className="mt-4 inline-block text-sm font-semibold text-brand-yellow-dark hover:underline">
          See the full comparison, with real numbers →
        </Link>
      </section>

      {/* Why us / authority */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-black">
          Vertically Integrated, Start to Finish
        </h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          Most cash-offer companies are a lead form with a phone number behind it. {site.name} is
          different: acquisitions, construction, and brokerage all happen under one roof, part of{" "}
          <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
            {site.parentOrganization}
          </Link>
          . That's what lets us pay more than a wholesaler and close faster
          than a company that has to shop your house to a stranger before they can buy it. The
          company is led by{" "}
          <Link href="/team/abel-ulloa" className="underline decoration-dotted underline-offset-2 hover:text-brand-yellow-dark">
            Abel Ulloa, Owner and CEO
          </Link>
          .
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 1 - Acquisitions</div>
            <p className="mt-2 font-semibold text-brand-black">{site.stats.homesBought} Houses Flipped</p>
            <p className="mt-1 text-sm text-gray-600">
              Ranked {site.stats.sfrAnalyticsRank} in Visalia and Tulare County by transaction volume,
              per {site.stats.sfrAnalyticsSource}. No banks slowing things down, just private money
              and trusted partners who move as fast as we do. This allows us to close quickly and
              efficiently.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 2 - Construction</div>
            <p className="mt-2 font-semibold text-brand-black">Renovated In-house</p>
            <p className="mt-1 text-sm text-gray-600">
              Our own licensed general contractor crew, {site.licenses.generalContractor}, handles
              every rehab, no out-of-town subcontractors. The same crew also builds ground-up new
              construction and full ADUs, from design through permitting to turnkey delivery.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="text-sm font-bold uppercase tracking-wide text-brand-yellow-dark">Step 3 - Brokerage</div>
            <p className="mt-2 font-semibold text-brand-black">{site.legacyRealEstate.agentCount} Agents, {site.legacyRealEstate.monthlyVolume}/mo</p>
            <p className="mt-1 text-sm text-gray-600">
              Resold with{" "}
              <Link href="/about" className="underline decoration-dotted underline-offset-2 hover:text-white">
                {site.legacyRealEstate.name}
              </Link>{" "}
              ({site.licenses.brokerage}), the{" "}
              {site.legacyRealEstate.countyRank.replace(/^the /i, "")}. Averaging{" "}
              {site.legacyRealEstate.monthlySales} home sales and {site.legacyRealEstate.monthlyVolume} in
              volume per month. Led by our broker,{" "}
              <Link href="/team/jenny-madrid" className="underline decoration-dotted underline-offset-2 hover:text-white">
                {site.people.broker.name}
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/about" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
            Read our full story →
          </Link>
          <Link href="/team" className="text-sm font-semibold text-brand-yellow-dark hover:underline">
            Meet the team →
          </Link>
        </div>
      </section>

      {/* Explore the Site - the only link to /explore lives here, on purpose */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-brand-black">Explore the Site</h2>
          <p className="mx-auto mt-2 max-w-xl text-gray-600">
            Every page on this site, laid out visually, cities, situations, the team, all of it.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-block rounded-full border-2 border-brand-yellow-dark bg-white px-6 py-3 font-semibold text-brand-black hover:bg-brand-yellow-dark hover:text-white"
          >
            See the Full Site Map →
          </Link>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brand-black">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">Ready for a No-Obligation Cash Offer?</h2>
          <p className="mt-2 text-white/70">Call, text, or fill out the form. We respond within 24 hours.</p>
          <a
            href={`tel:${site.phoneE164}`}
            className="mt-6 inline-block rounded-md bg-brand-yellow px-6 py-3 font-bold text-black hover:bg-brand-yellow-dark"
          >
            Call {site.phone}
          </a>
        </div>
      </section>
    </div>
  );
}
