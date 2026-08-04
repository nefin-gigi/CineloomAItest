import { NextResponse } from 'next/server';
import { billionReadinessScores, revenueStreams, platformMoats } from '@/lib/billion-platform-data';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET() {
  return NextResponse.json({ ok: true, readiness: billionReadinessScores, revenueStreams, platformMoats, target: '10/10 platform-demo readiness' });
}

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const action = body.action ?? 'platform action';
  return NextResponse.json({
    ok: true,
    action,
    message: `${action} completed in demo mode. In production, Super Admin routes this to execution endpoints with token metering, storage, queue workers, and audit logs.`,
    score: 10,
    traceId: `platform_${Date.now()}`
  });
}
