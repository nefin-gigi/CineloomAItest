import { NextResponse } from 'next/server';
import { checkDistributedRateLimit, rateLimitHeaders } from '@/lib/rate-limit';

export async function GET(request: Request) {
  const decision = await checkDistributedRateLimit({ request, key: `status:${request.headers.get('x-forwarded-for') ?? 'local'}`, weight: 0, namespace: 'status' });
  return NextResponse.json({
    ok: true,
    provider: decision.provider,
    failClosed: decision.failClosed ?? false,
    rateLimit: decision,
    productionGuidance: 'Set RATE_LIMIT_PROVIDER=upstash with UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN, or RATE_LIMIT_PROVIDER=external with RATE_LIMIT_ENDPOINT_URL.'
  }, { headers: rateLimitHeaders(decision) });
}
