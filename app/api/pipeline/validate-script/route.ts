import { NextResponse } from 'next/server';
import { validateScript } from '@/lib/pipeline';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json(validateScript(String(body.scriptText ?? '')));
}
