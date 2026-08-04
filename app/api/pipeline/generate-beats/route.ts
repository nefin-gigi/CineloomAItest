import { NextResponse } from 'next/server';
import { beats } from '@/lib/demo-data';

export async function POST() {
  return NextResponse.json({ beats, reviewRequired: true });
}
