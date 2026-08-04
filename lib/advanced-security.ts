import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { assertSuperAdminAccess, constantTimeEquals, getClientIp, isProductionLike, secureJson, type SecurityDecision } from './military-security';

export type AdvancedSecurityControl = {
  id: string;
  name: string;
  category: 'identity' | 'network' | 'data' | 'application' | 'ai' | 'operations' | 'compliance';
  severity: 'critical' | 'high' | 'medium';
  configured: boolean;
  env?: string[];
  productionBlocker: boolean;
  detail: string;
};

function boolEnv(key: string, fallback = false) {
  const raw = process.env[key];
  if (raw == null) return fallback;
  return ['1', 'true', 'yes', 'on', 'enabled'].includes(raw.toLowerCase());
}

function configured(...keys: string[]) {
  return keys.every((key) => Boolean(process.env[key]));
}

export function safeToken(bytes = 32) {
  return randomBytes(bytes).toString('base64url');
}


export function assertInternalOrSuperAdmin(request: Request): SecurityDecision {
  const admin = assertSuperAdminAccess(request);
  if (admin.allowed) return { allowed: true, reason: 'Super Admin authorized.' };
  const configuredSecret = process.env.INTERNAL_SERVICE_SECRET ?? process.env.REQUEST_SIGNATURE_SECRET ?? '';
  const provided = request.headers.get('x-cineloom-internal-secret') ?? request.headers.get('x-internal-service-secret') ?? '';
  if (configuredSecret && provided && constantTimeEquals(provided, configuredSecret)) {
    return { allowed: true, reason: 'Internal service secret authorized.' };
  }
  if (!isProductionLike() && process.env.SECURITY_DEV_UNLOCK === 'true') {
    return { allowed: true, reason: 'Development unlock enabled.' };
  }
  return {
    allowed: false,
    reason: 'Advanced security endpoint requires Super Admin or internal service credentials.',
    status: 403,
    remediation: ['Send x-cineloom-super-admin-key', 'Or send x-cineloom-internal-secret from a trusted worker', 'Configure INTERNAL_SERVICE_SECRET in production']
  };
}

export function hmacSha256(secret: string, payload: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

export function constantTimeSignatureEquals(provided = '', expected = '') {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function readRequestBodyForSignature(request: Request, maxBytes = 1024 * 256) {
  const body = await request.text();
  if (Buffer.byteLength(body, 'utf8') > maxBytes) {
    throw new Error(`Request body exceeds signed-request max of ${maxBytes} bytes.`);
  }
  return body;
}

export function verifySignedRequest({
  method,
  pathname,
  timestamp,
  nonce,
  body,
  signature,
  secret,
  toleranceSeconds = Number(process.env.REQUEST_SIGNATURE_TOLERANCE_SECONDS ?? 300)
}: {
  method: string;
  pathname: string;
  timestamp: string;
  nonce: string;
  body: string;
  signature: string;
  secret: string;
  toleranceSeconds?: number;
}): SecurityDecision {
  if (!secret) return { allowed: false, reason: 'Signed request secret is not configured.', status: 503 };
  if (!timestamp || !nonce || !signature) return { allowed: false, reason: 'Missing request timestamp, nonce, or signature.', status: 401 };
  const issuedAt = Number(timestamp);
  if (!Number.isFinite(issuedAt)) return { allowed: false, reason: 'Invalid request timestamp.', status: 401 };
  const ageSeconds = Math.abs(Date.now() - issuedAt) / 1000;
  if (ageSeconds > toleranceSeconds) return { allowed: false, reason: 'Signed request timestamp is outside tolerance.', status: 401 };
  const canonical = [method.toUpperCase(), pathname, timestamp, nonce, body].join('\n');
  const expected = hmacSha256(secret, canonical);
  if (!constantTimeSignatureEquals(signature, expected)) return { allowed: false, reason: 'Invalid request signature.', status: 401 };
  return { allowed: true, reason: 'Signed request verified.' };
}

export function buildRequestAttestation(pathname: string, method = 'POST', body = '') {
  const secret = process.env.REQUEST_SIGNATURE_SECRET ?? process.env.SUPER_ADMIN_API_KEY ?? '';
  const timestamp = String(Date.now());
  const nonce = safeToken(16);
  const canonical = [method.toUpperCase(), pathname, timestamp, nonce, body].join('\n');
  return {
    ok: Boolean(secret),
    algorithm: 'HMAC-SHA256',
    headers: {
      'x-cineloom-request-timestamp': timestamp,
      'x-cineloom-request-nonce': nonce,
      'x-cineloom-request-signature': secret ? hmacSha256(secret, canonical) : 'configure_REQUEST_SIGNATURE_SECRET'
    },
    canonicalRequest: canonical,
    expiresInSeconds: Number(process.env.REQUEST_SIGNATURE_TOLERANCE_SECONDS ?? 300)
  };
}

export function classifyData(input: string) {
  const findings: string[] = [];
  if (/\b\d{3}-\d{2}-\d{4}\b/.test(input)) findings.push('possible_us_ssn');
  if (/\b(?:\d[ -]*?){13,16}\b/.test(input)) findings.push('possible_payment_card');
  if (/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(input)) findings.push('email_address');
  if (/\b(?:confidential|nda|unreleased|trade secret|script draft|copyright)\b/i.test(input)) findings.push('confidential_ip_marker');
  if (/\b(?:api[_-]?key|secret|token|password|private[_-]?key)\b/i.test(input)) findings.push('possible_secret');
  const classification = findings.includes('possible_payment_card') || findings.includes('possible_us_ssn') || findings.includes('possible_secret')
    ? 'restricted'
    : findings.length
      ? 'confidential'
      : 'internal';
  return {
    classification,
    findings,
    allowedForAiProvider: classification !== 'restricted' || boolEnv('ALLOW_RESTRICTED_DATA_TO_AI_PROVIDERS', false),
    requiredControls: classification === 'restricted'
      ? ['block_public_generation', 'manual_security_review', 'private_storage_only', 'audit_event_required']
      : ['private_storage', 'tenant_access_check', 'provenance_required']
  };
}

export function scanUploadMetadata({ fileName, sizeBytes, contentType }: { fileName: string; sizeBytes: number; contentType: string }) {
  const blockedExtensions = (process.env.BLOCKED_UPLOAD_EXTENSIONS ?? '.exe,.dll,.bat,.cmd,.ps1,.sh,.js,.mjs,.jar,.scr,.vbs,.apk').split(',').map((item) => item.trim().toLowerCase());
  const allowedContentTypes = (process.env.ALLOWED_UPLOAD_CONTENT_TYPES ?? 'text/plain,application/pdf,application/json,text/markdown,application/vnd.openxmlformats-officedocument.wordprocessingml.document').split(',').map((item) => item.trim().toLowerCase());
  const maxBytes = Number(process.env.MAX_UPLOAD_BYTES ?? 25 * 1024 * 1024);
  const lowerName = fileName.toLowerCase();
  const blockers: string[] = [];
  if (blockedExtensions.some((ext) => lowerName.endsWith(ext))) blockers.push('blocked_extension');
  if (sizeBytes > maxBytes) blockers.push('file_too_large');
  if (contentType && !allowedContentTypes.includes(contentType.toLowerCase())) blockers.push('content_type_not_allowed');
  if (boolEnv('MALWARE_SCAN_REQUIRED', isProductionLike()) && !process.env.MALWARE_SCAN_ENDPOINT_URL) blockers.push('malware_scanner_not_configured');
  return {
    allowed: blockers.length === 0,
    blockers,
    maxBytes,
    requiresMalwareScan: boolEnv('MALWARE_SCAN_REQUIRED', isProductionLike()),
    requiresSandboxDetonation: boolEnv('UPLOAD_SANDBOX_DETONATION_REQUIRED', false),
    recommendedStorage: 'private_quarantine_bucket_before_release'
  };
}

export function scoreRequestRisk(request: Request, context: Record<string, unknown> = {}) {
  const ip = getClientIp(request);
  const ua = request.headers.get('user-agent') ?? 'unknown';
  const country = request.headers.get('x-vercel-ip-country') ?? request.headers.get('cf-ipcountry') ?? 'unknown';
  const method = request.method.toUpperCase();
  let score = 0;
  const signals: string[] = [];
  if (ip === 'unknown') { score += 10; signals.push('unknown_ip'); }
  if (ua === 'unknown' || /curl|python|bot|spider|crawler/i.test(ua)) { score += 20; signals.push('automation_or_unknown_user_agent'); }
  if (method !== 'GET' && !request.headers.get('x-cineloom-csrf')) { score += 15; signals.push('mutating_without_csrf_header'); }
  if (request.headers.get('x-forwarded-for')?.split(',').length && Number(request.headers.get('x-forwarded-for')?.split(',').length) > 3) { score += 10; signals.push('long_proxy_chain'); }
  if (context.highValueAction) { score += 20; signals.push('high_value_action'); }
  if (context.superAdminAction) { score += 25; signals.push('super_admin_action'); }
  if (context.publicGeneration) { score += 15; signals.push('public_generation'); }
  const risk = score >= 70 ? 'critical' : score >= 45 ? 'high' : score >= 20 ? 'medium' : 'low';
  return {
    risk,
    score: Math.min(score, 100),
    signals,
    ip,
    country,
    userAgentHash: hmacSha256(process.env.RISK_HASH_SECRET ?? 'demo-risk-hash', ua).slice(0, 18),
    action: risk === 'critical' ? 'block_or_step_up_mfa' : risk === 'high' ? 'step_up_mfa' : risk === 'medium' ? 'throttle_and_log' : 'allow'
  };
}

export function assertTenantIsolation({ userWorkspaceId, resourceWorkspaceId, role }: { userWorkspaceId?: string | null; resourceWorkspaceId?: string | null; role?: string | null }): SecurityDecision {
  if (!userWorkspaceId || !resourceWorkspaceId) return { allowed: false, reason: 'Workspace identity is required.', status: 403 };
  if (userWorkspaceId === resourceWorkspaceId) return { allowed: true, reason: 'Workspace ownership matched.' };
  if (role === 'SuperAdmin' && boolEnv('SUPER_ADMIN_CROSS_TENANT_ACCESS_ENABLED', false)) return { allowed: true, reason: 'Super Admin cross-tenant access explicitly enabled.' };
  return { allowed: false, reason: 'Cross-tenant access blocked.', status: 403, remediation: ['Verify workspace membership', 'Use audited break-glass flow for support access'] };
}

export function buildAdvancedSecurityControls(): AdvancedSecurityControl[] {
  return [
    { id: 'real-auth-mfa', name: 'Enterprise auth with MFA/SSO', category: 'identity', severity: 'critical', configured: configured('AUTH_MODE') && process.env.AUTH_MODE !== 'demo' && configured('ENTERPRISE_SSO_PROVIDER'), env: ['AUTH_MODE', 'ENTERPRISE_SSO_PROVIDER'], productionBlocker: true, detail: 'Blocks production dependency on demo sessions and requires enterprise identity provider.' },
    { id: 'signed-api-requests', name: 'Signed internal API requests', category: 'application', severity: 'critical', configured: configured('REQUEST_SIGNATURE_SECRET'), env: ['REQUEST_SIGNATURE_SECRET'], productionBlocker: true, detail: 'Prevents replay/tampering on internal and worker callbacks with timestamp, nonce, and HMAC.' },
    { id: 'kms-envelope-encryption', name: 'KMS-backed envelope encryption', category: 'data', severity: 'critical', configured: configured('KMS_KEY_ID', 'ENVELOPE_ENCRYPTION_ENDPOINT_URL'), env: ['KMS_KEY_ID', 'ENVELOPE_ENCRYPTION_ENDPOINT_URL'], productionBlocker: true, detail: 'Customer scripts, prompts, exports, and provenance records require key-managed encryption.' },
    { id: 'dlp-pii-ip-scanning', name: 'DLP scanning for scripts and uploads', category: 'data', severity: 'high', configured: configured('DLP_SCAN_ENDPOINT_URL'), env: ['DLP_SCAN_ENDPOINT_URL'], productionBlocker: true, detail: 'Detects secrets, PII, unreleased IP markers, and restricted data before model calls.' },
    { id: 'malware-upload-scan', name: 'Malware and file quarantine scanning', category: 'application', severity: 'critical', configured: configured('MALWARE_SCAN_ENDPOINT_URL', 'UPLOAD_QUARANTINE_BUCKET'), env: ['MALWARE_SCAN_ENDPOINT_URL', 'UPLOAD_QUARANTINE_BUCKET'], productionBlocker: true, detail: 'All uploaded scripts/assets are quarantined and scanned before project release.' },
    { id: 'waf-bot-mtls', name: 'WAF, bot defense, and mTLS/edge attestation', category: 'network', severity: 'critical', configured: configured('WAF_PROVIDER', 'BOT_PROTECTION_PROVIDER', 'EDGE_ATTESTATION_SECRET'), env: ['WAF_PROVIDER', 'BOT_PROTECTION_PROVIDER', 'EDGE_ATTESTATION_SECRET'], productionBlocker: true, detail: 'Public generation and paid flows require edge threat filtering and origin verification.' },
    { id: 'siem-immutable-audit', name: 'Immutable audit stream to SIEM', category: 'operations', severity: 'critical', configured: configured('SIEM_ENDPOINT_URL', 'AUDIT_EVENT_SIGNING_SECRET', 'IMMUTABLE_AUDIT_STORE_URL'), env: ['SIEM_ENDPOINT_URL', 'AUDIT_EVENT_SIGNING_SECRET', 'IMMUTABLE_AUDIT_STORE_URL'], productionBlocker: true, detail: 'Every privileged action, token charge, export, and download is signed and forwarded.' },
    { id: 'risk-step-up-engine', name: 'Risk scoring and step-up MFA', category: 'identity', severity: 'high', configured: configured('RISK_ENGINE_ENDPOINT_URL', 'STEP_UP_MFA_ENDPOINT_URL'), env: ['RISK_ENGINE_ENDPOINT_URL', 'STEP_UP_MFA_ENDPOINT_URL'], productionBlocker: true, detail: 'High-risk checkout, export, admin, and support actions require additional verification.' },
    { id: 'tenant-isolation', name: 'Tenant isolation policy engine', category: 'data', severity: 'critical', configured: configured('TENANT_POLICY_ENGINE_URL'), env: ['TENANT_POLICY_ENGINE_URL'], productionBlocker: true, detail: 'Workspace data access is enforced by a central policy check before reads/downloads.' },
    { id: 'secrets-rotation', name: 'Automated secrets rotation and leak scanning', category: 'operations', severity: 'high', configured: configured('SECRET_MANAGER_PROVIDER', 'SECRET_ROTATION_WEBHOOK_URL', 'SECRET_LEAK_SCAN_ENABLED'), env: ['SECRET_MANAGER_PROVIDER', 'SECRET_ROTATION_WEBHOOK_URL', 'SECRET_LEAK_SCAN_ENABLED'], productionBlocker: true, detail: 'Secrets are rotated, scanned in CI, and never shown in the UI.' },
    { id: 'sast-dast-sca', name: 'SAST/DAST/SCA supply-chain security', category: 'application', severity: 'high', configured: configured('SAST_PROVIDER', 'DAST_PROVIDER', 'SCA_PROVIDER', 'SBOM_GENERATION_ENABLED'), env: ['SAST_PROVIDER', 'DAST_PROVIDER', 'SCA_PROVIDER', 'SBOM_GENERATION_ENABLED'], productionBlocker: true, detail: 'Code, dependencies, containers, and deployed preview URLs are scanned before promotion.' },
    { id: 'incident-dr', name: 'Incident response, backup, and disaster recovery', category: 'operations', severity: 'high', configured: configured('INCIDENT_RESPONSE_ONCALL_URL', 'BACKUP_RESTORE_TEST_APPROVED', 'DR_RUNBOOK_APPROVED'), env: ['INCIDENT_RESPONSE_ONCALL_URL', 'BACKUP_RESTORE_TEST_APPROVED', 'DR_RUNBOOK_APPROVED'], productionBlocker: true, detail: 'Production cannot launch without on-call, backup restore proof, and DR runbook approval.' },
    { id: 'ai-safety-boundary', name: 'AI safety boundary enforcement', category: 'ai', severity: 'critical', configured: configured('AI_SAFETY_MODERATION_ENDPOINT_URL', 'AI_PROMPT_INJECTION_FIREWALL_URL', 'AI_PROVENANCE_ENDPOINT_URL'), env: ['AI_SAFETY_MODERATION_ENDPOINT_URL', 'AI_PROMPT_INJECTION_FIREWALL_URL', 'AI_PROVENANCE_ENDPOINT_URL'], productionBlocker: true, detail: 'All model requests pass moderation, prompt-injection defense, and provenance logging.' },
    { id: 'compliance-evidence', name: 'Compliance evidence locker', category: 'compliance', severity: 'high', configured: configured('COMPLIANCE_EVIDENCE_LOCKER_URL', 'SOC2_EVIDENCE_REPOSITORY_URL'), env: ['COMPLIANCE_EVIDENCE_LOCKER_URL', 'SOC2_EVIDENCE_REPOSITORY_URL'], productionBlocker: true, detail: 'Stores signed proof for SOC 2, legal, IP, security, load, billing, and model governance approvals.' }
  ];
}

export function buildAdvancedSecurityReadiness() {
  const controls = buildAdvancedSecurityControls();
  const configuredCount = controls.filter((control) => control.configured).length;
  const blockers = controls.filter((control) => control.productionBlocker && !control.configured);
  const score = Math.round((configuredCount / Math.max(controls.length, 1)) * 100);
  return {
    ok: blockers.length === 0,
    profile: 'v4.8-defense-in-depth',
    score,
    configuredCount,
    total: controls.length,
    blockers: blockers.map((control) => ({ id: control.id, name: control.name, env: control.env ?? [], severity: control.severity })),
    controls,
    productionDecision: blockers.length ? 'blocked_until_all_advanced_security_controls_are_configured' : 'advanced_security_ready',
    requiredBeforePublicPaidLaunch: [
      'Signed internal requests with nonce/timestamp replay defense',
      'KMS envelope encryption for scripts, prompts, exports, and provenance',
      'DLP + malware scanning before AI execution or export release',
      'Risk scoring with step-up MFA for privileged and high-value actions',
      'Tenant isolation policy check on reads, exports, and support access',
      'Immutable signed audit events streamed to SIEM',
      'SAST/DAST/SCA/SBOM in CI before production promotion',
      'WAF, bot protection, and edge attestation for public endpoints',
      'AI prompt-injection firewall, moderation, and provenance enforcement',
      'Compliance evidence locker with release approvals'
    ]
  };
}

export function signedAuditEvent(event: Record<string, unknown>) {
  const occurredAt = new Date().toISOString();
  const payload = { occurredAt, event, source: 'cineloom-v4.8-advanced-security' };
  const serialized = JSON.stringify(payload);
  const signatureSecret = process.env.AUDIT_EVENT_SIGNING_SECRET ?? process.env.SUPER_ADMIN_API_KEY ?? 'demo-audit-secret';
  return {
    ...payload,
    signatureAlgorithm: 'HMAC-SHA256',
    signature: hmacSha256(signatureSecret, serialized),
    forwardedToSiem: Boolean(process.env.SIEM_ENDPOINT_URL),
    immutableStoreConfigured: Boolean(process.env.IMMUTABLE_AUDIT_STORE_URL)
  };
}

export function advancedSecurityJson(body: unknown, init?: ResponseInit) {
  return secureJson(body, init);
}
