import { advancedSecurityJson, signedAuditEvent } from '@/lib/advanced-security';
import { assertSuperAdminAccess } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason }, { status: access.status ?? 403 });
  return advancedSecurityJson({
    ok: true,
    killSwitches: {
      publicLaunchEnabled: process.env.PUBLIC_LAUNCH_ENABLED === 'true',
      paidLaunchEnabled: process.env.PAID_LAUNCH_ENABLED === 'true',
      publicGenerationEnabled: process.env.PUBLIC_GENERATION_ENDPOINTS_ENABLED === 'true',
      marketplaceEnabled: process.env.MARKETPLACE_ENABLED === 'true',
      developerApiEnabled: process.env.API_PLATFORM_ENABLED === 'true'
    }
  });
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return advancedSecurityJson({ ok: false, message: access.reason }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const audit = signedAuditEvent({ action: 'security.kill_switch_requested', body });
  return advancedSecurityJson({ ok: true, audit, message: 'Kill-switch request recorded. Wire this route to Vercel env/config management for live toggling.' });
}
