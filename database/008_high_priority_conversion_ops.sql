-- CineLoom v4.1 high-priority conversion operations
-- Adds operational tables for sample downloads, share/remix growth loops, support tickets, testimonial capture, and onboarding lifecycle emails.

CREATE TABLE IF NOT EXISTS conversion_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NULL,
  anonymous_id TEXT NULL,
  user_id UUID NULL,
  event_name TEXT NOT NULL,
  stage TEXT NULL,
  label TEXT NULL,
  path TEXT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public_storyboard_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  watermark_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  remix_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  download_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  view_count INTEGER NOT NULL DEFAULT 0,
  remix_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NULL
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_ticket_id TEXT NULL,
  email TEXT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  priority TEXT NOT NULL DEFAULT 'normal',
  message TEXT NOT NULL DEFAULT '',
  provider_status TEXT NOT NULL DEFAULT 'demo_mode',
  trace_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ NULL
);

CREATE TABLE IF NOT EXISTS onboarding_email_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  flow_key TEXT NOT NULL,
  step_key TEXT NULL,
  provider_status TEXT NOT NULL DEFAULT 'demo_queued',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonial_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NULL,
  role TEXT NULL,
  quote TEXT NOT NULL,
  permission_to_publish BOOLEAN NOT NULL DEFAULT FALSE,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
