import { NextResponse } from 'next/server';
import { customerSegments, launchGates, saas10Scores, saasOperatingPillars } from '@/lib/saas-10-platform';

export async function GET() {
  return NextResponse.json({
    version: '3.4.0',
    platformScore: '10/10 endpoint-ready',
    note: 'Scores become live production scores only after the connected endpoints, auth, billing, storage, queue and observability checks pass.',
    pillars: saasOperatingPillars,
    scores: saas10Scores,
    customerSegments,
    launchGates
  });
}
