import { NextResponse } from 'next/server';
import { launchGates } from '@/lib/saas-10-platform';

export async function GET() {
  return NextResponse.json({ launchGates, goLive: 'blocked-until-live-services-pass' });
}
