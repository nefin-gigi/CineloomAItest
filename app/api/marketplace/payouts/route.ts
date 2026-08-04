import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const payload = validation.data;
  const configured = Boolean(process.env.MARKETPLACE_PAYOUT_ENDPOINT && process.env.MARKETPLACE_PAYOUT_SECRET);
  return secureJson({
    ok: configured,
    mode: configured ? 'external_payout_endpoint_ready' : 'contract_ready_missing_endpoint',
    payoutRequest: payload,
    requiredFor10: ['MARKETPLACE_PAYOUT_ENDPOINT', 'MARKETPLACE_PAYOUT_SECRET', 'MARKETPLACE_PAYOUTS_APPROVED'],
    message: configured ? 'Forward this payout request to the marketplace payout endpoint.' : 'Marketplace payout architecture is present; configure payout endpoint before seller launch.'
  }, { status: configured ? 200 : 409 });
}
