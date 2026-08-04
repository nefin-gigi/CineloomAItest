import { NextResponse } from 'next/server';
import { scoreAIOutput } from '@/lib/ai-harness';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const payload = validation.data;
  return NextResponse.json({ ok: true, eval: scoreAIOutput(payload) });
}
