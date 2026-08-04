'use client';

import Link from 'next/link';

export function AIHarnessIconLink({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={compact ? 'agent-icon-link compact' : 'agent-icon-link'} href="/studio/agent-harness" aria-label="Open AI harness">
      <span aria-hidden="true" className="agent-icon-glyph">✦</span>
      <span className="agent-icon-copy">
        <strong>AI Harness</strong>
        {!compact && <small>Change one board safely</small>}
      </span>
    </Link>
  );
}
