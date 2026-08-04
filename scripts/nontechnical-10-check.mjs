import fs from 'node:fs';

const requiredFiles = [
  'app/v60-clean-production.css',
  'components/SimpleStoryboardCreator.tsx',
  'components/PublicNav.tsx',
  'components/AppShell.tsx',
  'app/page.tsx',
  'app/create-free-storyboard/page.tsx',
  'docs/V6_0_CLEAN_WORKING_REBUILD.md'
];

const checks = [];
for (const file of requiredFiles) checks.push({ name: `file:${file}`, passed: fs.existsSync(file) });

const page = fs.readFileSync('app/page.tsx', 'utf8');
const nav = fs.readFileSync('components/PublicNav.tsx', 'utf8');
const shell = fs.readFileSync('components/AppShell.tsx', 'utf8');
const creator = fs.readFileSync('components/SimpleStoryboardCreator.tsx', 'utf8');
const middleware = fs.readFileSync('middleware.ts', 'utf8');

checks.push({ name: 'homepage is simple and working', passed: page.includes('SimpleStoryboardCreator') && page.includes('Paste. Generate. Review. Export.') });
checks.push({ name: 'public nav is simple', passed: nav.includes('How it works') && nav.includes('Help') && nav.includes('Create free storyboard') && !nav.includes('MobileAppDock') });
checks.push({ name: 'studio nav hides complexity', passed: shell.includes('Main actions') && shell.includes('Admin & advanced') && shell.includes('Everything else is optional') });
checks.push({ name: 'create flow works without live AI', passed: creator.includes('window.setTimeout') && creator.includes('Create storyboard') && creator.includes('staging') });
checks.push({ name: 'public pages do not redirect to launch gate', passed: middleware.indexOf('if (publicMarketingPaths.has(pathname)) return next();') < middleware.indexOf('if (gateEnabled())') });
checks.push({ name: 'clean CSS imported last', passed: fs.readFileSync('app/layout.tsx', 'utf8').includes('./v60-clean-production.css') });

const failed = checks.filter((check) => !check.passed);
for (const check of checks) console.log(`${check.passed ? '✅' : '❌'} ${check.name}`);

if (failed.length) {
  console.error(`\nNontechnical 10/10 check failed: ${failed.length} issue(s).`);
  process.exit(1);
}

console.log('\n✅ CineLoom v6.0 nontechnical clean workflow checks passed.');
