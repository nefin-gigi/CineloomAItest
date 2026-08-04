import fs from 'fs';

const required = [
  'app/platform/page.tsx',
  'app/marketplace/page.tsx',
  'app/api-platform/page.tsx',
  'app/enterprise/page.tsx',
  'app/integrations/page.tsx',
  'app/share/demo/page.tsx',
  'app/studio/billion-scale/page.tsx',
  'app/studio/marketplace/page.tsx',
  'app/studio/api-platform/page.tsx',
  'app/studio/enterprise-trust/page.tsx',
  'app/studio/growth-engine/page.tsx',
  'app/studio/film-integrations/page.tsx',
  'app/studio/flagship-demo/page.tsx',
  'components/BillionDollarPlatformConsole.tsx',
  'lib/billion-platform-data.ts',
  'database/005_billion_platform_ecosystem.sql',
  'docs/V3_3_BILLION_PLATFORM_RELEASE_NOTES.md',
  'docs/BILLION_DOLLAR_PLATFORM_ROADMAP.md',
  'docs/API_PLATFORM_AND_MARKETPLACE.md',
  'docs/ENTERPRISE_TRUST_AND_FILM_INTEGRATIONS.md',
  'docs/GROWTH_LOOPS_AND_FLAGSHIP_DEMO.md'
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Missing v3.3 platform files:', missing.join(', '));
  process.exit(1);
}
console.log('CineLoom v3.3 platform ecosystem check passed.');
