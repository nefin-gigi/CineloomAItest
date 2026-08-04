import fs from 'node:fs';

const requiredFiles = [
  'components/BillionHomeExperience.tsx',
  'app/v77-billion-home-match.css',
  'docs/V7_7_BILLION_HOMEPAGE_MATCH.md',
  'database/027_billion_homepage_match.sql'
];

const requiredSnippets = [
  ['app/page.tsx', 'BillionHomeExperience'],
  ['app/layout.tsx', "./v77-billion-home-match.css"],
  ['components/BillionHomeExperience.tsx', 'Open in AI Harness'],
  ['components/BillionHomeExperience.tsx', 'Super Admin. Total control.'],
  ['components/BillionHomeExperience.tsx', 'Lowest token use'],
  ['components/BillionHomeExperience.tsx', 'The complete storyboard workflow'],
  ['components/BillionHomeExperience.tsx', '/studio/agent-harness'],
  ['components/BillionHomeExperience.tsx', '/studio/super-admin/frontend-integrations']
];

let failures = [];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) failures.push(`Missing file: ${file}`);
}
for (const [file, snippet] of requiredSnippets) {
  const content = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (!content.includes(snippet)) failures.push(`Missing snippet in ${file}: ${snippet}`);
}

if (failures.length) {
  console.error('Billion homepage match check failed:');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
console.log('✅ Billion homepage match check passed.');
