'use client';

import { useState } from 'react';

export function WorkflowActions({ nextLabel = 'Approve & Continue', helper = 'Revision history is saved automatically for director review.' }: { nextLabel?: string; helper?: string }) {
  const [message, setMessage] = useState(helper);
  return (
    <div className="workflow-actions">
      <div className="workflow-helper">{message}</div>
      <div className="actions">
        <button className="btn ghost" onClick={() => setMessage('AI improvement simulated: stronger emotion, same lens, same character, same continuity locks.')}>Ask AI to improve</button>
        <button className="btn" onClick={() => setMessage('Draft saved with timestamp, comments, and version history.')}>Save draft</button>
        <button className="btn primary" onClick={() => setMessage(`${nextLabel} completed. Downstream workflow is now ready.`)}>{nextLabel}</button>
      </div>
    </div>
  );
}
