-- House Junkies - /deals v4: wholesaler / partner accounts (run after deals_v3.sql)
--
-- Partners (outside wholesalers like Central Valley Homebuyer) use the same app
-- and login page, but:
--   * they only ever see their own deals (no Team Deals),
--   * if they enter an address we already have, they are told
--     "House Junkies has already saved this deal" and never who has it.
-- The team still sees partner deals in Team Deals, and admins see everything.
--
-- Add a partner in the SQL editor (one line each):
--   select private.add_partner('Evan Rocha', 'email@example.com', 'Password2026');
-- Turn an existing account into a partner:
--   select private.make_partner('email@example.com');

-- 1. Partner list
create table if not exists public.partners (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.partners enable row level security;
create policy "partners_read_self" on public.partners
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_partner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.partners p where p.user_id = auth.uid());
$$;
grant execute on function public.is_partner() to authenticated;

-- 2. Team Deals list: partners only get their own rows back
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
    and (not public.is_partner() or d.created_by = auth.uid())
  order by coalesce(d.purchase_date, d.created_at::date) desc, d.created_at desc;
$$;

-- 3. Duplicate address check, done in the database so partners never see
--    other deals. "765 South C Street" matches "765 S C St".
create schema if not exists private;

create or replace function private.addr_norm(a text)
returns text
language sql
immutable
as $$
  select array_to_string(array(
    select case w
      when 'street' then 'st' when 'avenue' then 'ave' when 'av' then 'ave' when 'road' then 'rd'
      when 'drive' then 'dr' when 'boulevard' then 'blvd' when 'lane' then 'ln' when 'court' then 'ct'
      when 'place' then 'pl' when 'circle' then 'cir' when 'terrace' then 'ter' when 'highway' then 'hwy'
      when 'parkway' then 'pkwy' when 'trail' then 'trl' when 'square' then 'sq'
      when 'north' then 'n' when 'south' then 's' when 'east' then 'e' when 'west' then 'w'
      when 'northeast' then 'ne' when 'northwest' then 'nw' when 'southeast' then 'se' when 'southwest' then 'sw'
      else w end
    from unnest(regexp_split_to_array(lower(regexp_replace(coalesce(a, ''), '[^a-zA-Z0-9]+', ' ', 'g')), '\s+')) with ordinality as x(w, i)
    where w <> '' and w not in ('ca', 'california', 'usa', 'us') and w !~ '^[0-9]{5}$'
    order by i
  ), ' ');
$$;

-- Returns who has the deal: "You", a teammate's name, or (for partners and
-- for the original purchases) just "House Junkies".
create or replace function public.find_existing_deal(addr text, exclude_id uuid default null)
returns table (owner_label text, is_mine boolean)
language sql
stable
security definer
set search_path = public, auth, private
as $$
  select
    case
      when d.created_by = auth.uid() then 'You'
      when public.is_partner() or d.created_by is null then 'House Junkies'
      else coalesce(
        nullif(u.raw_user_meta_data->>'display_name', ''),
        nullif(u.raw_user_meta_data->>'full_name', ''),
        initcap(split_part(u.email, '@', 1))
      )
    end,
    coalesce(d.created_by = auth.uid(), false)
  from public.deals d
  left join auth.users u on u.id = d.created_by
  where auth.uid() is not null
    and (exclude_id is null or d.id <> exclude_id)
    and (
      (
        private.addr_norm(split_part(d.address, ',', 1)) = private.addr_norm(split_part(addr, ',', 1))
        and (
          position(',' in d.address) = 0
          or position(',' in addr) = 0
          or private.addr_norm(split_part(d.address, ',', 2)) = private.addr_norm(split_part(addr, ',', 2))
        )
      )
      -- typed with no commas: "801 West Main Street Visalia CA"
      or (
        position(',' in addr) = 0
        and private.addr_norm(addr) like private.addr_norm(split_part(d.address, ',', 1)) || ' %'
      )
    )
  limit 1;
$$;
grant execute on function public.find_existing_deal(text, uuid) to authenticated;

-- 4. /admin: which accounts are partners
create or replace function public.admin_partner_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.user_id from public.partners p where public.is_admin();
$$;
grant execute on function public.admin_partner_ids() to authenticated;

-- 5. SQL editor helpers (private schema, the website cannot call these)
create or replace function private.make_partner(email text)
returns text
language sql
security definer
set search_path = public, auth
as $$
  insert into public.partners (user_id)
  select u.id from auth.users u where u.email = lower(trim(email))
  on conflict (user_id) do nothing
  returning 'Partner added';
$$;

create or replace function private.add_partner(display_name text, email text, password text)
returns text
language plpgsql
security definer
set search_path = public, auth, private
as $$
declare
  r text;
begin
  r := private.add_team_user(display_name, email, password);
  perform private.make_partner(email);
  return r || ' as a partner';
end;
$$;
