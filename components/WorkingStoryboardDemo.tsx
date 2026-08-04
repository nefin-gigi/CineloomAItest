'use client';

import { useMemo, useState } from 'react';

const starter = 'A filmmaker opens a glowing studio door and steps into a living movie world.';
const visualStyles = [
  { label: 'Sketch', disabled: false },
  { label: 'Cinematic Realism', disabled: false },
  { label: 'Natural', disabled: false },
  { label: 'Dynamic / Comic Book Storyboard', disabled: true },
  { label: 'Doodle Storyboard', disabled: true },
  { label: 'Anime Style Storyboard', disabled: true }
];
const shots = Array.from({ length: 8 }, (_, index) => index + 1);

export function WorkingStoryboardDemo() {
  const [scene, setScene] = useState(starter);
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
          <select defaultValue="Sketch">
            {visualStyles.map((visualStyle) => (
              <option
                key={visualStyle.label}
                value={visualStyle.label}
                disabled={visualStyle.disabled}
                title={visualStyle.disabled ? 'Upgrade your plan to use.' : undefined}
              >
                {visualStyle.label}
              </option>
            ))}
          </select>
        </label>
        <div className="bd-demo-row">
          <span>{tokens} preview tokens</span>
          <span>8 panels</span>
          <span>Watermarked</span>
        </div>
        <button className="bd-primary-button" type="button" onClick={() => setDone(true)}>
          {done ? 'Preview created' : 'Create storyboard preview'}
        </button>
      </div>

      <div className="bd-demo-output">
        <div className="bd-preview-header">
          <strong>{done ? 'Storyboard ready' : 'Storyboard preview'}</strong>
          <small>8 image-only shots</small>
        </div>
        <div className="bd-storyboard-sheet">
          <img
            src="/storyboard-playground-shots.png"
            alt="Eight-shot playground storyboard showing a boy, a woman, and a ball"
          />
        </div>

        <div className="bd-shot-carousel" aria-label="Storyboard shot carousel">
          {shots.map((shot) => (
            <input
              key={shot}
              className="bd-shot-radio"
              type="radio"
              name="storyboard-shot"
              id={`storyboard-shot-${shot}`}
              defaultChecked={shot === 1}
            />
          ))}
          {shots.map((shot) => {
            const previous = shot === 1 ? shots.length : shot - 1;
            const next = shot === shots.length ? 1 : shot + 1;
            return (
              <div className={`bd-shot-slide bd-shot-slide-${shot}`} key={shot}>
                <div className="bd-shot-carousel-head">
                  <strong>Browse individual shots</strong>
                  <span>Shot {shot} of {shots.length}</span>
                </div>
                <div className={`bd-shot-frame bd-shot-frame-${shot}`} role="img" aria-label={`Storyboard shot ${shot}`} />
                <div className="bd-shot-controls">
                  <label htmlFor={`storyboard-shot-${previous}`} aria-label="Previous storyboard shot">&larr;</label>
                  <div className="bd-shot-dots" aria-label="Choose a storyboard shot">
                    {shots.map((targetShot) => (
                      <label
                        key={targetShot}
                        htmlFor={`storyboard-shot-${targetShot}`}
                        className={targetShot === shot ? 'active' : ''}
                        aria-label={`Show storyboard shot ${targetShot}`}
                      />
                    ))}
                  </div>
                  <label htmlFor={`storyboard-shot-${next}`} aria-label="Next storyboard shot">&rarr;</label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
