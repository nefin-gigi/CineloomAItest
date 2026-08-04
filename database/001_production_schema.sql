-- CineLoom.ai v3.0 production revenue schema
-- Use Postgres/Supabase. Review indexes and RLS policies before launch.

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid references users(id),
  plan text not null default 'preview',
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text default 'trialing',
  token_balance integer not null default 250,
  monthly_tokens_used integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists workspace_members (
  workspace_id uuid references workspaces(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  role text not null check (role in ('Owner','Director','Producer','Editor','Viewer','Admin')),
  status text not null default 'active',
  created_at timestamptz default now(),
  primary key (workspace_id, user_id)
);

create table if not exists token_ledger (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  user_id uuid references users(id),
  event_type text not null,
  tokens integer not null,
  balance_after integer not null,
  related_job_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  title text not null,
  format text,
  genre text,
  target_runtime_seconds integer,
  aspect_ratio text default '2.39:1',
  frame_rate text default '24fps',
  visual_style text,
  status text default 'draft',
  created_by uuid references users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists scripts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  source_type text,
  original_filename text,
  text_content text,
  validation_status text default 'pending',
  validation_report jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists beats (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  beat_index integer not null,
  beat_name text not null,
  summary text,
  verification_status text default 'draft',
  source_refs jsonb default '[]'::jsonb,
  approved_by uuid references users(id),
  approved_at timestamptz
);

create table if not exists scenes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  scene_number integer not null,
  slugline text,
  summary text,
  location text,
  time_of_day text,
  estimated_runtime_seconds integer,
  approval_status text default 'draft',
  source_refs jsonb default '[]'::jsonb
);

create table if not exists shots (
  id uuid primary key default gen_random_uuid(),
  scene_id uuid references scenes(id) on delete cascade,
  shot_number integer not null,
  shot_type text,
  lens text,
  camera_angle text,
  camera_movement text,
  composition text,
  emotional_purpose text,
  continuity_notes text,
  spatial_layout jsonb default '{}'::jsonb,
  approval_status text default 'draft'
);

create table if not exists storyboard_panels (
  id uuid primary key default gen_random_uuid(),
  shot_id uuid references shots(id) on delete cascade,
  panel_number integer not null,
  prompt text,
  negative_prompt text,
  style text,
  asset_id uuid,
  status text default 'draft',
  locked_fields jsonb default '{}'::jsonb,
  revision_count integer default 0,
  approved_by uuid references users(id),
  approved_at timestamptz
);

create table if not exists assets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  asset_type text not null,
  storage_key text not null,
  mime_type text,
  bytes integer,
  is_public boolean default false,
  created_at timestamptz default now()
);

create table if not exists generation_jobs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  job_type text not null,
  provider text,
  status text default 'queued',
  tokens_reserved integer default 0,
  provider_cost_cents integer default 0,
  input jsonb default '{}'::jsonb,
  output jsonb default '{}'::jsonb,
  error text,
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table if not exists exports (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  export_type text not null,
  asset_id uuid references assets(id),
  watermark boolean default true,
  created_by uuid references users(id),
  created_at timestamptz default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade,
  user_id uuid references users(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_projects_workspace on projects(workspace_id);
create index if not exists idx_token_ledger_workspace on token_ledger(workspace_id, created_at desc);
create index if not exists idx_generation_jobs_workspace on generation_jobs(workspace_id, status, created_at desc);
create index if not exists idx_assets_workspace on assets(workspace_id, project_id);
