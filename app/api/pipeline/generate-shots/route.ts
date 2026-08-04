import { NextResponse } from 'next/server';
import { shots } from '@/lib/demo-data';

export async function POST() {
  return NextResponse.json({ shots, continuityChecks: ['180-degree axis', 'screen direction', 'eyeline', 'prop continuity'] });
}
