import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    service: 'email-provider',
    provider: process.env.EMAIL_PROVIDER ?? 'demo',
    configured: Boolean(process.env.EMAIL_PROVIDER_ENDPOINT),
    hasApiKey: Boolean(process.env.EMAIL_PROVIDER_API_KEY),
    requiredForLaunch: ['onboarding_welcome', 'generation_complete', 'billing_receipt', 'support_ticket', 'low_token_warning'],
    status: process.env.EMAIL_PROVIDER_ENDPOINT ? 'ready-for-live-test' : 'demo-mode'
  });
}
