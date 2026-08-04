import { createTraceContext } from './observability';

export type JobKind = 'script_pipeline' | 'storyboard_generation' | 'storyboard_correction' | 'animatic_generation' | 'export_render' | 'provider_health_check';
export type JobPriority = 'preview' | 'standard' | 'priority' | 'enterprise';
export type JobStatus = 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';

export type CineLoomJob = {
  jobId: string;
  kind: JobKind;
  priority: JobPriority;
  workspaceId: string;
  projectId?: string;
  idempotencyKey: string;
  status: JobStatus;
  payload: Record<string, unknown>;
  traceId: string;
  queuedAt: string;
  estimatedStartSeconds: number;
  callbackUrl?: string;
};

export function createJob(input: { kind: JobKind; priority?: JobPriority; workspaceId: string; projectId?: string; payload?: Record<string, unknown>; idempotencyKey?: string; callbackUrl?: string }): CineLoomJob {
  const trace = createTraceContext('job');
  return {
    jobId: `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    kind: input.kind,
    priority: input.priority ?? 'standard',
    workspaceId: input.workspaceId,
    projectId: input.projectId,
    idempotencyKey: input.idempotencyKey ?? `${input.kind}_${Date.now()}`,
    status: 'queued',
    payload: input.payload ?? {},
    traceId: trace.traceId,
    queuedAt: trace.startedAt,
    estimatedStartSeconds: input.priority === 'enterprise' ? 2 : input.priority === 'priority' ? 5 : input.priority === 'preview' ? 30 : 12,
    callbackUrl: input.callbackUrl
  };
}

export function jobStatus(jobId: string): CineLoomJob {
  return {
    jobId,
    kind: 'storyboard_generation',
    priority: 'standard',
    workspaceId: 'demo_workspace',
    projectId: 'demo_project',
    idempotencyKey: `lookup_${jobId}`,
    status: 'queued',
    payload: { message: 'Demo status. Connect QUEUE_ENDPOINT_URL for live worker state.' },
    traceId: `trace_${jobId}`,
    queuedAt: new Date().toISOString(),
    estimatedStartSeconds: 12
  };
}

export const workerContracts = [
  { kind: 'storyboard_generation', endpointEnv: 'WORKER_STORYBOARD_URL', maxRuntimeSeconds: 600, retryCount: 2, tokenPolicy: 'reserve_then_commit' },
  { kind: 'storyboard_correction', endpointEnv: 'WORKER_CORRECTION_URL', maxRuntimeSeconds: 420, retryCount: 2, tokenPolicy: 'reserve_then_commit' },
  { kind: 'animatic_generation', endpointEnv: 'WORKER_ANIMATIC_URL', maxRuntimeSeconds: 1200, retryCount: 1, tokenPolicy: 'reserve_then_commit' },
  { kind: 'export_render', endpointEnv: 'WORKER_EXPORT_URL', maxRuntimeSeconds: 900, retryCount: 2, tokenPolicy: 'deduct_on_success' }
];
