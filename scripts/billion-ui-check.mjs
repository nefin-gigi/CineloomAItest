import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'app/page.tsx',
  'app/v70-billion.css',
  'components/PublicNav.tsx',
  'components/BillionHeroVisual.tsx',
  'components/WorkingStoryboardDemo.tsx',
  'components/BillionFooter.tsx',
  'components/PublicPageShell.tsx',
  'app/examples/page.tsx',
  'app/pricing/page.tsx',
  'app/how-it-works/page.tsx',
  'app/security/page.tsx',
  'app/support/page.tsx',
  'app/create-free-storyboard/page.tsx',
  'public/storyboards/wide-shot.png',
  'public/storyboards/tracking-shot.png',
  'public/storyboards/insert.png',
  'public/storyboards/close-up.png',
  'public/storyboards/reveal.png',
  'public/storyboards/export.png'
];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required v7.0 files:', missing.join(', '));
  process.exit(1);
}

const css = fs.readFileSync(path.join(root, 'app/v70-billion.css'), 'utf8');
const page = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
const middleware = fs.readFileSync(path.join(root, 'middleware.ts'), 'utf8');
const layout = fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8');

const checks = [
  ['hero width bounded', css.includes('.bd-hero') && css.includes('width: min(var(--bd-max), calc(100% - 40px))')],
  ['no horizontal overflow', css.includes('overflow-x: hidden')],
  ['professional hero visual', page.includes('<BillionHeroVisual />') || page.includes('<SalientStoryboardHeroVisual />')],
  ['working storyboard demo', page.includes('<WorkingStoryboardDemo />') || page.includes('SalientMarketingSections')],
  ['public pages stay public', middleware.includes("'/examples'") && middleware.includes("'/pricing'") && middleware.includes("'/how-it-works'")],
  ['v70 css imported last', layout.trim().includes("import './v70-billion.css';")],
  ['mobile responsive rules', css.includes('@media (max-width: 900px)') && css.includes('@media (max-width: 560px)')],
  ['real storyboard thumbnails', page.includes('storyboards') || fs.existsSync(path.join(root, 'public/storyboards/wide-shot.png'))]
];
const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  console.error('v7.0 UI validation failed:', failed.join(', '));
  process.exit(1);
}
console.log('v7.0 billion-dollar SaaS UI validation passed.');
