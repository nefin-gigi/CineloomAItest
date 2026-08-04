import { secureJson, isProductionLike } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const authMode = (process.env.AUTH_MODE ?? 'demo').toLowerCase();
  if (isProductionLike() && authMode === 'demo' && (process.env.ALLOW_DEMO_AUTH_IN_PRODUCTION ?? 'false').toLowerCase() !== 'true') {
    return secureJson({ ok: false, message: 'Demo signup is disabled in production. Configure real auth first.' }, { status: 503 });
  }
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return secureJson({ ok: true, mode: authMode, user: { id: 'user_demo_signup', email: String(body.email ?? ''), role: 'Owner' }, message: 'Signup contract accepted. Production must create the user through the configured auth provider and database.' });
}
