import { NextResponse } from 'next/server';
import { marketplaceCatalog } from '@/lib/billion-platform-data';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET() {
  return NextResponse.json({ ok: true, templates: marketplaceCatalog, commissionModel: '15%-30% platform take rate', sellerStatus: 'endpoint-ready' });
}

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  return NextResponse.json({ ok: true, purchaseId: `mkt_${Date.now()}`, template: body.template ?? 'Cinematic Template', tokenBonus: 25, message: 'Marketplace purchase contract accepted in demo mode.' });
}
