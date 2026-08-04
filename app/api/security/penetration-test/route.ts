import { secureJson } from '@/lib/military-security';
import { buildTopSecurityArchitectureReadiness } from '@/lib/security-architecture';

export async function GET() {
  return secureJson({
    ok: true,
    mode: 'source_package_security_harness',
    message: 'Run npm run penetration-test for offline package checks and the GitHub ZAP workflow for deployed URL DAST.',
    architecture: buildTopSecurityArchitectureReadiness(),
    liveDastRequired: true
  });
}
