import { NextResponse } from 'next/server';
import { sample10Storyboard } from '@/lib/business-data';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({
    ...sample10Storyboard,
    sourceIdea: body.idea ?? sample10Storyboard.description,
    style: body.style ?? 'Cinematic Realism',
    status: 'Generated',
    tokenCost: sample10Storyboard.tokenEstimate,
    nextBestAction: 'Review panels 04 and 06, then apply prompt corrections or export sample package.'
  });
}
