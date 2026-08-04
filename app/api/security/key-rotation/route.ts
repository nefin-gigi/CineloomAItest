import { advancedSecurityJson, signedAuditEvent } from '@/lib/advanced-security';
import { assertSuperAdminAccess } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason }, { status: access.status ?? 403 });
  const rotation = {
    provider: process.env.SECRET_MANAGER_PROVIDER ?? 'not_configured',
    rotationWebhookConfigured: Boolean(process.env.SECRET_ROTATION_WEBHOOK_URL),
    intervalDays: Number(process.env.SECRET_ROTATION_INTERVAL_DAYS ?? 90),
    leakScanEnabled: String(process.env.SECRET_LEAK_SCAN_ENABLED ?? 'false') === 'true',
    keys: ['SUPER_ADMIN_API_KEY', 'SUPER_ADMIN_SESSION_TOKEN', 'REQUEST_SIGNATURE_SECRET', 'AUDIT_EVENT_SIGNING_SECRET', 'TOKEN_LEDGER_SECRET', 'STRIPE_WEBHOOK_SECRET']
  };
  return advancedSecurityJson({ ok: true, rotation });
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const audit = signedAuditEvent({ action: 'security.key_rotation_requested', body });
  return advancedSecurityJson({ ok: Boolean(process.env.SECRET_ROTATION_WEBHOOK_URL), audit, message: process.env.SECRET_ROTATION_WEBHOOK_URL ? 'Rotation request accepted for external secret manager.' : 'Configure SECRET_ROTATION_WEBHOOK_URL before live rotation.' });
}
