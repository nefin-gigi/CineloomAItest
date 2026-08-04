import { advancedSecurityJson, assertInternalOrSuperAdmin, signedAuditEvent } from '@/lib/advanced-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertInternalOrSuperAdmin(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const event = signedAuditEvent(body);
  return advancedSecurityJson({ ok: true, event });
}
