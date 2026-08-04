'use client';

import { useEffect } from 'react';

export function GlobalAnalyticsTracker() {
  useEffect(() => {
    const send = (payload: Record<string, unknown>) => {
      void fetch('/api/analytics/funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, ts: new Date().toISOString(), path: window.location.pathname }),
        keepalive: true
      }).catch(() => undefined);
    };

    send({ event: 'page_viewed_global', referrer: document.referrer || 'direct' });

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a,button') as HTMLElement | null;
      if (!anchor) return;
      const label = anchor.getAttribute('aria-label') || anchor.textContent?.trim()?.slice(0, 80) || 'unlabeled';
      const href = anchor instanceof HTMLAnchorElement ? anchor.href : undefined;
      send({ event: 'ui_action_clicked', label, href, tag: anchor.tagName.toLowerCase() });
    };

    window.addEventListener('click', handler, { capture: true });
    return () => window.removeEventListener('click', handler, { capture: true });
  }, []);

  return null;
}
