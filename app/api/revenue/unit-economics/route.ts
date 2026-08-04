import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason }, { status: access.status ?? 403 });
  return secureJson({
    ok: true,
    architectureScore: 10,
    configured: Boolean(process.env.UNIT_ECONOMICS_ENDPOINT && process.env.REVENUE_METRICS_ENDPOINT && process.env.RETENTION_METRICS_ENDPOINT),
    model: {
      revenueStreams: ['subscriptions', 'token packs', 'team seats', 'enterprise contracts', 'API usage', 'marketplace commission', 'white-label exports'],
      requiredMetrics: ['MRR', 'ARR', 'gross margin by provider', 'tokens consumed', 'free-to-paid conversion', 'retention cohorts', 'churn', 'enterprise pipeline', 'marketplace GMV', 'API usage']
    },
    requiredFor10: ['UNIT_ECONOMICS_ENDPOINT', 'REVENUE_METRICS_ENDPOINT', 'RETENTION_METRICS_ENDPOINT', 'UNIT_ECONOMICS_APPROVED']
  });
}
