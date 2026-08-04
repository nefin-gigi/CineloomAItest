import { NextResponse } from 'next/server';
import { generateLiveStoryboard } from '@/lib/live-storyboard-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const result = await generateLiveStoryboard(request, {
    script: String(body.script ?? ''),
    style: String(body.style ?? 'cinematic_realism'),
    durationSeconds: Number(body.durationSeconds ?? 10),
    panels: Number(body.panels ?? 8),
    aspectRatio: String(body.aspectRatio ?? '16:9'),
    frameRate: String(body.frameRate ?? '24fps'),
    watermarked: Boolean(body.watermarked ?? false),
    workspaceId: String(body.workspaceId ?? 'demo'),
    projectId: String(body.projectId ?? 'demo'),
    userId: String(body.userId ?? 'anonymous'),
    plan: String(body.plan ?? 'creator'),
    idempotencyKey: String(body.idempotencyKey ?? `storyboard_live_${Date.now()}`),
    correctionPrompt: body.correctionPrompt ? String(body.correctionPrompt) : undefined,
    locks: body.locks && typeof body.locks === 'object' ? body.locks : undefined
  });
  return NextResponse.json(result.body, { status: result.httpStatus, headers: result.headers });
}
