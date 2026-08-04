import { NextResponse } from 'next/server';
import { overheadLayout } from '@/lib/v1-data';

export async function POST() {
  return NextResponse.json({
    layoutType: 'overhead-180-degree-map',
    ...overheadLayout,
    qa: { axisCrossing: false, eyelineMismatch: false, screenDirectionConflict: false },
    reviewRequired: true
  });
}
