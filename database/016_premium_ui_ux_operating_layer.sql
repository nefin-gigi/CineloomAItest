-- CineLoom v4.9 premium UI/UX operating layer
CREATE TABLE IF NOT EXISTS ux_readiness_dimensions (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  score NUMERIC NOT NULL,
  status TEXT NOT NULL,
  evidence JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ux_journey_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id TEXT,
  user_id TEXT,
  journey TEXT NOT NULL,
  event_name TEXT NOT NULL,
  path TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ux_persona_routes (
  id TEXT PRIMARY KEY,
  persona TEXT NOT NULL,
  entry_path TEXT NOT NULL,
  primary_cta TEXT NOT NULL,
  success_metric TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
