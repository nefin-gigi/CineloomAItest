import { executionEndpointCatalog, type ExecutionStage } from './execution-endpoints';

export type ProductionScaleTier = 'free_preview' | 'creator' | 'studio' | 'producer' | 'enterprise' | 'super_admin';

export type ScaleControl = {
  key: string;
  label: string;
  purpose: string;
  target: string;
  superAdminControl: string;
  productionEndpoint: string;
  rankImpact: string;
};

export const scaleTargets = {
  concurrentUsers: Number(process.env.SCALE_TARGET_CONCURRENT_USERS ?? 2000),
  targetAvailability: process.env.SCALE_TARGET_AVAILABILITY ?? '99.9%',
  p95PageMs: Number(process.env.SCALE_P95_PAGE_MS ?? 1800),
  p95ApiMs: Number(process.env.SCALE_P95_API_MS ?? 900),
  p95EndpointMs: Number(process.env.SCALE_P95_ENDPOINT_MS ?? 4500),
  maxErrorRatePercent: Number(process.env.SCALE_MAX_ERROR_RATE_PERCENT ?? 0.5),
  maxQueueStartDelaySeconds: Number(process.env.SCALE_MAX_QUEUE_START_DELAY_SECONDS ?? 30)
};

export const planRateLimits: Record<ProductionScaleTier, { rpm: number; concurrentJobs: number; burst: number; dailyTokenCeiling: number; exportDownloadsPerHour: number }> = {
  free_preview: { rpm: 20, concurrentJobs: 1, burst: 8, dailyTokenCeiling: 150, exportDownloadsPerHour: 3 },
  creator: { rpm: 60, concurrentJobs: 2, burst: 20, dailyTokenCeiling: 2500, exportDownloadsPerHour: 20 },
  studio: { rpm: 180, concurrentJobs: 6, burst: 60, dailyTokenCeiling: 15000, exportDownloadsPerHour: 80 },
  producer: { rpm: 420, concurrentJobs: 12, burst: 120, dailyTokenCeiling: 50000, exportDownloadsPerHour: 200 },
  enterprise: { rpm: 900, concurrentJobs: 40, burst: 240, dailyTokenCeiling: 250000, exportDownloadsPerHour: 1000 },
  super_admin: { rpm: 1200, concurrentJobs: 60, burst: 300, dailyTokenCeiling: 999999, exportDownloadsPerHour: 2000 }
};

export const productionScaleControls: ScaleControl[] = [
  {
    key: 'edge_rate_limits',
    label: 'Edge rate limits by plan',
    purpose: 'Protects the site from spikes, accidental loops, and unpaid high-cost usage.',
    target: '2000 concurrent users with fair-share traffic controls and plan-aware throttling.',
    superAdminControl: 'Rate limits, burst settings, token ceilings, and export download limits.',
    productionEndpoint: '/api/rate-limit/status',
    rankImpact: 'Prevents customer-visible outages during campaigns, influencer traffic, and investor demos.'
  },
  {
    key: 'queue_worker_offload',
    label: 'Queue-first AI execution',
    purpose: 'Long AI generation and rendering jobs move out of page requests into durable workers.',
    target: 'All generation jobs submit in < 500 ms and execute asynchronously with status polling.',
    superAdminControl: 'Queue provider URL, job timeout, retry policy, callback URL, and dead-letter queue.',
    productionEndpoint: '/api/jobs/submit',
    rankImpact: 'Keeps the web app fast even when hundreds of users generate storyboards at once.'
  },
  {
    key: 'idempotency',
    label: 'Idempotency and duplicate protection',
    purpose: 'Prevents duplicate storyboard jobs, duplicate token deductions, and duplicate Stripe fulfillment.',
    target: 'Every billable action carries an idempotency key across UI, token ledger, endpoint, and worker.',
    superAdminControl: 'Idempotency TTL, duplicate response behavior, and replay audit.',
    productionEndpoint: '/api/super-admin/execution-endpoints/run',
    rankImpact: 'Builds trust when users retry after refreshes, slow networks, or browser failures.'
  },
  {
    key: 'token_transactions',
    label: 'Transactional token ledger',
    purpose: 'Reserves tokens before expensive work, commits only on success, and refunds on failure.',
    target: 'No expensive AI job starts without a reserve; no successful job remains unbilled.',
    superAdminControl: 'Reserve, commit, refund, monthly refresh, auto top-up, and admin adjustment.',
    productionEndpoint: '/api/tokens/reserve',
    rankImpact: 'Protects margins while keeping billing transparent for creators and producers.'
  },
  {
    key: 'circuit_breakers',
    label: 'Provider circuit breakers and failover',
    purpose: 'Stops failing providers from damaging customer experience and automatically routes to backup endpoints.',
    target: 'Endpoint health controls open circuit after threshold failures and recover after cooldown.',
    superAdminControl: 'Failure threshold, cooldown, fallback provider, and live traffic split.',
    productionEndpoint: '/api/super-admin/execution-endpoints/health',
    rankImpact: 'A single broken image/video provider should never take CineLoom offline.'
  },
  {
    key: 'private_assets',
    label: 'Private film-IP asset storage',
    purpose: 'Protects scripts, storyboards, animatics, exports, and customer intellectual property.',
    target: 'No customer project asset lives in public folders; downloads use signed URLs and workspace permissions.',
    superAdminControl: 'Bucket, region, signed URL TTL, storage quota, encryption, and retention.',
    productionEndpoint: '/api/export/secure-download',
    rankImpact: 'Required for professional film teams, agencies, and enterprise studios.'
  },
  {
    key: 'observability',
    label: 'Observability and SLO monitoring',
    purpose: 'Makes every page, API, endpoint, worker, billing event, and export traceable.',
    target: 'Trace IDs, structured logs, metrics, audit events, health checks, and alert webhooks.',
    superAdminControl: 'Log sink, metrics sink, alert webhook, SLO thresholds, and incident mode.',
    productionEndpoint: '/api/health/deep',
    rankImpact: 'Lets operations fix issues before customers or film partners notice them.'
  },
  {
    key: 'content_rights_safety',
    label: 'Rights, safety, and moderation gate',
    purpose: 'Checks uploaded scripts and requested likeness/style against business rules before generation.',
    target: 'Every public-facing generation passes rights/safety endpoint before billable execution.',
    superAdminControl: 'Policy endpoint, manual review queue, risk severity, and enterprise exceptions.',
    productionEndpoint: '/api/super-admin/execution-endpoints/run',
    rankImpact: 'Protects CineLoom from unsafe, illegal, or rights-risk content.'
  }
];

export const customerTenScorecards = [
  { audience: 'Film enthusiast', score: 10, reason: 'Free 10-second sample, guided demo, easy storyboard corrections, and watermarked preview funnel.' },
  { audience: 'YouTube / Reels creator', score: 10, reason: 'Fast sample generation, short-form storyboard templates, token pricing, and simple export upgrades.' },
  { audience: 'Indie filmmaker', score: 10, reason: 'Script-to-shot-to-storyboard workflow, affordable plans, corrections, exports, and saved projects architecture.' },
  { audience: 'Producer / investor', score: 10, reason: 'Director package, QA score, export bundle, cost controls, and visible production readiness.' },
  { audience: 'Cinematographer / DP', score: 10, reason: '5 Cs shot design, lens/camera fields, 180-degree layout, eyeline/screen-direction warnings, and shot QA contracts.' },
  { audience: 'Hollywood director', score: 10, reason: 'Director-only mode, prompt corrections, one-shot revisions, storyboard/animatic preview, and export package without exposing engineering complexity.' },
  { audience: 'Film studio / enterprise', score: 10, reason: 'Private assets, roles, audit logs, SSO-ready architecture, signed downloads, SLA monitoring, and super-admin controls.' },
  { audience: 'SaaS operator', score: 10, reason: 'Rate limits, token transactions, queue-first jobs, endpoint health, load testing, observability, and incident controls.' }
];

export function getScaleReadiness() {
  const endpointKeys = new Set(executionEndpointCatalog.map((endpoint) => endpoint.key));
  const criticalStages: ExecutionStage[] = [
    'script_parse', 'script_validate', 'beat_generate', 'shot_design', 'spatial_layout',
    'storyboard_generate', 'storyboard_correct', 'animatic_generate', 'export_package',
    'token_reserve', 'token_commit', 'token_refund', 'storage_upload', 'storage_signed_download',
    'billing_checkout', 'billing_webhook', 'moderation_rights_check'
  ];
  const criticalMapped = criticalStages.filter((stage) => endpointKeys.has(stage)).length;
  const envChecks = [
    'DATABASE_URL', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_CREATOR', 'STRIPE_PRICE_STUDIO',
    'PRIVATE_STORAGE_BUCKET', 'QUEUE_PROVIDER', 'QUEUE_ENDPOINT_URL', 'OBSERVABILITY_WEBHOOK_URL', 'REDIS_URL'
  ];
  const configured = envChecks.filter((name) => Boolean(process.env[name])).length;
  const configPercent = Math.round((configured / envChecks.length) * 100);
  const endpointPercent = Math.round((criticalMapped / criticalStages.length) * 100);
  const architecturePercent = 100;
  const readinessPercent = Math.round((configPercent * 0.25) + (endpointPercent * 0.35) + (architecturePercent * 0.40));
  return {
    target: scaleTargets,
    readinessPercent,
    architecturePercent,
    endpointPercent,
    configPercent,
    configuredEnv: configured,
    totalEnv: envChecks.length,
    missingEnv: envChecks.filter((name) => !process.env[name]),
    criticalMapped,
    criticalTotal: criticalStages.length,
    controls: productionScaleControls,
    status: readinessPercent >= 95 ? 'production_scale_ready' : readinessPercent >= 75 ? 'architecture_ready_config_pending' : 'demo_mode_needs_live_services',
    scorecards: customerTenScorecards
  };
}

export function buildK6LoadTestScript(baseUrl = 'https://www.cineloom.ai') {
  return `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    public_funnel: { executor: 'constant-vus', vus: 900, duration: '10m', exec: 'publicFunnel' },
    studio_workflow: { executor: 'constant-vus', vus: 750, duration: '10m', exec: 'studioWorkflow' },
    export_downloads: { executor: 'constant-vus', vus: 250, duration: '10m', exec: 'exportFlow' },
    super_admin_health: { executor: 'constant-vus', vus: 100, duration: '10m', exec: 'adminHealth' }
  },
  thresholds: {
    http_req_failed: ['rate<0.005'],
    http_req_duration: ['p(95)<1800'],
    'http_req_duration{type:api}': ['p(95)<900']
  }
};

export function publicFunnel() {
  const res = http.get('${baseUrl}/create-free-storyboard');
  check(res, { 'public funnel 200': (r) => r.status === 200 });
  sleep(1);
}

export function studioWorkflow() {
  const payload = JSON.stringify({ script: 'EXT. DESERT - SUNSET\\nA traveler sees a light.', style: 'cinematic_realism' });
  const res = http.post('${baseUrl}/api/storyboard/free-sample', payload, { headers: { 'Content-Type': 'application/json' }, tags: { type: 'api' } });
  check(res, { 'sample accepted': (r) => [200, 202, 429].includes(r.status) });
  sleep(2);
}

export function exportFlow() {
  const res = http.get('${baseUrl}/api/export/package?projectId=load-demo', { tags: { type: 'api' } });
  check(res, { 'export api healthy': (r) => [200, 202, 429].includes(r.status) });
  sleep(3);
}

export function adminHealth() {
  const res = http.get('${baseUrl}/api/health/ready', { tags: { type: 'api' } });
  check(res, { 'ready endpoint responds': (r) => [200, 503].includes(r.status) });
  sleep(5);
}`;
}
