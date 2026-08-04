import fs from 'fs';
import path from 'path';

const root = process.cwd();
const required = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/v71-saas-template.css',
  'app/v72-salient-catalyst-clean.css',
  'components/PublicNav.tsx',
  'components/SalientStoryboardHeroVisual.tsx',
  'components/CatalystWorkspacePreview.tsx',
  'components/WorkingStoryboardDemo.tsx',
  'components/PublicPageShell.tsx',
  'public/storyboards/wide-shot.png',
  'public/storyboards/tracking-shot.png',
  'public/storyboards/insert.png',
  'public/storyboards/close-up.png',
  'public/storyboards/reveal.png',
  'public/storyboards/export.png'
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing required SaaS template files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const layout = fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8');
const page = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'app/v72-salient-catalyst-clean.css'), 'utf8');
const nav = fs.readFileSync(path.join(root, 'components/PublicNav.tsx'), 'utf8');
const hero = fs.readFileSync(path.join(root, 'components/SalientStoryboardHeroVisual.tsx'), 'utf8');

const checks = [
  ['v7.2 CSS imported after v7.1 CSS', layout.includes("./v71-saas-template.css") && layout.includes("./v72-salient-catalyst-clean.css")],
  ['homepage uses clean Salient/Catalyst sections', page.includes('scc-hero') && page.includes('SalientStoryboardHeroVisual') && page.includes('SalientMarketingSections')],
  ['nav uses public links', nav.includes('/examples') && nav.includes('/pricing') && nav.includes('/security') && nav.includes('/support')],
  ['hero visual uses storyboard assets', hero.includes('/storyboards/wide-shot.png') && hero.includes('/storyboards/export.png')],
  ['CSS constrains max width', css.includes('calc(100vw - 40px)') && css.includes('--scc-max')],
  ['CSS has mobile layout', css.includes('@media (max-width: 1020px)') && css.includes('@media (max-width: 720px)')],
  ['CSS states original template implementation', css.includes('Original code')]
];
const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('SaaS template check failed:');
  for (const [name] of failed) console.error(`- ${name}`);
  process.exit(1);
}
console.log('CineLoom SaaS template check passed.');
