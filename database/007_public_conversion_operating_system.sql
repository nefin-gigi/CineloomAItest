-- CineLoom v4.0 final public conversion operating system
-- Supports Lovable-aligned SaaS website events, CTA tests, audience pages and proof blocks.

create table if not exists public_conversion_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid null,
  anonymous_id text null,
  user_id uuid null,
  event_name text not null,
  page_path text not null,
  page_name text null,
  cta_label text null,
  plan_id text null,
  token_estimate integer null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public_ab_tests (
  id uuid primary key default gen_random_uuid(),
  test_key text unique not null,
  description text not null,
  variants jsonb not null,
  winning_variant text null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public_audience_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  audience_label text not null,
  primary_cta text not null default 'Create my free storyboard',
  proof_required boolean not null default true,
  conversion_goal text not null default 'free_storyboard_started',
  created_at timestamptz not null default now()
);

create index if not exists idx_public_conversion_events_name_created on public_conversion_events(event_name, created_at desc);
create index if not exists idx_public_conversion_events_path_created on public_conversion_events(page_path, created_at desc);
