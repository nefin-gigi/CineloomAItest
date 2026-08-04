import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

function verifyStripeSignature(payload: string, signatureHeader: string | null, secret: string) {
  if (!signatureHeader || !secret) return { ok: false, reason: 'Missing signature or webhook secret' };
  const parts = Object.fromEntries(signatureHeader.split(',').map((part) => {
    const [key, value] = part.split('=');
    return [key, value];
  }));
  const timestamp = parts.t;
  const provided = parts.v1;
  if (!timestamp || !provided) return { ok: false, reason: 'Malformed Stripe signature header' };
  const toleranceSeconds = Number(process.env.STRIPE_WEBHOOK_TOLERANCE_SECONDS ?? 300);
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > toleranceSeconds) return { ok: false, reason: 'Stripe signature timestamp outside tolerance' };
  const signedPayload = `${timestamp}.${payload}`;
  const expected = createHmac('sha256', secret).update(signedPayload).digest('hex');
  if (provided.length !== expected.length) return { ok: false, reason: 'Signature length mismatch' };
  const ok = timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  return { ok, reason: ok ? 'verified' : 'Signature mismatch' };
}

async function reconcileBillingEvent(event: unknown) {
  const endpoint = process.env.BILLING_RECONCILIATION_ENDPOINT_URL;
  const secret = process.env.BILLING_RECONCILIATION_SECRET;
  if (!endpoint || !secret) return { ok: false, mode: 'not_configured', message: 'BILLING_RECONCILIATION_ENDPOINT_URL and BILLING_RECONCILIATION_SECRET are required for live webhook reconciliation.' };
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-cineloom-billing-secret': secret },
    body: JSON.stringify({ provider: 'stripe', event })
  });
  return { ok: response.ok, mode: 'external_reconciliation', status: response.status, response: await response.json().catch(() => ({})) };
}

export async function POST(request: Request) {
  const payload = await request.text();
  const mode = process.env.PAYMENT_GATEWAY_MODE ?? 'demo';
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? '';
  const signature = request.headers.get('stripe-signature');

  if (mode === 'stripe') {
    const verification = verifyStripeSignature(payload, signature, secret);
    if (!verification.ok) return NextResponse.json({ received: false, error: verification.reason }, { status: 400 });
  }

  const event = JSON.parse(payload || '{}');
  const reconciliation = mode === 'stripe' ? await reconcileBillingEvent(event) : { ok: true, mode: 'demo', message: 'Demo webhook accepted.' };
  const status = reconciliation.ok ? 200 : 503;
  return NextResponse.json({ received: reconciliation.ok, mode, bytes: payload.length, verified: mode === 'stripe', reconciliation }, { status });
}
