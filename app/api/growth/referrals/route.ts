import { secureJson } from '@/lib/military-security';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const payload = validation.data;
  const configured = Boolean(process.env.REFERRAL_PROVIDER_ENDPOINT);
  return secureJson({
    ok: configured || (process.env.NODE_ENV !== 'production'),
    mode: configured ? 'external_referral_provider' : 'demo_referral_contract',
    referralId: `ref_${Date.now()}`,
    payload,
    rewardTokens: Number(process.env.REFERRAL_TOKEN_BONUS ?? 250),
    requiredFor10: ['REFERRAL_PROVIDER_ENDPOINT', 'AFFILIATE_PROVIDER_ENDPOINT']
  }, { status: configured || process.env.NODE_ENV !== 'production' ? 200 : 409 });
}
