import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    checklist: [
      'Create workspace', 'Generate free 10-second storyboard', 'Review beat and shot plan', 'Correct one panel with a prompt', 'Export watermarked PDF', 'Upgrade for clean export'
    ].map((step, index) => ({ step, order: index + 1, status: index < 1 ? 'complete' : 'next' }))
  });
}
