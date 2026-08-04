import { NextResponse } from 'next/server';
import { generateLiveExportPackage } from '@/lib/live-export-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const result = await generateLiveExportPackage(request, {
    projectId: String(body.projectId ?? ''),
    workspaceId: String(body.workspaceId ?? 'demo'),
    userId: String(body.userId ?? 'anonymous'),
    exportTypes: Array.isArray(body.exportTypes) ? body.exportTypes.map(String) : undefined,
    watermark: Boolean(body.watermark ?? false),
    delivery: body.delivery === 'zip' || body.delivery === 'signed_urls' ? body.delivery : 'both',
    idempotencyKey: String(body.idempotencyKey ?? `export_live_${Date.now()}`)
  });
  return NextResponse.json(result.body, { status: result.httpStatus, headers: result.headers });
}
