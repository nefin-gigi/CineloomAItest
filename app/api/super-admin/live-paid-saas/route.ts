import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';
import { buildLivePaidSaasReadiness } from '@/lib/live-paid-saas';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ error: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  return secureJson(buildLivePaidSaasReadiness());
}
