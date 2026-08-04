import fs from 'node:fs';

const requiredFiles = [
  'lib/frontend-endpoint-registry.ts',
  'lib/frontend-link-runtime.ts',
  'components/EndpointAwareLink.tsx',
  'components/FrontendEndpointIntegrationConsole.tsx',
  'app/studio/super-admin/frontend-integrations/page.tsx',
  'app/api/super-admin/frontend-endpoints/route.ts',
  'app/api/super-admin/frontend-endpoints/test/route.ts',
  'app/api/super-admin/frontend-endpoints/save/route.ts',
  'app/api/super-admin/frontend-endpoints/env-template/route.ts',
  'app/api/frontend-action/route.ts',
  'app/v73-frontend-router.css',
  'database/023_frontend_endpoint_router.sql',
  'docs/V7_3_FRONTEND_ENDPOINT_ROUTER.md'
];

const missing = requiredFiles.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Missing frontend router files:', missing.join(', '));
  process.exit(1);
}

const registry = fs.readFileSync('lib/frontend-endpoint-registry.ts', 'utf8');
const actionCount = (registry.match(/key: '/g) ?? []).length;
const mustInclude = [
  'cta_create_free_storyboard',
  'create_submit_scene',
  'pricing_checkout_creator',
  'studio_fix_panel',
  'studio_export_package',
  'super_admin_frontend_integrations'
];
const missingActions = mustInclude.filter((key) => !registry.includes(key));
if (actionCount < 18 || missingActions.length) {
  console.error('Frontend action registry incomplete.', { actionCount, missingActions });
  process.exit(1);
}

const nav = fs.readFileSync('components/PublicNav.tsx', 'utf8');
const home = fs.readFileSync('app/page.tsx', 'utf8');
if (!nav.includes('EndpointAwareLink') || !home.includes('EndpointAwareLink')) {
  console.error('Public nav and home CTAs must use EndpointAwareLink.');
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!pkg.scripts['frontend-router-check']) {
  console.error('package.json missing frontend-router-check script.');
  process.exit(1);
}

console.log(`Frontend endpoint router check passed with ${actionCount} mapped frontend actions.`);
