import { NextResponse } from 'next/server';
import { generateLiveExportPackage } from '@/lib/live-export-runtime';
import { generationPackage } from '@/lib/pipeline';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId') ?? 'demo';
  const result = await generateLiveExportPackage(request, {
    projectId,
    workspaceId: searchParams.get('workspaceId') ?? 'demo',
    userId: searchParams.get('userId') ?? 'anonymous',
    exportTypes: (searchParams.get('exportTypes') ?? 'storyboard_pdf,shot_list_csv,prompt_json,qa_pdf,animatic_mp4,zip').split(',').filter(Boolean),
    watermark: searchParams.get('watermark') === 'true',
    delivery: 'both',
    idempotencyKey: searchParams.get('idempotencyKey') ?? `export_${projectId}_${Date.now()}`
  });

  return NextResponse.json({
    packageType: 'cineloom-video-generation-handoff',
    generatedAt: new Date().toISOString(),
    liveExport: result.body,
    demoFallbackPackage: generationPackage()
  }, { status: result.httpStatus, headers: result.headers });
}
