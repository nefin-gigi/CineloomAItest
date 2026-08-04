-- CineLoom v7.3 Frontend Endpoint Router
-- Stores the plug-and-play mapping between customer-facing links/actions and backend execution endpoints.

CREATE TABLE IF NOT EXISTS frontend_endpoint_contracts (
  id BIGSERIAL PRIMARY KEY,
  action_key TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  surface TEXT NOT NULL,
  visible_to TEXT NOT NULL DEFAULT 'all',
  action_mode TEXT NOT NULL DEFAULT 'endpoint_optional',
  api_route TEXT NOT NULL,
  method TEXT NOT NULL DEFAULT 'POST',
  backend_stages JSONB NOT NULL DEFAULT '[]'::jsonb,
  required_env JSONB NOT NULL DEFAULT '[]'::jsonb,
  sample_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  fallback_behavior TEXT,
  success_result TEXT,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  requires_super_admin BOOLEAN NOT NULL DEFAULT false,
  last_test_status TEXT,
  last_tested_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS frontend_endpoint_test_runs (
  id BIGSERIAL PRIMARY KEY,
  action_key TEXT NOT NULL REFERENCES frontend_endpoint_contracts(action_key) ON DELETE CASCADE,
  dry_run BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL,
  request_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  endpoint_results JSONB NOT NULL DEFAULT '[]'::jsonb,
  missing_env JSONB NOT NULL DEFAULT '[]'::jsonb,
  tested_by TEXT,
  tested_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_frontend_endpoint_contracts_surface ON frontend_endpoint_contracts(surface);
CREATE INDEX IF NOT EXISTS idx_frontend_endpoint_contracts_mode ON frontend_endpoint_contracts(action_mode);
CREATE INDEX IF NOT EXISTS idx_frontend_endpoint_test_runs_action_key ON frontend_endpoint_test_runs(action_key);
