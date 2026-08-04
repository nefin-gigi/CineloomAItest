import { NextResponse } from 'next/server';
import { revenueMetrics } from '@/lib/v3-production-data';

export async function GET() {
  return NextResponse.json({ mode: process.env.ANALYTICS_MODE ?? 'demo', metrics: revenueMetrics, note: 'Connect Stripe, database, provider cost logs, and analytics events for live values.' });
}
