import { NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({
    ok: true,
    mode: process.env.PAYMENT_GATEWAY_MODE ?? 'demo',
    tokenPack: body.packId ?? 'pack_5k',
    checkoutRequired: true,
    message: 'Token pack purchase created. In production, create Stripe checkout, confirm webhook, then credit token ledger.'
  });
}
