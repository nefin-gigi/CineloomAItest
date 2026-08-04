-- CineLoom v5.2 Mobile SaaS Application UI/UX
-- Tracks mobile UX readiness, device QA, and mobile conversion health.

create table if not exists mobile_ux_readiness_checks (
  id uuid primary key default gen_random_uuid(),
  check_name text not null,
  status text not null default 'pending',
  device_family text not null default 'mobile',
  notes text,
  evidence_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists mobile_conversion_events (
  id uuid primary key default gen_random_uuid(),
  anonymous_id text,
  user_id text,
  workspace_id text,
  event_name text not null,
  path text,
  device_width integer,
  device_height integer,
  source_component text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
