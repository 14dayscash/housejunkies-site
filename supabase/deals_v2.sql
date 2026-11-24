-- House Junkies - /deals v2 (run after deals.sql)
-- New statuses, Land deal type, Clean Out rehab, wizard and CRM columns,
-- and privacy: each user sees full details only on their own deals.
-- Everyone signed in can still see address, status, type, date and owner
-- of every deal through the deal_directory() function.

-- 1. Statuses
alter table public.deals drop constraint if exists deals_status_check;
update public.deals set status = case status
  when 'Lead' then 'New Lead'
  when 'Contract Sent' then 'Offer Sent'
  when 'Escrow' then 'Escrow Opened'
  when 'Rehab' then 'Closed'
  when 'Listed' then 'Closed'
  when 'Sold' then 'Closed'
  when 'Held' then 'Closed'
  else status end;
alter table public.deals alter column status set default 'New Lead';
alter table public.deals add constraint deals_status_check
  check (status in ('New Lead', 'Contacted', 'Offer Sent', 'Contract Signed', 'Escrow Opened', 'Closed'));

-- 2. Deal types (commercial kept for older rows)
alter table public.deals drop constraint if exists deals_deal_type_check;
alter table public.deals add constraint deals_deal_type_check
  check (deal_type in ('flip', 'rental', 'multifamily', 'land', 'commercial'));

-- 3. Rehab levels
alter table public.deals drop constraint if exists deals_condition_check;
alter table public.deals add constraint deals_condition_check
  check (condition in ('clean-out', 'cosmetic', 'cos-full', 'full', 'full-burnt', 'burnt'));

-- 4. New columns
alter table public.deals
  add column if not exists comps jsonb not null default '[]'::jsonb,
  add column if not exists listing_by text check (listing_by in ('legacy', 'self')),
  add column if not exists max_offer numeric,
  add column if not exists opening_offer numeric,
  add column if not exists apn text,
  add column if not exists lot_sqft integer,
  add column if not exists year_built integer,
  add column if not exists beds numeric,
  add column if not exists baths numeric,
  add column if not exists closing_date date,
  add column if not exists seller_name text,
  add column if not exists seller_phone text,
  add column if not exists seller_email text,
  add column if not exists lead_source text,
  add column if not exists occupancy text,
  add column if not exists mortgage_balance numeric,
  add column if not exists motivation text,
  add column if not exists follow_up_date date,
  add column if not exists notes text;

create index if not exists deals_created_by_idx on public.deals (created_by);

-- 5. Privacy: full rows only for the owner
drop policy if exists "deals_select_authenticated" on public.deals;
drop policy if exists "deals_insert_authenticated" on public.deals;
drop policy if exists "deals_update_authenticated" on public.deals;
drop policy if exists "deals_delete_authenticated" on public.deals;

create policy "deals_select_own" on public.deals
  for select to authenticated using (created_by = auth.uid());
create policy "deals_insert_own" on public.deals
  for insert to authenticated with check (created_by = auth.uid());
create policy "deals_update_own" on public.deals
  for update to authenticated using (created_by = auth.uid()) with check (created_by = auth.uid());
create policy "deals_delete_own" on public.deals
  for delete to authenticated using (created_by = auth.uid());

-- 6. Team view: the few fields everyone may see. Deals with no owner
-- (the original House Junkies purchases) show "House Junkies".
create or replace function public.deal_directory()
returns table (id uuid, address text, status text, deal_type text, deal_date date, owner_name text, is_mine boolean)
language sql
stable
security definer
set search_path = public, auth
as $$
  select
    d.id,
    d.address,
    d.status,
    d.deal_type,
    coalesce(d.purchase_date, d.created_at::date) as deal_date,
    case
      when d.created_by is null then 'House Junkies'
      else coalesce(
        nullif(u.raw_user_meta_data->>'full_name', ''),
        nullif(u.raw_user_meta_data->>'display_name', ''),
        nullif(u.raw_user_meta_data->>'name', ''),
        initcap(split_part(u.email, '@', 1))
      )
    end as owner_name,
    coalesce(d.created_by = auth.uid(), false) as is_mine
  from public.deals d
  left join auth.users u on u.id = d.created_by
  where auth.uid() is not null
  order by coalesce(d.purchase_date, d.created_at::date) desc, d.created_at desc;
$$;

revoke all on function public.deal_directory() from public, anon;
grant execute on function public.deal_directory() to authenticated;
