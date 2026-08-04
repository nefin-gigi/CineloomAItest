-- CineLoom v3.3 Billion-Platform Ecosystem Migration
-- Adds marketplace, developer API, enterprise trust, public share/remix, referral, and film integration tables.

create table if not exists marketplace_templates (
  id text primary key,
  workspace_id text,
  seller_user_id text,
  title text not null,
  template_type text not null,
  description text,
  price_cents integer default 0,
  commission_rate numeric(5,4) default 0.2000,
  status text default 'draft',
  rating numeric(3,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists marketplace_purchases (
  id text primary key,
  template_id text references marketplace_templates(id),
  buyer_workspace_id text,
  stripe_payment_intent_id text,
  price_cents integer not null,
  platform_fee_cents integer not null,
  seller_payout_cents integer not null,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists developer_api_keys (
  id text primary key,
  workspace_id text not null,
  key_hash text not null,
  label text not null,
  scopes text[] default '{}',
  rate_limit_per_minute integer default 60,
  status text default 'active',
  last_used_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists developer_api_usage_events (
  id text primary key,
  api_key_id text references developer_api_keys(id),
  api_product text not null,
  billable_unit text not null,
  unit_count integer default 1,
  tokens_charged integer default 0,
  trace_id text,
  status text default 'succeeded',
  created_at timestamptz default now()
);

create table if not exists public_storyboard_shares (
  id text primary key,
  project_id text not null,
  workspace_id text not null,
  created_by_user_id text,
  visibility text default 'public_watermarked',
  watermark_enabled boolean default true,
  allow_remix boolean default true,
  allow_comments boolean default true,
  view_count integer default 0,
  remix_count integer default 0,
  expires_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists storyboard_remixes (
  id text primary key,
  source_share_id text references public_storyboard_shares(id),
  new_project_id text,
  created_by_user_id text,
  token_estimate integer default 0,
  status text default 'created',
  created_at timestamptz default now()
);

create table if not exists referral_events (
  id text primary key,
  referral_code text unique not null,
  inviter_user_id text,
  invited_email text,
  referred_user_id text,
  reward_tokens integer default 250,
  status text default 'sent',
  created_at timestamptz default now(),
  converted_at timestamptz
);

create table if not exists enterprise_trust_controls (
  id text primary key,
  workspace_id text not null,
  control_key text not null,
  status text default 'configured',
  evidence_url text,
  owner_role text,
  review_due_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists film_tool_integrations (
  id text primary key,
  workspace_id text,
  tool_name text not null,
  endpoint_env_name text,
  connection_status text default 'not_connected',
  last_sync_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists rights_receipts (
  id text primary key,
  project_id text not null,
  workspace_id text not null,
  commercial_use_allowed boolean default false,
  uploaded_ip_attested boolean default false,
  model_training_opt_out boolean default true,
  public_figure_restricted boolean default true,
  export_package_id text,
  receipt_json jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
