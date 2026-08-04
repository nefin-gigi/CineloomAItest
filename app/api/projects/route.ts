import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET() {
  return NextResponse.json({ projects: [
    { id: 'project_001', title: 'The Door Opens', status: 'Storyboard approved', plan: 'studio' },
    { id: 'project_002', title: 'The Silent Path', status: 'Animatic ready', plan: 'studio' }
  ] });
}

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({ ok: true, project: { id: `project_${Date.now()}`, title: body.title ?? 'Untitled CineLoom Project', status: 'Created' }, message: 'Project created in scaffold mode. Persist to Postgres/Supabase in production.' });
}
