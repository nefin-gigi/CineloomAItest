'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { v2DemoScript, v2ExportPreview, v2QuickRevisions, v2SimpleStages, v2StoryboardFrames } from '@/lib/v2-data';
import { StoryboardFramePro } from './StoryboardFramePro';

const actionResponses: Record<string, string> = {
  play: 'Guided demo loaded: complete sample scene, premium frames, MP4 animatic, and export package are ready.',
  revise: 'Revision simulated: close-up emotional intensity increased while lens, wardrobe, location, and staff locks stayed protected.',
  approve: 'Director approval saved: selected panels are locked and forwarded to the animatic timeline.',
  export: 'Download package ready: storyboard PDF, animatic MP4, shot list, prompt JSON, QA report, and ZIP are available.'
};

export function DirectorDemoExperience() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [log, setLog] = useState<string[]>([actionResponses.play]);
  const stage = v2SimpleStages[stepIndex];
  const frame = v2StoryboardFrames[selectedFrame];

  const readiness = useMemo(() => Math.round(v2SimpleStages.reduce((sum, item) => sum + item.score, 0) / v2SimpleStages.length), []);

  function pushLog(key: keyof typeof actionResponses) {
    setLog((existing) => [actionResponses[key], ...existing].slice(0, 4));
  }

  function nextStage() {
    setStepIndex((index) => (index + 1) % v2SimpleStages.length);
    setSelectedFrame((index) => (index + 1) % v2StoryboardFrames.length);
  }

  return (
    <div className="v2-demo-experience">
      <section className="v2-demo-hero card featured">
        <div>
          <span className="badge premium">CineLoom v3.0 · director demo + business model</span>
          <h2>One complete scene: script to export package</h2>
          <p>
            Show a director the entire CineLoom promise in one controlled flow: script intelligence, verified beats,
            professional shot design, 180° continuity, premium storyboard frames, a playable MP4 animatic, QA,
            and real downloadable export artifacts.
          </p>
          <div className="v2-command-row">
            <button className="btn primary" onClick={() => { setIsPlaying(true); pushLog('play'); }}>Play guided demo</button>
            <button className="btn" onClick={() => { pushLog('revise'); setSelectedFrame(2); }}>Make frame more cinematic</button>
            <button className="btn" onClick={() => { pushLog('approve'); nextStage(); }}>Approve & continue</button>
            <a className="btn ghost" href="/demo-package/cineloom-demo-export-package.zip" download onClick={() => pushLog('export')}>Download export ZIP</a>
          </div>
        </div>
        <div className="v2-readiness-orb">
          <strong>{readiness}%</strong>
          <span>Demo readiness</span>
          <div className="cinema-meter"><span style={{ width: `${readiness}%` }} /></div>
        </div>
      </section>

      <section className="v2-stage-strip">
        {v2SimpleStages.map((item, index) => (
          <button key={item.id} onClick={() => setStepIndex(index)} className={`v2-stage-button ${index === stepIndex ? 'active' : ''}`}>
            <strong>{item.label}</strong>
            <span>{item.score}%</span>
          </button>
        ))}
      </section>

      <section className="v2-director-grid">
        <div className="card v2-script-card">
          <div className="eyebrow">Current stage</div>
          <h3>{stage.label}</h3>
          <p>{stage.proof}</p>
          <pre>{v2DemoScript}</pre>
          <div className="actions">
            <Link href={stage.href} className="btn primary">Open full screen</Link>
            <Link href="/studio/complete-sample-scene" className="btn">Complete sample scene</Link>
            <button className="btn" onClick={nextStage}>Next stage</button>
          </div>
        </div>

        <div className="card v2-frame-viewer">
          <StoryboardFramePro src={frame.image} title={`${frame.panelNumber} · ${frame.title}`} meta={`${frame.shotType} · ${frame.emotion}`} priority />
          <div className="v2-frame-details">
            <div>
              <span className="badge premium">{frame.status}</span>
              <h3>{frame.title}</h3>
              <p><strong>{frame.camera}</strong></p>
              <p>{frame.note}</p>
            </div>
            <div className="v2-frame-nav">
              {v2StoryboardFrames.map((item, index) => (
                <button key={item.id} className={index === selectedFrame ? 'active' : ''} onClick={() => setSelectedFrame(index)}>
                  {item.panelNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid three" style={{ marginTop: 18 }}>
        <div className="card">
          <span className="badge premium">Director quick revisions</span>
          <h3>Prompt-free creative control</h3>
          <div className="v2-revision-list">
            {v2QuickRevisions.map((item) => (
              <button key={item} onClick={() => pushLog('revise')}>{item}</button>
            ))}
          </div>
        </div>
        <div className="card">
          <span className="badge premium">Playable MP4 animatic</span>
          <h3>{isPlaying ? 'Playing complete sample' : 'Ready to play'}</h3>
          <video className="sample-video" src="/demo-package/cineloom-animatic-preview.mp4" controls poster="/demo-frames-premium/premium-panel-01.png" />
          <div className="timeline mini">
            {['P01 3s', 'P02 3s', 'P03 3s', 'P04 3s', 'P05 3s', 'P06 3s'].map((item) => <div className="timeline-cell" key={item}>{item}</div>)}
          </div>
          <a className="btn primary" href="/demo-package/cineloom-animatic-preview.mp4" download>Download MP4</a>
        </div>
        <div className="card">
          <span className="badge premium">Live action log</span>
          <h3>Every primary action produces feedback</h3>
          <div className="v2-log-list">
            {log.map((item, index) => <div key={`${item}-${index}`} className="rail-note"><strong>{index === 0 ? 'Latest' : 'Saved'}</strong><span>{item}</span></div>)}
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <div className="pipeline-header">
          <div>
            <div className="eyebrow">Export proof</div>
            <h2>Director package downloads</h2>
          </div>
          <a className="btn primary" href="/demo-package/cineloom-demo-export-package.zip" download onClick={() => pushLog('export')}>Download Complete ZIP</a>
        </div>
        <div className="package-grid">
          {v2ExportPreview.map((item) => (
            <a className="package-item download-card" key={item.name} href={item.href} download>
              <strong>{item.name}</strong>
              <span>{item.value}</span>
              <span className="badge premium">{item.status}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
