import { secureJson } from '@/lib/military-security';
import { assertFinalProductionLaunchAllowed } from '@/lib/final-production-readiness';

export async function GET() {
  const decision = assertFinalProductionLaunchAllowed();
  return secureJson({ ok: decision.allowed, decision }, { status: decision.allowed ? 200 : decision.status ?? 409 });
}
