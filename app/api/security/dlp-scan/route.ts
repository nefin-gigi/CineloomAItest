import { advancedSecurityJson, assertInternalOrSuperAdmin, classifyData, signedAuditEvent } from '@/lib/advanced-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertInternalOrSuperAdmin(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const text = String(body.text ?? body.script ?? '');
  const result = classifyData(text.slice(0, Number(process.env.DLP_MAX_SCAN_CHARS ?? 50000)));
  const audit = signedAuditEvent({ action: 'security.dlp_scan', classification: result.classification, findings: result.findings });
  return advancedSecurityJson({ ok: true, result, audit });
}
