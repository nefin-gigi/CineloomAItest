import { NextResponse } from 'next/server';
import { tokenPacks } from '@/lib/business-data';
import { revenuePlans } from '@/lib/v3-production-data';
import { assertLivePaidSaaSAllowed } from '@/lib/live-paid-saas';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const paymentMode = process.env.PAYMENT_GATEWAY_MODE ?? 'demo';
  const publicPaidCheckoutEnabled = (process.env.PUBLIC_PAID_CHECKOUT_ENABLED ?? 'false').toLowerCase() === 'true';
  if (paymentMode === 'stripe' || publicPaidCheckoutEnabled) {
    const gate = assertLivePaidSaaSAllowed('stripe_checkout');
    if (!gate.allowed) return NextResponse.json({ ok: false, error: gate.reason, readiness: gate.readiness }, { status: gate.status ?? 503 });
  }

  const planId = String(body.planId ?? 'studio');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const plan = revenuePlans.find((item) => item.id === planId);
  const pack = tokenPacks.find((item) => item.id === planId);
  const priceEnv = plan?.stripePriceEnv ?? `STRIPE_PRICE_${planId.toUpperCase()}`;
  const priceId = process.env[priceEnv];
  const idempotencyKey = String(body.idempotencyKey ?? `checkout_${planId}_${Date.now()}`);

  if (paymentMode === 'stripe' && stripeSecret && priceId) {
    const form = new URLSearchParams();
    form.set('mode', planId.startsWith('pack_') ? 'payment' : 'subscription');
    form.set('line_items[0][price]', priceId);
    form.set('line_items[0][quantity]', '1');
    form.set('success_url', String(body.successUrl ?? `${appUrl}/studio/billing?checkout=success&session_id={CHECKOUT_SESSION_ID}`));
    form.set('cancel_url', String(body.cancelUrl ?? `${appUrl}/pricing?checkout=cancelled`));
    form.set('allow_promotion_codes', 'true');
    form.set('metadata[cineloom_item]', planId);
    form.set('metadata[cineloom_source]', 'v4_4_live_paid_saas');
    form.set('metadata[cineloom_idempotency_key]', idempotencyKey);
    form.set('client_reference_id', String(body.workspaceId ?? body.email ?? 'cineloom_guest'));

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Idempotency-Key': idempotencyKey
      },
      body: form
    });
    const data = await response.json();
    if (!response.ok) return NextResponse.json({ mode: 'stripe', error: data.error?.message ?? 'Stripe checkout session failed' }, { status: 400 });
    return NextResponse.json({ mode: 'stripe', url: data.url, id: data.id, idempotencyKey });
  }

  return NextResponse.json({
    mode: 'demo',
    planId,
    name: plan?.name ?? pack?.name ?? planId,
    url: `${appUrl}/studio/billing?checkout=demo&item=${encodeURIComponent(planId)}`,
    message: 'Demo checkout scaffold. Set PAYMENT_GATEWAY_MODE=stripe, STRIPE_SECRET_KEY, matching STRIPE_PRICE_* env vars, PUBLIC_PAID_CHECKOUT_ENABLED=true, and pass /api/super-admin/live-paid-saas/launch-gate to enable live checkout.'
  });
}
