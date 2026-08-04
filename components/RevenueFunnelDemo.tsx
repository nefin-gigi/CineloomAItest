'use client';

import { useMemo, useState } from 'react';
import { estimateRevenueTokens, launchFunnelSteps } from '@/lib/v3-production-data';

const defaultScene = `EXT. BACKLOT STAGE - NIGHT\nA young filmmaker walks toward a glowing soundstage door in the rain. The door opens to reveal a vast desert movie world inside. She smiles, realizing her script is becoming cinema.`;

export function RevenueFunnelDemo() {
  const [script, setScript] = useState(defaultScene);
  const [style, setStyle] = useState('Cinematic realism');
  const [state, setState] = useState<'idle' | 'generating' | 'ready'>('idle');
  const [message, setMessage] = useState('Paste a small scene and generate a watermarked 10-second storyboard sample.');
  const tokens = useMemo(() => estimateRevenueTokens({ panels: 8, corrections: 1, animaticSeconds: 10, exports: 1 }), []);

  async function generate() {
    setState('generating');
    setMessage('Validating script, extracting scene action, designing shots, and building sample storyboard...');
    const response = await fetch('/api/storyboard/free-sample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script, style })
    });
    const data = await response.json();
    setState('ready');
    setMessage(data.message ?? 'Free watermarked storyboard preview is ready. Create an account to save it or upgrade to export clean files.');
  }

  return (
    <div className="grid" style={{ gap: 22 }}>
      <section className="card featured hero-card v3-hero-card">
        <div>
          <span className="badge premium">Revenue funnel</span>
          <h1 className="v3-display">Create a 10-second storyboard before asking for payment.</h1>
          <p className="muted">This turns CineLoom from a demo site into a conversion engine: show value first, then capture signup, subscription, token purchase, and clean export revenue.</p>
          <div className="launch-actions">
            <button className="btn primary" onClick={() => void generate()}>{state === 'generating' ? 'Generating...' : 'Generate free sample'}</button>
            <a className="btn" href="/pricing">View pricing</a>
            <a className="btn ghost" href="/signup">Create account</a>
          </div>
          <div className={state === 'ready' ? 'success' : 'rail-note'}>{message}</div>
        </div>
        <div className="v3-funnel-card">
          <strong>Estimated token cost</strong>
          <div className="kpi">{tokens}</div>
          <span>Watermarked preview is free. Clean export, animatic download, commercial use, and team sharing require subscription or tokens.</span>
        </div>
      </section>

      <section className="grid two">
        <div className="card">
          <h2>Try a short scene</h2>
          <label className="field"><span>Script / scene idea</span><textarea value={script} onChange={(e) => setScript(e.target.value)} /></label>
          <label className="field"><span>Storyboard style</span><select value={style} onChange={(e) => setStyle(e.target.value)}><option>Cinematic realism</option><option>Professional photo sketch</option><option>3D blocking</option><option>Family-safe animated</option><option>YouTube Shorts vertical</option></select></label>
        </div>
        <div className="card">
          <h2>Conversion steps</h2>
          <div className="stage-checklist">
            {launchFunnelSteps.map((step, index) => <div className="check" key={step}><span>{index + 1}. {step}</span><span>→</span></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}
