import fs from 'fs';
import path from 'path';

const root = process.cwd();
const requiredFiles = [
  'lib/advanced-security.ts',
  'components/AdvancedSecurityCommandCenter.tsx',
  'app/studio/super-admin/security/advanced/page.tsx',
  'app/api/super-admin/security/advanced/route.ts',
  'app/api/security/advanced-readiness/route.ts',
  'app/api/security/request-attestation/route.ts',
  'app/api/security/audit-event/route.ts',
  'app/api/security/dlp-scan/route.ts',
  'app/api/security/upload-scan/route.ts',
  'app/api/security/risk-score/route.ts',
  'app/api/security/tenant-access/route.ts',
  'app/api/security/key-rotation/route.ts',
  'app/api/security/kill-switch/route.ts',
  'database/015_advanced_security_defense_in_depth.sql',
  'docs/V4_8_ADVANCED_SECURITY_DEFENSE_IN_DEPTH.md',
  'docs/ADVANCED_SECURITY_OPERATIONS_RUNBOOK.md'
];

const requiredEnvKeys = [
  'REQUEST_SIGNATURE_SECRET',
  'INTERNAL_SERVICE_SECRET',
  'KMS_KEY_ID',
  'ENVELOPE_ENCRYPTION_ENDPOINT_URL',
  'DLP_SCAN_ENDPOINT_URL',
  'MALWARE_SCAN_ENDPOINT_URL',
  'UPLOAD_QUARANTINE_BUCKET',
  'EDGE_ATTESTATION_SECRET',
  'AUDIT_EVENT_SIGNING_SECRET',
  'IMMUTABLE_AUDIT_STORE_URL',
  'RISK_ENGINE_ENDPOINT_URL',
  'STEP_UP_MFA_ENDPOINT_URL',
  'TENANT_POLICY_ENGINE_URL',
  'SECRET_MANAGER_PROVIDER',
  'SECRET_ROTATION_WEBHOOK_URL',
  'SAST_PROVIDER',
  'DAST_PROVIDER',
  'SCA_PROVIDER',
  'SBOM_GENERATION_ENABLED',
  'AI_PROMPT_INJECTION_FIREWALL_URL',
  'COMPLIANCE_EVIDENCE_LOCKER_URL'
];

function versionAtLeast(version, minimum) {
  const a = String(version).split('.').map(Number);
  const b = String(minimum).split('.').map(Number);
  for (let i = 0; i < 3; i += 1) {
    if ((a[i] || 0) > (b[i] || 0)) return true;
    if ((a[i] || 0) < (b[i] || 0)) return false;
  }
  return true;
}

let failed = false;
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing advanced security file: ${file}`);
    failed = true;
  }
}

const envExample = fs.readFileSync(path.join(root, '.env.example'), 'utf8');
for (const key of requiredEnvKeys) {
  if (!envExample.includes(`${key}=`)) {
    console.error(`Missing advanced security env key in .env.example: ${key}`);
    failed = true;
  }
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (!pkg.scripts['advanced-security-check']) {
  console.error('Missing npm script advanced-security-check');
  failed = true;
}
if (!versionAtLeast(pkg.version, '4.8.0')) {
  console.error(`Expected package version 4.8.0 or later compatible release, found ${pkg.version}`);
  failed = true;
}

const lib = fs.readFileSync(path.join(root, 'lib/advanced-security.ts'), 'utf8');
for (const token of ['verifySignedRequest', 'classifyData', 'scanUploadMetadata', 'scoreRequestRisk', 'assertTenantIsolation', 'signedAuditEvent', 'buildAdvancedSecurityReadiness']) {
  if (!lib.includes(`export function ${token}`) && !lib.includes(`export async function ${token}`)) {
    console.error(`Missing advanced security export: ${token}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('CineLoom v4.8 advanced-security-check passed. Defense-in-depth security package is present.');
