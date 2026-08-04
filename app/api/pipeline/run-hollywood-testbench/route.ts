import { NextResponse } from 'next/server';
import { hollywoodTestBench } from '@/lib/v1-data';

export async function POST() {
  return NextResponse.json({
    testBench: 'authorized-fixture-regression-suite',
    policy: 'Use original, licensed, or public-domain scripts only.',
    results: hollywoodTestBench,
    averageScore: Math.round(hollywoodTestBench.reduce((sum, row) => sum + row.score, 0) / hollywoodTestBench.length)
  });
}
