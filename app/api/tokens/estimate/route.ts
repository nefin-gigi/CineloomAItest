import { NextResponse } from 'next/server';
import { estimateTokens } from '@/lib/business-data';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const estimate = estimateTokens({
    pages: Number(body.pages ?? 0),
    scenes: Number(body.scenes ?? 0),
    panels: Number(body.panels ?? 0),
    corrections: Number(body.corrections ?? 0),
    animaticSeconds: Number(body.animaticSeconds ?? 0),
    exports: Number(body.exports ?? 0)
  });
  return NextResponse.json({ estimate, currency: 'tokens', hardLimitWarning: estimate > 10000 });
}
