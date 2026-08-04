'use client';

import { useState } from 'react';

const emails = [
  { day: 'Immediately', subject: 'Welcome to CineLoom — create your first storyboard', goal: 'Activate free 10-second storyboard generation' },
  { day: 'Day 1', subject: 'How to correct a storyboard frame with one prompt', goal: 'Teach prompt-driven corrections' },
  { day: 'Day 3', subject: 'Export your first director package', goal: 'Drive export and upgrade intent' },
  { day: 'Day 7', subject: 'Turn one scene into a full animatic', goal: 'Encourage repeat usage' },
  { day: 'Day 14', subject: 'Invite a producer or collaborator', goal: 'Introduce team workflows' }
];

export function OnboardingEmailFlow() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function start() {
    setBusy(true);
    const response = await fetch('/api/onboarding/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, flow: 'free_storyboard_to_paid_export' })
    }).catch(() => null);
    const json = await response?.json().catch(() => null);
    setResult(json?.status ? `Onboarding flow status: ${json.status}` : 'Onboarding flow queued in demo mode.');
    setBusy(false);
  }

  return (
    <section className="conversion-section onboarding-email-section">
      <div className="section-kicker">Onboarding email flow</div>
      <h2>Turn free storyboard users into returning customers.</h2>
      <p>The onboarding sequence teaches the first storyboard, prompt correction, export package, and collaboration flow. Production mode can connect this to Resend, SendGrid, Customer.io, HubSpot, or a custom lifecycle endpoint.</p>
      <div className="grid two">
        <div className="card featured">
          <h3>Start onboarding flow</h3>
          <label className="field"><span>Email</span><input className="input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="creator@example.com" /></label>
          <button className="btn primary" onClick={start} disabled={busy || !email}>{busy ? 'Queuing...' : 'Queue onboarding email flow'}</button>
          {result && <div className="success">{result}</div>}
        </div>
        <div className="grid">
          {emails.map((item) => (
            <article className="package-item" key={item.subject}>
              <strong>{item.day} · {item.subject}</strong>
              <span>{item.goal}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
