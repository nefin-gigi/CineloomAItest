import { NextResponse } from 'next/server';
import { jobStatus } from '@/lib/job-orchestrator';

export async function GET(request: Request) {
  const jobId = new URL(request.url).pathname.split('/').pop() ?? 'unknown';
  return NextResponse.json({ ok: true, job: jobStatus(jobId), message: 'Connect QUEUE_STATUS_URL for live worker status.' });
}
