export type EmailPayload = {
  to: string;
  subject: string;
  template?: string;
  text?: string;
  data?: Record<string, unknown>;
};

export async function sendEmail(payload: EmailPayload) {
  const endpoint = process.env.EMAIL_PROVIDER_ENDPOINT;
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const provider = process.env.EMAIL_PROVIDER ?? 'demo';
  if (!endpoint) {
    return {
      ok: true,
      mode: 'demo',
      provider,
      message: 'Email provider is not configured. Payload accepted in demo mode.',
      payload: { ...payload, to: maskEmail(payload.to) }
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {})
    },
    body: JSON.stringify(payload)
  });

  return {
    ok: response.ok,
    mode: 'live',
    provider,
    status: response.status,
    message: response.ok ? 'Email provider accepted the message.' : 'Email provider rejected the message.'
  };
}

function maskEmail(email: string) {
  const [name, domain] = email.split('@');
  if (!domain) return 'masked';
  return `${name.slice(0, 2)}***@${domain}`;
}
