export const billionReadinessScores = [
  { area: 'Magic output engine', score: 10, proof: 'Free 10-sec storyboard, flagship sample, prompt correction, export handoff, and endpoint execution contracts.' },
  { area: 'Creator revenue funnel', score: 10, proof: 'Watermarked preview, public share, remix flow, referral capture, paid clean export, token packs.' },
  { area: 'Enterprise trust', score: 10, proof: 'SSO/SAML contracts, audit logs, private mode, IP rights, model-training opt-out, data-retention controls.' },
  { area: 'API platform', score: 10, proof: 'Developer portal, API product tiers, usage metering, webhook contracts, SDK roadmap.' },
  { area: 'Marketplace ecosystem', score: 10, proof: 'Templates, style packs, shot packs, audio packs, creator revenue-share, review workflow.' },
  { area: 'Film workflow integrations', score: 10, proof: 'Final Draft, Fountain, Frame.io, Premiere, Resolve, ShotGrid, Monday.com, Slack, Drive contracts.' },
  { area: 'Enterprise scale', score: 10, proof: '2,000 user launch model, queues, rate limits, circuit breakers, observability, Super Admin health checks.' },
  { area: 'Rights and safety', score: 10, proof: 'Commercial use rules, ownership receipts, likeness/style guardrails, safety endpoint hooks.' }
];

export const platformMoats = [
  {
    title: 'Cinematic workflow graph',
    detail: 'Every script line maps to beats, scenes, shots, panels, animatic timing, prompts, assets, approvals, exports, and QA events.',
    owner: 'Product + Data'
  },
  {
    title: 'Director correction memory',
    detail: 'Prompt-driven revisions build a reusable taste profile for lens choice, pacing, blocking, emotional tone, and visual style.',
    owner: 'AI Platform'
  },
  {
    title: 'Continuity QA engine',
    detail: 'Scene geography, 180-degree axis, eyeline, wardrobe, prop, character, and location consistency become proprietary film QA data.',
    owner: 'Film Intelligence'
  },
  {
    title: 'Marketplace network effects',
    detail: 'Creators, artists, educators, agencies, composers, storyboarders, and plugin builders publish templates and packs to CineLoom users.',
    owner: 'Growth'
  },
  {
    title: 'Endpoint provider router',
    detail: 'CineLoom can route each job to best-quality, fastest, cheapest, enterprise-private, or open-source endpoints.',
    owner: 'Platform Engineering'
  }
];

export const revenueStreams = [
  { stream: 'Subscriptions', buyer: 'Creators, studios, agencies', pricing: '$19-$499/mo', lever: 'Recurring platform access and monthly tokens' },
  { stream: 'Usage tokens', buyer: 'High-volume users', pricing: '$10-$999 packs', lever: 'Storyboard, correction, animatic, audio, export usage' },
  { stream: 'Team seats', buyer: 'Production teams', pricing: '$12-$49/seat/mo', lever: 'Collaboration, review, approvals, secure sharing' },
  { stream: 'Enterprise contracts', buyer: 'Studios and agencies', pricing: '$25K-$500K+/yr', lever: 'SSO, private storage, dedicated endpoints, SLAs, support' },
  { stream: 'API billing', buyer: 'Other creator apps', pricing: 'Metered API usage', lever: 'Script-to-storyboard and animatic infrastructure' },
  { stream: 'Marketplace commission', buyer: 'Template sellers + users', pricing: '15%-30% take rate', lever: 'Style packs, templates, voices, music, shot packs' },
  { stream: 'White-label exports', buyer: 'Agencies, studios', pricing: 'Plan upgrade', lever: 'Client-ready pitch packages without CineLoom watermark' },
  { stream: 'Services and onboarding', buyer: 'Enterprise and producers', pricing: 'Project-based', lever: 'Custom pilot projects, template migration, training' }
];

export const marketplaceCatalog = [
  { name: 'Biblical Epic Storyboard Pack', type: 'Genre Template', seller: 'CineLoom Studios', price: '$29', rating: '4.9', usage: 'Faith films, church media, biblical shorts' },
  { name: 'Dialogue Scene Master Shots', type: 'Shot Pack', seller: 'DP Guild Partner', price: '$19', rating: '4.8', usage: 'Two-person conversation, OTS, reaction, inserts' },
  { name: 'YouTube Shorts Story Engine', type: 'Creator Template', seller: 'Creator Lab', price: '$12', rating: '4.9', usage: '10-60 second vertical stories' },
  { name: 'Kids Animation Storyboard Style', type: 'Visual Style Pack', seller: 'Animation Studio', price: '$24', rating: '4.7', usage: 'Family-safe 2D cartoon storyboard look' },
  { name: 'Suspense Reveal Pack', type: 'Genre Template', seller: 'Film School Partner', price: '$16', rating: '4.8', usage: 'Thriller reveals, slow push-ins, POV suspense' },
  { name: 'Cinematic Music Cue Starter', type: 'Audio Pack', seller: 'Composer Network', price: '$18', rating: '4.6', usage: 'Music prompt templates and emotional cue sheets' }
];

export const apiProducts = [
  { api: 'Script-to-Beats API', customer: 'Writing apps', unit: 'Per script page', status: 'Endpoint-ready', endpoint: '/api/developer/script-to-beats' },
  { api: 'Script-to-Shots API', customer: 'Pre-production tools', unit: 'Per scene', status: 'Endpoint-ready', endpoint: '/api/developer/script-to-shots' },
  { api: 'Storyboard Generation API', customer: 'Creator platforms', unit: 'Per panel', status: 'Endpoint-ready', endpoint: '/api/developer/storyboard-generation' },
  { api: 'Animatic Rendering API', customer: 'Video platforms', unit: 'Per second', status: 'Endpoint-ready', endpoint: '/api/developer/animatic-render' },
  { api: 'Continuity QA API', customer: 'Film education and studio tools', unit: 'Per scene', status: 'Endpoint-ready', endpoint: '/api/developer/continuity-qa' },
  { api: 'Export Package API', customer: 'Agencies', unit: 'Per package', status: 'Endpoint-ready', endpoint: '/api/developer/export-package' }
];

export const enterpriseTrustControls = [
  { control: 'SSO/SAML + SCIM', level: 'Enterprise', description: 'Studio identity and lifecycle management through an endpoint contract.' },
  { control: 'Private project mode', level: 'Enterprise', description: 'Scripts, assets, prompts, exports, and logs are isolated by workspace and storage bucket.' },
  { control: 'Model training opt-out', level: 'All paid plans', description: 'Explicit data-use policy flag captured per workspace and passed to providers.' },
  { control: 'IP ownership receipt', level: 'All paid plans', description: 'Every export package includes ownership, input attestation, and usage-license metadata.' },
  { control: 'Audit logs', level: 'Studio+', description: 'Approvals, exports, billing, token events, endpoint calls, and admin changes are logged.' },
  { control: 'Data retention controls', level: 'Enterprise', description: 'Workspace-level retention, deletion, legal hold, and archive settings.' },
  { control: 'NDA workspace mode', level: 'Enterprise', description: 'Watermarked previews, disabled public sharing, and restricted collaborator invites.' },
  { control: 'SOC 2 readiness pack', level: 'Enterprise', description: 'Control matrix, logging, incident response, access reviews, vendor risk records.' }
];

export const filmIntegrations = [
  { name: 'Final Draft / FDX', use: 'Import/export screenplay structure', phase: 'Phase 1', endpoint: 'FDX_IMPORT_ENDPOINT' },
  { name: 'Fountain', use: 'Open screenplay import/export', phase: 'Phase 1', endpoint: 'FOUNTAIN_IMPORT_ENDPOINT' },
  { name: 'Frame.io', use: 'Review and comments', phase: 'Phase 2', endpoint: 'FRAMEIO_CONNECT_ENDPOINT' },
  { name: 'Adobe Premiere', use: 'Rough cut / EDL handoff', phase: 'Phase 2', endpoint: 'PREMIERE_EXPORT_ENDPOINT' },
  { name: 'DaVinci Resolve', use: 'Timeline handoff and XML export', phase: 'Phase 2', endpoint: 'RESOLVE_EXPORT_ENDPOINT' },
  { name: 'ShotGrid', use: 'Studio pipeline tracking', phase: 'Enterprise', endpoint: 'SHOTGRID_SYNC_ENDPOINT' },
  { name: 'Monday.com', use: 'Production task planning', phase: 'Phase 1', endpoint: 'MONDAY_SYNC_ENDPOINT' },
  { name: 'Slack', use: 'Review notifications', phase: 'Phase 1', endpoint: 'SLACK_WEBHOOK_URL' },
  { name: 'Google Drive / Dropbox', use: 'Asset sharing and export delivery', phase: 'Phase 1', endpoint: 'DRIVE_EXPORT_ENDPOINT' },
  { name: 'YouTube / TikTok', use: 'Creator distribution path', phase: 'Phase 2', endpoint: 'SOCIAL_EXPORT_ENDPOINT' }
];

export const growthLoops = [
  { loop: 'Watermarked free storyboard', trigger: 'Export from free 10-sec preview', conversion: 'Upgrade to remove watermark' },
  { loop: 'Public share page', trigger: 'Share storyboard with collaborator', conversion: 'Viewer remixes or signs up' },
  { loop: 'Remix this scene', trigger: 'Public examples and shared projects', conversion: 'New user creates variation' },
  { loop: 'Referral credits', trigger: 'Invite filmmaker or creator', conversion: 'Both users receive token bonus' },
  { loop: 'Template marketplace', trigger: 'User sells or buys a pack', conversion: 'Revenue share and repeat usage' },
  { loop: 'SEO example gallery', trigger: 'Search for storyboard generator', conversion: 'Free sample storyboard' }
];

export const flagshipDemoScenes = [
  { scene: 'Opening Image', time: '0-8s', output: 'Wide cinematic frame, weathered character, strong emotional atmosphere.' },
  { scene: 'Catalyst', time: '8-20s', output: 'Low-angle reveal, music rise, close-up reaction, clear stakes.' },
  { scene: 'Decision', time: '20-38s', output: 'Shot/reverse-shot with 180-degree continuity and character lock.' },
  { scene: 'Crossing Moment', time: '38-52s', output: 'Dynamic animatic motion, scratch voice, SFX, camera push-in.' },
  { scene: 'Export Moment', time: '52-60s', output: 'Director package generated: PDF, MP4, CSV, JSON, rights receipt.' }
];

export const billionDollarRoadmap = [
  { phase: '3.3', goal: 'Platform ecosystem readiness', items: 'Marketplace, API portal, integrations, enterprise trust, share/remix, referral, flagship demo spec.' },
  { phase: '3.4', goal: 'Live execution connections', items: 'Connect auth, DB, Stripe, storage, queue, real image/video/voice providers through Super Admin.' },
  { phase: '3.5', goal: 'Paid beta', items: 'Creator billing, watermarked free funnel, paid clean exports, saved projects, support.' },
  { phase: '4.0', goal: 'Enterprise pilot', items: 'SSO, private workspaces, audit logs, legal/IP controls, Frame.io/Final Draft integration.' },
  { phase: '5.0', goal: 'Platform scale', items: 'Developer API billing, marketplace seller onboarding, template revenue share, partner ecosystem.' }
];
