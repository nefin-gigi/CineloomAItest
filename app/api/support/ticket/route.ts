import { NextRequest, NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: NextRequest) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const ticketId = `CLM-${Date.now()}`;
  const payload = {
    ticketId,
    status: 'received',
    category: body.category || 'general',
    priority: body.priority || 'normal',
    email: body.email || null,
    message: body.message || '',
    source: body.source || 'unknown',
    traceId: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };

  const endpoint = process.env.SUPPORT_TICKET_ENDPOINT_URL;
  if (endpoint && endpoint.startsWith('https://')) {
    const forwarded = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-cineloom-event': 'support.ticket.created' },
      body: JSON.stringify(payload)
    }).catch(() => null);

    return NextResponse.json({
      ...payload,
      integrationStatus: forwarded?.ok ? 'forwarded' : 'queued_fallback',
      message: forwarded?.ok
        ? 'Support ticket forwarded to the configured support provider.'
        : 'Support ticket accepted locally; provider forwarding failed and should be retried by the support worker.'
    });
  }

  return NextResponse.json({
    ...payload,
    integrationStatus: 'demo_mode',
    message: 'Support ticket accepted. Set SUPPORT_TICKET_ENDPOINT_URL to connect HelpScout, Zendesk, Intercom, Freshdesk, Jira Service Management, or a custom endpoint.'
  });
}
