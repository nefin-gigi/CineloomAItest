import { NextResponse } from 'next/server';
import { queueStoryboardImage } from '@/lib/provider-adapters';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const result = await queueStoryboardImage(String(body.projectId ?? 'project-silent-path'), String(body.prompt ?? 'Cinematic storyboard frame'));
  return NextResponse.json(result);
}
