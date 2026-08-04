import { frontendEndpointActions, frontendActionGroups, getFrontendAction, getFrontendActionEnvTemplate, type FrontendEndpointAction } from './frontend-endpoint-registry';
import { getExecutionEndpointDefinition, getExecutionEndpointStatus, invokeExecutionEndpoint } from './execution-runtime';
import type { ExecutionStage } from './execution-endpoints';

function isConfigured(key: string) {
  const value = process.env[key];
  return Boolean(value && value.trim().length > 0);
}

function mask(value: string | undefined) {
  if (!value) return null;
  if (value.length <= 8) return `${value.slice(0, 1)}***`;
  return `${value.slice(0, 3)}••••${value.slice(-3)}`;
}

export function getFrontendActionStatus(action: FrontendEndpointAction) {
  const envChecks = action.requiredEnv.map((key) => ({ key, configured: isConfigured(key), maskedValue: mask(process.env[key]) }));
  const readyEnv = envChecks.filter((item) => item.configured).length;
  const backend = action.backendStages.map((stage) => {
    const definition = getExecutionEndpointDefinition(stage);
    return definition ? { stage, label: definition.label, health: getExecutionEndpointStatus(definition) } : { stage, label: stage, health: null };
  });
  const backendReady = backend.filter((item) => item.health?.ready).length;
  const requiredForLive = action.mode === 'endpoint_required' || action.mode === 'admin_only';
  const endpointReady = backend.length === 0 ? true : backendReady === backend.length;
  const ready = requiredForLive ? readyEnv === envChecks.length && endpointReady : readyEnv === envChecks.length || action.mode === 'navigation_only' || action.mode === 'track_only';
  return {
    actionKey: action.key,
    label: action.label,
    href: action.href,
    mode: action.mode,
    surface: action.surface,
    visibleTo: action.visibleTo,
    ready,
    status: ready ? 'ready' : readyEnv > 0 || backendReady > 0 ? 'partial' : 'demo',
    readinessPercent: Math.round(((readyEnv + backendReady) / Math.max(envChecks.length + backend.length, 1)) * 100),
    envChecks,
    missingEnv: envChecks.filter((item) => !item.configured).map((item) => item.key),
    backend,
    apiRoute: action.apiRoute,
    method: action.method,
    fallbackBehavior: action.fallbackBehavior,
    successResult: action.successResult
  };
}

export function getFrontendEndpointRouterHealth() {
  const actions = frontendEndpointActions.map((action) => ({ ...action, status: getFrontendActionStatus(action) }));
  const required = actions.filter((action) => action.mode === 'endpoint_required' || action.mode === 'admin_only');
  const readyRequired = required.filter((action) => action.status.ready).length;
  const publicActions = actions.filter((action) => action.surface === 'public_marketing' || action.surface === 'public_conversion');
  const readinessPercent = Math.round((actions.filter((action) => action.status.ready).length / Math.max(actions.length, 1)) * 100);
  const liveActionPercent = Math.round((readyRequired / Math.max(required.length, 1)) * 100);
  return {
    ok: true,
    status: liveActionPercent === 100 ? 'plug_and_play_ready' : liveActionPercent >= 60 ? 'partially_configured' : 'staging_demo_mode',
    readinessPercent,
    liveActionPercent,
    actionCount: actions.length,
    requiredActionCount: required.length,
    readyRequiredActionCount: readyRequired,
    publicActionCount: publicActions.length,
    groups: frontendActionGroups.map((group) => ({
      ...group,
      actions: group.actions.map((key) => actions.find((action) => action.key === key)).filter(Boolean)
    })),
    actions,
    envTemplate: getFrontendActionEnvTemplate()
  };
}

export async function testFrontendAction(actionKey: string, options?: { dryRun?: boolean; payload?: Record<string, unknown>; live?: boolean }) {
  const action = getFrontendAction(actionKey);
  if (!action) return { ok: false, status: 'unknown_action', message: `Unknown frontend action: ${actionKey}` };
  const status = getFrontendActionStatus(action);
  const payload = options?.payload ?? action.samplePayload;
  const dryRun = options?.dryRun ?? true;
  const endpointResults = [];
  for (const stage of action.backendStages as ExecutionStage[]) {
    endpointResults.push(await invokeExecutionEndpoint({
      stage,
      payload: { ...payload, frontendActionKey: action.key, href: action.href, sourceApiRoute: action.apiRoute },
      dryRun,
      idempotencyKey: `frontend_${action.key}_${stage}_${Date.now()}`
    }));
  }
  return {
    ok: dryRun ? true : endpointResults.every((item) => Boolean((item as { ok?: boolean }).ok)),
    status: dryRun ? 'dry_run_complete' : status.ready ? 'configured_or_live_checked' : 'missing_configuration',
    action: { key: action.key, label: action.label, href: action.href, apiRoute: action.apiRoute, method: action.method, mode: action.mode },
    statusSummary: status,
    payloadPreview: payload,
    endpointResults,
    message: dryRun
      ? 'Frontend action dry run complete. UI action, API route, endpoint chain, sample payload, and fallback behavior are documented.'
      : status.ready
        ? 'Frontend action has required configuration. Live provider calls depend on EXECUTION_ENDPOINT_TEST_MODE=live.'
        : 'Frontend action is not fully configured yet. Add the missing Vercel environment variables and redeploy.'
  };
}
