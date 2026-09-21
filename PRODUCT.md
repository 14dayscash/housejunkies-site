# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: homeowners in Visalia, CA and the surrounding Central Valley facing a distressed or time-pressured sale situation, most concretely probate, foreclosure, inherited property, divorce, a tired/burned-out landlord, or a house needing repairs they can't afford or don't want to take on. They are trying to sell fast, avoid listing on the open market, avoid agent commissions/repairs/showings, and get cash in hand on a timeline they control.

Secondary: real estate agents evaluating the partner/referral program (`/partners/agents`, the 5-tier structure in `lib/partnerTiers.ts`). Not weighted equally with the primary seller audience; the site's core pitch and page structure are built around the seller, with the agent program as a secondary path.

## Product Purpose

House Junkies buys houses directly for cash, closes on the seller's timeline, and removes the friction of a traditional sale (no bank financing contingency, no agent commission, no repairs required before sale, no open-market showings). Success is a closed transaction the seller experienced as fast, straightforward, and honest.

## Positioning

Vertical integration is the mechanism a competitor can't truthfully copy without restructuring their business: House Junkies buys with its own capital (no bank), renovates with its own licensed general-contractor crew (House Junkies Construction, CA LIC#1077593), and resells through its own brokerage (Legacy Real Estate). No outside broker, no stranger the deal gets shopped to, no financing contingency from a third-party lender. This is the standing rebuttal to every generic "we buy houses" competitor site in the Central Valley.

## Operating Context

- Service area: Visalia, CA and the surrounding Central Valley (10 city pages under `/we-buy-houses/[city]`, populated with real Census/local data via `lib/cities.ts`).
- The seller's situation drives which content they land on: 12 situation pages under `/sell-your-house/[situation]` (`lib/situations.ts`), two of which (probate, foreclosure) carry real, deep legal/process content sourced from Dominic McClelland's existing posts on `dominicmcclelland.com`, since those situations carry real legal complexity (probate court process, foreclosure timelines/redemption rights) that generic filler would get wrong or make the site look uninformed about.
- Parent structure: House Junkies is part of Ulloa Investment Group, alongside House Junkies Construction (licensed GC) and Legacy Real Estate (brokerage). Abel Ulloa is CEO; Dominic McClelland is Operations Manager and the primary point of contact for this project.
- The site replaces a prior Base44 no-code site (`housejunkiesinc.base44.app`) that had real, documented credibility problems: a false BBB Accredited badge, fabricated testimonials reused across city pages, duplicate Google Business Profiles splitting review signal, broken JSON-LD pointing at the wrong domain, and zero published proof of any of the company's 350+ actual closed deals against competitors running 500-800+ pages.
- Deployed on Vercel (`housejunkiesinc.org`), auto-deploying on every push to `main`. Pushing to `main` is a production deploy, not a staging step.

## Capabilities and Constraints

- Stack: Next.js 14 (App Router, TypeScript), Tailwind CSS, Supabase (Postgres, RLS on), Web3Forms, Vercel. No CMS; content lives in TypeScript data files (`lib/site.ts`, `lib/cities.ts`, `lib/situations.ts`, `lib/partnerTiers.ts`, `lib/blogPosts.ts`) except genuinely dynamic/growing content (leads, case studies, blog posts), which lives in Supabase.
- `lib/site.ts` is the single source of truth for every company fact (name, address, phone, email, licenses, team bios, office locations, stats, social links). No page should hardcode a phone number, address, or stat directly; it must read from `site`.
- Lead capture: two 5-field forms (`LeadForm.tsx`, `ContactForm.tsx` - Name, Phone, Email, Property Address, Brief Description), plus an exit-intent modal mirroring a feature the old Base44 site had. Both write through Supabase (`leads`, `contact_messages` tables) and/or Web3Forms.
- Undecided/open: the `projects` Supabase table (case-study archive) is wired but empty beyond 1 real before/after property and 2 real Instagram embeds. This is a known, explicit gap, not an oversight to paper over with invented content.
- Reviews are hand-maintained in `app/reviews/page.tsx` (currently 3 real Google reviews, matched against the real Google Business Profile at 801 W Main St.), not a live-syncing widget.

## Brand Commitments

- Name: House Junkies Real black/yellow/white brand identity and real logo (not a placeholder). Palette: `brand-black` (#0a0a0a), `brand-charcoal` (#161616), `brand-yellow` (#f5c518), `brand-yellow-dark` (#d9ac0c) - defined in `tailwind.config.js`; no new colors without reason.
- Dark header/footer (`bg-brand-black`) wrapping a mostly-white body is a deliberate, established pattern (Home Helpers-style dark trust element against light content), not an accident to "fix."
- License format is fixed: `CA LIC#1077593` (no space before `#`) - corrected once already, don't regress it.
- Voice constraint: no em dashes anywhere, in code, copy, or comments. This has been swept from the repo more than once.
- Photography: real photos only (team headshots, office photos, one real before/after renovation, 2 real Instagram embeds via Instagram's own embed widget). Stock photography is explicitly avoided as a brand commitment, not just a preference.

## Evidence on Hand

- 350+ real closed transactions historically, but only 1 real before/after case study and 2 Instagram embeds are currently published; the Supabase `projects` archive is empty otherwise. This is the single highest-value real content gap per the original SEO audit - competitors can't structurally copy real closed-deal proof, but the site currently under-shows it.
- Exactly 3 real Google reviews exist and are shown honestly (one with text, two star-only) rather than padded to look fuller.
- Every stat on the site (350+ homes, 7+ years, $16.0M/110 deals, 220+ agents, $30M+/mo, etc.) traces to something Dominic provided directly, a document he supplied (an SFR Analytics report), or his own existing content on `dominicmcclelland.com`. New stats must be sourced from him, never estimated.
- **State explicitly for future work:** do not invent additional testimonials, reviews, case studies, closed-deal counts, or stats to make a page "look fuller." The empty parts of the Projects/Reviews pages are an honest, known gap, not a defect to silently patch with fabricated content.

## Product Principles

1. Nothing on this site is fabricated - this is the standing rule that shaped the rebuild after the old Base44 site's core failure (fake testimonials, a false accreditation badge). It overrides any competing goal, including "looking more complete" or "looking more polished."
2. Vertical integration (own capital, own licensed crew, own brokerage) is the positioning claim every page should reinforce or at least not contradict.
3. One source of truth per fact (`lib/site.ts` for company facts, `lib/cities.ts`/`lib/situations.ts` for page-specific real data) - never hardcode a fact that already has a canonical home.
4. Real content over generic filler: city and situation pages carry real researched local/legal facts, not templated boilerplate, even where that's more work.
5. Substance over polish when they conflict: a design tweak must never reintroduce fabricated content, stock photography, or an em dash to achieve a "cleaner" look.

## Accessibility & Inclusion

No product-specific accessibility requirement has been established beyond general web best practice; treat standard WCAG-level considerations (contrast, touch targets, semantic structure) as part of general design quality rather than a documented mandate.
