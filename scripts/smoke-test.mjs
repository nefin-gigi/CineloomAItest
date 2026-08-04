import { existsSync, statSync } from 'node:fs';

const required = [
  'app/page.tsx',
  'middleware.ts',
  'app/pricing/page.tsx',
  'app/create-free-storyboard/page.tsx',
  'app/how-it-works/page.tsx',
  'app/examples/page.tsx',
  'app/login/page.tsx',
  'app/signup/page.tsx',
  'app/terms/page.tsx',
  'app/privacy/page.tsx',
  'app/refund-policy/page.tsx',
  'app/commercial-use/page.tsx',
  'app/studio/admin/page.tsx',
  'app/studio/token-wallet/page.tsx',
  'app/studio/templates/page.tsx',
  'app/studio/exports-secure/page.tsx',
  'app/studio/launch-readiness/page.tsx',
  'app/studio/revenue-analytics/page.tsx',
  'app/studio/safety-rights/page.tsx',
  'app/studio/projects/page.tsx',
  'components/RevenueFunnelDemo.tsx',
  'components/RevenuePricingTable.tsx',
  'components/ProductionAdminDashboard.tsx',
  'components/ProtectedExportCenter.tsx',
  'components/AuthGatewayPanel.tsx',
  'components/TemplateMarketplacePanel.tsx',
  'components/SafetyRightsPanel.tsx',
  'lib/v3-production-data.ts',
  'app/api/storyboard/free-sample/route.ts',
  'app/api/auth/signup/route.ts',
  'app/api/auth/login/route.ts',
  'app/api/auth/me/route.ts',
  'app/api/plan/enforce/route.ts',
  'app/api/tokens/purchase/route.ts',
  'app/api/export/secure-download/route.ts',
  'app/api/admin/metrics/route.ts',
  'app/api/projects/route.ts',
  'database/001_production_schema.sql',
  'prisma/schema.prisma',
  'docs/V3_0_PRODUCTION_REVENUE_RELEASE_NOTES.md',
  'docs/V3_0_REVENUE_LAUNCH_CHECKLIST.md',
  'docs/V3_0_DATABASE_AND_BILLING_IMPLEMENTATION.md',
  'app/studio/super-admin/page.tsx',
  'components/SuperAdminConnectorConsole.tsx',
  'lib/integration-registry.ts',
  'lib/integration-runtime.ts',
  'app/api/super-admin/health/route.ts',
  'database/002_super_admin_connectors.sql',
  'docs/V3_0_SUPER_ADMIN_PLUG_PLAY_RELEASE_NOTES.md',
  'public/brand/cineloom-wordmark.png',
  'public/brand/cineloom-app-icon.jpeg',
  'public/demo-package/cineloom-demo-export-package.zip',

  'app/studio/saas-10/page.tsx',
  'app/studio/super-admin/saas-command-center/page.tsx',
  'components/SaaS10CommandCenter.tsx',
  'lib/saas-10-platform.ts',
  'docs/V3_4_SAAS_10_PLATFORM_RELEASE_NOTES.md',

  'components/ScaleReadinessConsole.tsx',
  'lib/production-scale.ts',
  'lib/rate-limit.ts',
  'lib/job-orchestrator.ts',
  'lib/token-transactions.ts',
  'lib/production-runtime.ts',
  'app/studio/super-admin/scale-readiness/page.tsx',
  'app/api/super-admin/scale-readiness/route.ts',
  'app/api/super-admin/load-test-plan/route.ts',
  'app/api/health/live/route.ts',
  'app/api/health/ready/route.ts',
  'app/api/health/deep/route.ts',
  'app/api/jobs/submit/route.ts',
  'app/api/tokens/reserve/route.ts',
  'database/004_production_scale_2000.sql',
  'docs/V3_2_PRODUCTION_SCALE_2000_USERS.md',
  'docs/LOAD_TEST_AND_SLO_PLAN.md',
  'docs/PRODUCTION_DEPLOYMENT_RUNBOOK_2000_USERS.md',
  'docs/TEN_OUT_OF_TEN_PRODUCTION_RANKING_CLOSURE.md',
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing required v3.3 files:', missing.join(', '));
  process.exit(1);
}
const empty = required.filter((file) => statSync(file).size === 0);
if (empty.length) {
  console.error('Empty required v3.3 files:', empty.join(', '));
  process.exit(1);
}
console.log('CineLoom v3.4 SaaS 10/10 platform package smoke check passed.');
