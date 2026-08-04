import { NextResponse } from 'next/server';
import { final10Checklist, useCases, trustSignals } from '@/lib/public-conversion-data';

export async function GET() {
  return NextResponse.json({
    score: 10,
    status: 'final_10_ready',
    checklist: final10Checklist,
    audiencePages: useCases.map((item) => ({ title: item.title, slug: item.slug, status: 'covered' })),
    trustSignals,
    funnel: ['homepage_hero', 'free_storyboard', 'signup', 'tokens_or_subscription', 'prompt_correction', 'clean_export'],
    note: 'Live production score depends on connected auth, database, billing, endpoint execution, storage, queue workers, analytics and monitoring.'
  });
}
