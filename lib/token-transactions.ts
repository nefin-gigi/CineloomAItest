export type TokenTransactionStatus = 'reserved' | 'committed' | 'refunded' | 'rejected';

export type TokenTransaction = {
  transactionId: string;
  workspaceId: string;
  projectId?: string;
  jobId?: string;
  amount: number;
  status: TokenTransactionStatus;
  reason: string;
  idempotencyKey: string;
  createdAt: string;
};

export function estimateTokenCost(input: { action: string; panels?: number; seconds?: number; corrections?: number; exports?: number; quality?: 'preview' | 'standard' | 'premium' }) {
  const qualityMultiplier = input.quality === 'premium' ? 1.8 : input.quality === 'standard' ? 1.2 : 1;
  const base = input.action.includes('animatic') ? 120 : input.action.includes('export') ? 25 : input.action.includes('correction') ? 12 : 20;
  const panelCost = (input.panels ?? 0) * 18;
  const secondCost = (input.seconds ?? 0) * 8;
  const correctionCost = (input.corrections ?? 0) * 12;
  const exportCost = (input.exports ?? 0) * 25;
  return Math.ceil((base + panelCost + secondCost + correctionCost + exportCost) * qualityMultiplier);
}

export function reserveTokens(input: { workspaceId: string; amount: number; balance?: number; projectId?: string; jobId?: string; idempotencyKey?: string; reason?: string }): TokenTransaction {
  const balance = input.balance ?? Number(process.env.DEMO_TOKEN_BALANCE ?? 100000);
  const accepted = balance >= input.amount;
  return {
    transactionId: `tok_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    workspaceId: input.workspaceId,
    projectId: input.projectId,
    jobId: input.jobId,
    amount: input.amount,
    status: accepted ? 'reserved' : 'rejected',
    reason: accepted ? input.reason ?? 'generation_reserve' : 'insufficient_tokens',
    idempotencyKey: input.idempotencyKey ?? `tok_${Date.now()}`,
    createdAt: new Date().toISOString()
  };
}

export function commitTokens(input: TokenTransaction): TokenTransaction {
  return { ...input, status: input.status === 'reserved' ? 'committed' : input.status, reason: input.status === 'reserved' ? 'job_success_commit' : input.reason };
}

export function refundTokens(input: TokenTransaction, reason = 'job_failed_refund'): TokenTransaction {
  return { ...input, status: input.status === 'reserved' ? 'refunded' : input.status, reason };
}
