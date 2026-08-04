'use client';

import { useState } from 'react';

const exports = [
  { id: 'storyboard_pdf', label: 'Storyboard PDF', plan: 'Creator+' },
  { id: 'animatic_mp4', label: 'Animatic MP4', plan: 'Studio+' },
  { id: 'shot_list_csv', label: 'Shot list CSV', plan: 'Creator+' },
  { id: 'prompt_json', label: 'Prompt package JSON', plan: 'Creator+' },
  { id: 'qa_pdf', label: 'QA readiness PDF', plan: 'Studio+' },
  { id: 'complete_zip', label: 'Complete ZIP package', plan: 'Studio+' }
];

export function ProtectedExportCenter() {
  const [message, setMessage] = useState('Exports are served through authenticated API routes. Production should store private files in R2/S3 with signed URLs, not /public.');

  async function requestExport(exportId: string) {
    setMessage('Checking plan, token wallet, workspace role, and export permission...');
    const response = await fetch('/api/export/secure-download', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ exportId, plan: 'studio' }) });
    const data = await response.json();
    setMessage(data.message ?? 'Secure export request created.');
  }

  return (
    <div className="grid" style={{ gap: 22 }}>
      <section className="grid three">
        {exports.map((item) => <button className="card package-item v3-export-button" key={item.id} onClick={() => void requestExport(item.id)}><strong>{item.label}</strong><span>{item.plan} · authenticated download · token/plan checked</span></button>)}
      </section>
      <div className="success">{message}</div>
    </div>
  );
}
