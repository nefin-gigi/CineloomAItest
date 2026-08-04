'use client';

import Link from 'next/link';
import { useState } from 'react';

const journeys = [
  {
    id: 'creator',
    title: 'Creator',
    subtitle: 'Turn a short idea into a shareable 10-second storyboard.',
    cta: 'Create free storyboard',
    href: '/create-free-storyboard',
    steps: ['Paste scene', 'Choose visual style', 'Generate panels', 'Share watermarked preview'],
    promise: 'Fast enough for YouTube Shorts, Reels, and music-video planning.'
  },
  {
    id: 'filmmaker',
    title: 'Filmmaker',
    subtitle: 'Move from screenplay to beats, shots, spatial layout, and animatic.',
    cta: 'Open studio workflow',
    href: '/studio',
    steps: ['Analyze script', 'Verify beats', 'Design shots', 'Export director package'],
    promise: 'Built around continuity, 180-degree geography, and director review.'
  },
  {
    id: 'producer',
    title: 'Producer',
    subtitle: 'Package a scene for funding, stakeholder review, and production planning.',
    cta: 'View flagship package',
    href: '/flagship-scene',
    steps: ['Preview proof scene', 'Review costs', 'Download package', 'Invite reviewers'],
    promise: 'Designed for pitch decks, pre-viz meetings, and investment conversations.'
  },
  {
    id: 'enterprise',
    title: 'Studio / Enterprise',
    subtitle: 'Secure private script workflows with governance and launch controls.',
    cta: 'Review enterprise trust',
    href: '/enterprise',
    steps: ['SSO/RBAC', 'Private assets', 'Audit evidence', 'Approved launch gate'],
    promise: 'Security-first architecture for protected scripts and production assets.'
  }
];

export function PersonaJourneySelector() {
  const [selected, setSelected] = useState(journeys[0]);
  return (
    <section className="conversion-section persona-journey-section" aria-labelledby="persona-journey-heading">
      <div className="section-kicker">Choose your path</div>
      <h2 id="persona-journey-heading">One product, four clear journeys.</h2>
      <p>Every visitor should know what to do next. CineLoom now routes creators, filmmakers, producers, and enterprise studios into the right workflow.</p>
      <div className="persona-journey-grid">
        <div className="persona-tabs" role="tablist" aria-label="CineLoom persona journeys">
          {journeys.map((journey) => (
            <button key={journey.id} className={selected.id === journey.id ? 'active' : ''} onClick={() => setSelected(journey)} role="tab" aria-selected={selected.id === journey.id}>
              <strong>{journey.title}</strong>
              <span>{journey.subtitle}</span>
            </button>
          ))}
        </div>
        <div className="persona-journey-card card featured">
          <span className="badge premium">{selected.title} mode</span>
          <h3>{selected.promise}</h3>
          <div className="journey-stepper">
            {selected.steps.map((step, index) => (
              <div className="journey-step" key={step}>
                <b>{index + 1}</b>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <Link href={selected.href} className="btn primary">{selected.cta}</Link>
        </div>
      </div>
    </section>
  );
}
