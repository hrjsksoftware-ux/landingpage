-- ============================================================
-- Jan Suvidha Kendra — Admin access policies for the leads table
-- Run this in Supabase Dashboard > SQL Editor > New query > Run
-- (Run AFTER supabase-setup.sql which created the table + insert policy)
-- ============================================================

-- RLS is already enabled by supabase-setup.sql. We add policies so that
-- LOGGED-IN (authenticated) users can READ and DELETE leads.
-- The public 'anon' role keeps ONLY insert (from the landing page form).

-- 1) Authenticated users can read all leads
drop policy if exists "authenticated can read leads" on public.leads;
create policy "authenticated can read leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- 2) Authenticated users can delete leads
drop policy if exists "authenticated can delete leads" on public.leads;
create policy "authenticated can delete leads"
  on public.leads
  for delete
  to authenticated
  using (true);

-- (Optional) 3) Authenticated users can update a lead's status, etc.
drop policy if exists "authenticated can update leads" on public.leads;
create policy "authenticated can update leads"
  on public.leads
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- AFTER RUNNING THIS:
-- Create your admin login user:
--   Supabase Dashboard > Authentication > Users > "Add user"
--   - Enter your email + a password (this is your admin login)
--   - Tick "Auto Confirm User" so you can log in immediately
-- Then open  /admin.html  and log in with that email + password.
-- ============================================================
