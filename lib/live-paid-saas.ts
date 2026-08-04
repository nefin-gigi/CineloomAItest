import { assertProductionSafeConfiguration, isProductionLike } from './military-security';

export type LiveServiceStatus = 'ready' | 'configured' | 'missing' | 'unsafe' | 'demo' | 'not_required';

export type LiveServiceRequirement = {
  id: string;
  name: string;
  category: 'identity' | 'data' | 'billing' | 'tokens' | 'storage' | 'queue' | 'ai' | 'exports' | 'analytics' | 'security' | 'support' | 'legal';
  requiredEnv: string[];
  forbiddenValues?: Record<string, string[]>;
  healthUrlEnv?: string;
  severity: 'critical' | 'high' | 'medium';
  customerImpact: string;
  owner: string;
};

export const LIVE_SERVICE_REQUIREMENTS: LiveServiceRequirement[] = [
  {
    id: 'auth',
    name: 'Production authentication and RBAC',
    category: 'identity',
    requiredEnv: ['AUTH_MODE', 'AUTH_PROVIDER_HEALTH_URL'],
    forbiddenValues: { AUTH_MODE: ['demo'] },
    healthUrlEnv: 'AUTH_PROVIDER_HEALTH_URL',
    severity: 'critical',
    owner: 'Identity/Admin',
    customerImpact: 'Paying users can securely sign up, log in, reset passwords, and access only their workspaces.'
  },
  {
    id: 'database',
    name: 'Persistent database and migrations',
    category: 'data',
    requiredEnv: ['DATABASE_URL', 'DATABASE_HEALTH_URL'],
    healthUrlEnv: 'DATABASE_HEALTH_URL',
    severity: 'critical',
    owner: 'Platform/Data',
    customerImpact: 'Projects, scripts, subscriptions, tokens, jobs, exports, audit logs, and teams persist reliably.'
  },
  {
    id: 'stripe',
    name: 'Live Stripe billing and webhook reconciliation',
    category: 'billing',
    requiredEnv: ['PAYMENT_GATEWAY_MODE', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_CREATOR', 'STRIPE_PRICE_STUDIO', 'STRIPE_PRICE_PRODUCER', 'STRIPE_HEALTH_URL'],
    forbiddenValues: { PAYMENT_GATEWAY_MODE: ['demo'] },
    healthUrlEnv: 'STRIPE_HEALTH_URL',
    severity: 'critical',
    owner: 'Billing/Finance',
    customerImpact: 'Subscriptions, upgrades, cancellations, token packs, invoices, refunds, and failed payments reconcile automatically.'
  },
  {
    id: 'token-ledger',
    name: 'Transactional token ledger',
    category: 'tokens',
    requiredEnv: ['TOKEN_LEDGER_MODE', 'TOKEN_LEDGER_ENDPOINT_URL', 'TOKEN_LEDGER_SECRET', 'TOKEN_HARD_STOP_ENABLED'],
    forbiddenValues: { TOKEN_LEDGER_MODE: ['demo'], TOKEN_HARD_STOP_ENABLED: ['false'] },
    healthUrlEnv: 'TOKEN_LEDGER_ENDPOINT_URL',
    severity: 'critical',
    owner: 'Billing/Platform',
    customerImpact: 'Every generation reserves, commits, refunds, and audits tokens without margin leakage or duplicate charges.'
  },
  {
    id: 'private-storage',
    name: 'Private asset storage and signed URLs',
    category: 'storage',
    requiredEnv: ['STORAGE_MODE', 'PRIVATE_STORAGE_BUCKET', 'PRIVATE_STORAGE_SIGNED_URL_ENDPOINT'],
    forbiddenValues: { STORAGE_MODE: ['demo'] },
    healthUrlEnv: 'PRIVATE_STORAGE_SIGNED_URL_ENDPOINT',
    severity: 'critical',
    owner: 'Platform/Security',
    customerImpact: 'Scripts, frames, animatics, and exports are private and downloadable only by authorized users.'
  },
  {
    id: 'queue',
    name: 'Background queue and worker orchestration',
    category: 'queue',
    requiredEnv: ['QUEUE_PROVIDER', 'QUEUE_ENDPOINT_URL', 'QUEUE_WEBHOOK_SECRET', 'REDIS_URL'],
    forbiddenValues: { QUEUE_PROVIDER: ['demo'] },
    healthUrlEnv: 'QUEUE_ENDPOINT_URL',
    severity: 'critical',
    owner: 'Platform/Workers',
    customerImpact: 'Long-running AI, rendering, export, retry, and webhook jobs run reliably outside request timeouts.'
  },
  {
    id: 'ai-endpoints',
    name: 'Production AI execution endpoints',
    category: 'ai',
    requiredEnv: ['EXEC_SCRIPT_PARSE_URL', 'EXEC_BEAT_GENERATE_URL', 'EXEC_SHOT_DESIGN_URL', 'EXEC_STORYBOARD_GENERATE_URL', 'EXEC_STORYBOARD_CORRECT_URL', 'EXEC_AUTO_QA_URL'],
    healthUrlEnv: 'EXEC_STORYBOARD_GENERATE_URL',
    severity: 'critical',
    owner: 'AI/Provider Ops',
    customerImpact: 'The paid product can generate real beats, shots, storyboard frames, corrections, and QA output.'
  },
  {
    id: 'export-rendering',
    name: 'Production export rendering',
    category: 'exports',
    requiredEnv: ['RENDER_WORKER_URL', 'RENDER_WORKER_SECRET', 'WORKER_EXPORT_URL'],
    healthUrlEnv: 'RENDER_WORKER_URL',
    severity: 'critical',
    owner: 'Rendering/Platform',
    customerImpact: 'Paid users receive real storyboard PDFs, shot lists, prompt JSON, animatic MP4s, and ZIP packages.'
  },
  {
    id: 'distributed-rate-limit',
    name: 'Distributed abuse control and rate limits',
    category: 'security',
    requiredEnv: ['RATE_LIMIT_PROVIDER', 'REDIS_URL', 'BOT_PROTECTION_PROVIDER', 'WAF_PROVIDER'],
    forbiddenValues: { RATE_LIMIT_PROVIDER: ['memory', 'demo'] },
    severity: 'critical',
    owner: 'Security/Platform',
    customerImpact: 'Free generators, auth, support, and billing endpoints are protected from abuse at launch scale.'
  },
  {
    id: 'observability',
    name: 'Observability, alerts, traces, and status',
    category: 'analytics',
    requiredEnv: ['OBSERVABILITY_WEBHOOK_URL', 'LOG_SINK_URL', 'METRICS_SINK_URL', 'ALERT_WEBHOOK_URL', 'STATUS_PROVIDER_ENDPOINT'],
    healthUrlEnv: 'STATUS_PROVIDER_ENDPOINT',
    severity: 'high',
    owner: 'SRE/Support',
    customerImpact: 'Failures, latency, payment issues, and provider outages are visible before users lose trust.'
  },
  {
    id: 'analytics',
    name: 'Revenue funnel analytics',
    category: 'analytics',
    requiredEnv: ['ANALYTICS_MODE', 'ANALYTICS_PROVIDER_ENDPOINT', 'CONVERSION_ANALYTICS_ENDPOINT_URL'],
    forbiddenValues: { ANALYTICS_MODE: ['demo'] },
    healthUrlEnv: 'ANALYTICS_PROVIDER_ENDPOINT',
    severity: 'high',
    owner: 'Growth/Product',
    customerImpact: 'The team can measure free sample starts, signups, checkout, payments, corrections, exports, and churn.'
  },
  {
    id: 'email-support',
    name: 'Email, onboarding, and support',
    category: 'support',
    requiredEnv: ['EMAIL_PROVIDER', 'EMAIL_PROVIDER_ENDPOINT', 'EMAIL_PROVIDER_API_KEY', 'SUPPORT_TICKET_ENDPOINT_URL', 'HELPDESK_WEBHOOK_URL'],
    forbiddenValues: { EMAIL_PROVIDER: ['demo'] },
    healthUrlEnv: 'EMAIL_PROVIDER_ENDPOINT',
    severity: 'high',
    owner: 'Customer Success',
    customerImpact: 'Users receive onboarding, generation-complete, billing, token, and support communications.'
  },
  {
    id: 'legal-rights',
    name: 'Legal, rights, and commercial-use controls',
    category: 'legal',
    requiredEnv: ['LEGAL_REVIEW_APPROVED', 'IP_RIGHTS_RECEIPT_ENDPOINT', 'DATA_RETENTION_ENDPOINT', 'MODEL_TRAINING_OPTOUT_DEFAULT'],
    forbiddenValues: { LEGAL_REVIEW_APPROVED: ['false'], MODEL_TRAINING_OPTOUT_DEFAULT: ['false'] },
    severity: 'critical',
    owner: 'Legal/Trust',
    customerImpact: 'Paid customers understand ownership, usage rights, privacy, refunds, retention, and training opt-out policy.'
  }
];

export function envValue(key: string) {
  return process.env[key] ?? '';
}

export function evaluateRequirement(requirement: LiveServiceRequirement) {
  const missing = requirement.requiredEnv.filter((key) => !envValue(key));
  const unsafe = Object.entries(requirement.forbiddenValues ?? {}).flatMap(([key, values]) => {
    const value = envValue(key).toLowerCase();
    return values.map((item) => item.toLowerCase()).includes(value) ? [`${key}=${envValue(key)}`] : [];
  });
  const configured = missing.length === 0 && unsafe.length === 0;
  const status: LiveServiceStatus = unsafe.length ? 'unsafe' : missing.length ? 'missing' : configured ? 'configured' : 'missing';
  return { ...requirement, status, configured, missing, unsafe, healthUrl: requirement.healthUrlEnv ? envValue(requirement.healthUrlEnv) : '' };
}

export function buildLivePaidSaasReadiness() {
  const safeConfig = assertProductionSafeConfiguration();
  const checks = LIVE_SERVICE_REQUIREMENTS.map(evaluateRequirement);
  const critical = checks.filter((item) => item.severity === 'critical');
  const criticalReady = critical.filter((item) => item.configured).length;
  const totalReady = checks.filter((item) => item.configured).length;
  const hardBlockers = checks.filter((item) => item.severity === 'critical' && !item.configured);
  const unsafeItems = checks.filter((item) => item.unsafe.length);
  const launchMode = (process.env.LIVE_PAID_SAAS_MODE ?? 'strict').toLowerCase();
  const publicPaymentsEnabled = (process.env.PUBLIC_PAID_CHECKOUT_ENABLED ?? 'false').toLowerCase() === 'true';
  const paidLaunchEnabled = (process.env.PAID_LAUNCH_ENABLED ?? 'false').toLowerCase() === 'true';
  const liveReady = safeConfig.allowed && hardBlockers.length === 0 && unsafeItems.length === 0 && publicPaymentsEnabled && paidLaunchEnabled;
  const score = liveReady ? 100 : Math.round(((totalReady / checks.length) * 80) + (safeConfig.allowed ? 10 : 0) + (publicPaymentsEnabled ? 5 : 0) + (paidLaunchEnabled ? 5 : 0));
  return {
    version: '4.4',
    mode: launchMode,
    title: 'Live paid SaaS readiness',
    score: Math.min(score, 100),
    rating: liveReady ? '10/10 live paid SaaS ready' : 'Configuration required before 10/10 live paid SaaS launch',
    liveReady,
    publicPaymentsEnabled,
    paidLaunchEnabled,
    productionSafe: safeConfig.allowed,
    productionSafeMessage: safeConfig.reason,
    productionSafeBlockers: safeConfig.remediation ?? [],
    checks,
    criticalReady,
    criticalTotal: critical.length,
    totalReady,
    totalChecks: checks.length,
    hardBlockers,
    unsafeItems,
    acceptanceCriteria: [
      'No demo auth, demo billing, demo storage, demo queues, or demo analytics in production',
      'Stripe checkout and webhooks reconcile subscriptions and token packs through database-backed idempotent handlers',
      'Token reservations, commits, refunds, and monthly credits are transactional and auditable',
      'All customer scripts, panels, exports, and videos live in private storage with signed URLs',
      'All AI and export actions run through queue workers with retries, idempotency, and trace IDs',
      'Distributed rate limits, WAF, bot protection, CSRF, CSP, and Super Admin lockdown are active',
      'Observability, status, logs, metrics, alerts, and support channels are connected',
      'Legal, rights, privacy, refund, commercial-use, and model-training opt-out controls are approved'
    ]
  };
}

export function assertLivePaidSaaSAllowed(action = 'paid_action') {
  const readiness = buildLivePaidSaasReadiness();
  const requireLive = (process.env.REQUIRE_LIVE_READINESS_FOR_PUBLIC_PAYMENTS ?? 'true').toLowerCase() === 'true';
  if (!requireLive) return { allowed: true, readiness, reason: 'Live readiness requirement disabled for this environment.' };
  if (readiness.liveReady) return { allowed: true, readiness, reason: `${action} allowed. Live paid SaaS readiness is 10/10.` };
  return {
    allowed: false,
    readiness,
    reason: `${action} blocked until live paid SaaS readiness reaches 10/10.`,
    status: isProductionLike() ? 503 : 409
  };
}

export async function testLiveServiceHealth(input: { id?: string } = {}) {
  const selected = input.id ? LIVE_SERVICE_REQUIREMENTS.filter((item) => item.id === input.id) : LIVE_SERVICE_REQUIREMENTS;
  const timeoutMs = Number(process.env.LIVE_HEALTH_TEST_TIMEOUT_MS ?? 2500);
  const results = [];
  for (const requirement of selected) {
    const evaluation = evaluateRequirement(requirement);
    if (!evaluation.healthUrl) {
      results.push({ id: requirement.id, ok: evaluation.configured, status: evaluation.status, message: evaluation.configured ? 'Configured; no health URL required.' : 'Missing required configuration.', healthUrl: '' });
      continue;
    }
    if (!evaluation.configured) {
      results.push({ id: requirement.id, ok: false, status: evaluation.status, message: 'Configuration incomplete; health test skipped.', healthUrl: evaluation.healthUrl });
      continue;
    }
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const response = await fetch(evaluation.healthUrl, { method: 'HEAD', signal: controller.signal, headers: { 'x-cineloom-health-check': 'live-paid-saas-v4.4' } });
      clearTimeout(timer);
      results.push({ id: requirement.id, ok: response.ok || response.status < 500, status: response.status, message: response.ok ? 'Health endpoint responded.' : 'Health endpoint responded with non-OK status.', healthUrl: evaluation.healthUrl });
    } catch (error) {
      results.push({ id: requirement.id, ok: false, status: 'error', message: error instanceof Error ? error.message : 'Health check failed.', healthUrl: evaluation.healthUrl });
    }
  }
  return { testedAt: new Date().toISOString(), timeoutMs, results };
}
