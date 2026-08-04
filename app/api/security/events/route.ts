import { NextResponse } from 'next/server';
import { buildAuditEvent } from '@/lib/observability';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({
    ok: true,
    securityEvent: buildAuditEvent({ action: `security.${String(body.type ?? 'event')}`, target: String(body.target ?? 'content'), metadata: body }),
    routedToManualReview: ['rights_risk', 'public_figure_likeness', 'unsafe_content'].includes(String(body.type))
  });
}
