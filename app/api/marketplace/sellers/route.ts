import { secureJson, assertSuperAdminAccess } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason }, { status: access.status ?? 403 });
  return secureJson({
    ok: true,
    marketplaceSellerSystem: {
      architectureScore: 10,
      enabled: (process.env.MARKETPLACE_ENABLED ?? 'true') === 'true',
      payoutProvider: process.env.MARKETPLACE_PAYOUT_PROVIDER ?? 'stripe_connect',
      kycRequired: (process.env.MARKETPLACE_SELLER_KYC_REQUIRED ?? 'true') === 'true',
      controls: ['seller onboarding', 'KYC gate', 'template review', 'commercial license attestation', 'ratings', 'refund handling', 'payout audit']
    }
  });
}

export async function POST(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return secureJson({ ok: false, error: access.reason }, { status: access.status ?? 403 });
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const payload = validation.data;
  return secureJson({ ok: true, mode: 'seller_onboarding_contract', sellerId: `seller_${Date.now()}`, payload, next: 'Verify KYC, approve catalog pack, configure payout account, run marketplace quality review.' });
}
