-- CineLoom v5.3 Audience 10/10 Look and Feel
-- Tracks the product/audience experience layer used by the homepage and conversion analytics.

CREATE TABLE IF NOT EXISTS audience_experience_targets (
  id TEXT PRIMARY KEY,
  audience TEXT NOT NULL,
  target_score NUMERIC(3,1) NOT NULL DEFAULT 10.0,
  primary_promise TEXT NOT NULL,
  workflow_href TEXT NOT NULL,
  proof_tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audience_experience_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  anonymous_id TEXT,
  user_id TEXT,
  audience TEXT NOT NULL,
  event_name TEXT NOT NULL,
  page_path TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audience_experience_events_audience_created
  ON audience_experience_events(audience, created_at DESC);
