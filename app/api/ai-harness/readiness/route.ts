import { NextResponse } from 'next/server';
import { buildAIHarnessReadiness } from '@/lib/ai-harness';

export async function GET() {
  return NextResponse.json({ ok: true, readiness: buildAIHarnessReadiness(), checkedAt: new Date().toISOString() });
}
