import { planRateLimits, type ProductionScaleTier } from './production-scale';

export type RateLimitProvider = 'memory' | 'external' | 'upstash' | 'redis_rest';

export type RateLimitDecision = {
  allowed: boolean;
  tier: ProductionScaleTier;
  limit: number;
  remaining: number;
  resetSeconds: number;
  reason: string;
  provider?: RateLimitProvider;
  key?: string;
  retryAfterSeconds?: number;
  failClosed?: boolean;
};

const memoryBuckets = new Map<string, { count: number; resetAt: number }>();

function boolEnv(name: string, fallback = false) {
  const value = process.env[name];
  if (value == null) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function getClientIp(request: Request) {
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'local'
  );
}

function normalizeProvider(value?: string): RateLimitProvider {
  const provider = (value ?? process.env.RATE_LIMIT_PROVIDER ?? 'memory').toLowerCase().replace('-', '_');
  if (provider === 'upstash') return 'upstash';
  if (provider === 'redis' || provider === 'redis_rest' || provider === 'redis-rest') return 'redis_rest';
  if (provider === 'external' || provider === 'endpoint') return 'external';
  return 'memory';
}

export function getTierFromRequest(request: Request): ProductionScaleTier {
  const url = new URL(request.url);
  const tier = request.headers.get('x-cineloom-plan') ?? url.searchParams.get('plan') ?? 'free_preview';
  if (tier in planRateLimits) return tier as ProductionScaleTier;
  return 'free_preview';
}

export function buildRateLimitKey(input: { request: Request; key?: string; tier: ProductionScaleTier; namespace?: string }) {
  const ip = getClientIp(input.request);
  const workspaceId = input.request.headers.get('x-cineloom-workspace-id') ?? 'guest';
  const userId = input.request.headers.get('x-cineloom-user-id') ?? 'anonymous';
  const namespace = input.namespace ?? 'api';
  return input.key ?? `${namespace}:${input.tier}:${workspaceId}:${userId}:${ip}`;
}

export function checkRateLimit(input: { request: Request; key?: string; tier?: ProductionScaleTier; weight?: number; namespace?: string }): RateLimitDecision {
  const tier = input.tier ?? getTierFromRequest(input.request);
  const limit = planRateLimits[tier].rpm;
  const weight = Math.max(0, input.weight ?? 1);
  const key = buildRateLimitKey({ request: input.request, key: input.key, tier, namespace: input.namespace });
  const now = Date.now();
  const resetAt = Math.floor(now / 60000) * 60000 + 60000;
  const current = memoryBuckets.get(key);
  const bucket = !current || current.resetAt <= now ? { count: 0, resetAt } : current;
  const nextCount = bucket.count + weight;
  const allowed = nextCount <= limit;
  if (allowed) memoryBuckets.set(key, { count: nextCount, resetAt: bucket.resetAt });
  return {
    allowed,
    tier,
    limit,
    remaining: Math.max(0, limit - (allowed ? nextCount : bucket.count)),
    resetSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    reason: allowed ? 'within_plan_limit_memory' : 'rate_limit_exceeded_memory',
    provider: 'memory',
    key
  };
}

async function checkExternalRateLimit(input: { request: Request; key: string; tier: ProductionScaleTier; limit: number; weight: number; resetSeconds: number }): Promise<RateLimitDecision> {
  const endpoint = process.env.RATE_LIMIT_ENDPOINT_URL;
  const secret = process.env.RATE_LIMIT_ENDPOINT_SECRET;
  if (!endpoint) throw new Error('RATE_LIMIT_ENDPOINT_URL is not configured');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(secret ? { authorization: `Bearer ${secret}` } : {})
    },
    body: JSON.stringify({
      key: input.key,
      tier: input.tier,
      limit: input.limit,
      weight: input.weight,
      windowSeconds: input.resetSeconds,
      requestPath: new URL(input.request.url).pathname,
      requestId: input.request.headers.get('x-cineloom-request-id')
    })
  });
  const json = await response.json().catch(() => ({}));
  return {
    allowed: Boolean(json.allowed ?? response.ok),
    tier: input.tier,
    limit: Number(json.limit ?? input.limit),
    remaining: Number(json.remaining ?? 0),
    resetSeconds: Number(json.resetSeconds ?? input.resetSeconds),
    retryAfterSeconds: Number(json.retryAfterSeconds ?? json.resetSeconds ?? input.resetSeconds),
    reason: String(json.reason ?? (response.ok ? 'within_plan_limit_external' : 'external_rate_limiter_rejected')),
    provider: 'external',
    key: input.key
  };
}

async function checkUpstashRedisRateLimit(input: { key: string; tier: ProductionScaleTier; limit: number; weight: number; resetSeconds: number }): Promise<RateLimitDecision> {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.REDIS_REST_TOKEN;
  if (!url || !token) throw new Error('UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN or REDIS_REST_URL/REDIS_REST_TOKEN is not configured');

  const redisKey = `cineloom:rl:${input.key}`;
  const script = `
local current = redis.call('INCRBY', KEYS[1], ARGV[1])
if current == tonumber(ARGV[1]) then
  redis.call('EXPIRE', KEYS[1], ARGV[2])
end
local ttl = redis.call('TTL', KEYS[1])
return {current, ttl}
`;
  const response = await fetch(`${url.replace(/\/$/, '')}/eval`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify([script, 1, redisKey, String(input.weight), String(input.resetSeconds)])
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`Redis rate limiter failed: ${response.status}`);
  const result = Array.isArray(json.result) ? json.result : [0, input.resetSeconds];
  const count = Number(result[0] ?? 0);
  const ttl = Math.max(1, Number(result[1] ?? input.resetSeconds));
  const allowed = count <= input.limit;
  return {
    allowed,
    tier: input.tier,
    limit: input.limit,
    remaining: Math.max(0, input.limit - count),
    resetSeconds: ttl,
    retryAfterSeconds: ttl,
    reason: allowed ? 'within_plan_limit_redis' : 'rate_limit_exceeded_redis',
    provider: normalizeProvider(process.env.RATE_LIMIT_PROVIDER),
    key: input.key
  };
}

export async function checkDistributedRateLimit(input: { request: Request; key?: string; tier?: ProductionScaleTier; weight?: number; namespace?: string }): Promise<RateLimitDecision> {
  const tier = input.tier ?? getTierFromRequest(input.request);
  const limit = planRateLimits[tier].rpm;
  const weight = Math.max(0, input.weight ?? 1);
  const key = buildRateLimitKey({ request: input.request, key: input.key, tier, namespace: input.namespace });
  const provider = normalizeProvider();
  const failClosed = boolEnv('RATE_LIMIT_FAIL_CLOSED', boolEnv('PAID_LAUNCH_ENABLED', false));
  const resetSeconds = Number(process.env.RATE_LIMIT_WINDOW_SECONDS ?? 60);

  if (provider === 'external') {
    try { return await checkExternalRateLimit({ request: input.request, key, tier, limit, weight, resetSeconds }); }
    catch (error) { return fallbackRateLimitDecision({ input, tier, limit, key, provider, failClosed, error }); }
  }

  if (provider === 'upstash' || provider === 'redis_rest') {
    try { return await checkUpstashRedisRateLimit({ key, tier, limit, weight, resetSeconds }); }
    catch (error) { return fallbackRateLimitDecision({ input, tier, limit, key, provider, failClosed, error }); }
  }

  return checkRateLimit({ ...input, tier, key });
}

function fallbackRateLimitDecision(args: { input: { request: Request; key?: string; tier?: ProductionScaleTier; weight?: number; namespace?: string }; tier: ProductionScaleTier; limit: number; key: string; provider: RateLimitProvider; failClosed: boolean; error: unknown }): RateLimitDecision {
  if (args.failClosed) {
    return {
      allowed: false,
      tier: args.tier,
      limit: args.limit,
      remaining: 0,
      resetSeconds: 60,
      retryAfterSeconds: 60,
      reason: `distributed_rate_limiter_unavailable_fail_closed:${args.error instanceof Error ? args.error.message : 'unknown'}`,
      provider: args.provider,
      key: args.key,
      failClosed: true
    };
  }
  const memory = checkRateLimit({ ...args.input, tier: args.tier, key: args.key });
  return { ...memory, reason: `distributed_rate_limiter_unavailable_memory_fallback:${args.error instanceof Error ? args.error.message : 'unknown'}`, provider: 'memory', failClosed: false };
}

export function rateLimitHeaders(decision: RateLimitDecision) {
  return {
    'x-ratelimit-tier': decision.tier,
    'x-ratelimit-limit': String(decision.limit),
    'x-ratelimit-remaining': String(decision.remaining),
    'x-ratelimit-reset-seconds': String(decision.resetSeconds),
    'x-ratelimit-provider': decision.provider ?? 'memory',
    ...(decision.retryAfterSeconds && !decision.allowed ? { 'retry-after': String(decision.retryAfterSeconds) } : {})
  };
}
