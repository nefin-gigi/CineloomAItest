import { invokeProductionControlledEndpoint } from './production-runtime';
import { estimateRevenueTokens } from './v3-production-data';

export type LiveStoryboardRequest = {
  script: string;
  style?: string;
  durationSeconds?: number;
  panels?: number;
  aspectRatio?: string;
  frameRate?: string;
  watermarked?: boolean;
  workspaceId?: string;
  projectId?: string;
  userId?: string;
  plan?: string;
  idempotencyKey?: string;
  correctionPrompt?: string;
  locks?: {
    character?: boolean;
    location?: boolean;
    style?: boolean;
    camera?: boolean;
    axis180?: boolean;
  };
};

export function validateStoryboardPayload(input: LiveStoryboardRequest) {
  const errors: string[] = [];
  const script = String(input.script ?? '').trim();
  const panels = Number(input.panels ?? 8);
  const durationSeconds = Number(input.durationSeconds ?? 10);
  if (!script) errors.push('script is required');
  if (script.length > Number(process.env.STORYBOARD_MAX_SCRIPT_CHARS ?? 12000)) errors.push('script exceeds STORYBOARD_MAX_SCRIPT_CHARS');
  if (!Number.isFinite(panels) || panels < 1 || panels > Number(process.env.STORYBOARD_MAX_PANELS_PER_REQUEST ?? 24)) errors.push('panels must be between 1 and STORYBOARD_MAX_PANELS_PER_REQUEST');
  if (!Number.isFinite(durationSeconds) || durationSeconds < 3 || durationSeconds > Number(process.env.STORYBOARD_MAX_SECONDS_PER_REQUEST ?? 90)) errors.push('durationSeconds must be between 3 and STORYBOARD_MAX_SECONDS_PER_REQUEST');
  return { valid: errors.length === 0, errors, script, panels, durationSeconds };
}

export function normalizeStoryboardProviderResponse(response: unknown) {
  if (!response || typeof response !== 'object') return { panels: [], assets: [], providerRaw: response };
  const record = response as Record<string, unknown>;
  const panels = Array.isArray(record.panels) ? record.panels : Array.isArray(record.storyboardPanels) ? record.storyboardPanels : [];
  const assets = Array.isArray(record.assets) ? record.assets : [];
  return {
    status: record.status ?? 'completed',
    jobId: record.jobId,
    panels,
    assets,
    storyboardPdfUrl: record.storyboardPdfUrl,
    animaticPreviewUrl: record.animaticPreviewUrl,
    tokenUsage: record.tokenUsage,
    providerRaw: response
  };
}

export async function generateLiveStoryboard(request: Request, input: LiveStoryboardRequest) {
  const validation = validateStoryboardPayload(input);
  if (!validation.valid) {
    return {
      httpStatus: 400,
      headers: {},
      body: { ok: false, status: 'invalid_storyboard_request', errors: validation.errors }
    };
  }

  const tokenEstimate = estimateRevenueTokens({ panels: validation.panels, corrections: input.correctionPrompt ? 1 : 0, animaticSeconds: validation.durationSeconds, exports: 0 });
  const workspaceId = String(input.workspaceId ?? 'guest');
  const projectId = String(input.projectId ?? 'free-sample');
  const idempotencyKey = String(input.idempotencyKey ?? `storyboard_${workspaceId}_${projectId}_${Date.now()}`);
  const endpointPayload = {
    mode: input.watermarked ? 'watermarked_preview' : 'paid_storyboard_generation',
    script: validation.script,
    style: input.style ?? 'cinematic_realism',
    durationSeconds: validation.durationSeconds,
    panels: validation.panels,
    aspectRatio: input.aspectRatio ?? '16:9',
    frameRate: input.frameRate ?? '24fps',
    watermarked: input.watermarked ?? true,
    tokenEstimate,
    userId: input.userId ?? 'anonymous',
    plan: input.plan ?? 'free_preview',
    correctionPrompt: input.correctionPrompt,
    locks: input.locks ?? { character: true, location: true, style: true, axis180: true }
  };

  const controlled = await invokeProductionControlledEndpoint(request, {
    stage: input.correctionPrompt ? 'storyboard_correct' : 'storyboard_generate',
    payload: endpointPayload,
    workspaceId,
    projectId,
    idempotencyKey,
    dryRun: false
  });

  const execution = controlled.result as Record<string, unknown>;
  const providerResponse = execution && 'response' in execution ? (execution as { response: unknown }).response : undefined;
  const normalized = normalizeStoryboardProviderResponse(providerResponse);
  const isQueued = normalized.status === 'queued' || Boolean(normalized.jobId);

  return {
    httpStatus: controlled.httpStatus === 200 && isQueued ? 202 : controlled.httpStatus,
    headers: controlled.headers,
    body: {
      ok: Boolean(execution.ok),
      status: isQueued ? 'queued' : execution.status ?? 'storyboard_endpoint_result',
      execution,
      result: normalized,
      tokenEstimate,
      endpointMode: execution.status,
      nextStep: isQueued ? `/api/jobs/status/${normalized.jobId}` : '/signup',
      productionContract: {
        endpointEnv: input.correctionPrompt ? 'EXEC_STORYBOARD_CORRECT_URL' : 'EXEC_STORYBOARD_GENERATE_URL',
        requiredResponseKeys: ['panels', 'assets'],
        supportsAsyncJob: true,
        supportsWatermark: true,
        supportsPromptCorrections: true,
        supportsContinuityLocks: true
      }
    }
  };
}
