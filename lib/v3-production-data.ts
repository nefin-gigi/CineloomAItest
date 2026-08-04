export type RevenuePlanId = 'preview' | 'creator' | 'studio' | 'producer' | 'enterprise';

export type RevenuePlan = {
  id: RevenuePlanId;
  name: string;
  price: number | 'Custom';
  audience: string;
  monthlyTokens: number | 'Custom';
  seats: number | 'Custom';
  projects: number | 'Unlimited' | 'Custom';
  commercialUse: boolean;
  watermark: boolean;
  priority: 'Standard' | 'Priority' | 'Dedicated';
  stripePriceEnv: string;
  features: string[];
  limits: string[];
  cta: string;
  popular?: boolean;
};

export const revenuePlans: RevenuePlan[] = [
  {
    id: 'preview',
    name: 'Free Preview',
    price: 0,
    audience: 'Film enthusiasts and first-time users',
    monthlyTokens: 250,
    seats: 1,
    projects: 1,
    commercialUse: false,
    watermark: true,
    priority: 'Standard',
    stripePriceEnv: 'STRIPE_PRICE_PREVIEW',
    features: ['One 10-second storyboard sample', 'Watermarked PDF export', 'Basic script validation', 'Prompt correction preview'],
    limits: ['No commercial usage', 'No animatic download', 'No team sharing'],
    cta: 'Create free sample'
  },
  {
    id: 'creator',
    name: 'Creator',
    price: 29,
    audience: 'YouTube creators, writers, film students, short-form storytellers',
    monthlyTokens: 2000,
    seats: 1,
    projects: 10,
    commercialUse: true,
    watermark: false,
    priority: 'Standard',
    stripePriceEnv: 'STRIPE_PRICE_CREATOR',
    features: ['Clean storyboard PDF exports', 'Prompt-driven corrections', 'Static storyboard generation', 'YouTube Shorts package'],
    limits: ['Standard generation queue', 'Single seat workspace'],
    cta: 'Start Creator'
  },
  {
    id: 'studio',
    name: 'Studio',
    price: 149,
    audience: 'Indie filmmakers, production teams, ad agencies, churches, education studios',
    monthlyTokens: 12000,
    seats: 5,
    projects: 100,
    commercialUse: true,
    watermark: false,
    priority: 'Priority',
    stripePriceEnv: 'STRIPE_PRICE_STUDIO',
    features: ['Dynamic animatic export', 'Team roles and approvals', 'Character/location locks', 'Director/investor export package'],
    limits: ['Overages require token packs'],
    cta: 'Start Studio',
    popular: true
  },
  {
    id: 'producer',
    name: 'Producer',
    price: 399,
    audience: 'Production houses and creative teams managing multiple films',
    monthlyTokens: 40000,
    seats: 15,
    projects: 'Unlimited',
    commercialUse: true,
    watermark: false,
    priority: 'Priority',
    stripePriceEnv: 'STRIPE_PRICE_PRODUCER',
    features: ['Priority queue', 'Advanced export packages', 'Private review links', 'Cost routing dashboard', 'Admin analytics'],
    limits: ['Dedicated support add-on available'],
    cta: 'Start Producer'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    audience: 'Studios, streaming teams, enterprise media groups, private IP teams',
    monthlyTokens: 'Custom',
    seats: 'Custom',
    projects: 'Custom',
    commercialUse: true,
    watermark: false,
    priority: 'Dedicated',
    stripePriceEnv: 'STRIPE_PRICE_ENTERPRISE',
    features: ['Dedicated workspace', 'Custom providers/models', 'SSO-ready architecture', 'Data retention policy', 'SLA and onboarding'],
    limits: ['Sales-assisted setup'],
    cta: 'Contact sales'
  }
];

export const tokenPricing = [
  { feature: '10-second sample storyboard', tokens: 180, marginGuard: 'Blocks if wallet < 180 tokens', revenueMoment: 'Try-before-subscribe funnel' },
  { feature: 'Storyboard panel generation', tokens: 45, marginGuard: 'Refunds failed provider generations', revenueMoment: 'Core creator usage' },
  { feature: 'Prompt-driven panel correction', tokens: 18, marginGuard: 'Locks can prevent costly full regeneration', revenueMoment: 'High-frequency micro-usage' },
  { feature: 'Scene shot design', tokens: 35, marginGuard: 'Text-only low-cost generation', revenueMoment: 'Pre-production value' },
  { feature: '10-second animatic', tokens: 320, marginGuard: 'Requires paid plan or token pack', revenueMoment: 'Paid upgrade trigger' },
  { feature: 'Clean export package', tokens: 75, marginGuard: 'Preview users get watermark only', revenueMoment: 'Conversion and sharing' }
];

export const revenueMetrics = [
  { label: 'MRR target', value: '$25K', detail: '170 Studio users or blended creator/studio mix' },
  { label: 'Free → paid target', value: '8–12%', detail: 'Driven by 10-second sample export funnel' },
  { label: 'Gross margin target', value: '70%+', detail: 'Token cost must exceed provider costs by tier' },
  { label: 'Aha moment', value: '<90 sec', detail: 'User sees first storyboard sample before signup friction' },
  { label: 'Retention hook', value: 'Projects', detail: 'Saved storyboards, corrections, exports, token refreshes' },
  { label: 'Expansion path', value: 'Teams', detail: 'Producer plan seats, review links, collaboration' }
];

export const productionReadiness = [
  { area: 'Authentication', status: 'Production scaffold', requirement: 'Connect real auth provider or Supabase Auth before public launch.' },
  { area: 'Billing', status: 'Stripe-ready', requirement: 'Set Stripe keys, price IDs, webhook secret, and customer portal configuration.' },
  { area: 'Tokens', status: 'Revenue rules added', requirement: 'Persist token ledger in Postgres/Supabase and reconcile webhooks.' },
  { area: 'AI generation', status: 'Provider-ready', requirement: 'Set image/video/voice/music provider keys and queue workers.' },
  { area: 'Protected exports', status: 'Authenticated route pattern added', requirement: 'Move private assets from public storage to signed URLs/R2/S3.' },
  { area: 'Legal', status: 'Launch pages added', requirement: 'Have counsel review terms, privacy, refund, copyright, and commercial policies.' },
  { area: 'Analytics', status: 'Admin dashboard added', requirement: 'Connect events, conversion tracking, MRR, costs, churn, and usage metrics.' }
];

export const launchFunnelSteps = [
  'Visitor lands on public marketing site',
  'Creates free 10-second storyboard sample',
  'Sees watermarked preview and token estimate',
  'Creates account to save project',
  'Subscribes or buys token pack to remove watermark/export',
  'Uses prompt corrections with continuity locks',
  'Exports clean director package',
  'Returns for larger storyboard/animatic project'
];

export const templateLibrary = [
  { name: 'Biblical Epic', audience: 'Faith films and church media', styles: 'Cinematic realism, warm desert, emotional close-ups' },
  { name: 'Indie Drama', audience: 'Short films and festivals', styles: 'Naturalistic, handheld, intimate frames' },
  { name: 'YouTube Shorts Story', audience: 'Creators and reels', styles: '9:16, fast beats, expressive captions' },
  { name: 'Kids Storybook', audience: 'Family animation', styles: 'Friendly 2D animation without copying protected shows' },
  { name: 'Thriller Proof Scene', audience: 'Genre filmmakers', styles: 'Blue shadows, strong silhouettes, suspense pacing' },
  { name: 'Commercial Spot', audience: 'Agencies and brands', styles: '30-second ad board, product inserts, CTA ending' }
];

export function enforcePlan(plan: RevenuePlanId, action: string) {
  const selected = revenuePlans.find((item) => item.id === plan) ?? revenuePlans[0];
  const paid = selected.price !== 0;
  const actionsRequiringPaid = new Set(['clean_export', 'animatic_download', 'commercial_use', 'team_invite', 'remove_watermark']);
  const allowed = !actionsRequiringPaid.has(action) || paid;
  return {
    allowed,
    plan: selected.id,
    action,
    watermark: selected.watermark,
    commercialUse: selected.commercialUse,
    reason: allowed ? 'Allowed by current plan.' : 'Upgrade required for clean export, animatic download, commercial use, or team collaboration.'
  };
}

export function estimateRevenueTokens({ panels = 8, corrections = 2, animaticSeconds = 10, exports = 1 } = {}) {
  return panels * 45 + corrections * 18 + Math.ceil(animaticSeconds / 10) * 320 + exports * 75;
}
