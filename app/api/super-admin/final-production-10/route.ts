import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';
import { buildFinalProductionReadiness, assertFinalProductionLaunchAllowed } from '@/lib/final-production-readiness';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  return secureJson({ ok: true, readiness: buildFinalProductionReadiness() });
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const action = String(body.action ?? 'check_launch_gate');
  if (action === 'assert_launch') return secureJson({ ok: true, decision: assertFinalProductionLaunchAllowed() });
  return secureJson({ ok: true, action, readiness: buildFinalProductionReadiness() });
}
