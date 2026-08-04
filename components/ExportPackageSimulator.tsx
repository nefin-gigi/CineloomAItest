'use client';

import { useState } from 'react';
import { v2ExportPreview } from '@/lib/v2-data';

export function ExportPackageSimulator() {
  const [generated, setGenerated] = useState(false);
  return (
    <>
      <div className="hero-card card featured">
        <div>
          <span className="badge premium">Real demo downloads</span>
          <h2 style={{ fontSize: '3.2rem', letterSpacing: '-0.08em', margin: '12px 0' }}>{generated ? 'Package Generated' : 'Ready to Export'}</h2>
          <p>{generated ? 'The director storyboard PDF, animatic MP4, shot list CSV, prompt JSON, QA report, pricing model, token table, and complete ZIP are ready to download.' : 'This export section uses real local files bundled in the Vercel package, so the demo feels tangible to directors, producers, and investors.'}</p>
          <div className="actions">
            <button className="btn primary" onClick={() => setGenerated(true)}>Generate Director Package</button>
            <a className="btn" href="/demo-package/cineloom-director-storyboard-package.pdf" download>Download PDF</a>
            <a className="btn ghost" href="/demo-package/cineloom-demo-export-package.zip" download>Download ZIP</a>
          </div>
        </div>
        <div className={`v2-export-preview ${generated ? 'generated' : ''}`}>
          <div className="v2-doc-cover"><strong>CineLoom Director Package</strong><span>The Silent Path · v3.0 Business Demo</span></div>
          <div className="v2-doc-row" /><div className="v2-doc-row short" /><div className="v2-doc-grid"><span /><span /><span /><span /></div>
        </div>
      </div>
      <div className="package-grid" style={{ marginTop: 18 }}>
        {v2ExportPreview.map((item) => (
          <a className="package-item download-card" href={item.href} download key={item.name}>
            <strong>{item.name}</strong>
            <span>{item.value}</span>
            <span className="badge premium">{generated ? 'Generated' : item.status}</span>
          </a>
        ))}
      </div>
    </>
  );
}
