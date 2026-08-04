import { NextResponse } from 'next/server';
import { scenes } from '@/lib/demo-data';

export async function POST() {
  return NextResponse.json({ scenes, reviewRequired: true });
}
