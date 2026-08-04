import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';
import { runDirectorSingleBoardAgent } from '@/lib/chatgpt-agent-harness';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const result = await runDirectorSingleBoardAgent({
    workspaceId: String(body.workspaceId ?? 'demo-workspace'),
    projectId: String(body.projectId ?? 'demo-project'),
    storyboardId: String(body.storyboardId ?? 'demo-storyboard'),
    boardId: String(body.boardId ?? `board-${body.boardIndex ?? 1}`),
    boardIndex: Number(body.boardIndex ?? 1),
    totalBoards: Number(body.totalBoards ?? 1000),
    directorPrompt: String(body.directorPrompt ?? ''),
    currentBoardPrompt: String(body.currentBoardPrompt ?? ''),
    currentBoardAssetId: String(body.currentBoardAssetId ?? ''),
    currentBoardImageUrl: String(body.currentBoardImageUrl ?? ''),
    previousBoardSummary: String(body.previousBoardSummary ?? ''),
    nextBoardSummary: String(body.nextBoardSummary ?? ''),
    sceneSummary: String(body.sceneSummary ?? ''),
    styleSummary: String(body.styleSummary ?? ''),
    characterSummary: String(body.characterSummary ?? ''),
    locationSummary: String(body.locationSummary ?? ''),
    scope: String(body.scope ?? 'single_board_only') as any,
    tokenMode: String(body.tokenMode ?? 'lowest_cost') as any,
    locks: Array.isArray(body.locks) ? body.locks as any : undefined,
    stitchMode: String(body.stitchMode ?? 'block_until_approved') as any,
    idempotencyKey: String(body.idempotencyKey ?? ''),
    dryRun: body.dryRun === true
  });
  return NextResponse.json({ ok: true, result });
}
