import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';
import { assertLivePaidSaaSAllowed } from '@/lib/live-paid-saas';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ error: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const gate = assertLivePaidSaaSAllowed('live_paid_launch');
  return secureJson({ allowed: gate.allowed, reason: gate.reason, readiness: gate.readiness }, { status: gate.allowed ? 200 : gate.status ?? 409 });
}
