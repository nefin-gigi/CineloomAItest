import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({
    ok: true,
    shareId: body.projectId ? `share_${body.projectId}` : 'share_demo_storyboard',
    publicUrl: '/share/demo',
    watermark: body.plan === 'free' || !body.plan,
    actions: ['view', 'comment', 'remix', 'signup', 'upgrade'],
    message: 'Public storyboard share link prepared with remix and upgrade conversion actions.'
  });
}
