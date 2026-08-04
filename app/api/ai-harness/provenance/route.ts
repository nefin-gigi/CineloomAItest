import { NextResponse } from 'next/server';
import { createAssetProvenance } from '@/lib/ai-harness';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const payload = validation.data;
  return NextResponse.json({ ok: true, provenance: createAssetProvenance(payload) });
}
