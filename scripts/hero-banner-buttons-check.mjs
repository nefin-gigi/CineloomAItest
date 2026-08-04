import fs from 'node:fs';

const required = [
  'public/hero/cineloom-cinematic-saas-hero.png',
  'app/v82-hero-banner-buttons.css',
  'components/BillionHomeExperience.tsx',
  'docs/V8_2_CINEMATIC_HERO_BANNER_BUTTON_CONSISTENCY.md',
  'database/029_cinematic_hero_banner_button_consistency.sql'
];
let failed = false;
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    failed = true;
  }
}
const layout = fs.readFileSync('app/layout.tsx', 'utf8');
if (!layout.includes("./v82-hero-banner-buttons.css")) {
  console.error('layout.tsx does not import v82-hero-banner-buttons.css');
  failed = true;
}
const home = fs.readFileSync('components/BillionHomeExperience.tsx', 'utf8');
for (const token of ['v82-hero', 'cineloom-cinematic-saas-hero.png', 'cl-btn-primary', 'AI Harness']) {
  if (!home.includes(token)) {
    console.error(`Homepage missing expected token: ${token}`);
    failed = true;
  }
}
const css = fs.readFileSync('app/v82-hero-banner-buttons.css', 'utf8');
for (const token of ['.v77-white-button', '.v82-banner-card', '.cl-btn-primary', 'color: #fff']) {
  if (!css.includes(token)) {
    console.error(`CSS missing expected token: ${token}`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log('CineLoom v8.2 hero banner and button consistency check passed.');
