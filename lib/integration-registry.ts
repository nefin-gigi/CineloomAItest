export type ConnectorCategory =
  | 'identity'
  | 'database'
  | 'billing'
  | 'storage'
  | 'queue'
  | 'ai'
  | 'rendering'
  | 'analytics'
  | 'security'
  | 'support'
  | 'operations';

export type ConnectorStatus = 'demo' | 'needs_env' | 'ready' | 'error';

export type ConnectorDefinition = {
  id: string;
  category: ConnectorCategory;
  displayName: string;
  purpose: string;
  customerImpact: string;
  productionRole: string;
  recommended: boolean;
  requiredEnv: string[];
  optionalEnv?: string[];
  testEndpoint: string;
  saveEndpoint: string;
  docsPath: string;
  connectedModeLabel: string;
};

export const integrationCategories: { category: ConnectorCategory; label: string; description: string }[] = [
  { category: 'identity', label: 'Identity & access', description: 'Login, workspaces, teams, roles, studio permissions, enterprise access.' },
  { category: 'database', label: 'Database', description: 'Persistent project, billing, token, workflow, and audit data.' },
  { category: 'billing', label: 'Billing & tokens', description: 'Subscriptions, invoices, webhooks, token purchases, refunds, margin protection.' },
  { category: 'storage', label: 'Private storage', description: 'Scripts, storyboards, videos, PDFs, ZIP exports, signed links, retention.' },
  { category: 'queue', label: 'Queues & workers', description: 'Long-running generation, retries, webhooks, cost-safe token reservation.' },
  { category: 'ai', label: 'AI providers', description: 'LLM, image, video, voice, music, safety, correction, prompt generation.' },
  { category: 'rendering', label: 'Rendering', description: 'Storyboard PDF, animatic MP4, ZIP package, thumbnails, watermarks.' },
  { category: 'analytics', label: 'Analytics', description: 'Funnels, MRR, token burn, generations, exports, churn, conversion.' },
  { category: 'security', label: 'Security & compliance', description: 'Moderation, rights checks, audit logs, encryption, admin controls.' },
  { category: 'support', label: 'Support', description: 'User support, transactional emails, onboarding, feedback, help center.' },
  { category: 'operations', label: 'Operations', description: 'Feature flags, release toggles, environment readiness, provider failover.' }
];

export const connectorCatalog: ConnectorDefinition[] = [
  {
    id: 'auth-clerk',
    category: 'identity',
    displayName: 'Clerk Auth connector',
    purpose: 'Production sign-up, login, social login, organization/team support, role bootstrap.',
    customerImpact: 'Paying users can create accounts, invite teams, recover passwords, and securely enter Studio.',
    productionRole: 'Primary identity adapter when AUTH_MODE=clerk.',
    recommended: true,
    requiredEnv: ['AUTH_MODE=clerk', 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', 'CLERK_SECRET_KEY'],
    optionalEnv: ['CLERK_WEBHOOK_SECRET'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=auth-clerk',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/CONNECTOR_CONTRACTS.md#identity',
    connectedModeLabel: 'Clerk live mode'
  },
  {
    id: 'auth-supabase',
    category: 'identity',
    displayName: 'Supabase Auth connector',
    purpose: 'Email/password and OAuth login with database-centered user management.',
    customerImpact: 'Lower-cost authentication path with direct Postgres user linking.',
    productionRole: 'Alternative identity adapter when AUTH_MODE=supabase.',
    recommended: true,
    requiredEnv: ['AUTH_MODE=supabase', 'SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
    optionalEnv: ['SUPABASE_JWT_SECRET'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=auth-supabase',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/CONNECTOR_CONTRACTS.md#identity',
    connectedModeLabel: 'Supabase Auth live mode'
  },
  {
    id: 'database-postgres',
    category: 'database',
    displayName: 'Postgres database connector',
    purpose: 'Save users, workspaces, projects, tokens, subscriptions, assets, jobs, and audit logs.',
    customerImpact: 'Customers can return to projects, preserve versions, and trust billing/token history.',
    productionRole: 'System of record for CineLoom SaaS.',
    recommended: true,
    requiredEnv: ['DATABASE_URL'],
    optionalEnv: ['DIRECT_DATABASE_URL'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=database-postgres',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/V3_0_DATABASE_AND_BILLING_IMPLEMENTATION.md',
    connectedModeLabel: 'Postgres live mode'
  },
  {
    id: 'billing-stripe',
    category: 'billing',
    displayName: 'Stripe billing connector',
    purpose: 'Checkout, billing portal, subscription webhooks, token packs, invoices, tax-ready checkout.',
    customerImpact: 'Users can subscribe, upgrade, downgrade, buy tokens, and receive invoices.',
    productionRole: 'Revenue engine and source of subscription truth.',
    recommended: true,
    requiredEnv: ['PAYMENT_GATEWAY_MODE=stripe', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_CREATOR', 'STRIPE_PRICE_STUDIO', 'STRIPE_PRICE_PRODUCER'],
    optionalEnv: ['STRIPE_PRICE_ENTERPRISE', 'STRIPE_PRICE_PACK_1K', 'STRIPE_PRICE_PACK_5K', 'STRIPE_PRICE_PACK_25K'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=billing-stripe',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/V3_0_DATABASE_AND_BILLING_IMPLEMENTATION.md#stripe',
    connectedModeLabel: 'Stripe live mode'
  },
  {
    id: 'token-ledger',
    category: 'billing',
    displayName: 'Token ledger connector',
    purpose: 'Reserve, deduct, refund, expire, top up, and reconcile generation tokens.',
    customerImpact: 'Transparent credit usage and predictable paid upgrades.',
    productionRole: 'Cost-control layer before expensive AI actions.',
    recommended: true,
    requiredEnv: ['TOKEN_HARD_STOP_ENABLED=true', 'DATABASE_URL'],
    optionalEnv: ['AUTO_TOPUP_ENABLED'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=token-ledger',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/TOKEN_AND_BILLING_OPERATIONS.md',
    connectedModeLabel: 'Token hard-stop live'
  },
  {
    id: 'storage-r2',
    category: 'storage',
    displayName: 'Private object storage connector',
    purpose: 'Store scripts, generated frames, animatics, PDFs, ZIP exports, and signed URLs.',
    customerImpact: 'Private IP is protected; exports are secure and downloadable only by authorized users.',
    productionRole: 'Private asset store. Use R2, S3, or Supabase Storage behind this adapter.',
    recommended: true,
    requiredEnv: ['STORAGE_MODE', 'R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_PRIVATE_ASSETS'],
    optionalEnv: ['SIGNED_URL_TTL_SECONDS', 'ASSET_RETENTION_DAYS'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=storage-r2',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/SECURE_ASSET_STORAGE.md',
    connectedModeLabel: 'Private storage live'
  },
  {
    id: 'queue-worker',
    category: 'queue',
    displayName: 'Queue worker connector',
    purpose: 'Run long AI jobs, retries, batch generations, callbacks, token reservations, and refunds.',
    customerImpact: 'Users can leave the page while CineLoom generates and receive reliable completion states.',
    productionRole: 'Async workflow engine for generation and rendering.',
    recommended: true,
    requiredEnv: ['QUEUE_MODE', 'QUEUE_SECRET'],
    optionalEnv: ['TRIGGER_API_KEY', 'INNGEST_EVENT_KEY', 'REDIS_URL', 'WORKER_CALLBACK_URL'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=queue-worker',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/SCALABLE_QUEUE_AND_WORKER_ARCHITECTURE.md',
    connectedModeLabel: 'Queue live mode'
  },
  {
    id: 'llm-router',
    category: 'ai',
    displayName: 'LLM router connector',
    purpose: 'Script validation, story analysis, beat verification, shot design, prompt corrections, Auto QA.',
    customerImpact: 'Creates the intelligence behind CineLoom’s script-to-storyboard workflow.',
    productionRole: 'Text reasoning provider abstraction with fallback.',
    recommended: true,
    requiredEnv: ['LLM_PROVIDER', 'LLM_API_KEY'],
    optionalEnv: ['LLM_FALLBACK_PROVIDER', 'LLM_FALLBACK_API_KEY', 'LLM_MODEL'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=llm-router',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/CONNECTOR_CONTRACTS.md#ai-generation',
    connectedModeLabel: 'LLM live mode'
  },
  {
    id: 'image-router',
    category: 'ai',
    displayName: 'Image generation connector',
    purpose: 'Generate static storyboard frames, character looks, location concepts, and correction variants.',
    customerImpact: 'Users receive visible storyboards they can revise and export.',
    productionRole: 'Storyboard frame provider abstraction.',
    recommended: true,
    requiredEnv: ['IMAGE_PROVIDER', 'IMAGE_PROVIDER_KEY'],
    optionalEnv: ['IMAGE_FALLBACK_PROVIDER', 'IMAGE_FALLBACK_PROVIDER_KEY', 'IMAGE_DEFAULT_MODEL'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=image-router',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/CONNECTOR_CONTRACTS.md#ai-generation',
    connectedModeLabel: 'Image provider live'
  },
  {
    id: 'video-router',
    category: 'ai',
    displayName: 'Video generation connector',
    purpose: 'Generate video clips and provider-ready handoff from approved animatic/storyboard.',
    customerImpact: 'Paid users can move from storyboard to AI video package.',
    productionRole: 'Video provider abstraction with cost routing.',
    recommended: true,
    requiredEnv: ['VIDEO_PROVIDER', 'VIDEO_PROVIDER_KEY'],
    optionalEnv: ['FAL_KEY', 'VIDEO_FALLBACK_PROVIDER', 'VIDEO_DEFAULT_MODEL'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=video-router',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/CONNECTOR_CONTRACTS.md#ai-generation',
    connectedModeLabel: 'Video provider live'
  },
  {
    id: 'voice-music-router',
    category: 'ai',
    displayName: 'Voice, music, and SFX connector',
    purpose: 'Scratch voice, dialogue timing, music cue generation, SFX cue generation, audio stems.',
    customerImpact: 'Animatics feel emotional and cinematic, not silent placeholders.',
    productionRole: 'Audio generation and timing adapter.',
    recommended: false,
    requiredEnv: ['VOICE_PROVIDER', 'VOICE_PROVIDER_KEY', 'MUSIC_PROVIDER', 'MUSIC_PROVIDER_KEY'],
    optionalEnv: ['SFX_PROVIDER', 'SFX_PROVIDER_KEY'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=voice-music-router',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/CONNECTOR_CONTRACTS.md#audio',
    connectedModeLabel: 'Audio provider live'
  },
  {
    id: 'render-export-worker',
    category: 'rendering',
    displayName: 'PDF / MP4 / ZIP render worker',
    purpose: 'Generate real storyboard PDFs, animatic MP4s, shot CSVs, prompt JSON, QA reports, ZIP packages.',
    customerImpact: 'Customers receive tangible paid deliverables.',
    productionRole: 'Export renderer and watermarking service.',
    recommended: true,
    requiredEnv: ['RENDER_WORKER_URL', 'RENDER_WORKER_SECRET'],
    optionalEnv: ['WATERMARK_FREE_EXPORTS', 'SIGNED_URL_TTL_SECONDS'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=render-export-worker',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/EXPORT_RENDERING_PIPELINE.md',
    connectedModeLabel: 'Renderer live mode'
  },
  {
    id: 'analytics-product',
    category: 'analytics',
    displayName: 'Product analytics connector',
    purpose: 'Track visitor to sample to signup to paid conversion, token usage, retention, exports, churn.',
    customerImpact: 'CineLoom team can optimize onboarding and pricing based on real behavior.',
    productionRole: 'Revenue and product analytics event stream.',
    recommended: true,
    requiredEnv: ['ANALYTICS_MODE', 'ANALYTICS_WRITE_KEY'],
    optionalEnv: ['POSTHOG_KEY', 'GA4_MEASUREMENT_ID', 'SEGMENT_WRITE_KEY'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=analytics-product',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/ANALYTICS_AND_REVENUE_EVENTS.md',
    connectedModeLabel: 'Analytics live mode'
  },
  {
    id: 'observability-sentry',
    category: 'operations',
    displayName: 'Observability connector',
    purpose: 'Capture application errors, provider failures, latency, job failures, and release health.',
    customerImpact: 'Fewer broken generations and faster support responses.',
    productionRole: 'Monitoring and error intelligence.',
    recommended: true,
    requiredEnv: ['OBSERVABILITY_MODE', 'SENTRY_DSN'],
    optionalEnv: ['LOG_DRAIN_URL', 'UPTIME_WEBHOOK_URL'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=observability-sentry',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/OBSERVABILITY_RUNBOOK.md',
    connectedModeLabel: 'Observability live'
  },
  {
    id: 'safety-rights',
    category: 'security',
    displayName: 'Safety and rights connector',
    purpose: 'Check copyright/rights acknowledgements, public figure/likeness risk, content moderation, takedown workflow.',
    customerImpact: 'Creators and studios trust CineLoom with IP-sensitive projects.',
    productionRole: 'Policy guardrail and rights-audit layer.',
    recommended: true,
    requiredEnv: ['SAFETY_MODE', 'MODERATION_PROVIDER_KEY'],
    optionalEnv: ['RIGHTS_REVIEW_QUEUE_ID', 'LEGAL_CONTACT_EMAIL'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=safety-rights',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/LEGAL_SAFETY_RIGHTS_GUARDRAILS.md',
    connectedModeLabel: 'Safety live mode'
  },
  {
    id: 'email-support',
    category: 'support',
    displayName: 'Email and support connector',
    purpose: 'Transactional emails, onboarding sequence, generation completed messages, billing support.',
    customerImpact: 'Users receive confirmations, receipts, completion alerts, and support responses.',
    productionRole: 'Lifecycle communication layer.',
    recommended: false,
    requiredEnv: ['EMAIL_PROVIDER', 'EMAIL_API_KEY', 'SUPPORT_EMAIL'],
    optionalEnv: ['HELPDESK_WEBHOOK_URL', 'ONBOARDING_SEQUENCE_ENABLED'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=email-support',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/SUPPORT_AND_ONBOARDING.md',
    connectedModeLabel: 'Email live mode'
  },
  {
    id: 'feature-flags',
    category: 'operations',
    displayName: 'Feature flag connector',
    purpose: 'Turn public launch, billing, provider mode, watermarking, queues, and enterprise features on/off safely.',
    customerImpact: 'CineLoom can launch gradually without exposing unfinished features.',
    productionRole: 'Operational release control.',
    recommended: true,
    requiredEnv: ['PUBLIC_SITE_ENABLED', 'REQUIRE_AUTH_FOR_STUDIO', 'TOKEN_HARD_STOP_ENABLED'],
    optionalEnv: ['ENTERPRISE_MODE_ENABLED', 'AI_PROVIDER_MODE', 'WATERMARK_FREE_EXPORTS'],
    testEndpoint: '/api/super-admin/connectors/test?connectorId=feature-flags',
    saveEndpoint: '/api/super-admin/config/save',
    docsPath: 'docs/SUPER_ADMIN_USER_GUIDE.md#feature-flags',
    connectedModeLabel: 'Flags configured'
  }
];

export const productionBlockersClosed = [
  { blocker: 'Real auth', v3PlugPlayStatus: 'Connector contracts + auth modes + guarded routes added', owner: 'Identity adapter' },
  { blocker: 'Real database', v3PlugPlayStatus: 'Prisma + SQL migrations + integration tables added', owner: 'Database adapter' },
  { blocker: 'Stripe billing', v3PlugPlayStatus: 'Checkout/webhook/portal contracts + env validation added', owner: 'Billing adapter' },
  { blocker: 'Token enforcement', v3PlugPlayStatus: 'Ledger, reserve/deduct/refund contracts added', owner: 'Token service' },
  { blocker: 'Private storage', v3PlugPlayStatus: 'Signed URL + private bucket connector contracts added', owner: 'Storage adapter' },
  { blocker: 'AI providers', v3PlugPlayStatus: 'LLM/image/video/audio provider routers added', owner: 'Provider router' },
  { blocker: 'Queue workers', v3PlugPlayStatus: 'Async job lifecycle and retry contracts added', owner: 'Worker adapter' },
  { blocker: 'Real exports', v3PlugPlayStatus: 'Renderer connector and secure export route pattern added', owner: 'Render worker' },
  { blocker: 'Analytics', v3PlugPlayStatus: 'Revenue/funnel/usage event map added', owner: 'Analytics adapter' },
  { blocker: 'Security/legal', v3PlugPlayStatus: 'Safety/rights connector, audit model, private assets, admin guard added', owner: 'Safety adapter' }
];

export const featureFlagCatalog = [
  { key: 'PUBLIC_SITE_ENABLED', current: 'false', recommendedProduction: 'true after final legal/payment QA', description: 'Controls whether the marketing funnel is public.' },
  { key: 'LAUNCH_GATE_ENABLED', current: 'true', recommendedProduction: 'false for public launch', description: 'Keeps the full site behind private preview gate.' },
  { key: 'REQUIRE_AUTH_FOR_STUDIO', current: 'true', recommendedProduction: 'true', description: 'Protects Studio, projects, exports, and admin routes.' },
  { key: 'PAYMENT_GATEWAY_MODE', current: 'demo', recommendedProduction: 'stripe', description: 'Switches billing from simulation to live checkout/webhooks.' },
  { key: 'AI_PROVIDER_MODE', current: 'demo', recommendedProduction: 'live', description: 'Controls whether generation is simulated or provider-backed.' },
  { key: 'TOKEN_HARD_STOP_ENABLED', current: 'true', recommendedProduction: 'true', description: 'Blocks expensive actions when tokens are insufficient.' },
  { key: 'WATERMARK_FREE_EXPORTS', current: 'true', recommendedProduction: 'true', description: 'Watermarks preview outputs to convert users and protect value.' },
  { key: 'SUPER_ADMIN_ENABLED', current: 'true', recommendedProduction: 'true but restricted', description: 'Enables plug-and-play connector console for operators.' }
];

export const scalabilityLayers = [
  { layer: 'Web app', design: 'Next.js on Vercel with App Router and edge-compatible middleware.', scaleMove: 'Keep UI stateless; move long work into queues and workers.' },
  { layer: 'API layer', design: 'Route handlers expose stable service contracts for auth, billing, tokens, generation, exports, admin.', scaleMove: 'Replace demo handlers with service adapters behind the same endpoints.' },
  { layer: 'Database', design: 'Postgres/Supabase schema for tenants, projects, tokens, assets, jobs, audit logs.', scaleMove: 'Use workspace-level tenancy, indexes, RLS where applicable, and retention jobs.' },
  { layer: 'Storage', design: 'Private object storage with signed URL delivery.', scaleMove: 'Separate private customer assets from public demo assets and enforce retention/quotas.' },
  { layer: 'Workers', design: 'Async queue jobs for generation, rendering, retries, refunds, emails.', scaleMove: 'Horizontally scale workers per provider type and isolate heavy rendering.' },
  { layer: 'Provider router', design: 'One internal contract per generation type: text, image, video, audio, render.', scaleMove: 'Add fallback providers, cost routing, queue priority, and per-plan limits.' },
  { layer: 'Billing', design: 'Stripe webhooks drive subscriptions, token packs, invoices, billing portal.', scaleMove: 'Webhook reconciliation and idempotency prevent revenue/account mismatches.' },
  { layer: 'Observability', design: 'Metrics, logs, provider health, usage, revenue, failed jobs.', scaleMove: 'Alert on provider failures, token leakage, export errors, and cost spikes.' }
];
