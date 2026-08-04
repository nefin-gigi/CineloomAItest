'use client';

import { useState } from 'react';
import { v2StoryboardFrames } from '@/lib/v2-data';
import { StoryboardFramePro } from './StoryboardFramePro';

export function AnimaticPreview() {
  const [frameIndex, setFrameIndex] = useState(0);
  const frame = v2StoryboardFrames[frameIndex];

  function advance() {
    setFrameIndex((index) => (index + 1) % v2StoryboardFrames.length);
  }

  return (
    <div className="split">
      <div className="card featured">
        <div className="pipeline-header">
          <div>
            <span className="badge premium">Playable MP4 included</span>
            <h3>Complete sample animatic</h3>
          </div>
          <a className="btn primary" href="/demo-package/cineloom-animatic-preview.mp4" download>Download MP4</a>
        </div>
        <video className="sample-video large" src="/demo-package/cineloom-animatic-preview.mp4" controls poster="/demo-frames-premium/premium-panel-01.png" />
        <div className="v2-frame-nav wide">
          {v2StoryboardFrames.map((item, index) => (
            <button key={item.id} className={index === frameIndex ? 'active' : ''} onClick={() => setFrameIndex(index)}>{item.panelNumber}</button>
          ))}
        </div>
        <StoryboardFramePro src={frame.image} title={`Storyboard reference · ${frame.title}`} meta={`${frame.camera} · ${frame.emotion}`} priority />
        <div className="actions"><button className="btn" onClick={advance}>Advance reference frame</button><button className="btn" onClick={() => setFrameIndex(0)}>Restart reference</button><a className="btn ghost" href="/demo-package/cineloom-director-storyboard-package.pdf" download>Download storyboard PDF</a></div>
      </div>
      <div className="card">
        <h3>Output controls</h3>
        <div className="grid two">
          <div className="field"><label>Aspect ratio</label><select><option>2.39:1 Cinemascope</option><option>16:9 YouTube</option><option>9:16 Shorts</option></select></div>
          <div className="field"><label>Frame rate</label><select><option>24 fps cinematic</option><option>30 fps</option></select></div>
          <div className="field"><label>Default motion</label><select><option>Slow push-in</option><option>Static hold</option><option>Pan left to right</option><option>Parallax drift</option></select></div>
          <div className="field"><label>Transition style</label><select><option>Hard cut</option><option>Dissolve</option><option>Fade through black</option></select></div>
        </div>
        <div className="checklist">
          <div className="check"><span>Dialogue track</span><span>Screenplay VO locked</span></div>
          <div className="check"><span>Music mood</span><span>Emotional cinematic score</span></div>
          <div className="check"><span>SFX</span><span>Wind, footsteps, robe movement</span></div>
          <div className="check"><span>Director note</span><span>{frame.emotion}</span></div>
          <div className="check"><span>Export status</span><span>MP4 bundled and downloadable</span></div>
        </div>
      </div>
    </div>
  );
}
