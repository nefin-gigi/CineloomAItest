import fs from 'node:fs';
import path from 'node:path';

const requiredFiles = [
  'lib/live-paid-saas.ts',
  'lib/live-token-ledger.ts',
  'components/LivePaidSaaSReadinessConsole.tsx',
  'app/studio/super-admin/live-paid-saas/page.tsx',
  'app/api/super-admin/live-paid-saas/route.ts',
  'app/api/super-admin/live-paid-saas/test/route.ts',
  'app/api/super-admin/live-paid-saas/launch-gate/route.ts',
  'database/011_live_paid_saas_10_readiness.sql',
  'docs/V4_4_LIVE_PAID_SAAS_10_READINESS.md',
  'docs/LIVE_PAID_SAAS_CONNECTIVITY_RUNBOOK.md'
];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));
if (missingFiles.length) {
  console.error('CineLoom v4.4 live paid SaaS package check failed. Missing files:', missingFiles.join(', '));
  process.exit(1);
}

const env = fs.readFileSync(path.join(process.cwd(), '.env.example'), 'utf8');
const requiredEnvKeys = [
  'LIVE_PAID_SAAS_MODE', 'REQUIRE_LIVE_READINESS_FOR_PUBLIC_PAYMENTS', 'PUBLIC_PAID_CHECKOUT_ENABLED', 'PAID_LAUNCH_ENABLED',
  'AUTH_PROVIDER_HEALTH_URL', 'DATABASE_HEALTH_URL', 'TOKEN_LEDGER_MODE', 'TOKEN_LEDGER_ENDPOINT_URL', 'TOKEN_LEDGER_SECRET',
  'BILLING_RECONCILIATION_ENDPOINT_URL', 'BILLING_RECONCILIATION_SECRET', 'STRIPE_REQUIRE_WEBHOOK_RECONCILIATION',
  'PRIVATE_STORAGE_SIGNED_URL_ENDPOINT', 'QUEUE_REQUIRE_IDEMPOTENT_JOBS', 'BOT_PROTECTION_PROVIDER', 'WAF_PROVIDER',
  'LEGAL_REVIEW_APPROVED', 'SECURITY_REVIEW_APPROVED', 'LOAD_TEST_2000_USERS_APPROVED'
];
const missingEnv = requiredEnvKeys.filter((key) => !env.includes(`${key}=`));
if (missingEnv.length) {
  console.error('CineLoom v4.4 live paid SaaS env template check failed. Missing keys:', missingEnv.join(', '));
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
if (!packageJson.scripts['live-paid-saas-check']) {
  console.error('live-paid-saas-check script is missing from package.json');
  process.exit(1);
}

console.log('CineLoom v4.5 live paid SaaS 10/10 package check passed. Configure live providers and run production-check:strict before public paid launch.');
