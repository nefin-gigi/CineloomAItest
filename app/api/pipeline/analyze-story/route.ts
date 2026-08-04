import { NextResponse } from 'next/server';
import { storyAnalysis } from '@/lib/pipeline';

export async function POST() {
  return NextResponse.json(storyAnalysis());
}
