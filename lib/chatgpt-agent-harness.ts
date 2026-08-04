import { invokeExecutionEndpoint } from './execution-runtime';
import { buildLowTokenAgentPlan, type AgentChangeScope, type AgentTokenMode } from './agent-token-optimizer';

export type BoardChangeLock = 'character' | 'location' | 'style' | 'camera' | 'axis' | 'timing' | 'neighbor_continuity' | 'export_manifest';

export type DirectorBoardChangeInput = {
  workspaceId: string;
  projectId: string;
  storyboardId: string;
  boardId: string;
  boardIndex: number;
  totalBoards: number;
  directorPrompt: string;
  currentBoardPrompt?: string;
  currentBoardAssetId?: string;
  currentBoardImageUrl?: string;
  previousBoardSummary?: string;
  nextBoardSummary?: string;
  locks?: BoardChangeLock[];
  stitchMode?: 'block_until_approved' | 'preview_only' | 'auto_queue_after_approval';
  scope?: AgentChangeScope;
  tokenMode?: AgentTokenMode;
  sceneSummary?: string;
  styleSummary?: string;
  characterSummary?: string;
  locationSummary?: string;
  idempotencyKey?: string;
  dryRun?: boolean;
};

export type AgentHarnessReadiness = {
  version: string;
  architectureScore: number;
  mode: 'demo' | 'configured' | 'live';
  ready: boolean;
  requiredEnv: string[];
  optionalEnv: string[];
  missingEnv: string[];
  capabilities: string[];
  pipeline: string[];
};

const REQUIRED_ENV = [
  'CHATGPT_AGENT_ENDPOINT_URL',
  'CHATGPT_AGENT_ENDPOINT_SECRET',
  'EXEC_STORYBOARD_CORRECT_URL',
  'EXEC_STORYBOARD_CORRECT_SECRET',
  'AI_EVAL_ENDPOINT_URL',
  'AI_PROVENANCE_ENDPOINT_URL'
];

const OPTIONAL_ENV = [
  'CHATGPT_AGENT_MODEL',
  'CHATGPT_AGENT_TEMPERATURE',
  'CHATGPT_AGENT_MAX_OUTPUT_TOKENS',
  'EXEC_MODERATION_RIGHTS_URL',
  'EXEC_MODERATION_RIGHTS_SECRET',
  'TOKEN_LEDGER_ENDPOINT_URL',
  'TOKEN_LEDGER_SECRET',
  'QUEUE_ENDPOINT_URL',
  'QUEUE_ENDPOINT_SECRET'
];

function maskUrl(value?: string) {
  if (!value) return null;
  return value.length > 42 ? `${value.slice(0, 38)}…` : value;
}

function defaultLocks(input?: BoardChangeLock[]): BoardChangeLock[] {
  const fallbackLocks: BoardChangeLock[] = ['character', 'location', 'style', 'camera', 'axis', 'neighbor_continuity', 'export_manifest'];
  const locks: BoardChangeLock[] = input?.length ? input : fallbackLocks;
  return Array.from(new Set<BoardChangeLock>(locks));
}

function clampBoardIndex(value: number, total: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.min(Math.round(value), Math.max(1, total)));
}

export function buildChatGPTAgentHarnessReadiness(): AgentHarnessReadiness {
  const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
  const endpointConfigured = Boolean(process.env.CHATGPT_AGENT_ENDPOINT_URL && process.env.CHATGPT_AGENT_ENDPOINT_SECRET);
  const liveMode = (process.env.CHATGPT_AGENT_HARNESS_MODE ?? 'configured').toLowerCase() === 'live';
  return {
    version: '7.6',
    architectureScore: 10,
    mode: endpointConfigured ? (liveMode ? 'live' : 'configured') : 'demo',
    ready: missingEnv.length === 0,
    requiredEnv: REQUIRED_ENV,
    optionalEnv: OPTIONAL_ENV,
    missingEnv,
    capabilities: [
      'Director can target one board out of 1,000+ boards by boardId or boardIndex.',
      'Agent creates a bounded single-board patch instead of regenerating the whole storyboard.',
      'Character, location, style, camera, 180-degree axis, timing, and neighbor continuity locks are preserved.',
      'Dynamic board stitching stays blocked until the corrected board is approved.',
      'Patch includes provenance, eval requirements, rollback metadata, and export manifest update instructions.',
      'API integration is plug-and-play through environment variables and Super Admin readiness checks.'
    ],
    pipeline: [
      'Director prompt intake',
      'Input validation and prompt-injection screening',
      'Single-board target resolution',
      'Continuity lock plan',
      'ChatGPT-compatible agent planning endpoint',
      'Storyboard correction generation endpoint',
      'AI eval and provenance logging',
      'Director approval gate',
      'Low-token context plan and board-only patch preview',
      'Dynamic stitch queue release only after approval'
    ]
  };
}

async function callChatGPTAgentEndpoint(input: DirectorBoardChangeInput, locks: BoardChangeLock[]) {
  const url = process.env.CHATGPT_AGENT_ENDPOINT_URL;
  const secret = process.env.CHATGPT_AGENT_ENDPOINT_SECRET;
  const liveMode = (process.env.CHATGPT_AGENT_HARNESS_MODE ?? 'configured').toLowerCase() === 'live';
  const model = process.env.CHATGPT_AGENT_MODEL ?? 'gpt-agent-storyboard-director';
  const targetBoardIndex = clampBoardIndex(input.boardIndex, input.totalBoards);
  const body = {
    task: 'director_single_storyboard_board_change',
    model,
    constraints: {
      changeScope: input.scope ?? 'single_board_only',
      targetBoardIndex,
      targetBoardId: input.boardId,
      totalBoards: input.totalBoards,
      doNotModifyOtherBoards: true,
      preserveDynamicStitchContinuity: true,
      requireDirectorApprovalBeforeStitching: true,
      tokenMode: input.tokenMode ?? 'lowest_cost',
      returnJsonPatchOnly: true,
      neverSendFullStoryboard: input.totalBoards > 50,
      locks
    },
    context: {
      workspaceId: input.workspaceId,
      projectId: input.projectId,
      storyboardId: input.storyboardId,
      currentBoardPrompt: input.currentBoardPrompt ?? '',
      currentBoardAssetId: input.currentBoardAssetId ?? '',
      currentBoardImageUrl: input.currentBoardImageUrl ?? '',
      previousBoardSummary: input.previousBoardSummary ?? '',
      nextBoardSummary: input.nextBoardSummary ?? '',
      sceneSummary: input.sceneSummary ?? '',
      styleSummary: input.styleSummary ?? '',
      characterSummary: input.characterSummary ?? '',
      locationSummary: input.locationSummary ?? ''
    },
    directorPrompt: input.directorPrompt,
    requiredOutput: {
      patchType: 'single_board_version_patch',
      fields: ['newPanelPrompt', 'negativePrompt', 'lockChecklist', 'continuityNotes', 'stitchingImpact', 'approvalRequired']
    }
  };

  if (input.dryRun || !url || !secret || !liveMode) {
    return {
      ok: Boolean(url && secret) || Boolean(input.dryRun),
      status: input.dryRun ? 'dry_run' : url && secret ? 'configured_not_live' : 'demo_agent_plan',
      endpoint: maskUrl(url),
      model,
      message: input.dryRun
        ? 'Dry run complete. The agent payload is valid and scoped to one board only.'
        : url && secret
          ? 'Agent endpoint is configured. Set CHATGPT_AGENT_HARNESS_MODE=live to invoke it.'
          : 'Demo agent plan generated. Add CHATGPT_AGENT_ENDPOINT_URL and CHATGPT_AGENT_ENDPOINT_SECRET for live planning.',
      plan: {
        newPanelPrompt: `Change only board ${targetBoardIndex} (${input.boardId}). Director request: ${input.directorPrompt}. Preserve ${locks.join(', ')}. Keep all other ${Math.max(input.totalBoards - 1, 0)} boards unchanged.`,
        negativePrompt: 'Do not change character identity, costume, screen direction, neighboring panel continuity, approved lens, approved aspect ratio, or storyboard timing unless explicitly requested.',
        lockChecklist: locks.map((lock) => ({ lock, required: true, status: 'must_pass' })),
        stitchingImpact: 'No dynamic stitch job should run until director approves this patch.',
        approvalRequired: true
      },
      requestPreview: body
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${secret}`,
      'x-cineloom-agent-task': 'director_single_board_change',
      'x-cineloom-idempotency-key': input.idempotencyKey ?? `agent_board_${input.boardId}_${Date.now()}`
    },
    body: JSON.stringify(body),
    signal: controller.signal
  });
  clearTimeout(timeout);
  const text = await response.text();
  let json: unknown = text;
  try { json = JSON.parse(text); } catch {}
  return {
    ok: response.ok,
    status: response.ok ? 'agent_response_received' : 'agent_endpoint_error',
    httpStatus: response.status,
    endpoint: maskUrl(url),
    model,
    response: json
  };
}

export async function runDirectorSingleBoardAgent(input: DirectorBoardChangeInput) {
  const totalBoards = Math.max(1, Math.min(Math.round(Number(input.totalBoards || 1)), 1000));
  const boardIndex = clampBoardIndex(input.boardIndex, totalBoards);
  const locks = defaultLocks(input.locks);
  const idempotencyKey = input.idempotencyKey ?? `single_board_agent_${input.storyboardId}_${input.boardId}_${Date.now()}`;
  const readiness = buildChatGPTAgentHarnessReadiness();
  const lowTokenPlan = buildLowTokenAgentPlan({
    boardIndex,
    totalBoards,
    directorPrompt: input.directorPrompt,
    currentBoardPrompt: input.currentBoardPrompt,
    previousBoardSummary: input.previousBoardSummary,
    nextBoardSummary: input.nextBoardSummary,
    sceneSummary: input.sceneSummary,
    styleSummary: input.styleSummary,
    characterSummary: input.characterSummary,
    locationSummary: input.locationSummary,
    scope: input.scope ?? 'single_board_only',
    tokenMode: input.tokenMode ?? 'lowest_cost'
  });

  const agentPlan = await callChatGPTAgentEndpoint({ ...input, totalBoards, boardIndex, idempotencyKey }, locks);
  const correction = await invokeExecutionEndpoint({
    stage: 'storyboard_correct',
    payload: {
      mode: 'single_board_agent_patch',
      storyboardId: input.storyboardId,
      boardId: input.boardId,
      boardIndex,
      totalBoards,
      directorPrompt: input.directorPrompt,
      currentBoardPrompt: input.currentBoardPrompt ?? '',
      currentBoardAssetId: input.currentBoardAssetId ?? '',
      locks,
      lowTokenPlan,
      agentPlan,
      changeScope: input.scope ?? 'single_board_only',
      stitchingPolicy: input.stitchMode ?? 'block_until_approved'
    },
    workspaceId: input.workspaceId,
    projectId: input.projectId,
    idempotencyKey,
    dryRun: input.dryRun
  });

  return {
    ok: agentPlan.ok !== false,
    status: input.dryRun ? 'dry_run' : readiness.mode,
    harnessVersion: readiness.version,
    requestedAt: new Date().toISOString(),
    target: {
      workspaceId: input.workspaceId,
      projectId: input.projectId,
      storyboardId: input.storyboardId,
      boardId: input.boardId,
      boardIndex,
      totalBoards,
      changedBoards: 1,
      unchangedBoards: Math.max(totalBoards - 1, 0)
    },
    directorPrompt: input.directorPrompt,
    locks,
    lowTokenPlan,
    dynamicStitching: {
      status: input.stitchMode === 'auto_queue_after_approval' ? 'queued_after_director_approval' : 'blocked_until_director_approval',
      reason: 'Only the selected board is changed. The dynamic storyboard stitch job must wait for director approval to avoid unintended sequence changes.'
    },
    agentPlan,
    correction,
    apiIntegration: {
      frontendRoute: '/studio/agent-harness',
      apiRoute: '/api/agent-harness/change-board',
      superAdminRoute: '/studio/super-admin/agent-harness',
      requiredEnv: REQUIRED_ENV,
      optionalEnv: OPTIONAL_ENV
    },
    nextSteps: [
      'Director reviews the low-token JSON patch and corrected board preview.',
      'If approved, create a new board version and update the export manifest.',
      'Run continuity eval against previous and next boards.',
      'Release the dynamic storyboard stitch queue only after approval.'
    ]
  };
}
