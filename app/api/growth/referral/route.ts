import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({ ok: true, referralCode: `CINE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, inviter: body.email ?? 'demo@cineloom.ai', reward: '250 tokens after referred signup', message: 'Referral loop created.' });
}
