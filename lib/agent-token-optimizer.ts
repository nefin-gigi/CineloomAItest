export type AgentChangeScope = 'single_board_only' | 'local_scene' | 'full_sequence';
export type AgentTokenMode = 'lowest_cost' | 'balanced' | 'director_final_quality';

export type LowTokenPlanInput = {
  boardIndex: number;
  totalBoards: number;
  directorPrompt: string;
  currentBoardPrompt?: string;
  previousBoardSummary?: string;
  nextBoardSummary?: string;
  sceneSummary?: string;
  styleSummary?: string;
  characterSummary?: string;
  locationSummary?: string;
  scope?: AgentChangeScope;
  tokenMode?: AgentTokenMode;
};

export type LowTokenPlan = {
  ok: boolean;
  version: string;
  scope: AgentChangeScope;
  tokenMode: AgentTokenMode;
  blockedFullContext: boolean;
  recommendedContext: string[];
  omittedContext: string[];
  estimatedTokens: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    avoidedFullStoryboardTokens: number;
    estimatedSavingsPercent: number;
  };
  hardLimits: {
    maxInputTokens: number;
    maxOutputTokens: number;
    maxNeighborBoards: number;
    fullStoryboardContextAllowed: boolean;
  };
  aiPayloadPolicy: {
    sendFullStoryboard: boolean;
    sendTargetBoard: boolean;
    sendNeighborSummaries: boolean;
    sendCachedBibles: boolean;
    returnJsonPatchOnly: boolean;
    requireDirectorApproval: boolean;
    restitchPolicy: 'changed_segment_only' | 'approval_then_changed_segment' | 'admin_override_required';
  };
  nextStep: string;
};

const MODE_LIMITS: Record<AgentTokenMode, { maxInputTokens: number; maxOutputTokens: number; maxNeighborBoards: number }> = {
  lowest_cost: { maxInputTokens: 1500, maxOutputTokens: 350, maxNeighborBoards: 2 },
  balanced: { maxInputTokens: 3000, maxOutputTokens: 700, maxNeighborBoards: 4 },
  director_final_quality: { maxInputTokens: 6000, maxOutputTokens: 1200, maxNeighborBoards: 6 }
};

function wordishTokenEstimate(value?: string) {
  if (!value) return 0;
  return Math.ceil(value.trim().split(/\s+/).filter(Boolean).length * 1.35);
}

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function buildLowTokenAgentPlan(input: LowTokenPlanInput): LowTokenPlan {
  const totalBoards = clampNumber(input.totalBoards || 1, 1, 1000);
  const boardIndex = clampNumber(input.boardIndex || 1, 1, totalBoards);
  const scope: AgentChangeScope = input.scope ?? 'single_board_only';
  const tokenMode: AgentTokenMode = input.tokenMode ?? 'lowest_cost';
  const limits = MODE_LIMITS[tokenMode] ?? MODE_LIMITS.lowest_cost;

  const baseTokens = 180;
  const boardTokens = wordishTokenEstimate(input.currentBoardPrompt) || 180;
  const promptTokens = wordishTokenEstimate(input.directorPrompt) || 80;
  const neighborTokens = (wordishTokenEstimate(input.previousBoardSummary) || 45) + (wordishTokenEstimate(input.nextBoardSummary) || 45);
  const bibleTokens = tokenMode === 'lowest_cost'
    ? 180
    : 180 + wordishTokenEstimate(input.sceneSummary) + Math.min(wordishTokenEstimate(input.styleSummary), 250) + Math.min(wordishTokenEstimate(input.characterSummary), 250) + Math.min(wordishTokenEstimate(input.locationSummary), 200);

  const scopeMultiplier = scope === 'single_board_only' ? 1 : scope === 'local_scene' ? 1.8 : 3.5;
  const rawInputTokens = Math.ceil((baseTokens + boardTokens + promptTokens + neighborTokens + bibleTokens) * scopeMultiplier);
  const inputTokens = Math.min(rawInputTokens, limits.maxInputTokens);
  const outputTokens = Math.min(Math.ceil(inputTokens * 0.22), limits.maxOutputTokens);
  const fullStoryboardTokens = Math.max(totalBoards * 240, 240);
  const estimatedTotal = inputTokens + outputTokens;
  const estimatedSavingsPercent = Math.max(0, Math.min(99, Math.round((1 - estimatedTotal / fullStoryboardTokens) * 100)));

  const blockedFullContext = totalBoards > 50;
  return {
    ok: true,
    version: '7.6',
    scope,
    tokenMode,
    blockedFullContext,
    recommendedContext: [
      `Target board ${boardIndex} metadata`,
      'Current board visual prompt',
      'Director prompt',
      'Previous board short summary',
      'Next board short summary',
      tokenMode === 'lowest_cost' ? 'Compressed continuity locks only' : 'Cached scene/style/character/location summaries'
    ],
    omittedContext: [
      'Full 1,000-board storyboard JSON',
      'Full screenplay text',
      'Unchanged board image prompts',
      'Full dynamic storyboard render timeline',
      'Complete export package unless director approves patch'
    ],
    estimatedTokens: {
      inputTokens,
      outputTokens,
      totalTokens: estimatedTotal,
      avoidedFullStoryboardTokens: Math.max(0, fullStoryboardTokens - estimatedTotal),
      estimatedSavingsPercent
    },
    hardLimits: {
      maxInputTokens: limits.maxInputTokens,
      maxOutputTokens: limits.maxOutputTokens,
      maxNeighborBoards: limits.maxNeighborBoards,
      fullStoryboardContextAllowed: !blockedFullContext && scope !== 'full_sequence'
    },
    aiPayloadPolicy: {
      sendFullStoryboard: false,
      sendTargetBoard: true,
      sendNeighborSummaries: true,
      sendCachedBibles: tokenMode !== 'lowest_cost',
      returnJsonPatchOnly: true,
      requireDirectorApproval: true,
      restitchPolicy: scope === 'single_board_only' ? 'approval_then_changed_segment' : scope === 'local_scene' ? 'changed_segment_only' : 'admin_override_required'
    },
    nextStep: 'Preview JSON patch, regenerate only the target board if needed, then release stitching only after director approval.'
  };
}

export function buildLowTokenAgentReadiness() {
  return {
    ok: true,
    version: '7.6',
    architectureScore: 10,
    defaultMode: 'lowest_cost',
    policy: [
      'Never send all boards when totalBoards is greater than 50.',
      'Default to single-board JSON patch instead of storyboard rewrite.',
      'Use cached board/scene summaries instead of full screenplay context.',
      'Require director approval before dynamic stitching.',
      'Restitch only changed segments until final export.'
    ],
    supportedModes: Object.keys(MODE_LIMITS),
    supportedScopes: ['single_board_only', 'local_scene', 'full_sequence']
  };
}
