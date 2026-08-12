-- ============================================================
-- TTCCUL — Supabase schema
-- Run this ONCE in your Supabase project's SQL Editor
-- (Project → SQL Editor → New Query → paste all of this → Run)
-- ============================================================
-- NOTE ON GRANTS: since May 30 2026, new Supabase projects no
-- longer auto-expose new tables to the Data API (the REST API
-- supabase-js talks to). RLS alone is not enough — each table
-- also needs an explicit GRANT, or every request fails with a
-- "permission denied" (42501) error before RLS is even checked.
-- This script grants both layers on purpose. If you ever add a
-- new table by hand later, remember to grant it too.
-- ============================================================

-- ---------- SERVICES ----------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('savings','loans','other')),
  description text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.services enable row level security;

-- ---------- CORE VALUES ----------
create table if not exists public.core_values (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null default 'leaf',
  sort_order int not null default 0
);
alter table public.core_values enable row level security;

-- ---------- BOARD MEMBERS ----------
create table if not exists public.board_members (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  name text,
  photo_url text,
  bio text,
  sort_order int not null default 0
);
alter table public.board_members enable row level security;
alter table public.board_members add column if not exists bio text;

-- ---------- NEWS ----------
create table if not exists public.news_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  tag text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.news_items enable row level security;

-- ---------- DOWNLOADABLE FORMS ----------
create table if not exists public.forms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  file_url text,
  sort_order int not null default 0
);
alter table public.forms enable row level security;

-- ---------- ANNUAL REPORTS ----------
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  year text,
  image_url text,
  file_url text,
  description text,
  sort_order int not null default 0
);
alter table public.reports enable row level security;
alter table public.reports add column if not exists image_url text;

-- ---------- SITE TEXT CONTENT (key/value) ----------
create table if not exists public.site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;

-- ============================================================
-- GRANTS — table-level "can this role touch this table at all"
-- anon   = public site (read-only)
-- authenticated = logged-in admin (read + write)
-- ============================================================
grant select on public.services, public.core_values, public.board_members,
  public.news_items, public.forms, public.reports, public.site_content
  to anon, authenticated;

grant insert, update, delete on public.services, public.core_values, public.board_members,
  public.news_items, public.forms, public.reports, public.site_content
  to authenticated;

-- ============================================================
-- RLS POLICIES — row-level "which rows, and who exactly"
-- Change the email below if the admin address ever changes.
-- ============================================================
do $$
declare
  admin_email text := 'info@ttccul.com';
  t text;
begin
  foreach t in array array['services','core_values','board_members','news_items','forms','reports','site_content']
  loop
    execute format('drop policy if exists "public read" on public.%I;', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true);', t);

    execute format('drop policy if exists "admin write" on public.%I;', t);
    execute format(
      'create policy "admin write" on public.%I for all to authenticated using ((auth.jwt() ->> ''email'') = %L) with check ((auth.jwt() ->> ''email'') = %L);',
      t, admin_email, admin_email
    );
  end loop;
end $$;

-- ============================================================
-- SEED DATA — matches what's already live on the site today,
-- so connecting Supabase changes nothing visually at first.
-- Safe to run multiple times (checks for existing rows first).
-- ============================================================
insert into public.services (name, category, description, sort_order)
select * from (values
  ('Shares Accounts','savings','Own a stake in the union and unlock full membership benefits.',1),
  ('Savings Accounts','savings','Flexible, interest-earning accounts for everyday saving.',2),
  ('Deposit Accounts','savings','Secure fixed and flexible deposit options for your goals.',3),
  ('Minors Accounts','savings','Start a saving habit early, held safely in a child''s name.',4),
  ('Group Accounts','savings','Shared accounts for njangi groups, unions and associations.',5),
  ('Daily Savings (Akawo)','savings','Doorstep daily collection savings, done the trusted way.',6),
  ('Personal Loans','loans','Fair-rate credit for life''s everyday personal needs.',7),
  ('Business Loans','loans','Capital to start, run or grow a small business.',8),
  ('Agricultural Loans','loans','Financing built for farmers and tea-growing households.',9),
  ('Building Loans','loans','Credit to build or improve a family home.',10),
  ('School Fees Loans','loans','Keep children in school without missing a term.',11),
  ('Akawo Loans','loans','Loans linked directly to your daily savings record.',12),
  ('Overdraft Facilities','loans','Short-term breathing room when you need it most.',13),
  ('Contract Financing','loans','Working capital secured against confirmed contracts.',14),
  ('Western Union & Remittances','other','Send and receive money from anywhere in the world.',15),
  ('MOMO Services','other','Mobile money deposits, withdrawals and transfers.',16),
  ('Container Clearing','other','Financing support to help clear goods at the port.',17),
  ('Cheque Clearing','other','Fast, dependable cheque processing.',18),
  ('Payment of Salaries','other','Payroll services for local businesses and organisations.',19),
  ('Business Counselling','other','Practical guidance to help members'' ventures thrive.',20),
  ('Insurance Schemes','other','Protection plans that safeguard what members build.',21)
) as v(name, category, description, sort_order)
where not exists (select 1 from public.services);

insert into public.core_values (title, description, icon, sort_order)
select * from (values
  ('Integrity','We conduct every activity honestly, ethically and transparently.','shield',1),
  ('Member Focus','The needs and welfare of our members sit at the centre of every decision.','users',2),
  ('Professionalism','We deliver financial services with competence, efficiency and respect.','check',3),
  ('Equity & Fairness','Equal opportunity for every member, without discrimination.','scale',4),
  ('Innovation','We keep improving our products and processes to meet changing needs.','leaf',5)
) as v(title, description, icon, sort_order)
where not exists (select 1 from public.core_values);

insert into public.board_members (role, name, sort_order)
select * from (values
  ('Board Chairperson', null, 1),
  ('Vice Chairperson', null, 2),
  ('Secretary', null, 3),
  ('Treasurer', null, 4),
  ('Supervisory Committee Member', null, 5)
) as v(role, name, sort_order)
where not exists (select 1 from public.board_members);

insert into public.news_items (title, body, tag, sort_order)
select * from (values
  ('Welcome to Our New Website','TTCCUL now has a home online. Explore our services, learn how to join, and reach us directly from anywhere.','2026',1),
  ('More Updates on the Way','We''ll share news on products, community initiatives and union milestones right here.','Coming Soon',2)
) as v(title, body, tag, sort_order)
where not exists (select 1 from public.news_items);

insert into public.forms (name, description, sort_order)
select * from (values
  ('Membership Application Form','Start your journey to becoming a TTCCUL member.',1),
  ('Account Opening Form','Open a savings, deposit or shares account.',2),
  ('Loan Application Form','Apply for a personal, business or agricultural loan.',3),
  ('Next of Kin Form','Keep your account details safe and up to date.',4)
) as v(name, description, sort_order)
where not exists (select 1 from public.forms);

insert into public.site_content (key, value)
select * from (values
  ('hero_badge','Serving Tole-Buea Since 1970'),
  ('hero_headline','Where Community Saves, Grows & Thrives Together'),
  ('hero_lead','A member-owned cooperative credit union built on mutual trust — savings, loans and financial inclusion for the people of Tole and beyond, at fair and honest rates.'),
  ('stat1_value','1970'), ('stat1_label','Founded'),
  ('stat2_value','56+'), ('stat2_label','Years of Continuous Service'),
  ('stat3_value','21+'), ('stat3_label','Products & Services Offered'),
  ('stat4_value','5'), ('stat4_label','Core Values We Operate By'),
  ('mission_text','To continuously develop and sustain a secure, law-abiding cooperative credit union that provides quick and reliable financial services to our members for their financial and social development — while paying a fair rate of interest on their savings.'),
  ('vision_text','To become a one-stop-shop financial institution, offering every product and service found at other microfinance institutions — delivering digital, accessible financial inclusion to our members at competitive rates.'),
  ('about_overview','As a microfinance institution, we promote financial inclusion by offering affordable financial services — especially to low- and middle-income individuals with limited access to commercial banks.

We mobilize savings from our members and use these funds to grant loans at fair, relatively low interest rates. TTCCUL operates on the principle of mutual assistance and democratic control: every member holds equal voting rights, regardless of the amount they''ve saved.

By encouraging saving habits and providing accessible credit, we contribute to poverty reduction, entrepreneurship development, and improved living standards across the communities we serve.'),
  ('gm_quote','For over five decades, Tole Tea Cooperative Credit Union has stood by our members through every season. We built this institution on trust, fairness, and the belief that when our members thrive, we all thrive.'),
  ('gm_name','Joseph Atabong Beja'),
  ('gm_title','General Manager'),
  ('contact_phone_1','675 062 254'),
  ('contact_phone_2','674 227 692'),
  ('contact_email','info@ttccul.com'),
  ('contact_address','Tole, Buea, Southwest Region, Cameroon'),
  ('office_hours','Monday – Friday, 8:00 AM – 4:00 PM'),
  ('whatsapp_number','237675062254')
) as v(key, value)
where not exists (select 1 from public.site_content);

-- Added later than the block above — its own guard so it still
-- gets inserted even on databases that already ran the seed once.
insert into public.site_content (key, value)
values ('hero_image_url', '')
on conflict (key) do nothing;

-- ============================================================
-- STORAGE — board member photos & downloadable form files
-- Safe to re-run.
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('board-photos', 'board-photos', true, 5242880, array['image/png','image/jpeg','image/webp','image/gif']),
  ('forms-files', 'forms-files', true, 10485760, array['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('agm-photos', 'agm-photos', true, 8388608, array['image/png','image/jpeg','image/webp','image/gif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
declare
  admin_email text := 'info@ttccul.com';
  b text;
begin
  foreach b in array array['board-photos','forms-files','agm-photos']
  loop
    execute format('drop policy if exists "public read %s" on storage.objects;', b);
    execute format('create policy "public read %s" on storage.objects for select using (bucket_id = %L);', b, b);

    execute format('drop policy if exists "admin write %s" on storage.objects;', b);
    execute format(
      'create policy "admin write %s" on storage.objects for all to authenticated using (bucket_id = %L and (auth.jwt() ->> ''email'') = %L) with check (bucket_id = %L and (auth.jwt() ->> ''email'') = %L);',
      b, b, admin_email, b, admin_email
    );
  end loop;
end $$;

-- ============================================================
-- DONE. Next: Authentication → Users → Add User, using the
-- real TTCCUL admin email and a password you set there.
-- That's the only login admin.html will ever accept.
-- ============================================================
