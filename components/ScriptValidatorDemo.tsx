'use client';

import { useState } from 'react';
import Link from 'next/link';
import { v2DemoScript } from '@/lib/v2-data';

const validationStates = {
  ready: 'Ready to validate a pasted screenplay or uploaded script.',
  validated: 'Validation complete: scene heading, action lines, dialogue, runtime estimate, and source trace are ready.',
  parsed: 'Parsing complete: 1 scene, 1 character, 8 shots, 8 storyboard panels, and 6 export artifacts prepared.'
};

export function ScriptValidatorDemo() {
  const [status, setStatus] = useState<keyof typeof validationStates>('ready');
  const [script, setScript] = useState(v2DemoScript);

  return (
    <div className="split">
      <div className="card featured">
        <h3>Try the script-to-output path</h3>
        <div className="field"><label>Upload script file</label><input className="input" type="file" /></div>
        <div className="field"><label>Or paste screenplay</label><textarea value={script} onChange={(event) => setScript(event.target.value)} /></div>
        <div className="actions">
          <button className="btn primary" onClick={() => setStatus('validated')}>Run validation</button>
          <button className="btn" onClick={() => setStatus('parsed')}>Parse script</button>
          <button className="btn ghost" onClick={() => { setScript(v2DemoScript); setStatus('ready'); }}>Load demo script</button>
        </div>
        <div className="rail-note next-action-card" style={{ marginTop: 14 }}><strong>Result</strong><span>{validationStates[status]}</span></div>
      </div>
      <div className="card">
        <h3>Validation results</h3>
        <div className="checklist">
          <div className="check"><span>Scene headings detected</span><span>{status === 'ready' ? 'Ready' : 'Pass'}</span></div>
          <div className="check"><span>Character dialogue detected</span><span>{status === 'ready' ? 'Ready' : 'Pass'}</span></div>
          <div className="check"><span>Action lines detected</span><span>{status === 'ready' ? 'Ready' : 'Pass'}</span></div>
          <div className="check"><span>Estimated runtime</span><strong>{status === 'ready' ? 'Pending' : '24 sec demo / 14-17 min full script'}</strong></div>
          <div className="check"><span>Source traceability</span><span>{status === 'parsed' ? 'Locked to beats/panels' : 'Pending parse'}</span></div>
          <div className="check"><span>Export readiness</span><span>{status === 'parsed' ? 'PDF, MP4, CSV, JSON, ZIP ready' : 'Pending'}</span></div>
        </div>
        <div className="actions" style={{ marginTop: 16 }}>
          <Link className="btn primary" href="/studio/complete-sample-scene">View generated sample</Link>
          <Link className="btn" href="/studio/beat-verification">Open beat verification</Link>
        </div>
      </div>
    </div>
  );
}
