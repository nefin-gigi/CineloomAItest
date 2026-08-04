import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({
    ok: true,
    remixProjectId: `remix_${Date.now()}`,
    sourceShareId: body.shareId ?? 'share_demo_storyboard',
    tokenEstimate: 45,
    next: '/create-free-storyboard',
    message: 'Remix created as a free-to-paid growth loop. Upgrade to remove watermark or extend the storyboard.'
  });
}
