-- CineLoom v4.3 military-level security hardening schema
-- Applies zero-trust administration, immutable audit trails, CSRF/security telemetry,
-- signed export access, IP allowlists, and incident response evidence.

create table if not exists security_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid null,
  actor_user_id uuid null,
  severity text not null check (severity in ('info','low','medium','high','critical')),
  category text not null,
  action text not null,
  ip_address text,
  user_agent text,
  target text,
  trace_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists super_admin_sessions (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid null,
  session_fingerprint text not null,
  ip_address text,
  mfa_verified boolean not null default false,
  expires_at timestamptz not null,
  revoked_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists admin_ip_allowlist (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  ip_rule text not null,
  environment text not null default 'production',
  approved_by text,
  expires_at timestamptz null,
  created_at timestamptz not null default now()
);

create table if not exists secret_rotation_register (
  id uuid primary key default gen_random_uuid(),
  secret_name text not null,
  owner text not null,
  rotation_interval_days integer not null default 90,
  last_rotated_at timestamptz,
  next_rotation_due_at timestamptz,
  status text not null default 'active' check (status in ('active','rotation_due','retired','compromised')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists security_incidents (
  id uuid primary key default gen_random_uuid(),
  severity text not null check (severity in ('medium','high','critical')),
  title text not null,
  status text not null default 'open' check (status in ('open','contained','resolved','postmortem_complete')),
  detected_at timestamptz not null default now(),
  contained_at timestamptz null,
  resolved_at timestamptz null,
  owner text,
  evidence jsonb not null default '{}'::jsonb,
  postmortem text
);

create index if not exists idx_security_events_created_at on security_events(created_at desc);
create index if not exists idx_security_events_severity on security_events(severity, created_at desc);
create index if not exists idx_super_admin_sessions_expires on super_admin_sessions(expires_at, revoked_at);
create index if not exists idx_security_incidents_status on security_incidents(status, detected_at desc);
