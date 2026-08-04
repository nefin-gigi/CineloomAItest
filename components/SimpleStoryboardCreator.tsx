'use client';

import { useMemo, useState } from 'react';

type Panel = {
  id: string;
  shot: string;
  timing: string;
  note: string;
};

const defaultScene = 'A young filmmaker opens a glowing studio door. Inside, their script becomes a living movie world.';
const styles = ['Cinematic Realism', 'Storyboard Sketch', '3D Blocking', 'Animated Family', 'Pitch Deck'];
const basePanels: Panel[] = [
  { id: '01', shot: 'Wide establishing shot', timing: '0.0s–1.2s', note: 'Show the location and mood.' },
  { id: '02', shot: 'Medium tracking shot', timing: '1.2s–2.4s', note: 'Follow the character toward the door.' },
  { id: '03', shot: 'Insert shot', timing: '2.4s–3.4s', note: 'Show the hand touching the glowing handle.' },
  { id: '04', shot: 'Close-up', timing: '3.4s–4.8s', note: 'Show emotion and wonder.' },
  { id: '05', shot: 'Over-the-shoulder', timing: '4.8s–6.0s', note: 'Reveal the movie world inside.' },
  { id: '06', shot: 'Push-in reveal', timing: '6.0s–7.5s', note: 'End with a cinematic reveal.' }
];

export function SimpleStoryboardCreator({ compact = false }: { compact?: boolean }) {
  const [scene, setScene] = useState(defaultScene);
  const [style, setStyle] = useState(styles[0]);
  const [status, setStatus] = useState<'idle' | 'working' | 'done'>('idle');
  const [selectedPanel, setSelectedPanel] = useState(basePanels[0]);
  const [fixText, setFixText] = useState('Make the shot warmer, more hopeful, and closer to the character.');
  const tokenEstimate = useMemo(() => Math.max(120, Math.min(220, scene.trim().length + 90)), [scene]);

  function generate() {
    setStatus('working');
    window.setTimeout(() => setStatus('done'), 650);
  }

  return (
    <section className={compact ? 'clean-generator compact' : 'clean-generator'} aria-label="Free storyboard generator">
      <div className="clean-generator-main card featured">
        <span className="badge premium">Free preview · No credit card</span>
        <h2>{compact ? 'Try one scene now' : 'Create your first storyboard'}</h2>
        <p>Paste a short scene, choose a style, and create a simple storyboard preview. The demo works immediately on staging without requiring payment or a login.</p>

        <div className="grid two">
          <label className="field">
            <span>Scene or story idea</span>
            <textarea value={scene} onChange={(event) => setScene(event.target.value)} />
          </label>
          <div>
            <label className="field">
              <span>Visual style</span>
              <select value={style} onChange={(event) => setStyle(event.target.value)}>
                {styles.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <div className="package-item">
              <strong>Simple estimate</strong>
              <span>{tokenEstimate} preview tokens · 6 panels · watermarked sample</span>
            </div>
            <button className="btn primary" type="button" onClick={generate} disabled={status === 'working'}>
              {status === 'working' ? 'Creating storyboard…' : status === 'done' ? 'Create again' : 'Create storyboard'}
            </button>
            {status !== 'idle' && (
              <div className="generation-progress" aria-label={status === 'done' ? 'Generation complete' : 'Generation in progress'}>
                <span style={{ width: status === 'done' ? '100%' : '58%' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="clean-panel-grid">
        {basePanels.map((panel) => (
          <button key={panel.id} type="button" className="story-frame-btn" onClick={() => setSelectedPanel(panel)}>
            <div className="clean-panel">
              <b>{panel.id}</b>
              <strong>{panel.shot}</strong>
              <small>{status === 'done' ? panel.timing : 'Preview panel'}</small>
              <small>{panel.note}</small>
            </div>
          </button>
        ))}
      </div>

      {!compact && (
        <div className="grid two">
          <div className="card">
            <span className="badge">Review selected panel</span>
            <h3>{selectedPanel.id} · {selectedPanel.shot}</h3>
            <p>{selectedPanel.note}</p>
            <div className="package-item">
              <strong>What you get next</strong>
              <span>Storyboard PDF, shot list CSV, prompt package JSON, animatic timing, ZIP export, and review link.</span>
            </div>
          </div>
          <div className="card">
            <span className="badge premium">Fix with plain English</span>
            <h3>Tell CineLoom what to change</h3>
            <label className="field">
              <span>Correction</span>
              <textarea value={fixText} onChange={(event) => setFixText(event.target.value)} />
            </label>
            <button className="btn primary" type="button">Preview correction</button>
          </div>
        </div>
      )}
    </section>
  );
}
