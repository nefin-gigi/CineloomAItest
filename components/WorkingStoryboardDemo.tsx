'use client';

import { useMemo, useState } from 'react';

const starter = 'A filmmaker opens a glowing studio door and steps into a living movie world.';
const panels = [
  ['01', 'Wide shot', 'Establish the location and mood.'],
  ['02', 'Tracking shot', 'Move with the character toward the door.'],
  ['03', 'Insert', 'Focus on the glowing handle.'],
  ['04', 'Close-up', 'Show the character’s wonder.'],
  ['05', 'Reveal', 'Show the world beyond the door.'],
  ['06', 'Export', 'Package the storyboard for review.']
];

export function WorkingStoryboardDemo() {
  const [scene, setScene] = useState(starter);
  const [style, setStyle] = useState('Cinematic sketch');
  const [done, setDone] = useState(false);
  const tokens = useMemo(() => Math.max(120, Math.min(240, scene.trim().length + 88)), [scene]);

  return (
    <section className="bd-demo-card" aria-label="Working storyboard preview">
      <div className="bd-demo-input">
        <div className="bd-section-eyebrow">Free preview</div>
        <h2>Try one scene now</h2>
        <p>Paste a scene. CineLoom shows a clear preview instantly on staging while live AI endpoints are connected.</p>
        <label className="bd-field">
          <span>Scene or story idea</span>
          <textarea value={scene} onChange={(event) => setScene(event.target.value)} />
        </label>
        <label className="bd-field">
          <span>Visual style</span>
          <select value={style} onChange={(event) => setStyle(event.target.value)}>
            <option>Cinematic sketch</option>
            <option>Realistic storyboard</option>
            <option>3D blocking</option>
            <option>Animated family style</option>
          </select>
        </label>
        <div className="bd-demo-row">
          <span>{tokens} preview tokens</span>
          <span>6 panels</span>
          <span>Watermarked</span>
        </div>
        <button className="bd-primary-button" type="button" onClick={() => setDone(true)}>
          {done ? 'Preview created' : 'Create storyboard preview'}
        </button>
      </div>
      <div className="bd-demo-output">
        <div className="bd-preview-header">
          <strong>{done ? 'Storyboard ready' : 'Preview will appear here'}</strong>
          <small>{style}</small>
        </div>
        <div className="bd-preview-panels">
          {panels.map(([num, title, body]) => (
            <article key={num} className={done ? 'active' : ''}>
              <b>{num}</b>
              <strong>{title}</strong>
              <small>{body}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
