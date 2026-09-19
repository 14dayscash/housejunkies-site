-- House Junkies Inc. — Supabase schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query → paste → Run).
-- Mirrors the Lead / ContactMessage / PartnerInquiry entities from the old Base44 app,
-- so no field gets lost in the migration, plus new tables for the case-study/proof engine
-- the SEO report calls for.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text not null,
  property_address text not null,
  property_city text,
  property_condition text check (property_condition in ('excellent','good','fair','needs_work','distressed')),
  situation text,
  timeline text,
  notes text,
  source_page text,           -- which page the lead came from, e.g. '/we-buy-houses/visalia'
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists partner_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  partner_type text,          -- 'agent' | 'wholesaler' | 'lender' | 'other'
  message text,
  created_at timestamptz not null default now()
);

-- Case study archive — the moat. One row per closed deal.
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  city text not null,
  situation text,
  address_or_area text not null,   -- street/neighborhood only, never a full address that IDs the seller
  condition_photos text[] default '{}',
  renovation_photos text[] default '{}',
  timeline_days integer,
  outcome_summary text not null,
  published_at timestamptz,
  voided boolean not null default false,  -- soft-delete only, never hard-delete a published case study
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text,
  body text not null,
  author text,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists market_reports (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  quarter text,                    -- e.g. 'Q3 2026'
  summary text,
  report_url text,                 -- link to the published PDF/page
  published_at timestamptz,
  created_at timestamptz not null default now()
);

-- Row Level Security: lock every table down by default, then open exactly what's needed.
alter table leads enable row level security;
alter table contact_messages enable row level security;
alter table partner_inquiries enable row level security;
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table market_reports enable row level security;

-- Anyone (anon key) can INSERT a lead/message/inquiry (the public forms), but never read them back.
create policy "anon can insert leads" on leads for insert to anon with check (true);
create policy "anon can insert contact_messages" on contact_messages for insert to anon with check (true);
create policy "anon can insert partner_inquiries" on partner_inquiries for insert to anon with check (true);

-- Published projects/posts/reports are readable by anyone (they power public pages).
create policy "anon can read published projects" on projects for select to anon using (published_at is not null and voided = false);
create policy "anon can read published blog_posts" on blog_posts for select to anon using (published_at is not null);
create policy "anon can read published market_reports" on market_reports for select to anon using (published_at is not null);

-- Everything else (reading leads, updating/deleting anything) only happens via the
-- service role key from server-side code — that key bypasses RLS entirely, so no
-- policy is needed for it, and none of these tables need one for authenticated/service use.
