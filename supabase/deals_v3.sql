-- House Junkies - /deals v3 (run after deals_v2.sql)
-- Photos (up to 5 per deal, private storage bucket) and /admin access.
--
-- Admins (Dominic, Abel, Ciara) can READ every deal, every account and every
-- photo. They are added in the SQL editor with:
--   select private.make_admin('email@example.com');
--   select private.remove_admin('email@example.com');

-- 1. Photo paths on each deal (files live in the deal-photos bucket)
alter table public.deals add column if not exists photos jsonb not null default '[]'::jsonb;

-- 2. Admin list
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
create policy "admins_read_self" on public.admins
  for select to authenticated using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- 3. Admins can read every deal (owners still edit only their own)
create policy "deals_select_admin" on public.deals
  for select to authenticated using (public.is_admin());

-- 4. Accounts list for /admin
create or replace function public.admin_users()
returns table (
  id uuid, email text, display_name text, created_at timestamptz,
  last_sign_in_at timestamptz, is_admin boolean, deal_count bigint
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select
    u.id,
    u.email::text,
    coalesce(
      nullif(u.raw_user_meta_data->>'display_name', ''),
      nullif(u.raw_user_meta_data->>'full_name', ''),
      initcap(split_part(u.email, '@', 1))
    ),
    u.created_at,
    u.last_sign_in_at,
    exists (select 1 from public.admins a where a.user_id = u.id),
    (select count(*) from public.deals d where d.created_by = u.id)
  from auth.users u
  where public.is_admin()
  order by u.created_at;
$$;
revoke all on function public.admin_users() from public, anon;
grant execute on function public.admin_users() to authenticated;

-- 5. SQL editor helpers (private schema: the website cannot call these)
create schema if not exists private;

create or replace function private.make_admin(email text)
returns text
language sql
security definer
set search_path = public, auth
as $$
  insert into public.admins (user_id)
  select u.id from auth.users u where u.email = lower(trim(email))
  on conflict (user_id) do nothing
  returning 'Admin added';
$$;

create or replace function private.remove_admin(email text)
returns text
language sql
security definer
set search_path = public, auth
as $$
  delete from public.admins a
  using auth.users u
  where a.user_id = u.id and u.email = lower(trim(email))
  returning 'Admin removed';
$$;

-- 6. Photo storage: private bucket, files at <user id>/<deal id>/<file>.jpg
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('deal-photos', 'deal-photos', false, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "deal_photos_owner" on storage.objects
  for all to authenticated
  using (bucket_id = 'deal-photos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'deal-photos' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "deal_photos_admin_read" on storage.objects
  for select to authenticated
  using (bucket_id = 'deal-photos' and public.is_admin());
