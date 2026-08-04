'use client';

import { useState } from 'react';

export function ShareReviewPanel() {
  const [copied, setCopied] = useState(false);
  const reviewUrl = 'https://www.cineloom.ai/share/demo';

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(reviewUrl);
      setCopied(true);
    } catch {
      setCopied(true);
    }
  }

  return (
    <section className="simple-section share-review-panel" aria-label="Share for review">
      <div className="simple-section-head compact">
        <span className="section-kicker">Collaboration</span>
        <h2>Share with one simple link.</h2>
        <p>After export, users can send a safe review link to a producer, client, teacher, or team member.</p>
      </div>
      <div className="share-review-box">
        <div>
          <strong>Review link</strong>
          <span>{reviewUrl}</span>
        </div>
        <button className="btn primary" type="button" onClick={() => void copyLink()}>{copied ? 'Link ready' : 'Copy review link'}</button>
      </div>
    </section>
  );
}
