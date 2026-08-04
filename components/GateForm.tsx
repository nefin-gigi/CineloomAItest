'use client';

import { useState } from 'react';

export function GateForm({ nextPath, isUnlocked }: { nextPath: string; isUnlocked: boolean }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/gate/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to unlock CineLoom.');
      window.location.href = nextPath || '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to unlock CineLoom.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="gate-card">
      <span className="badge premium">Producer / Director Preview</span>
      <h2>Unlock CineLoom Studio</h2>
      <p>
        The public website remains under construction. Approved users can enter the private storyboard studio to review
        the end-to-end script, storyboard, animatic, and video handoff workflow.
      </p>
      {isUnlocked ? (
        <div className="success">
          Preview is already unlocked. <a href="/dashboard"><strong>Enter Studio</strong></a>
        </div>
      ) : null}
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="username">Preview username</label>
          <input id="username" className="input" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" />
        </div>
        <div className="field">
          <label htmlFor="password">Preview password</label>
          <input id="password" className="input" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
        </div>
        {error ? <div className="error">{error}</div> : null}
        <button className="btn primary" disabled={loading} type="submit">{loading ? 'Unlocking…' : 'Enter Private Studio'}</button>
      </form>
      <div className="footer-note">
        Credentials are controlled through Vercel environment variables: <strong>LAUNCH_USERNAME</strong>, <strong>LAUNCH_PASSWORD</strong>, and <strong>LAUNCH_GATE_TOKEN</strong>.
      </div>
    </div>
  );
}
