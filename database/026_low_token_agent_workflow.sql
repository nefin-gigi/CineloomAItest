-- CineLoom v7.6 Low-token director agent workflow
-- Adds persistence markers for scoped board patches, context packs, and approval-gated stitching.

create table if not exists cineloom_agent_low_token_context_plans (
  id text primary key,
  workspace_id text not null,
  project_id text not null,
  storyboard_id text not null,
  board_id text not null,
  board_index integer not null,
  total_boards integer not null,
  scope text not null default 'single_board_only',
  token_mode text not null default 'lowest_cost',
  estimated_input_tokens integer not null default 0,
  estimated_output_tokens integer not null default 0,
  estimated_savings_percent integer not null default 0,
  omitted_context jsonb not null default '[]'::jsonb,
  recommended_context jsonb not null default '[]'::jsonb,
  full_storyboard_blocked boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists cineloom_agent_single_board_patch_approvals (
  id text primary key,
  workspace_id text not null,
  project_id text not null,
  storyboard_id text not null,
  board_id text not null,
  board_version_id text,
  patch_payload jsonb not null default '{}'::jsonb,
  approval_status text not null default 'pending_director_approval',
  dynamic_stitch_status text not null default 'blocked_until_director_approval',
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_agent_context_storyboard_board on cineloom_agent_low_token_context_plans(storyboard_id, board_id);
create index if not exists idx_agent_patch_approval_storyboard_board on cineloom_agent_single_board_patch_approvals(storyboard_id, board_id, approval_status);
