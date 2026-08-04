import { randomBytes } from 'crypto';
import { secureJson } from '@/lib/military-security';

export async function GET() {
  const token = randomBytes(32).toString('base64url');
  const response = secureJson({ ok: true, csrfToken: token, header: 'x-cineloom-csrf' });
  response.cookies.set('cineloom_csrf', token, { httpOnly: false, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60, path: '/' });
  return response;
}
