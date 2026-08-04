import { NextResponse } from 'next/server';
import { revenueStreams, growthLoops } from '@/lib/billion-platform-data';

export async function GET() {
  return NextResponse.json({ ok: true, mrrTarget: '$1M+', arrPath: 'creator + studio + enterprise + API + marketplace blend', revenueStreams, growthLoops, readinessScore: 10 });
}
