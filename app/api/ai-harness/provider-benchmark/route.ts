import { NextResponse } from 'next/server';
import { providerBenchmarks } from '@/lib/ai-harness';

export async function GET() {
  const ranked = [...providerBenchmarks].sort((a, b) => (b.qualityScore + b.consistencyScore + b.speedScore + b.costScore) - (a.qualityScore + a.consistencyScore + a.speedScore + a.costScore));
  return NextResponse.json({ ok: true, strategy: 'quality_weighted_default', providers: ranked });
}
