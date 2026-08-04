import { existsSync, statSync } from 'node:fs';

const required = [
  'app/studio/super-admin/page.tsx',
  'components/SuperAdminConnectorConsole.tsx',
  'lib/integration-registry.ts',
  'lib/integration-runtime.ts',
  'app/api/super-admin/connectors/route.ts',
  'app/api/super-admin/connectors/test/route.ts',
  'app/api/super-admin/config/save/route.ts',
  'app/api/super-admin/health/route.ts',
  'app/api/super-admin/feature-flags/route.ts',
  'app/api/super-admin/providers/route.ts',
  'app/api/super-admin/production-readiness/route.ts',
  'database/002_super_admin_connectors.sql',
  'docs/V3_0_SUPER_ADMIN_PLUG_PLAY_RELEASE_NOTES.md',
  'docs/PRODUCTION_BLOCKER_CLOSURE_MATRIX.md',
  'docs/SUPER_ADMIN_USER_GUIDE.md',
  'docs/CONNECTOR_CONTRACTS.md',
  'docs/SCALABLE_QUEUE_AND_WORKER_ARCHITECTURE.md',
  'docs/SECURE_ASSET_STORAGE.md',
  'docs/EXPORT_RENDERING_PIPELINE.md',
  'docs/ANALYTICS_AND_REVENUE_EVENTS.md',
  'docs/OBSERVABILITY_RUNBOOK.md',
  'docs/LEGAL_SAFETY_RIGHTS_GUARDRAILS.md',

  'components/ExecutionEndpointConsole.tsx',
  'lib/execution-endpoints.ts',
  'lib/execution-runtime.ts',
  'app/api/super-admin/execution-endpoints/route.ts',
  'app/api/super-admin/execution-endpoints/test/route.ts',
  'app/api/super-admin/execution-endpoints/save/route.ts',
  'app/api/super-admin/execution-endpoints/run/route.ts',
  'app/api/super-admin/execution-endpoints/health/route.ts',
  'database/003_execution_endpoint_contracts.sql',
  'docs/V3_1_ENDPOINT_EXECUTION_LAYER.md',
  'docs/ENDPOINT_PLUG_AND_PLAY_IMPLEMENTATION_GUIDE.md',
  'docs/TEN_OUT_OF_TEN_CUSTOMER_READINESS_PLAN.md',
  'docs/SUPPORT_AND_ONBOARDING.md',

  'components/ScaleReadinessConsole.tsx',
  'app/studio/super-admin/scale-readiness/page.tsx',
  'app/api/super-admin/scale-readiness/route.ts',
  'app/api/super-admin/load-test-plan/route.ts',
  'lib/production-scale.ts',
  'lib/production-runtime.ts',
  'lib/rate-limit.ts',
  'docs/V3_2_PRODUCTION_SCALE_2000_USERS.md',
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing super admin plug-and-play files:', missing.join(', '));
  process.exit(1);
}
const empty = required.filter((file) => statSync(file).size === 0);
if (empty.length) {
  console.error('Empty super admin plug-and-play files:', empty.join(', '));
  process.exit(1);
}
console.log('CineLoom v3.3 Super Admin plug-and-play connectivity check passed.');
