import { NextResponse } from 'next/server';
import { productionBlockersClosed, scalabilityLayers } from '@/lib/integration-registry';
import { assertSuperAdminAccess, getOverallHealth } from '@/lib/integration-runtime';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const health = getOverallHealth();
  return NextResponse.json({
    ok: true,
    readiness: health,
    blockers: productionBlockersClosed,
    scalabilityLayers,
    productionGate: health.readinessPercent >= 90 ? 'Ready for final security/legal/payment review.' : 'Do not open public paid launch until missing critical connectors are configured.'
  });
}
