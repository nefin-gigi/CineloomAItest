import { NextResponse } from 'next/server';
export async function GET() {
  return NextResponse.json({ ok: true, status: 'live', service: 'cineloom-web', at: new Date().toISOString() });
}
