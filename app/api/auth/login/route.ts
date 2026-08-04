import { secureJson, isProductionLike } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const authMode = (process.env.AUTH_MODE ?? 'demo').toLowerCase();
  const allowDemo = (process.env.ALLOW_DEMO_AUTH_IN_PRODUCTION ?? 'false').toLowerCase() === 'true';
  if (isProductionLike() && authMode === 'demo' && !allowDemo) {
    return secureJson({
      ok: false,
      message: 'Demo login is disabled in production. Connect Clerk, Supabase Auth, Auth.js, or an enterprise IdP before public launch.'
    }, { status: 503 });
  }

  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const email = String(body.email ?? '');
  const response = secureJson({
    ok: true,
    mode: authMode,
    user: { id: 'user_demo_login', email, role: 'Owner', plan: 'studio' },
    message: authMode === 'demo'
      ? 'Demo login succeeded for local/private preview only.'
      : 'Auth connector response placeholder. Production should verify identity and workspace membership through the configured provider.'
  });
  response.cookies.set('cineloom_user_session', 'demo-session', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 });
  return response;
}
