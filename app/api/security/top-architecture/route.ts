import { secureJson } from '@/lib/military-security';
import { buildTopSecurityArchitectureReadiness } from '@/lib/security-architecture';

export async function GET() {
  return secureJson(buildTopSecurityArchitectureReadiness());
}
