-- CineLoom.ai v4.8 Advanced Security Defense-in-Depth
-- Adds tables for signed internal requests, DLP/malware scans, KMS encryption evidence,
-- tenant isolation checks, risk scoring, immutable audit events, and compliance evidence.

CREATE TABLE IF NOT EXISTS security_signed_request_audit (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  request_path TEXT NOT NULL,
  request_method TEXT NOT NULL,
  nonce TEXT NOT NULL,
  timestamp_ms BIGINT NOT NULL,
  signature_hash TEXT NOT NULL,
  verification_status TEXT NOT NULL,
  source_ip TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_security_signed_request_nonce ON security_signed_request_audit(nonce);
CREATE INDEX IF NOT EXISTS idx_security_signed_request_tenant ON security_signed_request_audit(tenant_id, created_at);

CREATE TABLE IF NOT EXISTS security_dlp_scan_results (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  project_id TEXT,
  asset_id TEXT,
  classification TEXT NOT NULL,
  findings_json TEXT NOT NULL,
  allowed_for_ai_provider BOOLEAN DEFAULT FALSE,
  required_controls_json TEXT NOT NULL,
  scanner_version TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_upload_quarantine (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  project_id TEXT,
  original_file_name TEXT NOT NULL,
  content_type TEXT,
  size_bytes BIGINT,
  quarantine_storage_key TEXT,
  malware_scan_status TEXT DEFAULT 'pending',
  sandbox_status TEXT DEFAULT 'not_required',
  release_status TEXT DEFAULT 'blocked',
  blockers_json TEXT DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  released_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_kms_encryption_evidence (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  kms_provider TEXT,
  kms_key_id TEXT,
  envelope_version TEXT,
  encryption_context_json TEXT NOT NULL,
  rotated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_tenant_policy_decisions (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT,
  actor_workspace_id TEXT,
  resource_workspace_id TEXT,
  resource_type TEXT,
  resource_id TEXT,
  action TEXT NOT NULL,
  decision TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_risk_scores (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT,
  tenant_id TEXT,
  action TEXT NOT NULL,
  risk TEXT NOT NULL,
  score INTEGER NOT NULL,
  signals_json TEXT NOT NULL,
  mitigation_action TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_immutable_audit_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  actor_user_id TEXT,
  event_type TEXT NOT NULL,
  event_payload_json TEXT NOT NULL,
  signature_algorithm TEXT NOT NULL,
  signature TEXT NOT NULL,
  siem_delivery_status TEXT DEFAULT 'pending',
  immutable_store_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_security_immutable_audit_events_tenant ON security_immutable_audit_events(tenant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_security_immutable_audit_events_type ON security_immutable_audit_events(event_type, created_at);

CREATE TABLE IF NOT EXISTS security_secret_rotation_events (
  id TEXT PRIMARY KEY,
  secret_name TEXT NOT NULL,
  provider TEXT,
  requested_by TEXT,
  rotation_status TEXT NOT NULL,
  evidence_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_release_evidence_locker (
  id TEXT PRIMARY KEY,
  release_version TEXT NOT NULL,
  evidence_type TEXT NOT NULL,
  evidence_name TEXT NOT NULL,
  evidence_url TEXT,
  approval_status TEXT DEFAULT 'pending',
  approved_by TEXT,
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS security_ai_boundary_decisions (
  id TEXT PRIMARY KEY,
  tenant_id TEXT,
  project_id TEXT,
  provider_id TEXT,
  model_id TEXT,
  prompt_registry_id TEXT,
  prompt_injection_decision TEXT NOT NULL,
  safety_decision TEXT NOT NULL,
  rights_decision TEXT NOT NULL,
  provenance_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
