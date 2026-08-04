import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const payload = validation.data;
  const configured = Boolean(process.env.DEVELOPER_USAGE_METER_ENDPOINT);
  return secureJson({ ok: configured, usageEvent: payload, meterMode: configured ? 'external' : 'contract_ready', message: configured ? 'Usage event ready to forward to developer metering endpoint.' : 'Configure DEVELOPER_USAGE_METER_ENDPOINT before live API billing.' }, { status: configured ? 200 : 409 });
}
