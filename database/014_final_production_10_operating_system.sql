-- CineLoom v4.7 final production 10/10 operating system
-- Production schema extensions for billion-dollar company readiness:
-- launch gates, enterprise trust, marketplace payouts, developer API billing,
-- unit economics, retention, evidence, and final production approvals.

CREATE TABLE IF NOT EXISTS final_production_gates (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL,
  ready BOOLEAN NOT NULL DEFAULT FALSE,
  missing_env JSONB NOT NULL DEFAULT '[]'::jsonb,
  missing_approvals JSONB NOT NULL DEFAULT '[]'::jsonb,
  unsafe_values JSONB NOT NULL DEFAULT '[]'::jsonb,
  evidence_url TEXT,
  owner TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS production_evidence_registry (
  id TEXT PRIMARY KEY,
  evidence_type TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enterprise_identity_connections (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  saml_metadata_url TEXT,
  scim_endpoint TEXT,
  scim_status TEXT NOT NULL DEFAULT 'pending',
  sso_status TEXT NOT NULL DEFAULT 'pending',
  last_tested_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketplace_sellers (
  id TEXT PRIMARY KEY,
  workspace_id TEXT,
  display_name TEXT NOT NULL,
  payout_provider TEXT NOT NULL DEFAULT 'stripe_connect',
  payout_account_ref TEXT,
  kyc_status TEXT NOT NULL DEFAULT 'pending',
  seller_status TEXT NOT NULL DEFAULT 'draft',
  commission_rate NUMERIC(5,4) NOT NULL DEFAULT 0.2000,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketplace_payout_events (
  id TEXT PRIMARY KEY,
  seller_id TEXT NOT NULL,
  gross_amount_cents INTEGER NOT NULL,
  commission_amount_cents INTEGER NOT NULL,
  payout_amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  provider_ref TEXT,
  idempotency_key TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS developer_api_keys (
  id TEXT PRIMARY KEY,
  developer_account_id TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  label TEXT NOT NULL,
  scopes JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  rotated_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS developer_api_usage_events (
  id TEXT PRIMARY KEY,
  developer_account_id TEXT NOT NULL,
  api_key_id TEXT NOT NULL,
  product TEXT NOT NULL,
  units INTEGER NOT NULL DEFAULT 1,
  cost_cents INTEGER NOT NULL DEFAULT 0,
  trace_id TEXT,
  idempotency_key TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS revenue_unit_economics_snapshots (
  id TEXT PRIMARY KEY,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  mrr_cents INTEGER NOT NULL DEFAULT 0,
  arr_cents INTEGER NOT NULL DEFAULT 0,
  gross_margin_percent NUMERIC(5,2),
  free_to_paid_conversion_percent NUMERIC(5,2),
  logo_retention_percent NUMERIC(5,2),
  net_revenue_retention_percent NUMERIC(6,2),
  tokens_consumed BIGINT NOT NULL DEFAULT 0,
  ai_cost_cents BIGINT NOT NULL DEFAULT 0,
  marketplace_gmv_cents BIGINT NOT NULL DEFAULT 0,
  api_revenue_cents BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS growth_referral_events (
  id TEXT PRIMARY KEY,
  referrer_user_id TEXT,
  referred_email_hash TEXT,
  reward_tokens INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  attribution JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_final_production_gates_category ON final_production_gates(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_sellers_status ON marketplace_sellers(seller_status, kyc_status);
CREATE INDEX IF NOT EXISTS idx_developer_api_usage_account ON developer_api_usage_events(developer_account_id, created_at);
CREATE INDEX IF NOT EXISTS idx_revenue_unit_economics_period ON revenue_unit_economics_snapshots(period_start, period_end);
