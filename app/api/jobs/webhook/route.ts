import { NextResponse } from 'next/server';
import { buildAuditEvent } from '@/lib/observability';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const secret = process.env.QUEUE_WEBHOOK_SECRET;
  const provided = request.headers.get('x-cineloom-queue-secret');
  if (secret && provided !== secret) return NextResponse.json({ ok: false, message: 'Invalid queue webhook signature' }, { status: 401 });
  return NextResponse.json({
    ok: true,
    status: 'worker_callback_received',
    audit: buildAuditEvent({ action: 'queue.worker_callback', target: String(body.jobId ?? 'unknown'), metadata: body }),
    nextStep: 'Commit or refund token reservation and persist job result in database.'
  });
}
