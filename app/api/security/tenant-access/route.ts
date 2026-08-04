import { advancedSecurityJson, assertInternalOrSuperAdmin, assertTenantIsolation, signedAuditEvent } from '@/lib/advanced-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertInternalOrSuperAdmin(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const decision = assertTenantIsolation({
    userWorkspaceId: String(body.userWorkspaceId ?? ''),
    resourceWorkspaceId: String(body.resourceWorkspaceId ?? ''),
    role: String(body.role ?? '')
  });
  const audit = signedAuditEvent({ action: 'security.tenant_access_check', allowed: decision.allowed, reason: decision.reason });
  return advancedSecurityJson({ ok: decision.allowed, decision, audit }, { status: decision.allowed ? 200 : decision.status ?? 403 });
}
