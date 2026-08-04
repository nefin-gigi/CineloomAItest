'use client';

import { useState } from 'react';

export function AuthGatewayPanel({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('director@cineloom.ai');
  const [message, setMessage] = useState(mode === 'signup' ? 'Create an account to save your storyboard sample and remove watermarks.' : 'Login to continue your CineLoom storyboard project.');

  async function submit() {
    const response = await fetch(`/api/auth/${mode}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: 'demo-password' }) });
    const data = await response.json();
    setMessage(data.message ?? 'Authenticated.');
  }

  return (
    <div className="gate-page v3-public-page">
      <section className="hero">
        <span className="badge premium">CineLoom account</span>
        <h1 className="gradient-text">{mode === 'signup' ? 'Save your first storyboard.' : 'Welcome back to your studio.'}</h1>
        <p>{mode === 'signup' ? 'Create an account after the free 10-second preview, then subscribe or buy tokens to export clean director packages.' : 'Return to saved scripts, storyboard corrections, exports, token wallet, and team reviews.'}</p>
      </section>
      <section className="gate-card">
        <h2>{mode === 'signup' ? 'Create account' : 'Login'}</h2>
        <label className="field"><span>Email</span><input className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="field"><span>Password</span><input className="input" type="password" defaultValue="demo-password" /></label>
        <button className="btn primary" onClick={() => void submit()}>{mode === 'signup' ? 'Create account' : 'Login'}</button>
        <div className="success">{message}</div>
      </section>
    </div>
  );
}
