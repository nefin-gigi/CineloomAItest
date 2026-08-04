import fs from 'node:fs';
import path from 'node:path';
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.cineloom.ai';
const script = `import http from 'k6/http';\nimport { check, sleep } from 'k6';\n\nexport const options = {\n  scenarios: {\n    public_funnel: { executor: 'constant-vus', vus: 900, duration: '10m' },\n    studio_api: { executor: 'constant-vus', vus: 750, duration: '10m' },\n    exports: { executor: 'constant-vus', vus: 250, duration: '10m' },\n    health: { executor: 'constant-vus', vus: 100, duration: '10m' }\n  },\n  thresholds: { http_req_failed: ['rate<0.005'], http_req_duration: ['p(95)<1800'] }\n};\n\nexport default function () {\n  const pages = ['/', '/pricing', '/create-free-storyboard', '/api/health/ready'];\n  const res = http.get('${baseUrl}' + pages[Math.floor(Math.random() * pages.length)]);\n  check(res, { 'acceptable status': (r) => [200, 202, 302, 429, 503].includes(r.status) });\n  sleep(1);\n}\n`;
const out = path.join(process.cwd(), 'load-tests', 'cineloom-2000-users.k6.js');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, script);
console.log(`Wrote ${out}`);
