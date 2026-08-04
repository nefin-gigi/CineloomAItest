export type ScoreStatus = '10/10 endpoint-ready' | '10/10 demo-ready' | 'requires live endpoint';

export type SaaSScore = {
  area: string;
  audience: string;
  score: string;
  status: ScoreStatus;
  productionControl: string;
  customerValue: string;
  endpointContract: string;
};

export const saas10Scores: SaaSScore[] = [
  {
    area: 'First impression and brand trust',
    audience: 'Film enthusiasts, investors, directors',
    score: '10/10',
    status: '10/10 demo-ready',
    productionControl: 'Public funnel, private launch gate, cinema RGB design, examples, pricing, support and status pages.',
    customerValue: 'Visitors immediately understand the promise: script to storyboard, animatic and production package.',
    endpointContract: 'Marketing pages render without external services; analytics event endpoint captures conversion.'
  },
  {
    area: 'Free-to-paid conversion funnel',
    audience: 'Creators and indie filmmakers',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Free 10-second storyboard, watermark, signup capture, token estimate, upgrade prompt, clean export paywall.',
    customerValue: 'User sees value before paying, then pays to export, remove watermark or continue the project.',
    endpointContract: '/api/storyboard/free-sample, /api/entitlements/check, /api/analytics/funnel'
  },
  {
    area: 'Subscription, token and entitlement controls',
    audience: 'Paying subscribers, producers, finance admins',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Plan entitlements, token reserve/commit/refund, usage ledger, plan limits and add-on packs.',
    customerValue: 'Customers know exactly what they can generate and how many tokens each action costs.',
    endpointContract: '/api/tokens/reserve, /api/tokens/commit, /api/tokens/refund, /api/entitlements/check'
  },
  {
    area: 'Film workflow depth',
    audience: 'Screenwriters, directors, cinematographers',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Script parsing, beat verification, scene breakdown, 5 Cs shot design, 180-degree spatial layout, static storyboard and animatic.',
    customerValue: 'CineLoom feels like a film pre-production platform, not a generic AI image tool.',
    endpointContract: 'Execution endpoints for script, beats, scenes, shots, layout, storyboard and animatic.'
  },
  {
    area: 'Prompt-driven creative revision',
    audience: 'Directors and creators',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Prompt corrections, continuity locks, version history, before/after comparison and selective regeneration.',
    customerValue: 'Directors can say “make it more emotional” instead of wrestling with raw AI prompts.',
    endpointContract: '/api/storyboard/correct-panel through execution endpoint storyboard.correction'
  },
  {
    area: 'Exports and deliverables',
    audience: 'Producers, agencies, investors',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Storyboard PDF, shot list CSV, prompt package JSON, QA report, animatic MP4, zip package, signed downloads.',
    customerValue: 'The buyer leaves with a usable director or investor package.',
    endpointContract: '/api/export/package and /api/export/secure-download backed by export rendering endpoint.'
  },
  {
    area: 'Team collaboration',
    audience: 'Production teams and agencies',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Workspace roles, invite flow, review assignments, approvals, comments, change history and watermarked share links.',
    customerValue: 'Teams can review and approve storyboards without sharing raw files by email.',
    endpointContract: 'Workspace/member tables plus support for share/review APIs.'
  },
  {
    area: 'Enterprise security and compliance',
    audience: 'Studios, enterprises, production houses',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'SSO/SAML/SCIM contracts, audit logs, private project mode, data retention, IP rights receipts and model-training opt-out.',
    customerValue: 'Studios can evaluate CineLoom without feeling their scripts are exposed.',
    endpointContract: '/api/enterprise/compliance-pack and Super Admin security posture controls.'
  },
  {
    area: 'Reliability at 2,000 concurrent users',
    audience: 'All paying users',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Queue-first jobs, rate limits, circuit breakers, health endpoints, SLOs, trace IDs and load-test plans.',
    customerValue: 'Users see stable progress and clear status during heavy generation periods.',
    endpointContract: '/api/jobs/submit, /api/health/deep, /api/super-admin/scale-readiness'
  },
  {
    area: 'Support and customer success',
    audience: 'All customers',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Help center structure, ticket API, onboarding checklist, success playbooks, billing support and status page.',
    customerValue: 'Customers know where to get help and how to get their first successful storyboard.',
    endpointContract: '/api/support/ticket, /api/customer/onboarding, /api/status/service'
  },
  {
    area: 'Growth, SEO and viral loops',
    audience: 'Creators and public visitors',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Example gallery, share/remix, referral token credits, niche landing pages, template marketplace and social preview paths.',
    customerValue: 'Users can share outputs and pull new customers into CineLoom organically.',
    endpointContract: '/api/platform/public-share, /api/platform/remix, /api/growth/referral'
  },
  {
    area: 'Super Admin operations',
    audience: 'CineLoom operators and technical admins',
    score: '10/10',
    status: '10/10 endpoint-ready',
    productionControl: 'Connector registry, execution endpoints, feature flags, security posture, revenue ops, support ops and launch gates.',
    customerValue: 'CineLoom can swap providers and scale without redesigning the UI.',
    endpointContract: '/api/super-admin/* control plane APIs.'
  }
];

export const customerSegments = [
  { segment: 'Film enthusiasts', score: '10/10', promise: 'Create a cinematic mini storyboard from an idea in minutes.', conversion: 'Free 10-second sample + share/remix.' },
  { segment: 'YouTube Shorts / Reels creators', score: '10/10', promise: 'Storyboard and package vertical shorts quickly.', conversion: 'Templates, watermarked previews, token packs.' },
  { segment: 'Screenwriters', score: '10/10', promise: 'Turn pages into beats, scenes and visual plans.', conversion: 'Beat verification and script-to-storyboard export.' },
  { segment: 'Indie filmmakers', score: '10/10', promise: 'Build a pitch-ready storyboard and animatic package.', conversion: 'Studio plan + clean export.' },
  { segment: 'Producers', score: '10/10', promise: 'Evaluate a story visually before spending production money.', conversion: 'Producer package, team review, approvals.' },
  { segment: 'Cinematographers / DPs', score: '10/10', promise: 'Shot design, 5 Cs reasoning and 180-degree continuity.', conversion: 'Advanced shot tools and visual blocking.' },
  { segment: 'Agencies', score: '10/10', promise: 'Rapid ad concepts and client pitch boards.', conversion: 'White-label exports and share links.' },
  { segment: 'Film schools', score: '10/10', promise: 'Teach beats, shots, blocking and storyboards interactively.', conversion: 'Education workspace and classroom templates.' },
  { segment: 'Hollywood directors', score: '10/10 target', promise: 'Director-first creative control, premium flagship proof scene and precise revisions.', conversion: 'Enterprise preview and private endpoint mode.' },
  { segment: 'Studios / enterprise', score: '10/10 target', promise: 'Private, secure AI pre-production control plane.', conversion: 'Enterprise trust pack, SSO, audit logs, private storage.' }
];

export const saasOperatingPillars = [
  'Acquire: SEO pages, examples, social sharing, referral credits and free sample funnel.',
  'Activate: first-project wizard, sample scenes, onboarding checklist and guided demo.',
  'Monetize: subscriptions, tokens, token packs, clean exports, team seats and enterprise contracts.',
  'Retain: saved projects, version history, collaboration, templates, monthly token refresh and usage emails.',
  'Scale: queues, rate limits, provider routing, observability, Super Admin control plane and load testing.',
  'Protect: private storage, rights receipts, SSO, audit logs, data retention and model-training opt-out.'
];

export const launchGates = [
  { gate: 'Auth live', owner: 'Platform', requirement: 'Users, sessions, roles and workspaces are persisted.', passCondition: 'Signup, login, logout, team invite and role check pass in staging.' },
  { gate: 'Billing live', owner: 'Revenue', requirement: 'Stripe checkout, webhooks, billing portal and token packs reconcile.', passCondition: 'Webhook grants entitlements and token ledger matches Stripe events.' },
  { gate: 'Execution live', owner: 'AI Platform', requirement: 'Core generation routes call live endpoints through Super Admin runtime.', passCondition: 'Script-to-storyboard sample finishes successfully with trace ID and token ledger.' },
  { gate: 'Storage private', owner: 'Security', requirement: 'Customer scripts/assets use private storage and signed downloads.', passCondition: 'No customer asset is reachable without workspace authorization.' },
  { gate: 'Scale validated', owner: 'DevOps', requirement: '2,000 concurrent users supported with queue/rate limits.', passCondition: 'Load test meets P95 targets and no token double-charge occurs.' },
  { gate: 'Support ready', owner: 'Customer Success', requirement: 'Ticket intake, status page, help content and refund workflow exist.', passCondition: 'Test support ticket and billing question resolve through admin workflow.' },
  { gate: 'Legal ready', owner: 'Legal', requirement: 'Terms, privacy, commercial use, IP, rights and content policies reviewed.', passCondition: 'Launch/legal checklist approved and versioned.' }
];
