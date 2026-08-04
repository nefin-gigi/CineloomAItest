import { NextResponse } from 'next/server';
import { GATE_COOKIE } from '@/lib/auth';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set(GATE_COOKIE, '', { maxAge: 0, path: '/' });
  return response;
}
