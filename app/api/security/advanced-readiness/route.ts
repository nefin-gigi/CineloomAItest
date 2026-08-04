import { advancedSecurityJson, assertInternalOrSuperAdmin, buildAdvancedSecurityReadiness } from '@/lib/advanced-security';

export async function GET(request: Request) {
  const access = assertInternalOrSuperAdmin(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  return advancedSecurityJson({ ok: true, generatedAt: new Date().toISOString(), security: buildAdvancedSecurityReadiness() });
}
