-- CineLoom v3.1 execution-behind-the-UI endpoint contracts.
-- Secrets are never stored here. Store secrets in Vercel/Supabase/secret manager.

create table if not exists execution_endpoint_contracts (
  id uuid primary key default gen_random_uuid(),
  stage_key text not null unique,
  display_name text not null,
  endpoint_url_env text not null,
  secret_env_name text not null,
  auth_mode text not null default 'bearer_env_secret',
  timeout_ms integer not null default 120000,
  token_policy text not null default 'none',
  required_response_keys jsonb not null default '[]'::jsonb,
  fallback_behavior text,
  is_enabled boolean not null default false,
  live_mode_enabled boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists execution_endpoint_test_runs (
  id uuid primary key default gen_random_uuid(),
  stage_key text not null,
  status text not null,
  ok boolean not null default false,
  latency_ms integer,
  http_status integer,
  missing_env jsonb,
  missing_response_keys jsonb,
  request_preview jsonb,
  response_preview jsonb,
  message text,
  tested_by text,
  tested_at timestamptz not null default now()
);

create index if not exists idx_execution_endpoint_test_runs_stage_time on execution_endpoint_test_runs(stage_key, tested_at desc);

create table if not exists execution_jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  project_id uuid,
  stage_key text not null,
  status text not null default 'queued',
  idempotency_key text not null,
  token_reservation_id text,
  estimated_tokens integer not null default 0,
  actual_tokens integer not null default 0,
  provider_request_id text,
  input_asset_ids jsonb not null default '[]'::jsonb,
  output_asset_ids jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  result jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz,
  failed_at timestamptz
);

create unique index if not exists idx_execution_jobs_idempotency on execution_jobs(idempotency_key);
create index if not exists idx_execution_jobs_workspace_project on execution_jobs(workspace_id, project_id, created_at desc);
