import { NextResponse } from 'next/server';
import { audioCueSheet, animaticTimeline } from '@/lib/v1-data';

export async function POST() {
  return NextResponse.json({
    audioPlanType: 'dialogue-voice-music-sfx-rough-cut',
    cueSheet: audioCueSheet,
    timeline: animaticTimeline,
    providerMode: process.env.VOICE_PROVIDER_KEY || process.env.MUSIC_PROVIDER_KEY ? 'provider_enabled' : 'mock_demo_mode',
    reviewRequired: true
  });
}
