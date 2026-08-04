import { NextResponse } from 'next/server';
import { enterpriseTrustControls } from '@/lib/billion-platform-data';

export async function GET() {
  return NextResponse.json({ ok: true, controls: enterpriseTrustControls, soc2Readiness: 'roadmap-ready', ndaMode: true, modelTrainingOptOut: true, dataRetention: 'workspace-configurable' });
}
