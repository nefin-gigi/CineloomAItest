import fs from 'node:fs';

const requiredPatterns = [
  ['XSS detection', /XSS_PATTERNS/],
  ['Command injection detection', /COMMAND_PATTERNS/],
  ['Path traversal detection', /PATH_TRAVERSAL/],
  ['Template injection detection', /TEMPLATE_INJECTION/],
  ['Secret detection', /SECRET_PATTERNS/],
  ['SSRF private URL blocking', /PUBLIC_URL_BLOCKED_HOSTS/],
  ['Route-specific storyboard schema', /\/api\/storyboard\/free-sample/],
  ['Route-specific billing schema', /\/api\/billing\/create-checkout-session/],
  ['Route-specific auth schema', /\/api\/auth\/login/],
  ['Secure JSON errors', /secureJson/]
];
const validation = fs.readFileSync('lib/input-validation.ts', 'utf8');
const middleware = fs.readFileSync('middleware.ts', 'utf8');
const surface = fs.readFileSync('lib/request-surface-security.ts', 'utf8');
const failures = [];
for (const [name, pattern] of requiredPatterns) {
  if (!pattern.test(validation)) failures.push(`Missing validator control: ${name}`);
}
if (!middleware.includes('assertRequestSurface')) failures.push('Middleware does not call assertRequestSurface.');
for (const expected of ['Unsupported API content type', 'Suspicious path sequence blocked', 'Origin is not allowed']) {
  if (!surface.includes(expected)) failures.push(`Request surface guard missing: ${expected}`);
}
if (!fs.existsSync('.github/workflows/security-pipeline.yml')) failures.push('Security pipeline workflow is missing.');
if (failures.length) {
  console.error('Source-level penetration harness failed.');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const target = process.env.PENTEST_TARGET_URL;
if (target) {
  const tests = [
    ['root loads', '/', 200],
    ['blocked traversal', '/..%2F..%2Fetc%2Fpasswd', 400]
  ];
  for (const [name, suffix, expected] of tests) {
    try {
      const res = await fetch(new URL(suffix, target), { redirect: 'manual' });
      if (expected === 400 && res.status < 400) failures.push(`Live check failed: ${name} returned ${res.status}`);
      if (expected === 200 && res.status >= 500) failures.push(`Live check failed: ${name} returned ${res.status}`);
    } catch (error) {
      failures.push(`Live check failed: ${name}: ${error.message}`);
    }
  }
}
if (failures.length) {
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Source-level penetration harness passed. For deployed DAST, run the GitHub OWASP ZAP baseline workflow against staging.');
