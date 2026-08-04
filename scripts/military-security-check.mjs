import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'lib/military-security.ts',
  'middleware.ts',
  'components/MilitarySecurityCommandCenter.tsx',
  'components/SuperAdminAccessPanel.tsx',
  'app/studio/super-admin/security/page.tsx',
  'app/studio/super-admin/access/page.tsx',
  'app/api/super-admin/auth/login/route.ts',
  'app/api/super-admin/auth/logout/route.ts',
  'app/api/super-admin/security/readiness/route.ts',
  'app/api/security/csrf/route.ts',
  'app/api/security/csp-report/route.ts',
  'database/010_military_security_hardening.sql',
  'docs/V4_3_MILITARY_LEVEL_SECURITY_HARDENING.md',
  'docs/ZERO_TRUST_SUPER_ADMIN_RUNBOOK.md',
  'docs/SECURITY_ACCEPTANCE_CRITERIA_V4_3.md'
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(process.cwd(), file)));
if (missing.length) {
  console.error('Military security check failed. Missing files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const middleware = fs.readFileSync(path.join(process.cwd(), 'middleware.ts'), 'utf8');
const mustContain = [
  'applySecurityHeaders',
  'assertProductionSafeConfiguration',
  'assertSuperAdminAccess',
  'Demo authentication is disabled in production',
  'Public generation/intake endpoint is locked',
  '/studio/super-admin/access'
];
for (const token of mustContain) {
  if (!middleware.includes(token)) {
    console.error(`Military security check failed. middleware.ts missing ${token}`);
    process.exit(1);
  }
}

const env = fs.readFileSync(path.join(process.cwd(), '.env.example'), 'utf8');
for (const token of ['SECURITY_PROFILE=military', 'SUPER_ADMIN_API_KEY', 'SUPER_ADMIN_SESSION_TOKEN', 'CSRF_PROTECTION_ENFORCE=true']) {
  if (!env.includes(token)) {
    console.error(`Military security check failed. .env.example missing ${token}`);
    process.exit(1);
  }
}

console.log('Military security check passed: zero-trust Super Admin, security headers, CSRF, production demo-auth lockout, endpoint lockdown, and security runbooks are present.');
