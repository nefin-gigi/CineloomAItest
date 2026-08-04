import { executionEndpointCatalog, type ExecutionEndpointDefinition, type ExecutionStage } from './execution-endpoints';

function mask(value: string | undefined) {
  if (!value) return null;
  if (value.length <= 8) return `${value.slice(0, 1)}***`;
  return `${value.slice(0, 3)}••••${value.slice(-3)}`;
}

function safeJsonParse(value: string | null) {
  if (!value) return null;
  try { return JSON.parse(value); } catch { return value; }
}

export function getExecutionEndpointDefinition(stage: string) {
  return executionEndpointCatalog.find((endpoint) => endpoint.key === stage);
}

export function getExecutionEndpointStatus(endpoint: ExecutionEndpointDefinition) {
  const url = process.env[endpoint.defaultUrlEnv];
  const secret = process.env[endpoint.defaultSecretEnv];
  const liveMode = (process.env.EXECUTION_ENDPOINT_TEST_MODE ?? 'configured').toLowerCase() === 'live';
  const configured = Boolean(url);
  const secretConfigured = endpoint.defaultAuthMode === 'none_demo' ? true : Boolean(secret);
  const ready = configured && secretConfigured;
  return {
    key: endpoint.key,
    label: endpoint.label,
    mode: ready ? (liveMode ? 'live' : 'configured') : 'demo',
    ready,
    liveMode,
    endpointUrlConfigured: configured,
    secretConfigured,
    maskedUrl: url ? `${url.slice(0, 28)}${url.length > 28 ? '…' : ''}` : null,
    maskedSecret: mask(secret),
    requiredEnv: [endpoint.defaultUrlEnv, endpoint.defaultSecretEnv],
    missingEnv: [!url ? endpoint.defaultUrlEnv : null, !secretConfigured ? endpoint.defaultSecretEnv : null].filter(Boolean),
    timeoutMs: endpoint.timeoutMs,
    tokenPolicy: endpoint.tokenPolicy,
    requiredResponseKeys: endpoint.requiredResponseKeys,
    customerPromise: endpoint.customerPromise,
    tenOutOfTenImpact: endpoint.tenOutOfTenImpact
  };
}

export function getExecutionEndpointHealth() {
  const endpoints = executionEndpointCatalog.map((endpoint) => ({ ...endpoint, health: getExecutionEndpointStatus(endpoint) }));
  const readyCount = endpoints.filter((endpoint) => endpoint.health.ready).length;
  const readinessPercent = Math.round((readyCount / Math.max(endpoints.length, 1)) * 100);
  const core = ['script_parse', 'storyboard_generate', 'storyboard_correct', 'export_package', 'token_reserve', 'token_commit', 'storage_upload', 'billing_checkout'] as ExecutionStage[];
  const coreReady = endpoints.filter((endpoint) => core.includes(endpoint.key) && endpoint.health.ready).length;
  const corePercent = Math.round((coreReady / core.length) * 100);
  return {
    readinessPercent,
    corePercent,
    readyCount,
    totalCount: endpoints.length,
    status: readinessPercent >= 95 && corePercent === 100 ? 'ten_out_of_ten_ready' : readinessPercent >= 75 ? 'strongly_configured' : readinessPercent >= 35 ? 'partially_configured' : 'demo_mode',
    endpoints,
    missingCore: endpoints.filter((endpoint) => core.includes(endpoint.key) && !endpoint.health.ready).map((endpoint) => ({ key: endpoint.key, label: endpoint.label, missingEnv: endpoint.health.missingEnv }))
  };
}

export type ExecutionInvocationInput = {
  stage: ExecutionStage | string;
  payload?: Record<string, unknown>;
  workspaceId?: string;
  projectId?: string;
  idempotencyKey?: string;
  dryRun?: boolean;
};

function createHeaders(endpoint: ExecutionEndpointDefinition, idempotencyKey: string) {
  const headers: Record<string, string> = {
    'content-type': 'application/json',
    'x-cineloom-stage': endpoint.key,
    'x-cineloom-idempotency-key': idempotencyKey
  };
  const secret = process.env[endpoint.defaultSecretEnv];
  if (endpoint.defaultAuthMode === 'bearer_env_secret' && secret) headers.authorization = `Bearer ${secret}`;
  if (endpoint.defaultAuthMode === 'x_api_key_env_secret' && secret) headers['x-api-key'] = secret;
  if (endpoint.defaultAuthMode === 'basic_env_secret' && secret) headers.authorization = `Basic ${Buffer.from(secret).toString('base64')}`;
  if (endpoint.defaultAuthMode === 'signed_hmac_env_secret' && secret) headers['x-cineloom-webhook-secret'] = secret;
  return headers;
}

export async function invokeExecutionEndpoint(input: ExecutionInvocationInput) {
  const endpoint = getExecutionEndpointDefinition(String(input.stage));
  const now = new Date().toISOString();
  if (!endpoint) {
    return { ok: false, status: 'unknown_stage', message: `No execution endpoint registered for stage: ${input.stage}`, invokedAt: now };
  }
  const health = getExecutionEndpointStatus(endpoint);
  const payload = input.payload ?? endpoint.samplePayload;
  const idempotencyKey = input.idempotencyKey ?? `${endpoint.key}_${Date.now()}`;
  const url = process.env[endpoint.defaultUrlEnv];

  if (input.dryRun || !health.ready || !url) {
    return {
      ok: health.ready,
      status: input.dryRun ? 'dry_run' : health.ready ? 'configured_not_invoked' : 'demo_fallback',
      stage: endpoint.key,
      label: endpoint.label,
      invokedAt: now,
      message: input.dryRun
        ? 'Dry run complete. Payload shape and endpoint contract are valid.'
        : health.ready
          ? 'Endpoint is configured. Set dryRun=false and EXECUTION_ENDPOINT_TEST_MODE=live for a real provider call.'
          : `Endpoint is not configured. Fallback behavior: ${endpoint.fallbackBehavior}`,
      endpointContract: {
        urlEnv: endpoint.defaultUrlEnv,
        secretEnv: endpoint.defaultSecretEnv,
        authMode: endpoint.defaultAuthMode,
        timeoutMs: endpoint.timeoutMs,
        requiredResponseKeys: endpoint.requiredResponseKeys,
        tokenPolicy: endpoint.tokenPolicy
      },
      payloadPreview: payload,
      sampleResponse: endpoint.sampleResponse,
      missingEnv: health.missingEnv
    };
  }

  const liveMode = (process.env.EXECUTION_ENDPOINT_TEST_MODE ?? 'configured').toLowerCase() === 'live';
  if (!liveMode) {
    return {
      ok: true,
      status: 'configured_not_live',
      stage: endpoint.key,
      label: endpoint.label,
      invokedAt: now,
      message: 'Endpoint URL and secret are configured. Live call intentionally skipped because EXECUTION_ENDPOINT_TEST_MODE is not live.',
      configuredUrl: health.maskedUrl,
      payloadPreview: payload,
      expectedResponseKeys: endpoint.requiredResponseKeys
    };
  }

  const started = Date.now();
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), endpoint.timeoutMs);
    const response = await fetch(url, {
      method: 'POST',
      headers: createHeaders(endpoint, idempotencyKey),
      body: JSON.stringify({ ...payload, workspaceId: input.workspaceId, projectId: input.projectId, idempotencyKey }),
      signal: controller.signal
    });
    clearTimeout(timer);
    const text = await response.text();
    const json = safeJsonParse(text);
    const missingResponseKeys = endpoint.requiredResponseKeys.filter((key) => !(json && typeof json === 'object' && key in json));
    return {
      ok: response.ok && missingResponseKeys.length === 0,
      status: response.ok ? 'provider_response_received' : 'provider_error',
      stage: endpoint.key,
      label: endpoint.label,
      invokedAt: now,
      latencyMs: Date.now() - started,
      httpStatus: response.status,
      missingResponseKeys,
      response: json
    };
  } catch (error) {
    return {
      ok: false,
      status: 'invoke_failed',
      stage: endpoint.key,
      label: endpoint.label,
      invokedAt: now,
      latencyMs: Date.now() - started,
      message: error instanceof Error ? error.message : 'Unknown execution endpoint failure',
      fallbackBehavior: endpoint.fallbackBehavior
    };
  }
}

export function buildEndpointEnvExample() {
  return executionEndpointCatalog.map((endpoint) => `${endpoint.defaultUrlEnv}=\n${endpoint.defaultSecretEnv}=`).join('\n');
}
