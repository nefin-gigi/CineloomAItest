import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    animatic: {
      durationSeconds: 14,
      frameRate: '24fps',
      aspectRatio: '2.39:1',
      timeline: [
        { panelId: 'panel-01', duration: 3, motion: 'slow push-in' },
        { panelId: 'panel-02', duration: 4, motion: 'tracking drift' },
        { panelId: 'panel-03', duration: 3, motion: 'locked hold' },
        { panelId: 'panel-04', duration: 4, motion: 'tilt down' }
      ]
    },
    reviewRequired: true
  });
}
