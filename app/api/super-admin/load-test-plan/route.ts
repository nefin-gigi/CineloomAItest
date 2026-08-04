import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { buildK6LoadTestScript, scaleTargets } from '@/lib/production-scale';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const url = new URL(request.url);
  const baseUrl = url.searchParams.get('baseUrl') ?? process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.cineloom.ai';
  return NextResponse.json({
    ok: true,
    target: scaleTargets,
    scenarios: ['public_funnel_900_vus', 'studio_workflow_750_vus', 'export_downloads_250_vus', 'super_admin_health_100_vus'],
    totalConcurrentUsers: 2000,
    k6Script: buildK6LoadTestScript(baseUrl)
  });
}
