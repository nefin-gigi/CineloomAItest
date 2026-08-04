-- CineLoom.ai v3.0 Super Admin plug-and-play integration schema
-- Run after 001_production_schema.sql.

CREATE TABLE IF NOT EXISTS integration_connectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NULL,
  connector_key TEXT NOT NULL,
  category TEXT NOT NULL,
  display_name TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'demo',
  endpoint_url TEXT NULL,
  auth_mode TEXT NULL,
  secret_env_name TEXT NULL,
  timeout_ms INTEGER NOT NULL DEFAULT 120000,
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  is_recommended BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (connector_key)
);

CREATE TABLE IF NOT EXISTS integration_health_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connector_key TEXT NOT NULL,
  status TEXT NOT NULL,
  message TEXT NULL,
  latency_ms INTEGER NULL,
  missing_env JSONB NOT NULL DEFAULT '[]'::jsonb,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flag_key TEXT NOT NULL UNIQUE,
  flag_value TEXT NOT NULL,
  description TEXT NULL,
  environment TEXT NOT NULL DEFAULT 'production',
  changed_by UUID NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS provider_usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NULL,
  project_id UUID NULL,
  provider_key TEXT NOT NULL,
  job_type TEXT NOT NULL,
  provider_request_id TEXT NULL,
  status TEXT NOT NULL,
  estimated_tokens INTEGER NOT NULL DEFAULT 0,
  actual_tokens INTEGER NOT NULL DEFAULT 0,
  estimated_cost_cents INTEGER NOT NULL DEFAULT 0,
  actual_cost_cents INTEGER NOT NULL DEFAULT 0,
  latency_ms INTEGER NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS super_admin_audit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_key TEXT NOT NULL,
  before_value JSONB NULL,
  after_value JSONB NULL,
  ip_address TEXT NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_integration_health_connector_checked ON integration_health_checks(connector_key, checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_provider_usage_workspace_created ON provider_usage_events(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_super_admin_audit_created ON super_admin_audit_events(created_at DESC);
