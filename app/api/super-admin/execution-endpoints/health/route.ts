import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { getExecutionEndpointHealth } from '@/lib/execution-runtime';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString(), executionHealth: getExecutionEndpointHealth() });
}
