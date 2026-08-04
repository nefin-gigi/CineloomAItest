const strict = process.argv.includes('--strict');
const requiredEnv = [
  'NEXT_PUBLIC_APP_URL',
  'DATABASE_URL',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_CREATOR',
  'STRIPE_PRICE_STUDIO',
  'PRIVATE_STORAGE_BUCKET',
  'QUEUE_PROVIDER',
  'QUEUE_ENDPOINT_URL',
  'OBSERVABILITY_WEBHOOK_URL',
  'REDIS_URL',
  'EMAIL_PROVIDER_ENDPOINT',
  'AUTH_MODE',
  'SUPER_ADMIN_API_KEY',
  'SUPER_ADMIN_SESSION_TOKEN',
  'CSRF_PROTECTION_ENFORCE',
  'LIVE_PAID_SAAS_MODE',
  'TOKEN_LEDGER_ENDPOINT_URL',
  'TOKEN_LEDGER_SECRET',
  'BILLING_RECONCILIATION_ENDPOINT_URL',
  'BILLING_RECONCILIATION_SECRET',
  'AUTH_PROVIDER_HEALTH_URL',
  'DATABASE_HEALTH_URL',
  'BOT_PROTECTION_PROVIDER',
  'WAF_PROVIDER',
  'EXEC_STORYBOARD_GENERATE_URL',
  'EXEC_STORYBOARD_GENERATE_SECRET',
  'EXEC_EXPORT_PACKAGE_URL',
  'EXEC_EXPORT_PACKAGE_SECRET',
  'CHATGPT_AGENT_ENDPOINT_URL',
  'CHATGPT_AGENT_ENDPOINT_SECRET',
  'RATE_LIMIT_PROVIDER',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'AI_EVAL_ENDPOINT_URL',
  'AI_EVAL_ENDPOINT_SECRET',
  'AI_PROVIDER_BENCHMARK_ENDPOINT_URL',
  'AI_PROVIDER_BENCHMARK_ENDPOINT_SECRET',
  'AI_PROVENANCE_ENDPOINT_URL',
  'AI_PROVENANCE_ENDPOINT_SECRET',
  'AI_SAFETY_MODERATION_ENDPOINT_URL',
  'AI_SAFETY_MODERATION_ENDPOINT_SECRET',
  'FINAL_PRODUCTION_MODE',
  'FINAL_PRODUCTION_10_REQUIRED',
  'ENTERPRISE_SSO_PROVIDER',
  'SAML_METADATA_URL',
  'SCIM_PROVIDER_ENDPOINT',
  'MARKETPLACE_PAYOUT_ENDPOINT',
  'MARKETPLACE_PAYOUT_SECRET',
  'DEVELOPER_API_KEY_ENDPOINT',
  'DEVELOPER_USAGE_METER_ENDPOINT',
  'DEVELOPER_API_BILLING_ENDPOINT',
  'UNIT_ECONOMICS_ENDPOINT',
  'REVENUE_METRICS_ENDPOINT',
  'RETENTION_METRICS_ENDPOINT',
  'REFERRAL_PROVIDER_ENDPOINT',
  'SIEM_ENDPOINT_URL',
  'INCIDENT_RESPONSE_ONCALL_URL',
  'REQUEST_SIGNATURE_SECRET',
  'INTERNAL_SERVICE_SECRET',
  'KMS_KEY_ID',
  'ENVELOPE_ENCRYPTION_ENDPOINT_URL',
  'DLP_SCAN_ENDPOINT_URL',
  'MALWARE_SCAN_ENDPOINT_URL',
  'UPLOAD_QUARANTINE_BUCKET',
  'EDGE_ATTESTATION_SECRET',
  'AUDIT_EVENT_SIGNING_SECRET',
  'IMMUTABLE_AUDIT_STORE_URL',
  'RISK_ENGINE_ENDPOINT_URL',
  'STEP_UP_MFA_ENDPOINT_URL',
  'TENANT_POLICY_ENGINE_URL',
  'SECRET_MANAGER_PROVIDER',
  'SECRET_ROTATION_WEBHOOK_URL',
  'SAST_PROVIDER',
  'DAST_PROVIDER',
  'SCA_PROVIDER',
  'SBOM_GENERATION_ENABLED',
  'AI_PROMPT_INJECTION_FIREWALL_URL',
  'COMPLIANCE_EVIDENCE_LOCKER_URL',
];

const missing = requiredEnv.filter((name) => !process.env[name]);
const productionUnsafe = [];
if ((process.env.AUTH_MODE ?? 'demo').toLowerCase() === 'demo') productionUnsafe.push('AUTH_MODE=demo');
if ((process.env.REQUIRE_AUTH_FOR_STUDIO ?? 'true').toLowerCase() === 'false') productionUnsafe.push('REQUIRE_AUTH_FOR_STUDIO=false');
if ((process.env.PUBLIC_EMAIL_ENDPOINT_ENABLED ?? 'false').toLowerCase() === 'true' && !process.env.EMAIL_PROVIDER_API_KEY) productionUnsafe.push('PUBLIC_EMAIL_ENDPOINT_ENABLED=true without EMAIL_PROVIDER_API_KEY');
if ((process.env.RATE_LIMIT_PROVIDER ?? 'memory').toLowerCase() === 'memory' && (process.env.PAID_LAUNCH_ENABLED ?? 'false').toLowerCase() === 'true') productionUnsafe.push('PAID_LAUNCH_ENABLED=true with RATE_LIMIT_PROVIDER=memory');
if ((process.env.RATE_LIMIT_FAIL_CLOSED ?? 'false').toLowerCase() !== 'true' && (process.env.PAID_LAUNCH_ENABLED ?? 'false').toLowerCase() === 'true') productionUnsafe.push('PAID_LAUNCH_ENABLED=true without RATE_LIMIT_FAIL_CLOSED=true');
if ((process.env.PUBLIC_LAUNCH_ENABLED ?? 'false').toLowerCase() === 'true' && (process.env.FINAL_PRODUCTION_10_REQUIRED ?? 'true').toLowerCase() !== 'true') productionUnsafe.push('PUBLIC_LAUNCH_ENABLED=true without FINAL_PRODUCTION_10_REQUIRED=true');
if ((process.env.PUBLIC_PAID_CHECKOUT_ENABLED ?? 'false').toLowerCase() === 'true' && (process.env.PAID_LAUNCH_ENABLED ?? 'false').toLowerCase() !== 'true') productionUnsafe.push('PUBLIC_PAID_CHECKOUT_ENABLED=true but PAID_LAUNCH_ENABLED is not true');

if ((process.env.MALWARE_SCAN_REQUIRED ?? 'true').toLowerCase() === 'true' && !process.env.MALWARE_SCAN_ENDPOINT_URL) productionUnsafe.push('MALWARE_SCAN_REQUIRED=true without MALWARE_SCAN_ENDPOINT_URL');
if ((process.env.AI_PROVIDER_ALLOWLIST_ENFORCED ?? 'true').toLowerCase() !== 'true' && (process.env.PAID_LAUNCH_ENABLED ?? 'false').toLowerCase() === 'true') productionUnsafe.push('Paid launch without AI_PROVIDER_ALLOWLIST_ENFORCED=true');
if ((process.env.SUPPORT_BREAK_GLASS_APPROVAL_REQUIRED ?? 'true').toLowerCase() !== 'true' && (process.env.PUBLIC_LAUNCH_ENABLED ?? 'false').toLowerCase() === 'true') productionUnsafe.push('Public launch without SUPPORT_BREAK_GLASS_APPROVAL_REQUIRED=true');

if (missing.length || productionUnsafe.length) {
  console.warn('CineLoom v4.8 production readiness warning. Missing env vars:', missing.join(', ') || 'none');
  if (productionUnsafe.length) console.warn('Production-unsafe settings:', productionUnsafe.join(', '));
  console.warn('The package is hardened and Vercel-ready, but public payment/2000-user launch should wait until live services are configured, load-tested, security-reviewed, and legally approved.');
  process.exit(strict ? 1 : 0);
}
console.log('CineLoom v4.8 production readiness environment check passed. Run load tests, legal/security review, endpoint health checks, payment webhooks, and Vercel preview QA before launch.');
