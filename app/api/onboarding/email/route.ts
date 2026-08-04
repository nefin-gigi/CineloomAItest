import { NextRequest, NextResponse } from 'next/server';
import { validateApiRequest } from '@/lib/input-validation';

const defaultSequence = [
  { delayHours: 0, subject: 'Welcome to CineLoom — create your first storyboard', goal: 'free_storyboard_activation' },
  { delayHours: 24, subject: 'Correct one storyboard frame with a director prompt', goal: 'prompt_correction_activation' },
  { delayHours: 72, subject: 'Export your first director package', goal: 'export_upgrade_intent' },
  { delayHours: 168, subject: 'Turn one scene into a timed animatic', goal: 'repeat_usage' },
  { delayHours: 336, subject: 'Invite a producer or collaborator', goal: 'team_expansion' }
];

export async function GET() {
  return NextResponse.json({ flow: 'free_storyboard_to_paid_export', sequence: defaultSequence });
}

export async function POST(request: NextRequest) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const endpoint = process.env.ONBOARDING_EMAIL_WEBHOOK_URL;
  const payload = {
    email: body.email,
    flow: body.flow || 'free_storyboard_to_paid_export',
    source: body.source || 'cineloom_onboarding',
    sequence: defaultSequence,
    traceId: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };

  if (endpoint && endpoint.startsWith('https://')) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-cineloom-event': 'onboarding.flow.started' },
      body: JSON.stringify(payload)
    }).catch(() => null);
    return NextResponse.json({ ...payload, status: response?.ok ? 'forwarded' : 'queued_fallback' });
  }

  return NextResponse.json({ ...payload, status: 'demo_queued', note: 'Set ONBOARDING_EMAIL_WEBHOOK_URL to connect Resend, SendGrid, Customer.io, HubSpot, or a custom lifecycle service.' });
}
