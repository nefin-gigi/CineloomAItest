export type TraceContext = {
  traceId: string;
  requestId: string;
  startedAt: string;
};

export function createTraceContext(prefix = 'cineloom') : TraceContext {
  const nonce = Math.random().toString(36).slice(2, 10);
  const now = Date.now().toString(36);
  return {
    traceId: `${prefix}_${now}_${nonce}`,
    requestId: `req_${now}_${nonce}`,
    startedAt: new Date().toISOString()
  };
}

export function publicTraceHeaders(trace: TraceContext) {
  return {
    'x-cineloom-trace-id': trace.traceId,
    'x-cineloom-request-id': trace.requestId
  };
}

export function buildAuditEvent(input: { actorId?: string; workspaceId?: string; action: string; target?: string; metadata?: Record<string, unknown>; trace?: TraceContext }) {
  return {
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    actorId: input.actorId ?? 'system',
    workspaceId: input.workspaceId ?? 'unknown',
    action: input.action,
    target: input.target ?? 'cineloom',
    metadata: input.metadata ?? {},
    traceId: input.trace?.traceId ?? createTraceContext('audit').traceId,
    createdAt: new Date().toISOString()
  };
}

export function sloVerdict(metrics: { p95Ms: number; errorRatePercent: number; targetP95Ms: number; targetErrorPercent: number }) {
  const latencyOk = metrics.p95Ms <= metrics.targetP95Ms;
  const errorOk = metrics.errorRatePercent <= metrics.targetErrorPercent;
  return {
    ok: latencyOk && errorOk,
    latencyOk,
    errorOk,
    rating: latencyOk && errorOk ? 10 : latencyOk || errorOk ? 8 : 6
  };
}
