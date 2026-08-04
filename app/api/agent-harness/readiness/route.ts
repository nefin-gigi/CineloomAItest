import { NextResponse } from 'next/server';
import { buildChatGPTAgentHarnessReadiness } from '@/lib/chatgpt-agent-harness';

export async function GET() {
  return NextResponse.json({ ok: true, checkedAt: new Date().toISOString(), readiness: buildChatGPTAgentHarnessReadiness() });
}
