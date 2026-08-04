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
const shotPositions = [
  '0% 0%',
  '33.333% 0%',
  '66.667% 0%',
  '100% 0%',
  '0% 100%',
  '33.333% 100%',
  '66.667% 100%',
  '100% 100%'
];

export function WorkingStoryboardDemo() {
  const [scene, setScene] = useState(starter);
  const [style, setStyle] = useState(visualStyles[0].label);
  const [styleMenuOpen, setStyleMenuOpen] = useState(false);
  const [selectedShot, setSelectedShot] = useState(0);
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
          <div
            className="bd-style-picker"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setStyleMenuOpen(false);
            }}
          >
            <button
              className="bd-style-picker-trigger"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={styleMenuOpen}
              onClick={() => setStyleMenuOpen((open) => !open)}
            >
              <span>{style}</span>
              <span aria-hidden="true">⌄</span>
            </button>
            {styleMenuOpen && (
              <div className="bd-style-picker-menu" role="listbox" aria-label="Visual style">
                {visualStyles.map((visualStyle) => visualStyle.disabled ? (
                  <div
                    key={visualStyle.label}
                    className="bd-style-picker-option disabled"
                    role="option"
                    aria-disabled="true"
                    aria-selected="false"
                    tabIndex={0}
                    data-tooltip="Upgrade your plan to use."
                  >
                    {visualStyle.label}
                  </div>
                ) : (
                  <button
                    key={visualStyle.label}
                    className="bd-style-picker-option"
                    type="button"
                    role="option"
                    aria-selected={style === visualStyle.label}
                    onClick={() => {
                      setStyle(visualStyle.label);
                      setStyleMenuOpen(false);
                    }}
                  >
                    {visualStyle.label}
                  </button>
                ))}
              </div>
            )}
          </div>
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
          <small>{style}</small>
        </div>
        <div className="bd-storyboard-sheet">
          <img
            src="/storyboard-playground-shots.png"
            alt="Eight-shot playground storyboard showing a boy, a woman, and a ball"
          />
        </div>

        <div className="bd-shot-carousel" aria-label="Storyboard shot carousel">
          <div className="bd-shot-carousel-head">
            <strong>Browse individual shots</strong>
            <span>Shot {selectedShot + 1} of {shotPositions.length}</span>
          </div>
          <div
            className="bd-shot-frame"
            role="img"
            aria-label={`Storyboard shot ${selectedShot + 1}`}
            style={{ backgroundPosition: shotPositions[selectedShot] }}
          />
          <div className="bd-shot-controls">
            <button
              type="button"
              aria-label="Previous storyboard shot"
              onClick={() => setSelectedShot((current) => (current - 1 + shotPositions.length) % shotPositions.length)}
            >
              &larr;
            </button>
            <div className="bd-shot-dots" aria-label="Choose a storyboard shot">
              {shotPositions.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === selectedShot ? 'active' : ''}
                  aria-label={`Show storyboard shot ${index + 1}`}
                  aria-current={index === selectedShot ? 'true' : undefined}
                  onClick={() => setSelectedShot(index)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next storyboard shot"
              onClick={() => setSelectedShot((current) => (current + 1) % shotPositions.length)}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
