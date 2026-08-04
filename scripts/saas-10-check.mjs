import fs from 'fs';

const required = [
  'app/studio/saas-10/page.tsx',
  'app/studio/super-admin/saas-command-center/page.tsx',
  'app/customers/page.tsx',
  'app/security/page.tsx',
  'app/support/page.tsx',
  'app/status/page.tsx',
  'app/case-studies/page.tsx',
  'components/SaaS10CommandCenter.tsx',
  'components/SaaS10PublicProof.tsx',
  'lib/saas-10-platform.ts',
  'app/api/super-admin/saas-command-center/route.ts',
  'app/api/super-admin/customer-success/route.ts',
  'app/api/super-admin/security-compliance/route.ts',
  'app/api/super-admin/launch-gates/route.ts',
  'app/api/entitlements/check/route.ts',
  'app/api/support/ticket/route.ts',
  'app/api/status/service/route.ts',
  'app/api/customer/onboarding/route.ts',
  'app/api/analytics/funnel/route.ts',
  'app/api/usage/metrics/route.ts',
  'database/006_saas_10_operating_system.sql',
  'docs/V3_4_SAAS_10_PLATFORM_RELEASE_NOTES.md',
  'docs/SAAS_10_CUSTOMER_EXPERIENCE_SCORECARD.md',
  'docs/SAAS_OPERATING_MODEL_FOR_FILM_INDUSTRY.md',
  'docs/PRODUCTION_CONNECTIVITY_ACCEPTANCE_TESTS.md',
  'docs/GO_TO_MARKET_AND_RETENTION_PLAYBOOK.md',
  'docs/ENTERPRISE_SECURITY_COMPLIANCE_PACK.md'
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Missing v3.4 SaaS 10/10 files:', missing.join(', '));
  process.exit(1);
}
const empty = required.filter((file) => fs.statSync(file).size === 0);
if (empty.length) {
  console.error('Empty v3.4 SaaS 10/10 files:', empty.join(', '));
  process.exit(1);
}
console.log('CineLoom v3.4 SaaS 10/10 package check passed.');
