import { NextResponse } from 'next/server';
import { enforcePlan } from '@/lib/v3-production-data';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const exportId = String(body.exportId ?? 'storyboard_pdf');
  const plan = String(body.plan ?? 'preview') as 'preview' | 'creator' | 'studio' | 'producer' | 'enterprise';
  const action = exportId.includes('animatic') || exportId.includes('complete') ? 'animatic_download' : 'clean_export';
  const check = enforcePlan(plan, action);
  if (!check.allowed) return NextResponse.json({ allowed: false, message: check.reason }, { status: 402 });
  return NextResponse.json({
    allowed: true,
    exportId,
    plan,
    signedUrlMode: process.env.STORAGE_MODE ?? 'demo',
    downloadUrl: `/demo-package/cineloom-demo-export-package.zip`,
    message: 'Secure export approved. Production should return a short-lived signed URL from private R2/S3 storage, not a public static file.'
  });
}
