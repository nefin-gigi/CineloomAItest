'use client';

import { useEffect } from 'react';

export function ConversionAnalyticsTracker({ pageName }: { pageName: string }) {
  useEffect(() => {
    const payload = {
      event: 'page_viewed',
      pageName,
      ts: new Date().toISOString(),
      path: window.location.pathname
    };
    void fetch('/api/analytics/funnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(() => undefined);
  }, [pageName]);
  return null;
}
