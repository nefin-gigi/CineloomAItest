import { advancedSecurityJson, buildAdvancedSecurityReadiness, signedAuditEvent } from '@/lib/advanced-security';
import { assertSuperAdminAccess } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  return advancedSecurityJson({ ok: true, generatedAt: new Date().toISOString(), security: buildAdvancedSecurityReadiness() });
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const audit = signedAuditEvent({ action: 'super_admin.security.advanced_control_review', body });
  return advancedSecurityJson({ ok: true, audit, message: 'Advanced security control review recorded.' });
}
