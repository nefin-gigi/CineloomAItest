import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    mode: process.env.PAYMENT_GATEWAY_MODE ?? 'demo',
    url: '/studio/billing?portal=demo',
    message: 'Customer portal scaffold. Connect Stripe Billing Portal after production customer IDs are stored in the user database.'
  });
}
