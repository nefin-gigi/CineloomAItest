import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({
    eventId: `review-${Date.now()}`,
    projectId: body.projectId ?? 'project-silent-path',
    level: body.level ?? 'panel',
    targetId: body.targetId ?? 'panel-01',
    decision: body.decision ?? 'approve',
    note: body.note ?? '',
    nextStatus: body.decision === 'reject' ? 'Needs Review' : 'Approved',
    impactWarning: body.level === 'beat' ? 'Changing this beat may affect scenes, shots, panels, animatic timing, and provider prompts.' : null,
    stored: false,
    storageNote: 'Connect DATABASE_URL/Supabase for durable audit persistence.'
  });
}
