import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const name = String(body.name ?? '').trim();
  const role = String(body.role ?? '').trim();
  const quote = String(body.quote ?? '').trim();
  if (!name || !role || quote.length < 12) {
    return NextResponse.json({ ok: false, message: 'Name, role, and a meaningful quote are required.' }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    status: 'pending_verification',
    proofId: `proof_${Date.now()}`,
    message: 'Quote captured for verification. It should not be published until permission is confirmed and an admin approves it.',
    nextStep: 'Store this record in verified_customer_proof and approve through Super Admin before rendering publicly.'
  });
}
