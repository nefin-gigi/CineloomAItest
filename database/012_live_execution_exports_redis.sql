-- CineLoom v4.5: live storyboard/export execution and distributed rate-limit observability

CREATE TABLE IF NOT EXISTS live_execution_invocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id TEXT NOT NULL,
  project_id TEXT,
  user_id TEXT,
  stage TEXT NOT NULL,
  endpoint_env TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  provider_request_id TEXT,
  job_id TEXT,
  status TEXT NOT NULL DEFAULT 'created',
  token_estimate INTEGER DEFAULT 0,
  token_reserved INTEGER DEFAULT 0,
  token_committed INTEGER DEFAULT 0,
  http_status INTEGER,
  latency_ms INTEGER,
  error_message TEXT,
  payload_hash TEXT,
  response_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(stage, idempotency_key)
);

CREATE INDEX IF NOT EXISTS idx_live_execution_workspace_stage ON live_execution_invocations(workspace_id, stage, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_live_execution_job ON live_execution_invocations(job_id);

CREATE TABLE IF NOT EXISTS export_generation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id TEXT NOT NULL,
  project_id TEXT NOT NULL,
  user_id TEXT,
  idempotency_key TEXT NOT NULL UNIQUE,
  export_types JSONB NOT NULL DEFAULT '[]'::JSONB,
  delivery_mode TEXT NOT NULL DEFAULT 'both',
  watermark BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'created',
  package_asset_id TEXT,
  package_signed_url TEXT,
  signed_url_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_export_generation_workspace_project ON export_generation_requests(workspace_id, project_id, created_at DESC);

CREATE TABLE IF NOT EXISTS distributed_rate_limit_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id TEXT,
  user_id TEXT,
  client_ip TEXT,
  rate_limit_key TEXT NOT NULL,
  provider TEXT NOT NULL,
  tier TEXT NOT NULL,
  limit_value INTEGER NOT NULL,
  remaining INTEGER NOT NULL,
  allowed BOOLEAN NOT NULL,
  reason TEXT NOT NULL,
  reset_seconds INTEGER NOT NULL,
  request_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_events_key_time ON distributed_rate_limit_events(rate_limit_key, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rate_limit_events_workspace_time ON distributed_rate_limit_events(workspace_id, created_at DESC);
