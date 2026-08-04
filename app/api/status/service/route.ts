import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    updatedAt: new Date().toISOString(),
    components: ['website', 'auth', 'billing', 'tokens', 'storyboard', 'animatic', 'exports', 'storage', 'queue'].map((name) => ({ name, status: 'operational', slo: '99.9%' }))
  });
}
