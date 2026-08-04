import { NextResponse } from 'next/server';
import { assertSuperAdminAccess, testConnector } from '@/lib/integration-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const { searchParams } = new URL(request.url);
  const connectorId = searchParams.get('connectorId') ?? '';
  return NextResponse.json(testConnector(connectorId));
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json(testConnector(String(body.connectorId ?? '')));
}
