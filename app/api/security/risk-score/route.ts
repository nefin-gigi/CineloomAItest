import { advancedSecurityJson, assertInternalOrSuperAdmin, scoreRequestRisk, signedAuditEvent } from '@/lib/advanced-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertInternalOrSuperAdmin(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const risk = scoreRequestRisk(request, body);
  const audit = signedAuditEvent({ action: 'security.risk_score', risk: risk.risk, score: risk.score, signals: risk.signals });
  return advancedSecurityJson({ ok: true, risk, audit });
}
