import { NextResponse } from 'next/server';
import { expectedPassword, expectedUsername, GATE_COOKIE, gateConfigured, gateToken } from '@/lib/auth';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  if (!gateConfigured()) {
    return NextResponse.json({ error: 'Launch gate is not configured. Set LAUNCH_PASSWORD and LAUNCH_GATE_TOKEN in Vercel environment variables.' }, { status: 500 });
  }

  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const username = String(body.username ?? '').trim();
  const password = String(body.password ?? '');

  if (username !== expectedUsername() || password !== expectedPassword()) {
    return NextResponse.json({ error: 'Invalid preview credentials.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(GATE_COOKIE, gateToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12,
    path: '/'
  });
  return response;
}
