import fs from 'node:fs';

const required = [
  'lib/input-validation.ts',
  'lib/request-surface-security.ts',
  'lib/security-architecture.ts',
  'app/api/security/input-validation-readiness/route.ts',
  'app/api/security/top-architecture/route.ts',
  'app/api/security/penetration-test/route.ts',
  'app/studio/super-admin/security/top-architecture/page.tsx',
  'docs/V7_4_TOP_SECURITY_INPUT_VALIDATION_PENTEST.md',
  'database/024_top_security_input_validation_pentest.sql',
  '.github/workflows/security-pipeline.yml'
];
const failures = required.filter((file) => !fs.existsSync(file));
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const script of ['top-security-check', 'penetration-test', 'validate-input-coverage']) {
  if (!pkg.scripts?.[script]) failures.push(`Missing npm script: ${script}`);
}
const middleware = fs.readFileSync('middleware.ts', 'utf8');
if (!middleware.includes('assertRequestSurface')) failures.push('middleware.ts does not enforce request-surface security.');
const routeFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(p);
    if (entry.isFile() && entry.name === 'route.ts') routeFiles.push(p);
  }
}
walk('app/api');
for (const file of routeFiles) {
  const text = fs.readFileSync(file, 'utf8');
  if (/request\.json\s*\(/.test(text)) failures.push(`Direct request.json still present: ${file}`);
}
if (failures.length) {
  console.error('Top security validation failed.');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Top security validation passed.');
