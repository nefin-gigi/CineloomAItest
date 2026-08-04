import fs from 'fs';
import path from 'path';

const required = [
  'app/v78-sitewide-alignment.css',
  'components/BillionHomeExperience.tsx',
  'components/PublicPageShell.tsx',
  'components/PublicNav.tsx',
  'app/examples/page.tsx',
  'app/pricing/page.tsx',
  'app/how-it-works/page.tsx',
  'app/security/page.tsx',
  'app/support/page.tsx',
  'app/create-free-storyboard/page.tsx'
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error('Missing required alignment files:', missing.join(', '));
  process.exit(1);
}

const layout = fs.readFileSync('app/layout.tsx','utf8');
if (!layout.includes("import './v78-sitewide-alignment.css';")) {
  console.error('v78 sitewide alignment CSS is not imported.');
  process.exit(1);
}
if (layout.indexOf("v78-sitewide-alignment.css") < layout.indexOf("v77-billion-home-match.css")) {
  console.error('v78 CSS must be loaded after v77 CSS.');
  process.exit(1);
}

const css = fs.readFileSync('app/v78-sitewide-alignment.css','utf8');
const cssNeeds = [
  '.v77-feature-band article h2',
  '.bd-page-title',
  '.bd-grid-3',
  '.bd-grid-4',
  '@media (max-width: 760px)',
  'overflow-x: hidden'
];
for (const item of cssNeeds) {
  if (!css.includes(item)) {
    console.error(`v78 CSS missing required rule marker: ${item}`);
    process.exit(1);
  }
}

const home = fs.readFileSync('components/BillionHomeExperience.tsx','utf8');
for (const title of ['Lowest token use','AI Harness','Plug-and-play','Top security','Team workflow']) {
  if (!home.includes(title)) {
    console.error(`Homepage feature title not simplified: ${title}`);
    process.exit(1);
  }
}

const publicPages = ['examples','pricing','how-it-works','security','support'];
for (const page of publicPages) {
  const file = `app/${page}/page.tsx`;
  const text = fs.readFileSync(file,'utf8');
  if (!text.includes('PublicPageShell')) {
    console.error(`${file} should use PublicPageShell for consistent alignment.`);
    process.exit(1);
  }
}

console.log('✅ Sitewide alignment check passed: public pages, homepage feature band, page shell, grids, and responsive alignment rules are present.');
