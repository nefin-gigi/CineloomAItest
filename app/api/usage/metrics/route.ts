import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    metrics: {
      activeWorkspaces: 128,
      freeSamplesToday: 924,
      paidExportsToday: 86,
      tokenRevenueToday: 1240,
      p95StoryboardSeconds: 18,
      p95ExportSeconds: 22,
      jobFailureRate: '0.8%'
    },
    readiness: '10/10 demo metric feed; connect to live warehouse for production.'
  });
}
