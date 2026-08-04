import { secureJson } from '@/lib/military-security';
import { liveCommitTokens } from '@/lib/live-token-ledger';
import { assertLivePaidSaaSAllowed } from '@/lib/live-paid-saas';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const gate = assertLivePaidSaaSAllowed('token_commit');
  if (!gate.allowed && process.env.LIVE_PAID_SAAS_MODE === 'live') return secureJson({ ok: false, error: gate.reason, readiness: gate.readiness }, { status: gate.status ?? 503 });
  const transaction = {
    transactionId: String(body.transactionId ?? `tok_${Date.now()}`),
    workspaceId: String(body.workspaceId ?? 'guest'),
    projectId: body.projectId ? String(body.projectId) : undefined,
    jobId: body.jobId ? String(body.jobId) : undefined,
    amount: Number(body.amount ?? 0),
    status: 'reserved' as const,
    reason: 'worker_success',
    idempotencyKey: String(body.idempotencyKey ?? `commit_${Date.now()}`),
    createdAt: new Date().toISOString()
  };
  const result = await liveCommitTokens(transaction);
  return secureJson({ ok: result.ok, ...result.data }, { status: result.status });
}
