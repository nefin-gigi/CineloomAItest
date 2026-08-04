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
    watermarked: true,
    workspaceId: String(body.workspaceId ?? 'guest'),
    projectId: String(body.projectId ?? 'free-sample'),
    userId: String(body.userId ?? 'anonymous'),
    plan: String(body.plan ?? 'free_preview'),
    idempotencyKey: String(body.idempotencyKey ?? `free_sample_${Date.now()}`)
  });
  return NextResponse.json({
    ...result.body,
    watermarked: true,
    message: result.body.ok
      ? 'Live storyboard endpoint flow executed. If provider returned a jobId, poll nextStep for status.'
      : 'Storyboard request did not reach a live provider. Configure EXEC_STORYBOARD_GENERATE_URL and distributed rate limits for paid launch.'
  }, { status: result.httpStatus, headers: result.headers });
}
