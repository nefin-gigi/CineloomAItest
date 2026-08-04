'use client';

import { useState } from 'react';

export function SupportTicketForm() {
  const [category, setCategory] = useState('generation');
  const [priority, setPriority] = useState('normal');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setResult(null);
    const response = await fetch('/api/support/ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, priority, email, message, source: 'public_support_page' })
    }).catch(() => null);
    const json = await response?.json().catch(() => null);
    setResult(json?.ticketId ? `Ticket created: ${json.ticketId}` : 'Ticket received. Connect a support provider in Super Admin for production routing.');
    setBusy(false);
  }

  return (
    <section className="card featured support-ticket-card">
      <span className="badge premium">Support ticket integration</span>
      <h2>Open a support ticket</h2>
      <p>Routes to `/api/support/ticket`, with optional forwarding to Zendesk, HelpScout, Freshdesk, Intercom, Jira Service Management, or a custom endpoint.</p>
      <div className="grid two">
        <label className="field"><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="generation">Generation issue</option><option value="billing">Billing and tokens</option><option value="export">Export/download</option><option value="enterprise">Enterprise/security</option><option value="feedback">Feature feedback</option></select></label>
        <label className="field"><span>Priority</span><select value={priority} onChange={(event) => setPriority(event.target.value)}><option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option></select></label>
      </div>
      <label className="field"><span>Email</span><input className="input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
      <label className="field"><span>What happened?</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us what you were trying to generate or export." /></label>
      <button className="btn primary" onClick={submit} disabled={busy}>{busy ? 'Creating ticket...' : 'Create support ticket'}</button>
      {result && <div className="success">{result}</div>}
    </section>
  );
}
