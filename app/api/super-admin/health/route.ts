import { NextResponse } from 'next/server';
import { assertSuperAdminAccess, getFeatureFlagStatus, getOverallHealth } from '@/lib/integration-runtime';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  return NextResponse.json({ ok: true, access: access.reason, health: getOverallHealth(), featureFlags: getFeatureFlagStatus(), checkedAt: new Date().toISOString() });
}
