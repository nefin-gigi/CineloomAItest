'use client';

import { useState } from 'react';
import { correctionPresets } from '@/lib/business-data';

export function PromptCorrectionStudio() {
  const [prompt, setPrompt] = useState('Make this frame feel more cinematic and full of wonder, while keeping the same character, costume, camera axis, and left-to-right screen direction.');
  const [styleLock, setStyleLock] = useState(true);
  const [characterLock, setCharacterLock] = useState(true);
  const [axisLock, setAxisLock] = useState(true);
  const [result, setResult] = useState('');

  async function correct() {
    setResult('Applying correction...');
    const response = await fetch('/api/storyboard/correct-panel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, locks: { styleLock, characterLock, axisLock }, panelId: 'premium-panel-04' })
    });
    const data = await response.json();
    setResult(data.revisedPrompt);
  }

  return (
    <div className="grid two">
      <section className="card featured">
        <span className="badge premium">Prompt-driven storyboard corrections</span>
        <h2>Correct the frame, not the whole movie</h2>
        <p>Designed for directors: revise framing, emotion, lighting, pacing, or style while locking approved continuity decisions.</p>
        <label className="field"><span>Correction prompt</span><textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} /></label>
        <div className="grid three">
          <label className="toggle-card"><input type="checkbox" checked={styleLock} onChange={(e) => setStyleLock(e.target.checked)} /> Style lock</label>
          <label className="toggle-card"><input type="checkbox" checked={characterLock} onChange={(e) => setCharacterLock(e.target.checked)} /> Character lock</label>
          <label className="toggle-card"><input type="checkbox" checked={axisLock} onChange={(e) => setAxisLock(e.target.checked)} /> 180° axis lock</label>
        </div>
        <button className="btn primary" style={{ marginTop: 14 }} onClick={correct}>Generate corrected prompt · 18 tokens</button>
      </section>
      <section className="card">
        <h2>Quick director corrections</h2>
        <div className="stage-checklist">
          {correctionPresets.map((item) => <button className="package-item token-pack" key={item} onClick={() => setPrompt(item)}><strong>{item}</strong><span>Use as correction prompt</span></button>)}
        </div>
        {result && <div className="success"><strong>Corrected prompt:</strong><br />{result}</div>}
      </section>
    </div>
  );
}
