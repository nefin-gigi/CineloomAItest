import { NextResponse } from 'next/server';
import { panels } from '@/lib/demo-data';

export async function POST() {
  return NextResponse.json({ panels, mode: 'mock_storyboard_images', reviewRequired: true });
}
