import { commitTokens, refundTokens, reserveTokens, type TokenTransaction } from './token-transactions';

export type LedgerAction = 'reserve' | 'commit' | 'refund';

async function callExternalLedger(action: LedgerAction, payload: Record<string, unknown>) {
  const endpoint = process.env.TOKEN_LEDGER_ENDPOINT_URL;
  const secret = process.env.TOKEN_LEDGER_SECRET;
  if (!endpoint || !secret) return null;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-cineloom-ledger-secret': secret,
      'x-cineloom-ledger-action': action,
      'idempotency-key': String(payload.idempotencyKey ?? `${action}_${Date.now()}`)
    },
    body: JSON.stringify({ action, ...payload })
  });
  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, status: response.status, data };
}

export async function liveReserveTokens(input: { workspaceId: string; amount: number; projectId?: string; jobId?: string; idempotencyKey: string; reason?: string }) {
  if ((process.env.TOKEN_LEDGER_MODE ?? 'demo').toLowerCase() === 'external') {
    const external = await callExternalLedger('reserve', input);
    if (external) return external;
  }
  const transaction = reserveTokens(input);
  return { ok: transaction.status === 'reserved', status: transaction.status === 'reserved' ? 200 : 402, data: { transaction, mode: 'demo-ledger-fallback' } };
}

export async function liveCommitTokens(input: TokenTransaction) {
  if ((process.env.TOKEN_LEDGER_MODE ?? 'demo').toLowerCase() === 'external') {
    const external = await callExternalLedger('commit', input as unknown as Record<string, unknown>);
    if (external) return external;
  }
  const transaction = commitTokens(input);
  return { ok: true, status: 200, data: { transaction, mode: 'demo-ledger-fallback' } };
}

export async function liveRefundTokens(input: TokenTransaction, reason = 'job_failed_refund') {
  if ((process.env.TOKEN_LEDGER_MODE ?? 'demo').toLowerCase() === 'external') {
    const external = await callExternalLedger('refund', { ...input, reason });
    if (external) return external;
  }
  const transaction = refundTokens(input, reason);
  return { ok: true, status: 200, data: { transaction, mode: 'demo-ledger-fallback' } };
}
