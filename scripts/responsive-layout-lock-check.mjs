import fs from 'node:fs';

const required = [
  'app/v79-responsive-layout-lock.css',
  'docs/V7_9_RESPONSIVE_LAYOUT_LOCK.md',
  'database/027_responsive_layout_lock.sql'
];

for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

const layout = fs.readFileSync('app/layout.tsx', 'utf8');
if (!layout.includes("import './v79-responsive-layout-lock.css';")) {
  throw new Error('v79 responsive layout CSS is not imported.');
}
if (layout.indexOf("v79-responsive-layout-lock.css") < layout.indexOf("v78-sitewide-alignment.css")) {
  throw new Error('v79 responsive layout CSS must load after v78 CSS.');
}

const css = fs.readFileSync('app/v79-responsive-layout-lock.css', 'utf8');
const checks = [
  '.v77-hero',
  '@media (max-width: 1220px)',
  'grid-template-columns: 1fr !important;',
  '.v77-feature-band',
  'repeat(auto-fit, minmax',
  '.bd-page-title',
  '.bd-grid-3',
  '.v77-nav-actions',
  'white-space: nowrap'
];
for (const token of checks) {
  if (!css.includes(token)) throw new Error(`Responsive layout CSS missing token: ${token}`);
}

const page = fs.readFileSync('components/BillionHomeExperience.tsx', 'utf8');
if (!page.includes('v77-hero') || !page.includes('v77-feature-band') || !page.includes('studio_agent_harness')) {
  throw new Error('Homepage does not include expected v77 public/AI Harness sections.');
}

console.log('CineLoom v7.9 responsive layout lock check passed.');
