# House Junkies - housejunkiesinc.org

Next.js 14 (App Router) + Tailwind CSS + Supabase + Web3Forms + Vercel.

Same stack as [jd-sales-consulting](https://github.com/itsjohndoe559/jd-sales-consulting)
(Next.js + Supabase + Vercel), same content conventions as
[dominicmcclelland.com](https://github.com/14dayscash/Landing-Page) (single
config file for contact info, per-route metadata, markdown-friendly structure).

## Stack

- Next.js 14, App Router, TypeScript
- Tailwind CSS
- Supabase (Postgres) - leads, contact messages, partner inquiries, project
  case studies, blog posts, market reports
- Web3Forms - instant email notification on every form submission
- Vercel - hosting + deploys on push to `main`

## First-time setup

1. **Supabase**: create a project, then run `supabase/schema.sql` in the SQL
   Editor (Project → SQL Editor → New query → paste the whole file → Run).
   This creates all six tables and locks them down with Row Level Security  - 
   the public can only INSERT into leads/contact_messages/partner_inquiries,
   never read them back, and can only read PUBLISHED projects/posts/reports.
2. **Environment variables**: copy `.env.example` to `.env.local` and fill in
   the Supabase URL + anon key + service role key (Project Settings → API),
   and the Web3Forms access key.
3. **Install & run locally**:
   ```
   npm install
   npm run dev      # http://localhost:3000
   npm run build    # production build
   ```
4. **Deploy**: this repo is connected to Vercel already. Add the same four
   env vars in Vercel → Project → Settings → Environment Variables, then any
   push to `main` deploys automatically.

## Editing content

- `lib/site.ts` - phone, email, address, licenses, social links. Change once,
  it propagates everywhere (footer, schema.org markup, every page).
- `lib/cities.ts` - one entry per `/we-buy-houses/[city]` page. Entries
  marked `needsRealContent: true` are placeholders and are deliberately left
  out of the sitemap until filled in with real neighborhoods/zips and at
  least one linked project (see Section 15 of the SEO report: a page ships
  only once it has one real local detail).
- `lib/situations.ts` - one entry per `/sell-your-house/[situation]` page.
- `supabase` table `projects` - the case-study archive. One row per closed
  deal: city, situation, address_or_area (street/neighborhood only, never a
  full address), photos, timeline, outcome. This is the moat the SEO report
  is built around; publish one within 7 days of every closing.
- `supabase` table `blog_posts` - same idea as the dominicmcclelland.com
  blog, but stored in Supabase instead of markdown files since this site's
  content is expected to be edited by more than one person over time.

## Things intentionally left as TODOs, on purpose

Grep the codebase for `TODO` - every one is a spot where I did not want to
invent a fact, a testimonial, a formula, or legal copy. Search:
```
grep -rn "TODO" app lib components
```
