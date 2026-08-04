import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';
import { buildLowTokenAgentPlan, buildLowTokenAgentReadiness } from '@/lib/agent-token-optimizer';

export async function GET() {
  return NextResponse.json(buildLowTokenAgentReadiness());
}

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const plan = buildLowTokenAgentPlan({
    boardIndex: Number(body.boardIndex ?? 1),
    totalBoards: Number(body.totalBoards ?? 1000),
    directorPrompt: String(body.directorPrompt ?? ''),
    currentBoardPrompt: String(body.currentBoardPrompt ?? ''),
    previousBoardSummary: String(body.previousBoardSummary ?? ''),
    nextBoardSummary: String(body.nextBoardSummary ?? ''),
    sceneSummary: String(body.sceneSummary ?? ''),
    styleSummary: String(body.styleSummary ?? ''),
    characterSummary: String(body.characterSummary ?? ''),
    locationSummary: String(body.locationSummary ?? ''),
    scope: String(body.scope ?? 'single_board_only') as any,
    tokenMode: String(body.tokenMode ?? 'lowest_cost') as any
  });
  return NextResponse.json({ ok: true, plan });
}
