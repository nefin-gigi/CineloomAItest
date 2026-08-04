-- CineLoom v3.4 SaaS 10/10 operating system tables
-- These tables turn the demo platform into an operating SaaS control plane once connected to Postgres/Supabase/Neon.

create table if not exists entitlements (
  id text primary key,
  workspace_id text not null,
  plan_key text not null,
  feature_key text not null,
  limit_value integer,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists onboarding_steps (
  id text primary key,
  workspace_id text not null,
  step_key text not null,
  status text not null default 'pending',
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists support_tickets (
  id text primary key,
  workspace_id text,
  user_id text,
  category text not null,
  priority text not null default 'normal',
  subject text not null,
  description text,
  status text not null default 'open',
  external_ticket_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists status_components (
  id text primary key,
  component_key text unique not null,
  name text not null,
  status text not null default 'operational',
  slo_target text not null default '99.9%',
  last_checked_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists funnel_events (
  id text primary key,
  anonymous_id text,
  user_id text,
  workspace_id text,
  event_name text not null,
  funnel_stage text not null,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists customer_success_playbooks (
  id text primary key,
  name text not null,
  trigger_rule jsonb not null,
  action_rule jsonb not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists compliance_controls (
  id text primary key,
  control_key text unique not null,
  title text not null,
  category text not null,
  status text not null default 'endpoint-ready',
  evidence_url text,
  owner_role text,
  updated_at timestamptz not null default now()
);

create table if not exists launch_gate_results (
  id text primary key,
  gate_key text not null,
  status text not null,
  evidence jsonb not null default '{}'::jsonb,
  checked_at timestamptz not null default now(),
  checked_by text
);

create table if not exists seo_landing_pages (
  id text primary key,
  slug text unique not null,
  title text not null,
  target_segment text not null,
  primary_keyword text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists referral_campaigns (
  id text primary key,
  campaign_key text unique not null,
  reward_tokens integer not null default 0,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists webhook_delivery_logs (
  id text primary key,
  provider_key text not null,
  event_type text not null,
  status text not null,
  attempts integer not null default 0,
  payload jsonb not null default '{}'::jsonb,
  response_body text,
  created_at timestamptz not null default now()
);

create index if not exists idx_entitlements_workspace on entitlements(workspace_id, feature_key);
create index if not exists idx_support_workspace on support_tickets(workspace_id, status);
create index if not exists idx_funnel_stage on funnel_events(funnel_stage, created_at);
create index if not exists idx_launch_gate on launch_gate_results(gate_key, checked_at desc);
