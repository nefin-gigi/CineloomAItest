import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { buildChatGPTAgentHarnessReadiness, runDirectorSingleBoardAgent } from '@/lib/chatgpt-agent-harness';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString(), readiness: buildChatGPTAgentHarnessReadiness() });
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const result = await runDirectorSingleBoardAgent({
    workspaceId: String(body.workspaceId ?? 'admin-test-workspace'),
    projectId: String(body.projectId ?? 'admin-test-project'),
    storyboardId: String(body.storyboardId ?? 'admin-test-storyboard'),
    boardId: String(body.boardId ?? `board-${body.boardIndex ?? 1}`),
    boardIndex: Number(body.boardIndex ?? 1),
    totalBoards: Number(body.totalBoards ?? 1000),
    directorPrompt: String(body.directorPrompt ?? 'Make the selected board more emotional, keep all other boards unchanged.'),
    currentBoardPrompt: String(body.currentBoardPrompt ?? ''),
    previousBoardSummary: String(body.previousBoardSummary ?? ''),
    nextBoardSummary: String(body.nextBoardSummary ?? ''),
    locks: Array.isArray(body.locks) ? body.locks as any : undefined,
    stitchMode: 'block_until_approved',
    idempotencyKey: String(body.idempotencyKey ?? ''),
    dryRun: body.dryRun !== false
  });
  return NextResponse.json({ ok: true, result });
}
