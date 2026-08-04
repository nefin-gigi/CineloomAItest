import { existsSync, readFileSync } from 'node:fs';

const required = [
  'components/StandardSiteFooter.tsx',
  'components/BillionFooter.tsx',
  'components/SimpleFooter.tsx',
  'app/v81-standard-footer.css',
  'docs/V8_1_STANDARDIZED_SITE_FOOTER.md',
  'database/028_standardized_site_footer.sql'
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing v8.1 footer standardization files:', missing.join(', '));
  process.exit(1);
}

const footer = readFileSync('components/StandardSiteFooter.tsx', 'utf8');
const billion = readFileSync('components/BillionFooter.tsx', 'utf8');
const simple = readFileSync('components/SimpleFooter.tsx', 'utf8');
const home = readFileSync('components/BillionHomeExperience.tsx', 'utf8');
const layout = readFileSync('app/layout.tsx', 'utf8');
const css = readFileSync('app/v81-standard-footer.css', 'utf8');

const checks = [
  ['footer component exports StandardSiteFooter', footer.includes('export function StandardSiteFooter')],
  ['footer has Product section', footer.includes("title: 'Product'")],
  ['footer has Studio section', footer.includes("title: 'Studio'")],
  ['footer has Trust section', footer.includes("title: 'Trust'")],
  ['footer has Legal section', footer.includes("title: 'Legal'")],
  ['footer uses endpoint-aware links', footer.includes('EndpointAwareLink')],
  ['footer links AI Harness', footer.includes('/studio/agent-harness')],
  ['footer links security', footer.includes('/security')],
  ['BillionFooter delegates to StandardSiteFooter', billion.includes('StandardSiteFooter')],
  ['SimpleFooter delegates to StandardSiteFooter', simple.includes('StandardSiteFooter')],
  ['homepage uses StandardSiteFooter', home.includes('<StandardSiteFooter variant="full"')],
  ['layout imports v81 css after v80', layout.indexOf("./v80-cinematic-hero.css") < layout.indexOf("./v81-standard-footer.css")],
  ['css includes standard footer main', css.includes('.standard-footer-main')],
  ['css includes mobile footer breakpoint', css.includes('@media (max-width: 820px)')]
];

const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  console.error('Standard footer checks failed:', failed.join('; '));
  process.exit(1);
}

console.log('CineLoom v8.1 standardized site footer checks passed.');
