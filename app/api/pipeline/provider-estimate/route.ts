import { NextResponse } from 'next/server';
import { providerMatrix } from '@/lib/v1-data';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const panels = Number(body.panels ?? 45);
  const clips = Number(body.clips ?? 8);
  const mode = String(body.mode ?? 'standard');
  return NextResponse.json({
    estimateMode: mode,
    panels,
    clips,
    storyboardEstimateUsd: { low: Math.round(panels * 0.08), high: Math.round(panels * 0.55) },
    videoEstimateUsd: { low: Math.round(clips * 5), high: Math.round(clips * 38) },
    providerMatrix,
    recommendation: 'Use storyboard-only mode for early director review, then premium video mode for the investor demo reel.'
  });
}
