import { NextRequest, NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

const importantEvents = new Set([
  'page_viewed',
  'cta_clicked',
  'hero_cta_clicked',
  'free_sample_started',
  'free_sample_completed',
  'sample_package_downloaded',
  'sample_storyboard_pdf_downloaded',
  'share_remix_clicked',
  'share_package_downloaded',
  'share_remove_watermark_clicked',
  'pricing_viewed',
  'checkout_started',
  'signup_started',
  'support_ticket_created',
  'onboarding_flow_started'
]);

export async function POST(request: NextRequest) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const event = String(body.event || 'unknown');
  const payload = {
    accepted: true,
    event,
    normalizedEvent: importantEvents.has(event) ? event : 'custom_event',
    stage: body.stage || 'unclassified',
    label: body.label || body.pageName || null,
    path: body.path || request.headers.get('referer') || null,
    metadata: body.metadata || {},
    traceId: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    note: 'Route this event to PostHog, Segment, Mixpanel, GA4, or a warehouse through Super Admin.'
  };

  const endpoint = process.env.CONVERSION_ANALYTICS_ENDPOINT_URL;
  if (endpoint && endpoint.startsWith('https://')) {
    const forwarded = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-cineloom-event': 'analytics.funnel' },
      body: JSON.stringify(payload)
    }).catch(() => null);
    return NextResponse.json({ ...payload, integrationStatus: forwarded?.ok ? 'forwarded' : 'queued_fallback' });
  }

  return NextResponse.json({ ...payload, integrationStatus: 'demo_mode' });
}
