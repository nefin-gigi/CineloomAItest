import { NextResponse } from 'next/server';
import { assertIpAllowlist, constantTimeEquals, isProductionLike, secureJson } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const ipGate = assertIpAllowlist(request);
  if (!ipGate.allowed) return secureJson({ ok: false, message: ipGate.reason, remediation: ipGate.remediation ?? [] }, { status: ipGate.status ?? 403 });

  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const configuredApiKey = process.env.SUPER_ADMIN_API_KEY ?? '';
  const configuredSession = process.env.SUPER_ADMIN_SESSION_TOKEN ?? '';
  const configuredMfa = process.env.SUPER_ADMIN_MFA_BYPASS_TOKEN ?? '';
  const providedApiKey = request.headers.get('x-cineloom-super-admin-key') ?? '';
  const providedSession = String(body.sessionToken ?? '');
  const providedMfa = String(body.mfaToken ?? '');

  if (isProductionLike() && (!configuredApiKey || !configuredSession)) {
    return secureJson({ ok: false, message: 'Super Admin production access requires SUPER_ADMIN_API_KEY and SUPER_ADMIN_SESSION_TOKEN.' }, { status: 503 });
  }

  const keyOk = configuredApiKey && constantTimeEquals(providedApiKey, configuredApiKey);
  const sessionOk = configuredSession && constantTimeEquals(providedSession, configuredSession);
  const mfaRequired = Boolean(configuredMfa);
  const mfaOk = !mfaRequired || constantTimeEquals(providedMfa, configuredMfa);

  if (!keyOk || !sessionOk || !mfaOk) {
    return secureJson({ ok: false, message: 'Super Admin authentication failed.' }, { status: 403 });
  }

  const response = secureJson({ ok: true, message: 'Super Admin hardened browser session established.' });
  response.cookies.set('cineloom_super_admin_session', configuredSession, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 60 * 30,
    path: '/studio/super-admin'
  });
  return response;
}
