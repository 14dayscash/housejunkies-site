# CLAUDE.md: housejunkiesinc.org

Read this whole file before touching anything. It is the shared memory for every
Claude session that works on this site. When you finish a meaningful change,
update the "Recent decisions" and "Open items" sections at the bottom so the
next session knows.

Read `claude/SITE_PROFILE.md` (in the project) for the look, voice and SEO
guardrails every page follows since the Nov 2026 revamp.

---

## 1. What this is

- **Business:** House Junkies Inc., a cash home buyer in Visalia, CA. Part of
  **Ulloa Investment Group**, which also owns **House Junkies Construction**
  (licensed GC, CA LIC#1077593) and **Legacy Real Estate** (brokerage, DRE #02165291).
- **People:**
  - **Abel Ulloa**: Owner/CEO. Always "Owner/CEO" or "Owner and CEO", never "President".
    Realtor Lic #01957925. Instagram: instagram.com/abelardoulloarealtor
  - **Dominic McClelland**: Operations Manager, COO of House Junkies Construction.
    He is the person you are working with. He edits through GitHub too.
  - **Jenny Madrid**: Broker of Legacy Real Estate, DRE #01882650.
  - **Omar Ayon**: House Junkies Construction.
- **Office:** 801 W Main Street, Visalia, CA 93291. Phone (559) 368-8956.
- **Audience:** Central Valley homeowners who need to sell (probate, foreclosure,
  inherited, tenants, damage, code violations, as-is). Secondary: buyers of our
  properties (`/buy`), agents and partners (`/partners/agents`), construction clients.
- **Sister site:** dominicmcclelland.com (Dominic's personal blog and lead farm,
  separate repo). Its posts are summarized in `lib/blogPosts.ts`.

## 2. Stack and deploy

- Next.js 14 App Router + TypeScript + Tailwind, Supabase (leads, contact_messages,
  partner_inquiries, projects), Web3Forms for lead emails, Vercel hosting.
- Repo: github.com/14dayscash/housejunkies-site. **A push to `main` is a production
  deploy.** There is no staging. Vercel keeps the old site live if a build fails.
- Before pushing: `git pull --rebase` first (Dominic and other sessions also push),
  then `npx tsc --noEmit`. **Do NOT run `next build` or take screenshots to check
  changes (Dominic, 2026-11-06): he checks the live site himself.** Push after the
  type check passes, and only build or screenshot if something can't be judged any
  other way (and say why first).
- Full build in a sandbox: Google Fonts and Supabase are unreachable, so mock them:
  `NEXT_FONT_GOOGLE_MOCKED_RESPONSES=<mock.js> NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=x SUPABASE_SERVICE_ROLE_KEY=x npx next build`
  where mock.js exports a Proxy returning a dummy `@font-face` CSS string.
- Never store or repeat GitHub tokens. Never commit `.env.local`.

## 3. Where content lives (single sources of truth)

No CMS. Content is TypeScript data. Edit the data file, not the page.

| File | What it holds |
|---|---|
| `lib/site.ts` | Every company fact: name, phone, address, licenses, stats (350+ homes, 7+ years, SFR #1), people bios. Pages must read from here, never hardcode. |
| `lib/cities.ts` | 63 city pages (`/we-buy-houses/[city]`). `featured` = top 12. Visalia has `longContent`. |
| `lib/cityFacts.ts` | Sourced Census data for all 63 cities (2020 count, July 2025 estimate, home value, owner rate, rent, income, household size, education, area) plus "about" history lines and incorporation dates. Rendered by `components/CityFactsSection.tsx` on every city page. Small towns QuickFacts does not cover only have the 2020 count, area, elevation and history. Add facts here, with a source. |
| `lib/counties.ts` | 10 county hub pages (`/counties/[county]`). |
| `lib/situations.ts` | 13 situation guides (`/sell-your-house/[situation]`). Optional `details`, `keySteps`, `faqs`, `localSection` (sourced Visalia/Tulare County detail). |
| `lib/combos.ts` + `lib/localFacts.ts` | 90 city + situation pages (`/we-buy-houses/[city]/[situation]`): 15 cities x 6 situations. `localFacts.ts` holds sourced county court/recorder/code agency facts and each city's code enforcement office. Add facts there, not in templates. |
| `lib/properties.ts` | Real purchases (16 so far) powering `/projects`, `/projects/[slug]`, `/buy` listings, city-page purchase cards, home strip. Photos in `public/images/properties/<slug>.jpg` and `<slug>-sm.jpg`. |
| `lib/houseJunkiesPosts.ts` | House Junkies blog posts (`/blog/[slug]`). Body lines: `## ` = H2, `### ` = H3, `![caption](/images/...)` = image (property photos auto-link to their page). Optional `heroImage` (also the link-preview image), `summary` (3 bullets), `links`. Newest first. |
| `lib/blogPosts.ts` | Summaries of dominicmcclelland.com posts, shown below House Junkies posts on `/blog`. |
| `lib/reviews.ts` | Real Google reviews (hand-maintained, word for word). Used by `/reviews` and the Visalia page. |
| `lib/teamProfiles.ts` | Team pages, Person schema `sameAs`. |
| `lib/buyPages.ts` | Buyer-side pages (`/buy/investment-property`, `/commercial-buildings`, `/vacant-land`). |
| `lib/partnerTiers.ts` | Partner and referral program tiers. |

Useful components: `RichText` (renders `[text](/path)` links inside data strings),
`Linkify` (auto-links company and people names), `JsonLd` (Organization/LocalBusiness
sitewide, Person, FAQ, Breadcrumb), `LeadForm`, `ContactForm`, `HeroOfferForm`,
`AddressInput`, `BuyerInquiryForm`, `PropertyCard`, `ListingBroker`.

## 4. Standing rules from Dominic (do not break these)

**Writing**
- **No em dashes anywhere** (site copy, commits, chat). Use a hyphen or rewrite.
- **Plain words for Central Valley homeowners.** "Simple" means no big words.
  It does NOT mean shorter or dumbed down. Keep full detail, full sentences, the
  LLC names, the timelines. Never cut content to "simplify". A past session did
  this and it was reverted.
- Write for sellers, not for Dominic. No insider jargon ("combined", "breakdown",
  "transaction volume" in seller-facing labels, "acquired"). Stat labels short and
  plain: "What We Paid", "Houses", "Cities".
- Use "MY" in seller CTAs ("Get My Cash Offer").

**Truth**
- **Nothing fake.** No invented reviews, testimonials, case studies, local facts,
  phone numbers, or departments. Every local fact needs a real source (official
  city/county site or named news source). If you cannot source it, write general
  true wording instead.
- **Funding wording (Dominic, 2026-11-06, replaces the 2026-10-16 rule):** OK to say
  "Ulloa Investment Group funds every deal in-house. No banks, no hard money
  companies, no outside investors." and "we close / acquire with our own capital".
  Never use "with in-house funding".
- **350+ homes over 7+ years is the headline claim. Never undercut it.** Recent
  purchases (30+ in the last 6 months, 16 shown on /projects) are framed as a snapshot
  on top of 350+, never as the total.
- SFR Analytics: #1 investor in Visalia by volume. In new copy do not quote the old
  $16.0M / 110 deals numbers (they have gone up). BBB Accredited, A+ (no date needed).
- Close: 14 days standard, as quick as 7 but rare. Written offer within 24 hours.
- **Blog posts:** read `claude/BLOG_BRAIN.md` (voice, structure, facts, what is
  already covered) and `claude/BLOG_GAP_LIST.md` before drafting. New posts go on
  housejunkiesinc.org, written as "we", author Dominic McClelland linked to
  /team/dominic-mcclelland.
- Estimated values on property pages are labeled as automated estimates, not
  appraisals. They stay. The paid-vs-estimate chart was removed on purpose.

**Process**
- **No blog post goes live without Dominic's explicit "post" or "push".** Draft
  first (plain .txt), show it, then publish.
- Do not change things he did not ask for. When asked for "only X", change only X.
- Add to pages, do not strip or rewrite existing content unless asked.
- Never overwrite his GitHub edits: always pull before pushing.
- He prefers concrete options over open questions, one question at a time when
  walking through open items, and short, direct replies.

**Design**
- Brand: black, white, `brand-yellow` / `brand-yellow-dark`. Dark hero, light body.
- Mobile first. Hamburger menu shows up to 1024px (`lg`). Mobile menu: yellow
  "EXPLORE" label, 4-column link grid, compact city and situation pills.
- Purchase price is the big number on every property card and page, labeled
  "Purchased For" directly above it. List, sold, or rent price is a smaller line under it.
- For-sale listings show the Legacy Real Estate logo + DRE #02165291 and Jenny
  Madrid's photo + DRE #01882650 (`ListingBroker`).
- Construction page (`/construction`) is linked only from the footer, About and
  Team pages (and search), not the main nav.
- Reviews page restyled on request 2026-11-08; otherwise leave its layout alone.

## 5. SEO approach

**STRATEGY (set by Dominic, 2026-10-16, overrides any cautious wording below):
WE ARE TRYING TO TAKE OVER, one street and one site at a time.**
- If a competitor ranks with a page type, we build that page type too, and we build
  more of it. Home Helpers Group has 245 city + situation pages, city + zip pages and
  several versions of each city page ("we buy houses", "sell my house fast", and so
  on). We match that volume and beat it. Do NOT hold back a page type because Google
  guidance or a past Claude note said it might look risky. Dominic has decided.
- Cover every way a seller searches. If sellers search four different ways, we have
  four pages. Specific long-tail searches beat head terms. His example: an attorney
  wins more by writing "punishment for 4 grams of cocaine possession in Visalia" than
  by chasing "criminal defense attorney Visalia". For us that means pages and posts
  like "sell inherited house in Tulare with no probate attorney", not just "we buy
  houses Tulare".
- Page types that are now on the table: city + situation (all 63 cities, not just 15),
  keyword variants per city, ZIP code and neighborhood pages, street and subdivision
  level pages, question pages, and a big blog push to catch up to Home Helpers.
- Dominic's one guardrail, in his words: more information is good "as long as its not
  duplicate", and never sacrifice the trust, indexing and rankings we already have.
  So every new page must carry its own substance: its own data (Census numbers in
  `lib/cityFacts.ts`, county and city agency facts in `lib/localFacts.ts`, real
  purchases in `lib/properties.ts`), its own FAQs, its own local detail. Never ship
  the same body text with a city or keyword swapped in. Claude's one recorded note
  (do not repeat it as a lecture): near-identical pages are what Google folds into
  each other, and the 11 "Duplicate without user-selected canonical" pages in Search
  Console on 2026-10-16 were exactly that. Unique data per page is how we get the
  volume without that outcome.
- Roll pages out in waves and watch Search Console (Page indexing report) between
  waves. If a wave sits in "Discovered, currently not indexed" or "Duplicate", add
  unique content to those pages before the next wave.
- Every page still needs a self-canonical, a place in the sitemap, and internal links
  in and out.

- Based on Google Search Essentials and helpful-content guidance, structured data
  docs, and Dominic's Search Console data. No tricks.
- Titles: situation or keyword + city up front, e.g.
  "Code Violations in Visalia? Sell Your House As-Is for Cash". The layout appends
  " | House Junkies", so page titles must NOT include the brand themselves
  (use `title: { absolute: ... }` when the brand should be dropped).
- City pages: keyword H2s ("Cash Home Buyers in {City}", etc.), FAQ questions as
  real H3s with FAQPage schema.
- Combo pages must stay genuinely different per city (local agency facts, city
  facts, real purchases). Thin copy-paste pages are not allowed, but ZIP-code pages
  and multiple keyword versions of a city page ARE allowed now (see STRATEGY above),
  as long as each one has its own data and content.
- Internal links everywhere they help: situation pages link to Visalia and other
  situations; city pages link to their combos; combos link to siblings, nearby
  cities, the city page and the situation guide.
- Star ratings in search results come from the Google Business Profile, not from
  our schema. Meta descriptions no longer contain star text.
- Schema: Organization/LocalBusiness on every page (from `site.ts`), Person on team
  pages (with `sameAs`), FAQPage, BreadcrumbList, ItemList on /projects,
  GeneralContractor on /construction.

## 6. How to do common jobs

- **Add a purchased property:** add one object to `lib/properties.ts`, add
  `<slug>.jpg` (~1100px) and `<slug>-sm.jpg` (640px) to `public/images/properties/`.
  Everything else (projects, detail page, city cards, /buy if For Sale, sitemap)
  updates automatically. Status changes (For Sale to Sold) are edited there too.
- **Add a blog post (since 2026-11-06):** one file per post at `lib/posts/<slug>.ts`
  exporting `post`, registered in `lib/posts/index.ts`. Body formatting (bullets,
  numbered lists, tables, **bold**, *italic*, [links](/path), tap-to-call phone,
  `[[FAQ]]` marker) is documented at the top of `components/BlogBody.tsx`. Put FAQs
  in `faqs` (rendered as H3s + FAQPage schema). Set `authorSlug: "dominic-mcclelland"`.
  Authoring shortcut: write the draft in the .txt format and run
  `brain/md2post.py` (kept in the session, see BLOG_BRAIN.md). Posts sit on a branch
  until Dominic says "post"; only then merge to `main`.
- **Add a local fact:** `lib/localFacts.ts` (county or city), with its source URL.
- **Add city data:** `lib/cityFacts.ts`. QuickFacts is at
  `census.gov/quickfacts/fact/table/<place>citycalifornia/PST045224` (places with
  5,000+ people). Smaller places use their Wikipedia page, which cites the 2020 Census.
- **Add a city page:** `lib/cities.ts` (real Census population and zip codes, a
  real market note, 5 real quick facts). Sitemap, footer and llms.txt update automatically.
- **Change a company fact:** `lib/site.ts` only.

## 7. Competitors (October 2026 snapshot)

- Home Helpers Group (homehelpersgroup.com): about 570 URLs, 245 city + situation
  pages, 214+ blog posts, around 221 reviews, since 2013. Some template errors.
- Matt Buys Houses (fastcashcloser.com): 256 URLs, many near-duplicate city pages.
- Osborne Homes, Central Valley House Buyer, Romine Group (about $5.64M / 30 deals on SFR).
- Our gaps: blog volume, review count, backlinks and listing-site mentions
  (HomeLight, Clever, Real Estate Witch, Visalia Chamber).

## 8. Measurement

- Search Console baseline (Sept 18 to Oct 13, 2026): 961 impressions, 25 clicks,
  2.6% CTR. Brand queries fine ("house junkies inc" about #2). No non-brand clicks yet.
- Re-pull on **Oct 29** and **Nov 12**. Watch: the 4 situation pages
  (code-violations, vacant, foreclosure, fire-damage), the Visalia page, the
  "abel ulloa" query, the 90 combo pages, and the homepage title test (started Oct 8).
  Judge by impressions trend, not average position.

## 9. Recent decisions (newest first, keep this updated)

- 2026-11-08 (night): Homepage order changed by Dominic to: Header, Hero, Stats bar,
  How It Works, Cash vs Listing (#compare), Situations, Reviews, soft CTA, Cities,
  Recent Purchases, One Call One Team, FAQ (#faq), Explore, Footer.
- 2026-11-08 (later): Every remaining page moved to the new look in one push:
  city (63), city + situation (90), situation (13), county (10), contact,
  how-it-works, partners/agents, construction, reviews, projects/[slug],
  buy/[type], blog index, get-offer-success, 404. Same words, H1/H2/H3 keyword
  headings, FAQs, schema and URLs; only the containers changed. New shared
  helpers in Shared.tsx: Section, Pills, CheckList, FactList, OfferCard
  (sidebar form with "Get Your FREE Offer" top), Sources, cardCls;
  ReviewsSection now takes title/sub/children. CityFactsSection restyled.
  All arrow links are Title Case. Dominic: do not police his figures ("7 to 30
  days", "as little as 7", private capital/lenders, older SFR numbers are fine).
- 2026-11-08: Site-wide overhaul to match the homepage. Shared sections live in
  `components/sections/Shared.tsx` (PageHero, SectionHeader, ReviewsSection,
  CompareMini/CompareCards, SituationGrid, CountyGrid, FaqList) with content in
  `lib/homeContent.ts`. Every major page ends with the Google review slider.
  Overhauled: /get-offer (Get Your FREE Offer on the form, Why Choose Us box),
  /how-we-calculate-your-offer, /sell-your-house, /we-buy-houses, /projects (stat
  line and Featured Renovation removed), /buy, /compare (check vs X cards),
  /about (AI team photo removed, less ego, same facts), /team, /team/[slug], /faq
  (dropdowns, "House Junkies Frequently Asked Questions"). /explore untouched.
- 2026-11-07: Homepage revamp finished (order: Header, Hero, Stats bar, How It Works,
  Situations, Cities by county, Google review slider, Recent Purchases snapshot,
  Cash vs Listing comparison (#compare), One Call One Team (vertical integration),
  soft CTA with Visit in Person, 8-question FAQ dropdown (#faq), site map button,
  Footer). Desktop header: once the sticky offer shows, the glowing offer form
  REPLACES the nav links (logo left, phone right). Phones: floating card under the
  header. **Standing rule (Dominic): the homepage carries the internal linking, and
  homepage buttons keep the visitor on the homepage (jump to #compare, #faq, etc.)
  unless the link is clearly to a specific page (projects, FAQ page, about, team).**
- 2026-11-06: Homepage header + hero overhaul (Dominic's mockup, modeled on Home
  Helpers / Dean Rogers). Header: original small logo + "House Junkies" wordmark
  (Dominic preferred it over the full logo), About/FAQ/Reviews/Projects/Blog/Partner/
  Contact centered, yellow phone pill. The We Buy Houses and Situations dropdowns
  were removed from the desktop nav at his request (mobile menu and footer keep
  them). Hero: office photo background (desktop uses a tighter crop,
  `hero-office-desktop.jpg`, so the House Junkies sign shows), 50% black overlay,
  Abel cutout left with name block ("CEO & Owner" is Dominic's wording), white
  card right with the H1 "Sell Your Home Fast in the Central Valley!", "Get Your
  FREE Offer in Less Than 24 Hours", address + Get My Offer, 3 checkmarks, Google
  + BBB badges. Hero is one screen tall on desktop (fits 1365x600 with no scroll).
  Do not change colors or fonts from his mockups.
- 2026-11-06: Blog: FAQ is a native dropdown (details/summary), post hero image is
  small inside the black header with a thin white border, hero images are free
  Unsplash stock. Vercel preview deploys fail on this project (production is
  fine); judge deploys by the Production deployment status, not the commit status.
- 2026-11-06: Blog page upgraded live on main; drafts wait on branch `blog-drafts`: `components/BlogBody.tsx`
  renderer, BlogPosting + Breadcrumb schema on every post, FAQPage schema, byline
  links to team page, per-file posts in `lib/posts/`. Old 3 posts render unchanged.
- 2026-11-06: Built BLOG_BRAIN.md from all 13 posts and BLOG_GAP_LIST.md (about 115
  post ideas from Home Helpers' ~385 posts). Plan: upload 1 = blog posts, upload 2 =
  more city + situation pages. Funding wording changed to option B (see section 4).
  Facts confirmed: 30+ buys in 6 months, $45M+ volume, ~50 employees, Legacy 220+
  agents and 80+ sales / $30M+ a month, $1M+ paid to partners.
- 2026-10-16: Strategy change from Dominic: match and beat competitors on page volume
  and search coverage (see STRATEGY in section 5). Unique content per page is the
  only guardrail.
- 2026-10-16: Indexing audit from Search Console (68 indexed, 11 duplicate without
  user-selected canonical, 19 discovered not indexed, 2 www redirects, 1 old noindex).
  Cause: thin or template-heavy pages (small cities, contact, FAQ, construction,
  partners) plus a young domain with a big new batch in the crawl queue. Canonicals,
  robots and sitemap were all correct. The www redirect is normal. The homepage
  noindex was from before the repo existed (old Base44 site).
- 2026-10-16: Expanded contact, FAQ (12 to 30 questions, grouped), construction and
  partners pages. Added `lib/cityFacts.ts` and `CityFactsSection` to all 63 city
  pages. Corrected 43 city populations to the 2020 Census count (several were old
  rounded numbers, for example Clovis, Hollister, Los Banos, Marina). Fixed the
  Los Banos "county seat" line (Los Banos is not a county seat).

- 2026-10-15: 90 combo pages (15 cities x 6 situations) with sourced local facts.
- 2026-10-15: Situation pages got Visalia/Tulare County sections, more FAQs, new
  titles (old titles are in the commit message of 11c5730). Visalia page got real
  Google reviews and "Part of Ulloa Investment Group". Abel's Person schema has Instagram.
- 2026-10-14: Acquisitions feature merged (/projects gallery, detail pages, /buy
  listings). Blog post "A Snapshot of What We Have Been Buying" published.
- 2026-10-14: A "simplify" pass that cut detail was reverted. Rule: plain words, full detail.
- 2026-10-08: Duplicate brand in titles fixed, keyword city headings, hoarder page,
  construction page, buy pages, homepage title test.

## 10. Open items

- Google Places autocomplete for address fields: code is in, needs an API key with
  billing (`NEXT_PUBLIC_GOOGLE_PLACES_API_KEY`). Dominic deferred it.
- Abel's Facebook URL for `sameAs` (only add a URL Dominic gives you).
- No official code enforcement source found yet for Clovis, Exeter, Lindsay, Delano,
  or county code agencies for Kings, Merced, Madera. Those pages use general wording.
- City pages: every city now has a Census data section and, for 29 of them, "about"
  history lines. Still to do: "about" lines for the other 34 cities, unique hero
  descriptions (59 of 63 still share one), and real purchases once Dominic adds them.
- Request indexing in Search Console for the top pages, and click "Validate fix" on
  the 11 duplicate pages after the next deploy. Re-pull Search Console Oct 29, Nov 12.
- Next waves under the new strategy: city + situation pages for all 63 cities,
  keyword variants, ZIP and neighborhood pages, then the big blog batch.
- Internal link block (links to the pages Google has not crawled yet) on the homepage
  and footer. Explained to Dominic, waiting on his yes.
- Blog content push (Dominic plans a big batch). Review push on the Google
  Business Profile. Listing-site and directory mentions.
- Better property photos to replace some current ones (921 S Cottage St first).
