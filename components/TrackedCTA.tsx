'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

type TrackedCTAProps = {
  href: string;
  event: string;
  label: string;
  className?: string;
  children: ReactNode;
  stage?: string;
  metadata?: Record<string, string | number | boolean>;
  download?: boolean;
};

export function TrackedCTA({ href, event, label, className = 'btn', children, stage = 'cta', metadata = {}, download = false }: TrackedCTAProps) {
  function track() {
    void fetch('/api/analytics/funnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        label,
        stage,
        path: window.location.pathname,
        metadata,
        ts: new Date().toISOString()
      }),
      keepalive: true
    }).catch(() => undefined);
  }

  if (download) {
    return (
      <a className={className} href={href} onClick={track} download>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={track}>
      {children}
    </Link>
  );
}
