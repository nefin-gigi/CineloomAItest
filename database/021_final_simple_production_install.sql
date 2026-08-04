-- CineLoom v5.4 Final Simple Production Install
-- Tracks non-technical usability, onboarding choices, project organization, export value clarity, and share review moments.

CREATE TABLE IF NOT EXISTS ux_onboarding_events (
  id BIGSERIAL PRIMARY KEY,
  workspace_id TEXT,
  user_id TEXT,
  selected_path TEXT NOT NULL,
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ux_project_views (
  id BIGSERIAL PRIMARY KEY,
  workspace_id TEXT,
  user_id TEXT,
  filter_name TEXT,
  search_query TEXT,
  result_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS export_value_previews (
  id BIGSERIAL PRIMARY KEY,
  workspace_id TEXT,
  user_id TEXT,
  project_id TEXT,
  viewed_files JSONB DEFAULT '[]'::JSONB,
  upgrade_prompt_seen BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS review_share_links (
  id BIGSERIAL PRIMARY KEY,
  workspace_id TEXT,
  user_id TEXT,
  project_id TEXT,
  share_token_hash TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ux_onboarding_events_workspace ON ux_onboarding_events(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ux_project_views_workspace ON ux_project_views(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_export_value_previews_workspace ON export_value_previews(workspace_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_review_share_links_workspace ON review_share_links(workspace_id, created_at DESC);
