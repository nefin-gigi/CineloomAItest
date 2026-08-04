import { NextResponse } from 'next/server';
import { assertSuperAdminAccess, getOverallHealth } from '@/lib/integration-runtime';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const health = getOverallHealth();
  const providers = health.connectors.filter((connector) => ['ai', 'rendering', 'queue', 'storage'].includes(connector.category));
  return NextResponse.json({ ok: true, providers });
}
