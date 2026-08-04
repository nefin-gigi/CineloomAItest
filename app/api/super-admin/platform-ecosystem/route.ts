import { NextResponse } from 'next/server';
import { apiProducts, enterpriseTrustControls, filmIntegrations, growthLoops, marketplaceCatalog, revenueStreams } from '@/lib/billion-platform-data';

export async function GET() {
  return NextResponse.json({ ok: true, apiProducts, enterpriseTrustControls, filmIntegrations, growthLoops, marketplaceCatalog, revenueStreams });
}
