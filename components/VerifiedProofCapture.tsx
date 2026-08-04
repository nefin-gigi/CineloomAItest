'use client';

import { useState } from 'react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function VerifiedProofCapture() {
  const [status, setStatus] = useState<Status>('idle');

  async function submit(formData: FormData) {
    setStatus('sending');
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch('/api/proof/submit-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => null);
    setStatus(response?.ok ? 'sent' : 'error');
  }

  return (
    <form className="card proof-capture-card" action={submit}>
      <span className="badge premium">Verified proof intake</span>
      <h3>Collect real beta quotes without fabricating testimonials.</h3>
      <p>Use this form after a real pilot, creator export, or producer review. Submissions enter review status until a team member verifies permission to publish.</p>
      <div className="grid two">
        <label className="field"><span>Name</span><input className="input" name="name" required placeholder="Customer name" /></label>
        <label className="field"><span>Role</span><input className="input" name="role" required placeholder="Producer, creator, filmmaker..." /></label>
      </div>
      <label className="field"><span>Quote</span><textarea name="quote" required placeholder="What value did CineLoom provide?" /></label>
      <label className="field"><span>Outcome</span><input className="input" name="outcome" placeholder="Example: exported 8-panel storyboard package" /></label>
      <button className="btn primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting...' : 'Submit verified proof for review'}</button>
      {status === 'sent' && <div className="success">Proof submitted for verification. It will not appear publicly until approved.</div>}
      {status === 'error' && <div className="error">Could not submit proof. Try again or contact support.</div>}
    </form>
  );
}
