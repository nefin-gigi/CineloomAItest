import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const to = String(body.to ?? '');
  const subject = String(body.subject ?? 'CineLoom notification');
  if (!to.includes('@')) return NextResponse.json({ ok: false, message: 'Valid recipient email is required.' }, { status: 400 });
  const result = await sendEmail({
    to,
    subject,
    template: String(body.template ?? 'generic'),
    text: String(body.text ?? ''),
    data: typeof body.data === 'object' && body.data ? body.data : {}
  });
  return NextResponse.json(result, { status: result.ok ? 200 : 502 });
}
