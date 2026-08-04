-- CineLoom v4.6 AI Harness 10/10 Maturity
-- Purpose: prompt/version governance, golden tests, evals, provider benchmarks, provenance, red-team safety, and human feedback.

create table if not exists ai_prompt_versions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  prompt_key text not null,
  version text not null,
  stage text not null,
  system_prompt_hash text not null,
  user_prompt_template text not null,
  model_provider text,
  model_version text,
  status text not null default 'draft',
  created_by uuid,
  created_at timestamptz not null default now(),
  unique(prompt_key, version)
);

create table if not exists ai_golden_test_suites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  customer_segment text not null,
  genre text not null,
  status text not null default 'active',
  minimum_overall_score numeric not null default 90,
  created_at timestamptz not null default now()
);

create table if not exists ai_golden_test_cases (
  id uuid primary key default gen_random_uuid(),
  suite_id uuid references ai_golden_test_suites(id) on delete cascade,
  name text not null,
  stage text not null,
  input_fixture jsonb not null,
  expected_signals jsonb not null default '[]'::jsonb,
  minimum_score numeric not null default 90,
  rights_status text not null default 'demo_safe',
  created_at timestamptz not null default now()
);

create table if not exists ai_eval_runs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  project_id uuid,
  run_type text not null,
  stage text not null,
  provider text,
  model_version text,
  prompt_version_id uuid references ai_prompt_versions(id),
  overall_score numeric,
  passed boolean not null default false,
  regression_delta numeric,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists ai_eval_scores (
  id uuid primary key default gen_random_uuid(),
  eval_run_id uuid references ai_eval_runs(id) on delete cascade,
  rubric_key text not null,
  rubric_label text not null,
  score numeric not null,
  pass_threshold numeric not null,
  weight numeric not null,
  passed boolean not null,
  findings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists ai_provider_benchmarks (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  category text not null,
  model_version text,
  quality_score numeric not null,
  speed_score numeric not null,
  cost_score numeric not null,
  consistency_score numeric not null,
  recommended_for jsonb not null default '[]'::jsonb,
  benchmark_payload jsonb not null default '{}'::jsonb,
  measured_at timestamptz not null default now()
);

create table if not exists ai_asset_provenance (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  project_id uuid,
  asset_id uuid,
  generation_stage text not null,
  prompt_version_id uuid references ai_prompt_versions(id),
  provider text not null,
  model_version text,
  seed text,
  input_hash text,
  output_hash text,
  token_cost numeric not null default 0,
  provider_cost_usd numeric not null default 0,
  safety_status text not null default 'pending',
  rights_status text not null default 'pending',
  training_opt_out boolean not null default true,
  commercial_use_allowed boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists ai_red_team_cases (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  attack_prompt text not null,
  expected_behavior text not null,
  severity text not null default 'high',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists ai_human_feedback_scorecards (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  project_id uuid,
  asset_id uuid,
  reviewer_user_id uuid,
  reviewer_role text not null default 'director',
  story_score numeric,
  cinematography_score numeric,
  continuity_score numeric,
  visual_quality_score numeric,
  emotional_score numeric,
  usable_for_production boolean not null default false,
  comments text,
  created_at timestamptz not null default now()
);

create table if not exists ai_model_router_decisions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  project_id uuid,
  stage text not null,
  requested_strategy text not null,
  selected_provider text not null,
  fallback_provider text,
  route_reason text not null,
  estimated_token_cost numeric,
  estimated_provider_cost_usd numeric,
  circuit_breaker_state text not null default 'closed',
  created_at timestamptz not null default now()
);

create table if not exists ai_safety_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  project_id uuid,
  event_type text not null,
  severity text not null,
  stage text,
  prompt_hash text,
  finding jsonb not null default '{}'::jsonb,
  action_taken text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_ai_prompt_versions_key on ai_prompt_versions(prompt_key, version);
create index if not exists idx_ai_eval_runs_project on ai_eval_runs(workspace_id, project_id, stage);
create index if not exists idx_ai_asset_provenance_project on ai_asset_provenance(workspace_id, project_id, asset_id);
create index if not exists idx_ai_provider_benchmarks_provider on ai_provider_benchmarks(provider, category);
create index if not exists idx_ai_safety_events_workspace on ai_safety_events(workspace_id, severity, created_at desc);
