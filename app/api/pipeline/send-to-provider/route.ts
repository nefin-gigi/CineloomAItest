import { NextResponse } from 'next/server';
import { queueVideoGeneration } from '@/lib/provider-adapters';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const result = await queueVideoGeneration({
    projectId: String(body.projectId ?? 'project-silent-path'),
    prompt: String(body.prompt ?? 'Approved CineLoom storyboard package'),
    aspectRatio: String(body.aspectRatio ?? '2.39:1'),
    frameRate: String(body.frameRate ?? '24fps'),
    durationSeconds: Number(body.durationSeconds ?? 8),
    style: String(body.style ?? 'Cinematic Realism')
  });
  return NextResponse.json(result);
}
