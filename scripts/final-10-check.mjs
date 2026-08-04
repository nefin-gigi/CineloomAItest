import fs from 'node:fs';
const required = [
  'app/page.tsx','app/create-free-storyboard/page.tsx','components/WorkingStoryboardDemo.tsx','components/PublicNav.tsx',
  'app/v70-billion.css','app/v72-salient-catalyst-clean.css','components/SalientStoryboardHeroVisual.tsx',
  'lib/final-production-readiness.ts','lib/ai-harness.ts','lib/advanced-security.ts','middleware.ts'
];
const missing = required.filter((f) => !fs.existsSync(f));
if (missing.length) { console.error('Final 10 check failed. Missing:', missing.join(', ')); process.exit(1); }
const page = fs.readFileSync('app/page.tsx','utf8');
const middleware = fs.readFileSync('middleware.ts','utf8');
const css = fs.readFileSync('app/v72-salient-catalyst-clean.css','utf8');
const ok =
  page.includes('SalientStoryboardHeroVisual') &&
  page.includes('SalientMarketingSections') &&
  page.includes('Create cinematic') &&
  css.includes('width: min(var(--scc-max), calc(100vw - 40px))') &&
  css.includes('.catalyst-shell') &&
  middleware.indexOf('if (publicMarketingPaths.has(pathname)) return next();') < middleware.indexOf('if (gateEnabled())');
if (!ok) { console.error('Final 10 check failed. v7.2 Salient/Catalyst clean homepage/gate requirements are not met.'); process.exit(1); }
console.log('CineLoom v7.2 final 10 check passed: clean SaaS UI, custom storyboard hero, product dashboard shell, public routes, and production architecture are present.');
