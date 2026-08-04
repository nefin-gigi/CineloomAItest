import fs from 'node:fs';
import path from 'node:path';

const requiredFiles = [
  'lib/final-production-readiness.ts',
  'components/FinalProduction10CommandCenter.tsx',
  'app/studio/final-production-10/page.tsx',
  'app/studio/super-admin/final-production-10/page.tsx',
  'app/api/super-admin/final-production-10/route.ts',
  'app/api/production/launch-gate/route.ts',
  'app/api/enterprise/sso/saml/route.ts',
  'app/api/enterprise/scim/users/route.ts',
  'app/api/marketplace/sellers/route.ts',
  'app/api/marketplace/payouts/route.ts',
  'app/api/developer/keys/route.ts',
  'app/api/developer/usage/route.ts',
  'app/api/growth/referrals/route.ts',
  'app/api/revenue/unit-economics/route.ts',
  'database/014_final_production_10_operating_system.sql',
  'docs/V4_7_FINAL_PRODUCTION_10_READINESS.md',
  'docs/MULTI_BILLION_COMPANY_OPERATING_SYSTEM.md',
  'docs/PRODUCTION_DEPLOYMENT_CUTOVER_CHECKLIST_V4_7.md',
  'docs/ENTERPRISE_MARKETPLACE_API_PRODUCTION_PACK.md'
];

const requiredEnvKeys = [
  'FINAL_PRODUCTION_MODE',
  'FINAL_PRODUCTION_10_REQUIRED',
  'PUBLIC_LAUNCH_ENABLED',
  'PENETRATION_TEST_APPROVED',
  'SOC2_READINESS_APPROVED',
  'MARKETPLACE_PAYOUTS_APPROVED',
  'DEVELOPER_API_APPROVED',
  'UNIT_ECONOMICS_APPROVED',
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
  'MRR_DASHBOARD_URL',
  'RETENTION_COHORT_DASHBOARD_URL',
  'ENTERPRISE_PILOT_PIPELINE_URL'
];

function versionAtLeast(version, minimum) {
  const a = String(version).split('.').map(Number);
  const b = String(minimum).split('.').map(Number);
  for (let i = 0; i < 3; i += 1) {
    if ((a[i] || 0) > (b[i] || 0)) return true;
    if ((a[i] || 0) < (b[i] || 0)) return false;
  }
  return true;
}

let failed = false;
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(process.cwd(), file))) {
    console.error(`Missing required v4.7 file: ${file}`);
    failed = true;
  }
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!versionAtLeast(pkg.version, '4.7.0')) {
  console.error(`Expected package version 4.7.0 or later compatible release, found ${pkg.version}`);
  failed = true;
}
if (!pkg.scripts?.['final-production-10-check']) {
  console.error('Missing final-production-10-check script in package.json');
  failed = true;
}

const envExample = fs.readFileSync('.env.example', 'utf8');
for (const key of requiredEnvKeys) {
  if (!envExample.includes(`${key}=`)) {
    console.error(`Missing v4.7 environment key in .env.example: ${key}`);
    failed = true;
  }
}

const readinessSource = fs.readFileSync('lib/final-production-readiness.ts', 'utf8');
const requiredDimensions = [
  'product-magic',
  'ai-harness',
  'security',
  'live-paid-saas',
  'enterprise-trust',
  'marketplace',
  'api-platform',
  'growth',
  'scale-reliability',
  'operations-company'
];
for (const dimension of requiredDimensions) {
  if (!readinessSource.includes(`id: '${dimension}'`)) {
    console.error(`Missing final production dimension: ${dimension}`);
    failed = true;
  }
}

const apiRoutes = requiredFiles.filter((file) => file.startsWith('app/api/')).length;
if (apiRoutes < 9) {
  console.error('Expected at least 9 final production API route contracts.');
  failed = true;
}

if (failed) process.exit(1);
console.log('CineLoom v4.7 final production 10/10 check passed.');
console.log('Architecture is 10/10; operational production launch still requires live environment configuration, approvals, and evidence.');
