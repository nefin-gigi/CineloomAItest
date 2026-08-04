'use client';

import { useMemo, useState } from 'react';
import { correctionPresets, sample10Storyboard, estimateTokens } from '@/lib/business-data';

const styles = ['Cinematic Realism', 'Photo Sketch', '3D Blocking', 'Family Animated', 'Pitch Deck Moodboard'];

export function Sample10StoryboardGenerator({ compactHero = false }: { compactHero?: boolean } = {}) {
  const [idea, setIdea] = useState('A young filmmaker opens a glowing studio door and sees their script become a living movie world.');
  const [style, setStyle] = useState(styles[0]);
  const [generated, setGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPanel, setSelectedPanel] = useState(sample10Storyboard.panels[0]);
  const [correction, setCorrection] = useState(correctionPresets[0]);
  const [activity, setActivity] = useState<string[]>([]);
  const tokenEstimate = useMemo(() => estimateTokens({ panels: 8, corrections: generated ? 1 : 0 }), [generated]);

  function track(event: string, metadata: Record<string, string | number | boolean> = {}) {
    void fetch('/api/analytics/funnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, stage: 'free-sample', path: window.location.pathname, metadata, ts: new Date().toISOString() }),
      keepalive: true
    }).catch(() => undefined);
  }

  function generate() {
    track('free_sample_started', { style, tokenEstimate });
    setIsGenerating(true);
    setProgress(20);
    setActivity((items) => ['Reading scene intent...', ...items].slice(0, 4));
    window.setTimeout(() => { setProgress(55); setActivity((items) => ['Planning camera beats and 180° geography...', ...items].slice(0, 4)); }, 260);
    window.setTimeout(() => { setProgress(82); setActivity((items) => [`Creating storyboard panels in ${style} style...`, ...items].slice(0, 4)); }, 560);
    window.setTimeout(() => {
      setProgress(100);
      setGenerated(true);
      setIsGenerating(false);
      setActivity((items) => [`Ready: 8 timed panels · ${tokenEstimate} estimated tokens`, ...items].slice(0, 4));
      track('free_sample_completed', { style, panels: 8, tokenEstimate });
    }, 920);
  }

  function applyCorrection() {
    track('prompt_correction_clicked', { panelId: selectedPanel.id, tokenCost: 18 });
    setActivity((items) => [`Correction queued for ${selectedPanel.id}: “${correction}”`, ...items].slice(0, 4));
  }

  return (
    <div className={compactHero ? 'grid sample-generator compact-generator' : 'grid sample-generator'}>
      <section className={compactHero ? 'card featured compact-sample-card' : 'card featured'}>
        <span className="badge premium">Free 10-second preview</span>
        <h2>{compactHero ? 'Try the product in one scene' : sample10Storyboard.title}</h2>
        <p>{compactHero ? 'Paste a short scene and see the workflow: scene intent, camera beats, timed panels, and export-ready next steps.' : sample10Storyboard.description}</p>
        <div className="rgb-strip" aria-hidden="true"><span className="red" /><span className="green" /><span className="blue" /></div>
        <div className="grid two">
          <label className="field">
            <span>Scene or story idea</span>
            <textarea value={idea} onChange={(event) => setIdea(event.target.value)} />
          </label>
          <div className="grid">
            <label className="field">
              <span>Visual style</span>
              <select value={style} onChange={(event) => setStyle(event.target.value)}>
                {styles.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <div className="package-item">
              <strong>Transparent estimate</strong>
              <span>{tokenEstimate} tokens · 8 panels · 10 seconds · watermarked preview</span>
            </div>
            <button className="btn primary generate-button" onClick={generate} disabled={isGenerating} type="button">
              {isGenerating ? 'Generating…' : generated ? 'Regenerate storyboard' : 'Generate storyboard'}
            </button>
            {(isGenerating || generated) && <div className="generation-progress" aria-label={`Generation progress ${progress}%`}><span style={{ width: `${progress}%` }} /></div>}
          </div>
        </div>
      </section>

      {compactHero && <section className={`compact-preview-strip always-visible ${generated ? 'is-generated' : 'is-preview'}`} aria-label={generated ? 'Generated storyboard preview' : 'Storyboard preview sample'}>
        {sample10Storyboard.panels.slice(0, 4).map((panel, index) => (
          <div className="mini-cinema-frame" key={panel.id}>
            <div className="mini-frame-number">{String(index + 1).padStart(2, '0')}</div>
            <strong>{panel.shot}</strong>
            <span>{generated ? panel.t : 'Preview'}</span>
          </div>
        ))}
      </section>}

      {!compactHero && <section className="grid four">
        {sample10Storyboard.panels.map((panel, index) => (
          <button key={panel.id} className={`story-frame-btn ${selectedPanel.id === panel.id ? 'active' : ''}`} onClick={() => setSelectedPanel(panel)} type="button">
            <div className="mini-cinema-frame">
              <div className="mini-frame-number">{String(index + 1).padStart(2, '0')}</div>
              <strong>{panel.shot}</strong>
              <span>{panel.t}</span>
            </div>
          </button>
        ))}
      </section>}

      {!compactHero && <section className="grid two">
        <div className="card">
          <span className="badge">Selected panel</span>
          <h3>{selectedPanel.id.toUpperCase()} · {selectedPanel.shot}</h3>
          <p className="muted">Timing: {selectedPanel.t}</p>
          <div className="package-item"><strong>Generated prompt</strong><span>{generated ? selectedPanel.prompt : 'Click Generate to create timed prompts and storyboard panels.'}</span></div>
          <div className="package-item"><strong>Suggested correction</strong><span>{selectedPanel.correction}</span></div>
        </div>
        <div className="card featured">
          <span className="badge premium">Prompt correction</span>
          <h3>Correct one panel without breaking continuity</h3>
          <p>Change lens, lighting, emotion, blocking, or composition while preserving story and character continuity.</p>
          <label className="field">
            <span>Correction prompt</span>
            <textarea value={correction} onChange={(event) => setCorrection(event.target.value)} />
          </label>
          <div className="actions">
            {correctionPresets.slice(1, 4).map((item) => <button className="btn" key={item} onClick={() => setCorrection(item)} type="button">{item.split(' ').slice(0, 4).join(' ')}...</button>)}
          </div>
          <button className="btn primary" onClick={applyCorrection} type="button">Apply correction · 18 tokens</button>
        </div>
      </section>}

      {activity.length > 0 && (
        <section className="card">
          <h3>Activity</h3>
          <div className="stage-checklist">
            {activity.map((item) => <div className="check" key={item}>✅ {item}</div>)}
          </div>
        </section>
      )}
    </div>
  );
}
