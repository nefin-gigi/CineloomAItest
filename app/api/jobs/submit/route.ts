import { NextResponse } from 'next/server';
import { createJob } from '@/lib/job-orchestrator';
import { checkDistributedRateLimit, rateLimitHeaders } from '@/lib/rate-limit';
import { estimateTokenCost, reserveTokens } from '@/lib/token-transactions';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const rate = await checkDistributedRateLimit({ request, weight: 2, namespace: 'jobs' });
  if (!rate.allowed) return NextResponse.json({ ok: false, status: 'rate_limited', rateLimit: rate }, { status: 429, headers: rateLimitHeaders(rate) });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const kind = String(body.kind ?? 'storyboard_generation') as 'storyboard_generation';
  const workspaceId = String(body.workspaceId ?? 'guest');
  const tokenEstimate = estimateTokenCost({ action: kind, panels: Number(body.panels ?? 8), seconds: Number(body.seconds ?? 10), quality: body.quality === 'premium' ? 'premium' : 'standard' });
  const tokenReservation = reserveTokens({ workspaceId, amount: tokenEstimate, projectId: String(body.projectId ?? 'demo'), reason: kind, idempotencyKey: String(body.idempotencyKey ?? `job_${Date.now()}`) });
  if (tokenReservation.status === 'rejected') return NextResponse.json({ ok: false, status: 'insufficient_tokens', tokenReservation }, { status: 402, headers: rateLimitHeaders(rate) });
  const job = createJob({
    kind,
    priority: body.priority === 'enterprise' ? 'enterprise' : body.priority === 'priority' ? 'priority' : 'standard',
    workspaceId,
    projectId: String(body.projectId ?? 'demo'),
    payload: body.payload ?? body,
    idempotencyKey: tokenReservation.idempotencyKey,
    callbackUrl: process.env.QUEUE_CALLBACK_URL
  });
  return NextResponse.json({ ok: true, status: 'queued', job, tokenReservation, message: 'Production pattern: enqueue this job in your configured queue provider and commit/refund tokens from worker callback.' }, { status: 202, headers: rateLimitHeaders(rate) });
}
