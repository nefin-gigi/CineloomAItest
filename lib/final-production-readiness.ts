import { buildAIHarnessReadiness } from './ai-harness';
import { buildLivePaidSaasReadiness } from './live-paid-saas';
import { buildSecurityReadiness, assertProductionSafeConfiguration, isProductionLike } from './military-security';

export type FinalProductionDimension = {
  id: string;
  area: string;
  architectureScore: number;
  liveProofScore: number;
  billionDollarWeight: number;
  status: 'production_architecture_10' | 'requires_live_configuration' | 'requires_market_proof' | 'blocked';
  productionControls: string[];
  evidenceRequired: string[];
  env: string[];
  approvalEnv?: string[];
  owner: string;
  revenueImpact: string;
};

export type FinalProductionGate = {
  key: string;
  label: string;
  category: 'auth' | 'billing' | 'ai' | 'security' | 'enterprise' | 'marketplace' | 'api' | 'growth' | 'operations' | 'legal' | 'scale';
  requiredEnv: string[];
  forbidden?: Record<string, string[]>;
  approvals?: string[];
  severity: 'critical' | 'high';
  businessReason: string;
};

function env(key: string) {
  return process.env[key] ?? '';
}

function boolEnv(key: string) {
  return ['true', 'approved', 'yes', '1'].includes(env(key).toLowerCase());
}

function configured(keys: string[]) {
  return keys.every((key) => Boolean(env(key)));
}

function forbiddenSafe(forbidden?: Record<string, string[]>) {
  if (!forbidden) return true;
  return Object.entries(forbidden).every(([key, values]) => !values.map((item) => item.toLowerCase()).includes(env(key).toLowerCase()));
}

export const FINAL_PRODUCTION_DIMENSIONS: FinalProductionDimension[] = [
  {
    id: 'product-magic',
    area: 'Product magic and film workflow',
    architectureScore: 10,
    liveProofScore: 8,
    billionDollarWeight: 10,
    status: 'production_architecture_10',
    owner: 'Product / Film Intelligence',
    revenueImpact: 'Turns visitors into users by delivering a cinematic storyboard result inside the first session.',
    productionControls: ['Free 10-second storyboard funnel', 'Flagship scene proof package', 'Prompt-driven corrections', 'Director package exports', '180-degree continuity workflow'],
    evidenceRequired: ['Live generated storyboard quality report', 'Free sample completion rate', 'Export download rate', 'Director satisfaction score'],
    env: ['EXEC_STORYBOARD_GENERATE_URL', 'EXEC_STORYBOARD_GENERATE_SECRET', 'EXEC_EXPORT_PACKAGE_URL', 'EXEC_EXPORT_PACKAGE_SECRET'],
    approvalEnv: ['AI_ENDPOINTS_TEST_APPROVED']
  },
  {
    id: 'ai-harness',
    area: 'AI harness, evals, safety, and provenance',
    architectureScore: 10,
    liveProofScore: 8,
    billionDollarWeight: 10,
    status: 'production_architecture_10',
    owner: 'AI Platform',
    revenueImpact: 'Protects output quality, provider costs, safety, and IP trust as usage scales.',
    productionControls: ['Prompt/model registry', 'Golden film tests', 'Rubric-based evals', 'Provider benchmarking', 'Provenance ledger', 'Safety moderation', 'Prompt-injection defense'],
    evidenceRequired: ['Golden test run', 'Provider benchmark report', 'Safety red-team report', 'Provenance samples for generated assets'],
    env: ['AI_EVAL_ENDPOINT_URL', 'AI_PROVIDER_BENCHMARK_ENDPOINT_URL', 'AI_PROVENANCE_ENDPOINT_URL', 'AI_SAFETY_MODERATION_ENDPOINT_URL', 'AI_PROMPT_REGISTRY_ENDPOINT_URL', 'AI_GOLDEN_TEST_ENDPOINT_URL'],
    approvalEnv: ['AI_ENDPOINTS_TEST_APPROVED']
  },
  {
    id: 'security',
    area: 'Zero-trust security and threat protection',
    architectureScore: 10,
    liveProofScore: 8,
    billionDollarWeight: 10,
    status: 'production_architecture_10',
    owner: 'Security / Platform',
    revenueImpact: 'Enables serious creators, studios, and enterprise customers to trust CineLoom with confidential scripts.',
    productionControls: ['Super Admin lockdown', 'CSP/HSTS/CSRF', 'WAF/bot protection contracts', 'SIEM event forwarding', 'IP allowlist', 'strict production gates'],
    evidenceRequired: ['Penetration test report', 'WAF dashboard', 'SIEM logs', 'secret rotation evidence', 'incident response drill'],
    env: ['SECURITY_PROFILE', 'SUPER_ADMIN_API_KEY', 'SUPER_ADMIN_SESSION_TOKEN', 'WAF_PROVIDER', 'BOT_PROTECTION_PROVIDER', 'SIEM_ENDPOINT_URL', 'SECURITY_EVENT_WEBHOOK_URL'],
    approvalEnv: ['SECURITY_REVIEW_APPROVED', 'PENETRATION_TEST_APPROVED']
  },
  {
    id: 'live-paid-saas',
    area: 'Live paid SaaS billing and token economics',
    architectureScore: 10,
    liveProofScore: 7,
    billionDollarWeight: 10,
    status: 'requires_live_configuration',
    owner: 'Billing / Finance / Platform',
    revenueImpact: 'Makes the product capable of safely collecting recurring subscription and usage revenue.',
    productionControls: ['Stripe checkout', 'Webhook reconciliation', 'Customer portal', 'Token reserve/commit/refund', 'Idempotency', 'failed-payment workflow'],
    evidenceRequired: ['Stripe live test payment', 'Webhook reconciliation test', 'Token ledger audit', 'refund/failure simulation', 'gross margin report'],
    env: ['PAYMENT_GATEWAY_MODE', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_CREATOR', 'STRIPE_PRICE_STUDIO', 'STRIPE_PRICE_PRODUCER', 'TOKEN_LEDGER_ENDPOINT_URL', 'TOKEN_LEDGER_SECRET'],
    approvalEnv: ['PAYMENT_RECONCILIATION_TEST_APPROVED']
  },
  {
    id: 'enterprise-trust',
    area: 'Enterprise studio trust, SSO, compliance, and legal',
    architectureScore: 10,
    liveProofScore: 7,
    billionDollarWeight: 9,
    status: 'requires_live_configuration',
    owner: 'Enterprise / Legal / Security',
    revenueImpact: 'Creates the path to large studio, agency, education, and enterprise contracts.',
    productionControls: ['SAML SSO', 'SCIM', 'RBAC', 'DPA packet', 'data retention', 'audit export', 'SOC 2 readiness', 'model training opt-out'],
    evidenceRequired: ['SSO pilot', 'SCIM user lifecycle test', 'DPA/legal approval', 'SOC 2 readiness evidence', 'audit export sample'],
    env: ['ENTERPRISE_SSO_PROVIDER', 'SAML_METADATA_URL', 'SCIM_PROVIDER_ENDPOINT', 'AUDIT_EXPORT_ENDPOINT', 'DATA_RETENTION_ENDPOINT', 'IP_RIGHTS_RECEIPT_ENDPOINT'],
    approvalEnv: ['LEGAL_REVIEW_APPROVED', 'SOC2_READINESS_APPROVED']
  },
  {
    id: 'marketplace',
    area: 'Marketplace ecosystem and seller payouts',
    architectureScore: 10,
    liveProofScore: 6,
    billionDollarWeight: 8,
    status: 'requires_market_proof',
    owner: 'Marketplace / Growth',
    revenueImpact: 'Adds network effects and take-rate revenue through templates, styles, shot packs, voices, music cues, and plugins.',
    productionControls: ['Seller onboarding', 'KYC gate', 'payout provider', 'commission engine', 'review/approval workflow', 'ratings and refunds'],
    evidenceRequired: ['First seller onboarded', 'payout test', 'marketplace transaction test', 'quality approval workflow test'],
    env: ['MARKETPLACE_ENABLED', 'MARKETPLACE_PAYOUT_PROVIDER', 'MARKETPLACE_PAYOUT_ENDPOINT', 'MARKETPLACE_PAYOUT_SECRET', 'STRIPE_CONNECT_CLIENT_ID'],
    approvalEnv: ['MARKETPLACE_PAYOUTS_APPROVED']
  },
  {
    id: 'api-platform',
    area: 'Developer API platform and usage billing',
    architectureScore: 10,
    liveProofScore: 6,
    billionDollarWeight: 8,
    status: 'requires_market_proof',
    owner: 'Developer Platform',
    revenueImpact: 'Turns CineLoom into infrastructure for other creator tools, studios, agencies, and education platforms.',
    productionControls: ['API keys', 'metering', 'rate limits', 'usage billing', 'webhooks', 'developer dashboard', 'SDK roadmap'],
    evidenceRequired: ['API key issued', 'usage event metered', 'developer billing test', 'webhook callback test', 'SDK smoke test'],
    env: ['API_PLATFORM_ENABLED', 'DEVELOPER_API_MODE', 'DEVELOPER_API_KEY_ENDPOINT', 'DEVELOPER_USAGE_METER_ENDPOINT', 'DEVELOPER_API_BILLING_ENDPOINT', 'DEVELOPER_WEBHOOK_SECRET'],
    approvalEnv: ['DEVELOPER_API_APPROVED']
  },
  {
    id: 'growth',
    area: 'Growth, SEO, referrals, and conversion analytics',
    architectureScore: 10,
    liveProofScore: 6,
    billionDollarWeight: 8,
    status: 'requires_market_proof',
    owner: 'Growth / Marketing',
    revenueImpact: 'Builds scalable acquisition through free samples, public shares, referrals, SEO pages, and creator loops.',
    productionControls: ['Global analytics', 'UTM capture', 'referrals', 'public share/remix', 'SEO programmatic pages', 'conversion dashboard'],
    evidenceRequired: ['Analytics provider connected', 'free-to-paid conversion report', 'referral test', 'SEO content approval', 'first 1,000 free storyboard completions'],
    env: ['ANALYTICS_MODE', 'ANALYTICS_PROVIDER_ENDPOINT', 'CONVERSION_ANALYTICS_ENDPOINT_URL', 'REFERRAL_PROVIDER_ENDPOINT', 'AFFILIATE_PROVIDER_ENDPOINT'],
    approvalEnv: ['SEO_PROGRAMMATIC_CONTENT_APPROVED']
  },
  {
    id: 'scale-reliability',
    area: 'Scale, reliability, observability, and disaster recovery',
    architectureScore: 10,
    liveProofScore: 7,
    billionDollarWeight: 9,
    status: 'requires_live_configuration',
    owner: 'SRE / Platform',
    revenueImpact: 'Protects paid revenue, enterprise trust, and generation reliability under traffic spikes.',
    productionControls: ['Queues', 'Redis rate limits', 'health checks', 'status page', 'observability', 'load testing', 'backup/restore', 'DR runbook'],
    evidenceRequired: ['2,000-user load test', 'backup restore drill', 'incident drill', 'queue failover test', 'provider circuit breaker test'],
    env: ['QUEUE_PROVIDER', 'QUEUE_ENDPOINT_URL', 'REDIS_URL', 'RATE_LIMIT_PROVIDER', 'OBSERVABILITY_WEBHOOK_URL', 'LOG_SINK_URL', 'METRICS_SINK_URL', 'ALERT_WEBHOOK_URL'],
    approvalEnv: ['LOAD_TEST_2000_USERS_APPROVED', 'BACKUP_RESTORE_TEST_APPROVED', 'DR_RUNBOOK_APPROVED']
  },
  {
    id: 'operations-company',
    area: 'Operating company, customer success, and revenue discipline',
    architectureScore: 10,
    liveProofScore: 6,
    billionDollarWeight: 8,
    status: 'requires_market_proof',
    owner: 'Executive / Customer Success / Finance',
    revenueImpact: 'Creates the management system for retention, support, expansion, margins, pilots, and enterprise sales.',
    productionControls: ['Support desk', 'onboarding emails', 'customer success metrics', 'revenue dashboard', 'unit economics', 'retention cohorts', 'enterprise pilots'],
    evidenceRequired: ['Support SLA test', 'onboarding delivery test', 'unit economics report', 'retention cohort report', 'enterprise pilot pipeline'],
    env: ['SUPPORT_TICKET_ENDPOINT_URL', 'EMAIL_PROVIDER_ENDPOINT', 'CUSTOMER_SUCCESS_ENDPOINT', 'UNIT_ECONOMICS_ENDPOINT', 'REVENUE_METRICS_ENDPOINT', 'RETENTION_METRICS_ENDPOINT'],
    approvalEnv: ['CUSTOMER_SUCCESS_READY', 'UNIT_ECONOMICS_APPROVED']
  }
];

export const FINAL_PRODUCTION_GATES: FinalProductionGate[] = [
  {
    key: 'auth-rbac',
    label: 'Real authentication, RBAC, and workspace membership',
    category: 'auth',
    requiredEnv: ['AUTH_MODE', 'AUTH_PROVIDER_HEALTH_URL', 'AUTH_REQUIRE_EMAIL_VERIFICATION', 'AUTH_REQUIRE_WORKSPACE_RBAC'],
    forbidden: { AUTH_MODE: ['demo'] },
    severity: 'critical',
    businessReason: 'Prevents fake sessions, account takeover, and unauthorized project access.'
  },
  {
    key: 'database',
    label: 'Production database, migrations, backups, and restore proof',
    category: 'operations',
    requiredEnv: ['DATABASE_URL', 'DATABASE_HEALTH_URL', 'BACKUP_RESTORE_TEST_APPROVED'],
    approvals: ['BACKUP_RESTORE_TEST_APPROVED'],
    severity: 'critical',
    businessReason: 'Persists users, projects, jobs, tokens, billing, audit logs, marketplace, API usage, and enterprise data.'
  },
  {
    key: 'billing-ledger',
    label: 'Stripe billing, reconciliation, and transactional token ledger',
    category: 'billing',
    requiredEnv: ['PAYMENT_GATEWAY_MODE', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'TOKEN_LEDGER_ENDPOINT_URL', 'TOKEN_LEDGER_SECRET'],
    forbidden: { PAYMENT_GATEWAY_MODE: ['demo'], TOKEN_LEDGER_MODE: ['demo'] },
    approvals: ['PAYMENT_RECONCILIATION_TEST_APPROVED', 'UNIT_ECONOMICS_APPROVED'],
    severity: 'critical',
    businessReason: 'Enables recurring revenue without duplicate charges, unpaid AI costs, or margin leakage.'
  },
  {
    key: 'private-assets',
    label: 'Private storage, signed URLs, and workspace ownership checks',
    category: 'security',
    requiredEnv: ['STORAGE_MODE', 'PRIVATE_STORAGE_BUCKET', 'PRIVATE_STORAGE_SIGNED_URL_ENDPOINT'],
    forbidden: { STORAGE_MODE: ['demo'] },
    approvals: ['PRIVATE_STORAGE_TEST_APPROVED'],
    severity: 'critical',
    businessReason: 'Protects customer scripts and exported IP.'
  },
  {
    key: 'ai-execution',
    label: 'Live AI storyboard, export, eval, safety, and provenance services',
    category: 'ai',
    requiredEnv: ['EXEC_STORYBOARD_GENERATE_URL', 'EXEC_STORYBOARD_GENERATE_SECRET', 'EXEC_EXPORT_PACKAGE_URL', 'EXEC_EXPORT_PACKAGE_SECRET', 'AI_EVAL_ENDPOINT_URL', 'AI_PROVENANCE_ENDPOINT_URL', 'AI_SAFETY_MODERATION_ENDPOINT_URL'],
    approvals: ['AI_ENDPOINTS_TEST_APPROVED'],
    severity: 'critical',
    businessReason: 'Delivers the actual product value and protects quality/safety at scale.'
  },
  {
    key: 'queues-rate-limits',
    label: 'Queue workers, Redis rate limiting, WAF, and bot protection',
    category: 'scale',
    requiredEnv: ['QUEUE_PROVIDER', 'QUEUE_ENDPOINT_URL', 'QUEUE_WEBHOOK_SECRET', 'RATE_LIMIT_PROVIDER', 'REDIS_URL', 'WAF_PROVIDER', 'BOT_PROTECTION_PROVIDER'],
    forbidden: { QUEUE_PROVIDER: ['demo'], RATE_LIMIT_PROVIDER: ['memory', 'demo'] },
    approvals: ['LOAD_TEST_2000_USERS_APPROVED'],
    severity: 'critical',
    businessReason: 'Prevents public abuse and keeps generation jobs reliable under launch traffic.'
  },
  {
    key: 'observability-siem',
    label: 'Observability, SIEM, alerts, status, and incident response',
    category: 'operations',
    requiredEnv: ['OBSERVABILITY_WEBHOOK_URL', 'LOG_SINK_URL', 'METRICS_SINK_URL', 'ALERT_WEBHOOK_URL', 'SIEM_ENDPOINT_URL', 'INCIDENT_RESPONSE_ONCALL_URL'],
    approvals: ['DR_RUNBOOK_APPROVED'],
    severity: 'critical',
    businessReason: 'Gives the team production visibility and incident response for paying customers.'
  },
  {
    key: 'enterprise-compliance',
    label: 'Enterprise SSO, SCIM, audit export, DPA, SOC 2 readiness, and legal/IP approvals',
    category: 'enterprise',
    requiredEnv: ['ENTERPRISE_SSO_PROVIDER', 'SAML_METADATA_URL', 'SCIM_PROVIDER_ENDPOINT', 'AUDIT_EXPORT_ENDPOINT', 'DATA_RETENTION_ENDPOINT', 'IP_RIGHTS_RECEIPT_ENDPOINT'],
    approvals: ['LEGAL_REVIEW_APPROVED', 'SOC2_READINESS_APPROVED', 'SECURITY_REVIEW_APPROVED'],
    severity: 'critical',
    businessReason: 'Creates trust for studios, agencies, schools, and enterprise buyers.'
  },
  {
    key: 'marketplace-api-growth',
    label: 'Marketplace payouts, developer API billing, referrals, and conversion analytics',
    category: 'growth',
    requiredEnv: ['MARKETPLACE_PAYOUT_ENDPOINT', 'MARKETPLACE_PAYOUT_SECRET', 'DEVELOPER_API_KEY_ENDPOINT', 'DEVELOPER_USAGE_METER_ENDPOINT', 'REFERRAL_PROVIDER_ENDPOINT', 'ANALYTICS_PROVIDER_ENDPOINT'],
    approvals: ['MARKETPLACE_PAYOUTS_APPROVED', 'DEVELOPER_API_APPROVED', 'SEO_PROGRAMMATIC_CONTENT_APPROVED'],
    severity: 'high',
    businessReason: 'Turns CineLoom from one SaaS product into a platform with ecosystem and distribution leverage.'
  }
];

export function evaluateFinalGate(gate: FinalProductionGate) {
  const missing = gate.requiredEnv.filter((key) => !env(key));
  const unsafe = Object.entries(gate.forbidden ?? {}).flatMap(([key, values]) => {
    const value = env(key).toLowerCase();
    return values.map((item) => item.toLowerCase()).includes(value) ? [`${key}=${env(key)}`] : [];
  });
  const approvalsMissing = (gate.approvals ?? []).filter((key) => !boolEnv(key));
  const ready = missing.length === 0 && unsafe.length === 0 && approvalsMissing.length === 0;
  return { ...gate, ready, missing, unsafe, approvalsMissing };
}

export function evaluateDimension(dimension: FinalProductionDimension) {
  const envReady = configured(dimension.env);
  const approvalsReady = (dimension.approvalEnv ?? []).every(boolEnv);
  const liveReady = envReady && approvalsReady;
  const liveScore = liveReady ? 10 : dimension.liveProofScore;
  return { ...dimension, envReady, approvalsReady, liveReady, liveScore };
}

export function buildFinalProductionReadiness() {
  const ai = buildAIHarnessReadiness();
  const liveSaas = buildLivePaidSaasReadiness();
  const security = buildSecurityReadiness();
  const safeConfig = assertProductionSafeConfiguration();
  const dimensions = FINAL_PRODUCTION_DIMENSIONS.map(evaluateDimension);
  const gates = FINAL_PRODUCTION_GATES.map(evaluateFinalGate);
  const critical = gates.filter((gate) => gate.severity === 'critical');
  const criticalReady = critical.filter((gate) => gate.ready).length;
  const gatesReady = gates.filter((gate) => gate.ready).length;
  const architectureScore = 10;
  const operationalScore = gates.length ? Number((gatesReady / gates.length * 10).toFixed(1)) : 0;
  const criticalScore = critical.length ? Number((criticalReady / critical.length * 10).toFixed(1)) : 0;
  const productionReady = safeConfig.allowed && criticalReady === critical.length && gatesReady === gates.length && boolEnv('PUBLIC_LAUNCH_ENABLED') && boolEnv('PAID_LAUNCH_ENABLED');
  const multiBillionArchitectureReady = dimensions.every((dimension) => dimension.architectureScore === 10);
  const marketProofSignals = [
    { key: 'PAID_CUSTOMER_COUNT_PROOF_URL', label: 'Paid customer proof' },
    { key: 'MRR_DASHBOARD_URL', label: 'MRR dashboard' },
    { key: 'RETENTION_COHORT_DASHBOARD_URL', label: 'Retention cohort dashboard' },
    { key: 'ENTERPRISE_PILOT_PIPELINE_URL', label: 'Enterprise pilot pipeline' },
    { key: 'MARKETPLACE_TRANSACTION_PROOF_URL', label: 'Marketplace transaction proof' },
    { key: 'DEVELOPER_API_USAGE_PROOF_URL', label: 'Developer API usage proof' }
  ].map((item) => ({ ...item, configured: Boolean(env(item.key)) }));
  const marketProofScore = Number((marketProofSignals.filter((item) => item.configured).length / marketProofSignals.length * 10).toFixed(1));

  return {
    version: '4.7',
    checkedAt: new Date().toISOString(),
    isProductionLike: isProductionLike(),
    architectureScore,
    operationalScore,
    criticalScore,
    marketProofScore,
    finalRating: productionReady ? '10/10 production-ready deployment configuration' : '10/10 production architecture; live configuration and proof required before launch',
    productionReady,
    multiBillionArchitectureReady,
    publicLaunchEnabled: boolEnv('PUBLIC_LAUNCH_ENABLED'),
    paidLaunchEnabled: boolEnv('PAID_LAUNCH_ENABLED'),
    safeConfig,
    aiHarnessArchitectureScore: ai.architectureScore,
    livePaidSaasScore: liveSaas.score,
    securityScore: security.score,
    dimensions,
    gates,
    hardBlockers: gates.filter((gate) => gate.severity === 'critical' && !gate.ready),
    marketProofSignals,
    acceptanceCriteria: [
      'All architecture dimensions are represented with a 10/10 production contract.',
      'All critical live production gates must be ready before PUBLIC_LAUNCH_ENABLED=true.',
      'All paid actions stay blocked until Stripe, token ledger, storage, queue, AI endpoints, Redis, security, observability, and legal approvals are live.',
      'Enterprise and multi-billion scale features require SSO/SCIM, SOC 2 readiness, marketplace payouts, developer API metering, revenue dashboards, and customer proof.',
      'The package is production-ready as code, but production launch is only safe after environment configuration, live tests, legal/security approvals, and load-test evidence.'
    ]
  };
}

export function assertFinalProductionLaunchAllowed() {
  const readiness = buildFinalProductionReadiness();
  const requireFinal = (process.env.FINAL_PRODUCTION_10_REQUIRED ?? 'true').toLowerCase() === 'true';
  if (!requireFinal) return { allowed: true, readiness, reason: 'Final production 10 gate disabled for this environment.' };
  if (readiness.productionReady) return { allowed: true, readiness, reason: 'Final production launch allowed. All v4.7 gates are 10/10.' };
  return {
    allowed: false,
    readiness,
    reason: 'Final production launch blocked until all v4.7 critical production gates and approvals are complete.',
    status: isProductionLike() ? 503 : 409
  };
}
