import { NextResponse } from 'next/server';
import { v2QaScoreCards } from '@/lib/v2-data';

export async function GET() {
  const average = Math.round(v2QaScoreCards.reduce((sum, item) => sum + item.score, 0) / v2QaScoreCards.length);
  return NextResponse.json({
    qaMode: 'v2-customer-experience-and-production-readiness',
    average,
    cards: v2QaScoreCards,
    blockers: ['Real provider credentials, persistence, and asset storage are required for production launch.']
  });
}
