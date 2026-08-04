import { NextResponse } from 'next/server';
import { getExecutionEndpointHealth } from '@/lib/execution-runtime';
import { getScaleReadiness } from '@/lib/production-scale';

export async function GET() {
  const endpoints = getExecutionEndpointHealth();
  const scale = getScaleReadiness();
  return NextResponse.json({
    ok: true,
    status: 'deep_health_report',
    generatedAt: new Date().toISOString(),
    web: { live: true },
    endpoints: { readinessPercent: endpoints.readinessPercent, corePercent: endpoints.corePercent, missingCore: endpoints.missingCore },
    scale: { readinessPercent: scale.readinessPercent, target: scale.target, missingEnv: scale.missingEnv },
    guidance: 'Connect live endpoint URLs, storage, database, billing, queue, and observability to move from demo architecture to production readiness.'
  });
}
