import { buildSecurityReadiness, secureJson } from '@/lib/military-security';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  return secureJson({ ok: true, generatedAt: new Date().toISOString(), security: buildSecurityReadiness() });
}
