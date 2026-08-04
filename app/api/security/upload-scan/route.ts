import { advancedSecurityJson, assertInternalOrSuperAdmin, scanUploadMetadata, signedAuditEvent } from '@/lib/advanced-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertInternalOrSuperAdmin(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason, remediation: access.remediation ?? [] }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const scan = scanUploadMetadata({
    fileName: String(body.fileName ?? 'unknown.txt'),
    sizeBytes: Number(body.sizeBytes ?? 0),
    contentType: String(body.contentType ?? 'application/octet-stream')
  });
  const audit = signedAuditEvent({ action: 'security.upload_scan', fileName: body.fileName, allowed: scan.allowed, blockers: scan.blockers });
  return advancedSecurityJson({ ok: scan.allowed, scan, audit }, { status: scan.allowed ? 200 : 400 });
}
