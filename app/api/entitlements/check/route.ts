import { NextRequest, NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

const planLimits: Record<string, Record<string, boolean | number>> = {
  free: { cleanExport: false, watermark: true, maxProjects: 1, monthlyTokens: 100 },
  creator: { cleanExport: true, watermark: false, maxProjects: 10, monthlyTokens: 2000 },
  studio: { cleanExport: true, watermark: false, maxProjects: 100, monthlyTokens: 10000 },
  producer: { cleanExport: true, watermark: false, maxProjects: 500, monthlyTokens: 30000 },
  enterprise: { cleanExport: true, watermark: false, maxProjects: 999999, monthlyTokens: 999999 }
};

export async function POST(request: NextRequest) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const plan = String(body.plan || 'free').toLowerCase();
  const action = String(body.action || 'freeSample');
  const entitlements = planLimits[plan] || planLimits.free;
  const allowed = action === 'cleanExport' ? Boolean(entitlements.cleanExport) : true;
  return NextResponse.json({ allowed, plan, action, entitlements, traceId: crypto.randomUUID() });
}
