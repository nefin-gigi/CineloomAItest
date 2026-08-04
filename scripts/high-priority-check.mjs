import fs from 'node:fs';
const required = [
  'components/WorkingStoryboardDemo.tsx','components/BillionHeroVisual.tsx','components/PublicNav.tsx','components/BillionFooter.tsx',
  'app/examples/page.tsx','app/pricing/page.tsx','app/security/page.tsx','app/support/page.tsx','docs/V7_0_BILLION_DOLLAR_SAAS_UI_REBUILD.md'
];
const missing = required.filter((f) => !fs.existsSync(f));
if (missing.length) { console.error('High-priority launch check failed. Missing:', missing.join(', ')); process.exit(1); }
const nav = fs.readFileSync('components/PublicNav.tsx','utf8');
const creator = fs.readFileSync('components/WorkingStoryboardDemo.tsx','utf8');
if (!nav.includes('/examples') || !nav.includes('/pricing') || !creator.includes('Create storyboard preview')) {
  console.error('High-priority launch check failed. Public UX does not include clean nav and working preview.'); process.exit(1);
}
console.log('CineLoom v7.0 high-priority launch check passed: professional hero, public navigation, examples, pricing, security, support, and working preview are present.');
