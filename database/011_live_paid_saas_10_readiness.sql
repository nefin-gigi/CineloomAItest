-- CineLoom v4.4 live paid SaaS readiness schema
-- Stores production launch gates, live service health results, billing reconciliation events,
-- transactional token external references, and customer export access audits.

CREATE TABLE IF NOT EXISTS live_paid_saas_checks (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'missing',
  severity TEXT NOT NULL DEFAULT 'critical',
  owner TEXT,
  last_checked_at TIMESTAMPTZ,
  last_status_code INTEGER,
  last_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS live_launch_gate_events (
  id TEXT PRIMARY KEY,
  requested_by TEXT,
  allowed BOOLEAN NOT NULL DEFAULT FALSE,
  score INTEGER NOT NULL DEFAULT 0,
  blockers JSONB NOT NULL DEFAULT '[]'::jsonb,
  environment TEXT NOT NULL DEFAULT 'production',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS billing_reconciliation_events (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL DEFAULT 'stripe',
  provider_event_id TEXT UNIQUE,
  provider_event_type TEXT NOT NULL,
  workspace_id TEXT,
  customer_id TEXT,
  subscription_id TEXT,
  token_pack_id TEXT,
  amount_cents INTEGER,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'received',
  idempotency_key TEXT UNIQUE,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS token_ledger_external_events (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  project_id TEXT,
  job_id TEXT,
  action TEXT NOT NULL CHECK (action IN ('reserve','commit','refund','monthly_credit','purchase_credit','admin_adjustment')),
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  idempotency_key TEXT UNIQUE NOT NULL,
  external_reference TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS secure_export_download_events (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  asset_id TEXT NOT NULL,
  signed_url_expires_at TIMESTAMPTZ,
  ip_address TEXT,
  user_agent TEXT,
  allowed BOOLEAN NOT NULL DEFAULT FALSE,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_live_paid_saas_checks_category ON live_paid_saas_checks(category);
CREATE INDEX IF NOT EXISTS idx_billing_reconciliation_workspace ON billing_reconciliation_events(workspace_id);
CREATE INDEX IF NOT EXISTS idx_token_ledger_external_workspace ON token_ledger_external_events(workspace_id);
CREATE INDEX IF NOT EXISTS idx_secure_export_download_workspace ON secure_export_download_events(workspace_id);
