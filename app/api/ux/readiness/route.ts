import { NextResponse } from 'next/server';
import { buildUXReadiness } from '@/lib/ux-readiness';

export async function GET() {
  return NextResponse.json(buildUXReadiness());
}
