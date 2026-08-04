import { NextResponse } from 'next/server';
import { getScaleReadiness } from '@/lib/production-scale';

export async function GET() {
  const readiness = getScaleReadiness();
  const ready = readiness.readinessPercent >= 75 || process.env.ALLOW_DEMO_READY_HEALTH === 'true';
  return NextResponse.json({ ok: ready, status: ready ? 'ready' : 'config_pending', readiness }, { status: ready ? 200 : 503 });
}
