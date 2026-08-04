import { invokeProductionControlledEndpoint } from './production-runtime';

export type LiveExportRequest = {
  projectId: string;
  workspaceId?: string;
  userId?: string;
  exportTypes?: string[];
  watermark?: boolean;
  idempotencyKey?: string;
  delivery?: 'signed_urls' | 'zip' | 'both';
};

const allowedExportTypes = new Set(['storyboard_pdf', 'shot_list_csv', 'prompt_json', 'qa_pdf', 'animatic_mp4', 'zip', 'character_bible_pdf', 'location_bible_pdf', 'director_package']);

export function validateExportPayload(input: LiveExportRequest) {
  const errors: string[] = [];
  const projectId = String(input.projectId ?? '').trim();
  const exportTypes = (input.exportTypes?.length ? input.exportTypes : ['storyboard_pdf', 'shot_list_csv', 'prompt_json', 'qa_pdf', 'animatic_mp4', 'zip']).filter(Boolean);
  if (!projectId) errors.push('projectId is required');
  const invalidTypes = exportTypes.filter((item) => !allowedExportTypes.has(item));
  if (invalidTypes.length) errors.push(`Unsupported export type(s): ${invalidTypes.join(', ')}`);
  if (exportTypes.length > Number(process.env.EXPORT_MAX_TYPES_PER_REQUEST ?? 10)) errors.push('Too many export types requested');
  return { valid: errors.length === 0, errors, projectId, exportTypes };
}

export function normalizeExportProviderResponse(response: unknown) {
  if (!response || typeof response !== 'object') return { files: [], providerRaw: response };
  const record = response as Record<string, unknown>;
  const files = Array.isArray(record.files) ? record.files : Array.isArray(record.assets) ? record.assets : [];
  return {
    status: record.status ?? 'completed',
    jobId: record.jobId,
    files,
    packageUrl: record.packageUrl,
    signedUrls: record.signedUrls,
    expiresAt: record.expiresAt,
    providerRaw: response
  };
}

export async function generateLiveExportPackage(request: Request, input: LiveExportRequest) {
  const validation = validateExportPayload(input);
  if (!validation.valid) return { httpStatus: 400, headers: {}, body: { ok: false, status: 'invalid_export_request', errors: validation.errors } };

  const workspaceId = String(input.workspaceId ?? 'demo');
  const idempotencyKey = String(input.idempotencyKey ?? `export_${workspaceId}_${validation.projectId}_${Date.now()}`);
  const controlled = await invokeProductionControlledEndpoint(request, {
    stage: 'export_package',
    payload: {
      projectId: validation.projectId,
      workspaceId,
      userId: input.userId ?? 'anonymous',
      exportTypes: validation.exportTypes,
      watermark: Boolean(input.watermark ?? false),
      delivery: input.delivery ?? 'both',
      requirePrivateOutputs: process.env.RENDER_REQUIRE_PRIVATE_OUTPUTS !== 'false',
      signedUrlTtlSeconds: Number(process.env.PRIVATE_EXPORT_SIGNED_URL_TTL_SECONDS ?? 900)
    },
    projectId: validation.projectId,
    workspaceId,
    idempotencyKey,
    dryRun: false
  });

  const execution = controlled.result as Record<string, unknown>;
  const providerResponse = execution && 'response' in execution ? (execution as { response: unknown }).response : undefined;
  const normalized = normalizeExportProviderResponse(providerResponse);
  const isQueued = normalized.status === 'queued' || Boolean(normalized.jobId);

  return {
    httpStatus: controlled.httpStatus === 200 && isQueued ? 202 : controlled.httpStatus,
    headers: controlled.headers,
    body: {
      ok: Boolean(execution.ok),
      status: isQueued ? 'queued' : execution.status ?? 'export_endpoint_result',
      execution,
      result: normalized,
      nextStep: isQueued ? `/api/jobs/status/${normalized.jobId}` : '/studio/exports',
      productionContract: {
        endpointEnv: 'EXEC_EXPORT_PACKAGE_URL or RENDER_WORKER_URL',
        requiredResponseKeys: ['files', 'packageUrl'],
        supportsAsyncJob: true,
        requiresPrivateOutput: true,
        signedDownloads: true
      }
    }
  };
}
