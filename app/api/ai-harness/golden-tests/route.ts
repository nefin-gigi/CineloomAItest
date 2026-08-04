import { NextResponse } from 'next/server';
import { goldenTestCases, runGoldenTestSuite } from '@/lib/ai-harness';

export async function GET() {
  return NextResponse.json({ ok: true, tests: goldenTestCases });
}

export async function POST() {
  return NextResponse.json({ ok: true, result: runGoldenTestSuite() });
}
