import { secureJson } from '@/lib/military-security';
import { estimateTokenCost } from '@/lib/token-transactions';
import { liveReserveTokens } from '@/lib/live-token-ledger';
import { assertLivePaidSaaSAllowed } from '@/lib/live-paid-saas';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const gate = assertLivePaidSaaSAllowed('token_reserve');
  if (!gate.allowed && process.env.LIVE_PAID_SAAS_MODE === 'live') {
    return secureJson({ ok: false, error: gate.reason, readiness: gate.readiness }, { status: gate.status ?? 503 });
  }
  const amount = Number(body.amount ?? estimateTokenCost({ action: String(body.action ?? 'storyboard_generation'), panels: Number(body.panels ?? 8), seconds: Number(body.seconds ?? 10) }));
  const result = await liveReserveTokens({ workspaceId: String(body.workspaceId ?? 'guest'), amount, projectId: String(body.projectId ?? 'demo'), jobId: body.jobId ? String(body.jobId) : undefined, idempotencyKey: String(body.idempotencyKey ?? `reserve_${Date.now()}`), reason: String(body.reason ?? 'generation_reserve') });
  return secureJson({ ok: result.ok, ...result.data }, { status: result.status });
}
