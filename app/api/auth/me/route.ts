import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ user: { id: 'user_demo', email: 'director@cineloom.ai', role: 'Owner', plan: 'studio', workspaceId: 'workspace_demo' } });
}
