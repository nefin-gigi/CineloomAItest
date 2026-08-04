-- CineLoom v4.2 final launch gap closure
-- Stores verified customer proof, email event state, protected asset downloads, and launch QA results.

CREATE TABLE IF NOT EXISTS verified_customer_proof (
  id TEXT PRIMARY KEY,
  workspace_id TEXT,
  customer_name TEXT NOT NULL,
  customer_role TEXT NOT NULL,
  quote TEXT NOT NULL,
  outcome TEXT,
  publish_permission BOOLEAN DEFAULT FALSE,
  verification_status TEXT NOT NULL DEFAULT 'pending_verification',
  approved_by TEXT,
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS email_delivery_events (
  id TEXT PRIMARY KEY,
  workspace_id TEXT,
  user_id TEXT,
  template_key TEXT NOT NULL,
  recipient_hash TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'demo',
  status TEXT NOT NULL DEFAULT 'queued',
  provider_message_id TEXT,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sent_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS protected_asset_downloads (
  id TEXT PRIMARY KEY,
  workspace_id TEXT,
  user_id TEXT,
  asset_id TEXT NOT NULL,
  export_id TEXT,
  access_mode TEXT NOT NULL DEFAULT 'signed_url',
  expires_at TIMESTAMP,
  downloaded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS launch_qa_results (
  id TEXT PRIMARY KEY,
  check_key TEXT NOT NULL,
  status TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  evidence TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
