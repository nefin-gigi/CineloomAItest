-- CineLoom v7.5 ChatGPT Agent Harness for director-controlled single-board storyboard changes.
-- This migration documents the production tables expected by the plug-and-play backend.

create table if not exists agent_harness_configs (
  id text primary key,
  workspace_id text,
  provider text not null default 'chatgpt-compatible-agent',
  endpoint_url_env text not null default 'CHATGPT_AGENT_ENDPOINT_URL',
  endpoint_secret_env text not null default 'CHATGPT_AGENT_ENDPOINT_SECRET',
  model_env text not null default 'CHATGPT_AGENT_MODEL',
  mode text not null default 'configured',
  enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists storyboard_board_agent_requests (
  id text primary key,
  workspace_id text not null,
  project_id text not null,
  storyboard_id text not null,
  board_id text not null,
  board_index integer not null check (board_index >= 1 and board_index <= 1000),
  total_boards integer not null check (total_boards >= 1 and total_boards <= 1000),
  director_prompt text not null,
  locks jsonb not null default '[]'::jsonb,
  stitch_mode text not null default 'block_until_approved',
  status text not null default 'planned',
  idempotency_key text unique,
  created_by text,
  created_at timestamptz not null default now()
);

create table if not exists storyboard_board_agent_patches (
  id text primary key,
  request_id text references storyboard_board_agent_requests(id),
  storyboard_id text not null,
  board_id text not null,
  old_asset_id text,
  new_asset_id text,
  new_panel_prompt text,
  negative_prompt text,
  lock_checklist jsonb not null default '[]'::jsonb,
  continuity_notes jsonb not null default '[]'::jsonb,
  approval_required boolean not null default true,
  approved_at timestamptz,
  approved_by text,
  rollback_metadata jsonb not null default '{}'::jsonb,
  provenance jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_agent_requests_project_storyboard on storyboard_board_agent_requests(project_id, storyboard_id);
create index if not exists idx_agent_patches_storyboard_board on storyboard_board_agent_patches(storyboard_id, board_id);
