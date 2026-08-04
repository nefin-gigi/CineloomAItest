import { NextResponse } from 'next/server';
import { enforcePlan } from '@/lib/v3-production-data';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const plan = String(body.plan ?? 'preview') as 'preview' | 'creator' | 'studio' | 'producer' | 'enterprise';
  const action = String(body.action ?? 'clean_export');
  return NextResponse.json(enforcePlan(plan, action));
}
