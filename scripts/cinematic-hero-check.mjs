import { existsSync, readFileSync } from 'node:fs';

const required = [
  'app/v80-cinematic-hero.css',
  'components/BillionHomeExperience.tsx',
  'docs/V8_0_CINEMATIC_HERO_UPGRADE.md',
  'database/027_cinematic_hero_upgrade.sql'
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing v8.0 cinematic hero files:', missing.join(', '));
  process.exit(1);
}

const layout = readFileSync('app/layout.tsx', 'utf8');
const home = readFileSync('components/BillionHomeExperience.tsx', 'utf8');
const css = readFileSync('app/v80-cinematic-hero.css', 'utf8');

const checks = [
  ['layout imports v80 css last', layout.includes("./v80-cinematic-hero.css")],
  ['home uses v80-page', home.includes('v80-page')],
  ['home uses cinematic hero visual', home.includes('v80-cinema-card') || home.includes('v82-banner-card')],
  ['hero keeps AI Harness CTA', home.includes('studio_agent_harness') && home.includes('/studio/agent-harness')],
  ['hero keeps create CTA', home.includes('cta_create_free_storyboard')],
  ['css includes responsive breakpoint', css.includes('@media (max-width: 1220px)')],
  ['css includes mobile breakpoint', css.includes('@media (max-width: 760px)')],
  ['css includes cinematic gradient text', css.includes('background: linear-gradient(100deg')]
];

const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  console.error('Cinematic hero checks failed:', failed.join('; '));
  process.exit(1);
}

console.log('CineLoom cinematic hero checks passed.');
