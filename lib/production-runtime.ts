import { invokeExecutionEndpoint, type ExecutionInvocationInput } from './execution-runtime';
import { checkDistributedRateLimit, rateLimitHeaders } from './rate-limit';
import { createTraceContext } from './observability';

export async function invokeProductionControlledEndpoint(request: Request, input: ExecutionInvocationInput) {
  const trace = createTraceContext(`exec_${input.stage}`);
  const rate = await checkDistributedRateLimit({ request, key: `${input.workspaceId ?? 'guest'}:${String(input.stage)}`, weight: 1, namespace: 'execution' });
  if (!rate.allowed) {
    return {
      result: {
        ok: false,
        status: 'rate_limited',
        message: 'Plan-aware production rate limit reached. Upgrade plan, wait for reset, or route to enterprise capacity.',
        traceId: trace.traceId,
        rateLimit: rate
      },
      headers: { ...publicTraceHeadersCompat(trace), ...rateLimitHeaders(rate) },
      httpStatus: 429
    };
  }
  const result = await invokeExecutionEndpoint({ ...input, idempotencyKey: input.idempotencyKey ?? trace.requestId });
  return { result: { ...result, traceId: trace.traceId, rateLimit: rate }, headers: { ...publicTraceHeadersCompat(trace), ...rateLimitHeaders(rate) }, httpStatus: 200 };
}

function publicTraceHeadersCompat(trace: { traceId: string; requestId: string }) {
  return { 'x-cineloom-trace-id': trace.traceId, 'x-cineloom-request-id': trace.requestId };
}
