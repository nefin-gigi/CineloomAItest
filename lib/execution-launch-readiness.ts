import { getExecutionEndpointStatus, getExecutionEndpointDefinition } from './execution-runtime';

const criticalExecutionItems = [
  {
    id: 'live-storyboard-generation',
    label: 'Live storyboard generation endpoint',
    stage: 'storyboard_generate',
    env: ['EXEC_STORYBOARD_GENERATE_URL', 'EXEC_STORYBOARD_GENERATE_SECRET'],
    customerImpact: 'Users can generate real 10-second samples and paid storyboard panels from their own scripts.'
  },
  {
    id: 'live-export-generation',
    label: 'Live export generation endpoint',
    stage: 'export_package',
    env: ['EXEC_EXPORT_PACKAGE_URL', 'EXEC_EXPORT_PACKAGE_SECRET'],
    customerImpact: 'Paid users can generate real storyboard PDFs, CSVs, prompt packages, MP4 animatics, and ZIP exports.'
  },
  {
    id: 'redis-rate-limits',
    label: 'Redis-backed distributed rate limiting',
    stage: null,
    env: ['RATE_LIMIT_PROVIDER', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
    alternatives: ['RATE_LIMIT_ENDPOINT_URL', 'RATE_LIMIT_ENDPOINT_SECRET'],
    customerImpact: 'Free generation, paid generation, exports, and jobs remain protected across Vercel/serverless instances.'
  }
] as const;

export function buildExecutionLaunchReadiness() {
  const items = criticalExecutionItems.map((item) => {
    if (item.stage) {
      const definition = getExecutionEndpointDefinition(item.stage);
      const status = definition ? getExecutionEndpointStatus(definition) : null;
      return {
        ...item,
        ready: Boolean(status?.ready),
        status: status?.mode ?? 'missing',
        missingEnv: status?.missingEnv ?? item.env,
        endpoint: status
      };
    }
    const provider = (process.env.RATE_LIMIT_PROVIDER ?? 'memory').toLowerCase();
    const hasUpstash = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
    const hasExternal = Boolean(process.env.RATE_LIMIT_ENDPOINT_URL && process.env.RATE_LIMIT_ENDPOINT_SECRET);
    const ready = provider !== 'memory' && (hasUpstash || hasExternal || Boolean(process.env.REDIS_REST_URL && process.env.REDIS_REST_TOKEN));
    const missingEnv = ready ? [] : ['RATE_LIMIT_PROVIDER=upstash|external', 'UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN or RATE_LIMIT_ENDPOINT_URL/RATE_LIMIT_ENDPOINT_SECRET'];
    return { ...item, ready, status: ready ? 'configured' : 'missing', missingEnv, provider };
  });
  const readyCount = items.filter((item) => item.ready).length;
  const readinessPercent = Math.round((readyCount / items.length) * 100);
  return {
    version: '4.5',
    readinessPercent,
    readyCount,
    totalCount: items.length,
    allReady: readyCount === items.length,
    items,
    acceptanceCriteria: [
      'POST /api/storyboard/free-sample calls EXEC_STORYBOARD_GENERATE_URL through production controls.',
      'POST /api/storyboard/generate-live supports paid and watermarked storyboard generation plus correction mode.',
      'GET /api/export/package and POST /api/export/generate-live call EXEC_EXPORT_PACKAGE_URL through production controls.',
      'Production execution uses distributed Redis/external rate limits instead of in-memory limits.',
      'Rate limiter can fail closed for paid launch by setting RATE_LIMIT_FAIL_CLOSED=true.'
    ]
  };
}
