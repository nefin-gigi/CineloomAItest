import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { resolveProtectedAsset, canDownloadProtectedAsset } from '@/lib/protected-assets';
import { assertLivePaidSaaSAllowed } from '@/lib/live-paid-saas';

async function requestSignedUrl(input: { assetId: string; workspaceId: string; userId: string }) {
  const endpoint = process.env.PRIVATE_STORAGE_SIGNED_URL_ENDPOINT;
  const secret = process.env.EXEC_STORAGE_SECRET ?? process.env.S3_SECRET_ACCESS_KEY ?? process.env.R2_SECRET_ACCESS_KEY;
  if (!endpoint || !secret) return null;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-cineloom-storage-secret': secret },
    body: JSON.stringify({ ...input, ttlSeconds: Number(process.env.SIGNED_URL_TTL_SECONDS ?? 900), purpose: 'authenticated_customer_export_download' })
  });
  return { ok: response.ok, status: response.status, data: await response.json().catch(() => ({})) };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const assetId = url.searchParams.get('assetId') ?? 'flagship_package';
  const publicDemo = url.searchParams.get('publicDemo') === 'true';
  const store = await cookies();
  const session = store.get('cineloom_user_session')?.value || store.get('cineloom_launch_gate')?.value || '';
  const hasSession = Boolean(session);

  if (!canDownloadProtectedAsset({ hasSession, isPublicDemo: publicDemo })) {
    return NextResponse.json({ ok: false, message: 'Authentication required for customer exports.' }, { status: 401 });
  }

  if (!publicDemo && process.env.LIVE_PAID_SAAS_MODE === 'live') {
    const gate = assertLivePaidSaaSAllowed('protected_asset_download');
    if (!gate.allowed) return NextResponse.json({ ok: false, error: gate.reason, readiness: gate.readiness }, { status: gate.status ?? 503 });
  }

  const signed = await requestSignedUrl({ assetId, workspaceId: url.searchParams.get('workspaceId') ?? 'demo_workspace', userId: session.slice(0, 24) || 'demo_user' });
  if (signed) return NextResponse.json({ ok: signed.ok, mode: 'signed-url', assetId, ...signed.data }, { status: signed.status });

  const demoPath = resolveProtectedAsset(assetId);
  if (!demoPath) return NextResponse.json({ ok: false, message: 'Unknown asset.' }, { status: 404 });
  return NextResponse.redirect(new URL(demoPath, request.url));
}
