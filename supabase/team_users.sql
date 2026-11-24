-- House Junkies - add /deals team accounts from the Supabase SQL Editor.
--
-- HOW TO USE
-- 1. Supabase -> SQL Editor -> New query.
-- 2. Copy one "select private.add_team_user(...)" line per person (bottom of
--    this file), fill in Display Name, Email, Password, and click Run.
-- 3. They can sign in at housejunkiesinc.org/deals right away.
--
-- The display name is what teammates see on Team Deals.
-- To rename someone later:  select private.set_display_name('email', 'New Name');
--
-- The helpers live in the "private" schema, which the website's API cannot
-- reach, so only someone in the Supabase dashboard can create accounts.

create schema if not exists private;

create or replace function private.add_team_user(display_name text, email text, password text)
returns text
language plpgsql
security definer
set search_path = public, auth, extensions
as $$
declare
  new_id uuid := gen_random_uuid();
  clean_email text := lower(trim(email));
begin
  if exists (select 1 from auth.users u where u.email = clean_email) then
    update auth.users u
      set raw_user_meta_data = coalesce(u.raw_user_meta_data, '{}'::jsonb)
        || jsonb_build_object('display_name', trim(display_name), 'full_name', trim(display_name)),
          encrypted_password = extensions.crypt(password, extensions.gen_salt('bf')),
          updated_at = now()
      where u.email = clean_email;
    return 'Updated ' || clean_email || ' (name and password)';
  end if;

  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, recovery_token, email_change, email_change_token_new
  ) values (
    '00000000-0000-0000-0000-000000000000', new_id, 'authenticated', 'authenticated',
    clean_email, extensions.crypt(password, extensions.gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('display_name', trim(display_name), 'full_name', trim(display_name)),
    now(), now(), '', '', '', ''
  );

  insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  values (
    gen_random_uuid(), new_id, new_id::text,
    jsonb_build_object('sub', new_id::text, 'email', clean_email, 'email_verified', true),
    'email', now(), now(), now()
  );

  return 'Created ' || clean_email;
end;
$$;

create or replace function private.set_display_name(email text, display_name text)
returns text
language sql
security definer
set search_path = public, auth
as $$
  update auth.users u
    set raw_user_meta_data = coalesce(u.raw_user_meta_data, '{}'::jsonb)
      || jsonb_build_object('display_name', trim(display_name), 'full_name', trim(display_name))
    where u.email = lower(trim(email))
  returning 'Renamed ' || u.email;
$$;

-- ---------------------------------------------------------------
-- PASTE AREA: one line per person. Display Name, Email, Password.
-- ---------------------------------------------------------------
-- select private.add_team_user('Dominic McClelland', 'name@example.com', 'ChangeMe2026');
-- select private.add_team_user('Abel Ulloa', 'name@example.com', 'ChangeMe2026');
