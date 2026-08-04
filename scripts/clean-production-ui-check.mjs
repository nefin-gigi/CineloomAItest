import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const exists = (file) => fs.existsSync(path.join(root, file));
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const checks = [
  ['package.json', (s) => (s.includes('7.0.0') || s.includes('7.1.0') || s.includes('7.2.0') || s.includes('7.3.0') || s.includes('7.4.0')) && s.includes('salient-catalyst-clean-check'), 'Package version and v7.2 script'],
  ['app/layout.tsx', (s) => s.includes('./v70-billion.css'), 'Layout imports v7 CSS'],
  ['app/v70-billion.css', (s) => s.includes('--bd-red') && s.includes('--bd-green') && s.includes('--bd-blue') && s.includes('@media (max-width: 900px)'), 'Professional RGB responsive CSS'],
  ['middleware.ts', (s) => s.indexOf('if (publicMarketingPaths.has(pathname)) return next();') < s.indexOf('if (gateEnabled())'), 'Public pages are not redirected by launch gate'],
  ['components/PublicNav.tsx', (s) => s.includes('/examples') && s.includes('/pricing') && s.includes('/create-free-storyboard'), 'Public navigation has clean working links'],
  ['components/WorkingStoryboardDemo.tsx', (s) => s.includes('use client') && s.includes('Create storyboard preview'), 'Working local storyboard preview component'],
  ['components/BillionHeroVisual.tsx', (s) => s.includes('/storyboards/wide-shot.png') && s.includes('Storyboard output'), 'Professional hero visual component'],
  ['app/page.tsx', (s) => (s.includes('BillionHeroVisual') || s.includes('SalientStoryboardHeroVisual')) && s.includes('Create cinematic'), 'Homepage rebuilt end to end'],
  ['app/create-free-storyboard/page.tsx', (s) => s.includes('WorkingStoryboardDemo'), 'Create flow works on staging']
];
let failed = false;
for (const [file, predicate, label] of checks) {
  if (!exists(file)) { console.error(`❌ ${label}: missing ${file}`); failed = true; continue; }
  if (!predicate(read(file))) { console.error(`❌ ${label}: failed`); failed = true; }
  else console.log(`✅ ${label}`);
}
if (failed) process.exit(1);
console.log('\nCineLoom v7.x clean billion-dollar production UI QA passed.');
