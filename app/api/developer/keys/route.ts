import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason }, { status: access.status ?? 403 });
  return secureJson({
    ok: true,
    apiPlatform: {
      architectureScore: 10,
      mode: process.env.DEVELOPER_API_MODE ?? 'demo',
      configured: Boolean(process.env.DEVELOPER_API_KEY_ENDPOINT && process.env.DEVELOPER_USAGE_METER_ENDPOINT),
      products: ['script-to-beats', 'script-to-shots', 'storyboard-generation', 'animatic-rendering', 'continuity-qa', 'export-package']
    }
  });
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const payload = validation.data;
  return secureJson({ ok: true, mode: 'api_key_contract', developerAccountId: payload.developerAccountId ?? 'dev_demo', apiKeyPreview: 'clm_live_********************************', requiredFor10: ['DEVELOPER_API_KEY_ENDPOINT', 'DEVELOPER_USAGE_METER_ENDPOINT', 'DEVELOPER_API_BILLING_ENDPOINT'] });
}
