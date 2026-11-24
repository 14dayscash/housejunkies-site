-- House Junkies - internal deal tracker (/deals)
-- Run this once in the Supabase SQL Editor (SQL Editor -> New query -> paste -> Run).
-- Safe to run again: the table, policies and seed rows are only created if missing.
--
-- Access: only signed-in team members (accounts created in the Supabase
-- dashboard under Authentication -> Users) can read or change deals. The anon
-- key alone sees nothing.

create extension if not exists pgcrypto;

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  created_by uuid default auth.uid() references auth.users (id) on delete set null,
  address text not null,
  deal_type text not null default 'flip'
    check (deal_type in ('flip', 'rental', 'multifamily', 'commercial')),
  status text not null default 'Lead'
    check (status in ('Lead', 'Contract Sent', 'Escrow', 'Rehab', 'Listed', 'Sold', 'Held')),
  purchase_date date,
  list_price numeric,
  purchase_price numeric,
  loan_total numeric,
  sqft integer,
  condition text
    check (condition in ('cosmetic', 'cos-full', 'full', 'full-burnt', 'burnt')),
  closing_costs numeric default 5000,
  assignment_fee numeric,
  months integer default 6,
  interest_rate numeric default 10,
  arv numeric,
  resale_price numeric,
  resale_date date,
  exit_notes text
);

create index if not exists deals_status_idx on public.deals (status);
create index if not exists deals_created_at_idx on public.deals (created_at desc);

-- Row level security: authenticated users only.
alter table public.deals enable row level security;

revoke all on public.deals from anon;
grant select, insert, update, delete on public.deals to authenticated;

drop policy if exists "deals_select_authenticated" on public.deals;
create policy "deals_select_authenticated" on public.deals
  for select to authenticated using (true);

drop policy if exists "deals_insert_authenticated" on public.deals;
create policy "deals_insert_authenticated" on public.deals
  for insert to authenticated with check (true);

drop policy if exists "deals_update_authenticated" on public.deals;
create policy "deals_update_authenticated" on public.deals
  for update to authenticated using (true) with check (true);

drop policy if exists "deals_delete_authenticated" on public.deals;
create policy "deals_delete_authenticated" on public.deals
  for delete to authenticated using (true);

-- Seed: the real purchases already published in lib/properties.ts.
-- Deal type and status are a best first mapping from the site data
-- (Sold -> Sold, For Sale -> Listed, Rented -> Held / rental, Acquired -> Held).
-- Loan, condition and ARV are not in the site data, so they are left blank.
-- Each row is skipped if a deal with the same address already exists.
insert into public.deals (address, deal_type, status, purchase_date, purchase_price, sqft, resale_price, resale_date, exit_notes)
select v.address, v.deal_type, v.status, v.purchase_date::date, v.purchase_price, v.sqft, v.resale_price, v.resale_date::date, v.exit_notes
from (values
  ('50 E Locust Ave, Porterville, CA 93257',        'multifamily', 'Held',   '2026-09-14', 250000, 3526, null::numeric, null, null),
  ('220 S Dode Ave, Farmersville, CA 93223',        'flip',        'Held',   '2026-07-21',  90000,  456, null, null, null),
  ('32750 Lincoln Rd, Visalia, CA 93291',           'flip',        'Sold',   '2026-07-15', 165000,  550, 247500, '2026-08-27', null),
  ('343 Westside St, Porterville, CA 93257',        'flip',        'Held',   '2026-07-24',  65000,  863, null, null, 'Mobile home'),
  ('921 S Cottage St, Porterville, CA 93257',       'flip',        'Held',   '2026-08-23', 105000,  915, null, null, null),
  ('215 S Crumal St, Visalia, CA 93292',            'flip',        'Held',   '2026-07-29', 220000, 1150, null, null, null),
  ('2333 E Springville Ave, Porterville, CA 93257', 'flip',        'Held',   '2026-09-13', 190000, 1000, null, null, null),
  ('756 S Oliver St, Tulare, CA 93274',             'flip',        'Listed', '2026-09-24', 175000,  936, null, null, 'Listed at $279,900'),
  ('40074 Road 56, Dinuba, CA 93618',               'flip',        'Held',   '2026-09-18', 250000, 2347, null, null, null),
  ('41 Chess Terrace St, Porterville, CA 93257',    'multifamily', 'Held',   '2026-09-12', 190000, 1297, null, null, null),
  ('765 S C St, Tulare, CA 93274',                  'flip',        'Listed', '2026-10-05', 206000, 1032, null, null, 'Listed at $299,990'),
  ('19667 Avenue 195, Strathmore, CA 93267',        'commercial',  'Listed', '2026-07-27', 125000, 1640, null, null, 'Church building. Listed at $209,990'),
  ('207 Pleasant St, Lindsay, CA 93247',            'multifamily', 'Held',   '2026-08-27', 150000, 1176, null, null, null),
  ('27266 Avenue 146, Porterville, CA 93257',       'flip',        'Held',   '2026-08-17', 129000, 1170, null, null, 'Mobile home'),
  ('425 W Willow St, Exeter, CA 93221',             'rental',      'Held',   '2026-08-13', 160000,  680, null, null, 'Rented at $1,600 a month'),
  ('24215 Avenue 216, Lindsay, CA 93247',           'flip',        'Held',   '2026-08-20', 350000, 3020, null, null, null)
) as v(address, deal_type, status, purchase_date, purchase_price, sqft, resale_price, resale_date, exit_notes)
where not exists (select 1 from public.deals d where d.address = v.address);
