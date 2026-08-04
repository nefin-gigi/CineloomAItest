import { NextResponse } from 'next/server';
import { queueVoiceOrMusic } from '@/lib/provider-adapters';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const kind = body.kind === 'music' ? 'music' : 'voice';
  const result = await queueVoiceOrMusic(String(body.projectId ?? 'project-silent-path'), kind, String(body.prompt ?? 'CineLoom audio cue'));
  return NextResponse.json(result);
}
