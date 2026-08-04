import { secureJson } from '@/lib/military-security';

export async function POST() {
  const response = secureJson({ ok: true, message: 'Super Admin browser session destroyed.' });
  response.cookies.set('cineloom_super_admin_session', '', { httpOnly: true, sameSite: 'strict', secure: true, maxAge: 0, path: '/studio/super-admin' });
  return response;
}
