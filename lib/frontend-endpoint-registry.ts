import type { ExecutionStage } from './execution-endpoints';

export type FrontendSurface = 'public_marketing' | 'public_conversion' | 'studio_workspace' | 'billing' | 'support' | 'super_admin';
export type FrontendActionMode = 'navigation_only' | 'track_only' | 'endpoint_optional' | 'endpoint_required' | 'admin_only';

export type FrontendEndpointAction = {
  key: string;
  label: string;
  href: string;
  surface: FrontendSurface;
  userIntent: string;
  visibleTo: 'visitor' | 'signed_in_user' | 'admin' | 'all';
  mode: FrontendActionMode;
  apiRoute: string;
  method: 'GET' | 'POST';
  backendStages: ExecutionStage[];
  requiredEnv: string[];
  samplePayload: Record<string, unknown>;
  successResult: string;
  fallbackBehavior: string;
  superAdminNotes: string;
};

export const frontendEndpointActions: FrontendEndpointAction[] = [
  {
    key: 'nav_home',
    label: 'Home navigation',
    href: '/',
    surface: 'public_marketing',
    userIntent: 'Open the public homepage.',
    visibleTo: 'all',
    mode: 'track_only',
    apiRoute: '/api/frontend-action',
    method: 'POST',
    backendStages: ['analytics_event'],
    requiredEnv: ['EXEC_ANALYTICS_EVENT_URL', 'EXEC_ANALYTICS_SECRET'],
    samplePayload: { actionKey: 'nav_home', href: '/', source: 'public_nav' },
    successResult: 'Visitor opens the homepage and the event is tracked if analytics is configured.',
    fallbackBehavior: 'Navigate normally and skip analytics if the endpoint is not configured.',
    superAdminNotes: 'Keep as track-only. Do not block homepage navigation on analytics failures.'
  },
  {
    key: 'nav_how_it_works',
    label: 'How it works navigation',
    href: '/how-it-works',
    surface: 'public_marketing',
    userIntent: 'Understand the script-to-storyboard workflow.',
    visibleTo: 'all',
    mode: 'track_only',
    apiRoute: '/api/frontend-action',
    method: 'POST',
    backendStages: ['analytics_event'],
    requiredEnv: ['EXEC_ANALYTICS_EVENT_URL', 'EXEC_ANALYTICS_SECRET'],
    samplePayload: { actionKey: 'nav_how_it_works', href: '/how-it-works', source: 'public_nav' },
    successResult: 'Visitor opens how-it-works and funnel interest is captured.',
    fallbackBehavior: 'Open page with no tracking if analytics is not configured.',
    superAdminNotes: 'This should never require login.'
  },
  {
    key: 'nav_examples',
    label: 'Examples navigation',
    href: '/examples',
    surface: 'public_marketing',
    userIntent: 'View sample storyboards and pitch outputs.',
    visibleTo: 'all',
    mode: 'track_only',
    apiRoute: '/api/frontend-action',
    method: 'POST',
    backendStages: ['analytics_event'],
    requiredEnv: ['EXEC_ANALYTICS_EVENT_URL', 'EXEC_ANALYTICS_SECRET'],
    samplePayload: { actionKey: 'nav_examples', href: '/examples', source: 'public_nav' },
    successResult: 'Examples page opens without auth redirects and event is tracked.',
    fallbackBehavior: 'Open the static examples page.',
    superAdminNotes: 'Use this to verify /examples never redirects to /?next=%2Fexamples.'
  },
  {
    key: 'nav_pricing',
    label: 'Pricing navigation',
    href: '/pricing',
    surface: 'billing',
    userIntent: 'Compare Free, Creator, Studio, Producer, and Enterprise plans.',
    visibleTo: 'all',
    mode: 'track_only',
    apiRoute: '/api/frontend-action',
    method: 'POST',
    backendStages: ['analytics_event'],
    requiredEnv: ['EXEC_ANALYTICS_EVENT_URL', 'EXEC_ANALYTICS_SECRET'],
    samplePayload: { actionKey: 'nav_pricing', href: '/pricing', source: 'public_nav' },
    successResult: 'Pricing interest is captured for revenue analytics.',
    fallbackBehavior: 'Pricing page still opens even if analytics is disabled.',
    superAdminNotes: 'Connect checkout from plan buttons, not from this navigation link.'
  },
  {
    key: 'nav_security',
    label: 'Security navigation',
    href: '/security',
    surface: 'public_marketing',
    userIntent: 'Review privacy, script protection, and trust controls.',
    visibleTo: 'all',
    mode: 'track_only',
    apiRoute: '/api/frontend-action',
    method: 'POST',
    backendStages: ['analytics_event'],
    requiredEnv: ['EXEC_ANALYTICS_EVENT_URL', 'EXEC_ANALYTICS_SECRET'],
    samplePayload: { actionKey: 'nav_security', href: '/security', source: 'public_nav' },
    successResult: 'Trust page opens and visitor trust signal is tracked.',
    fallbackBehavior: 'Open the security page normally.',
    superAdminNotes: 'Public security page should not expose internal secrets or admin APIs.'
  },
  {
    key: 'nav_support',
    label: 'Help/support navigation',
    href: '/support',
    surface: 'support',
    userIntent: 'Get help or contact support.',
    visibleTo: 'all',
    mode: 'endpoint_optional',
    apiRoute: '/api/support/ticket',
    method: 'POST',
    backendStages: ['analytics_event'],
    requiredEnv: ['SUPPORT_PROVIDER_ENDPOINT', 'SUPPORT_PROVIDER_SECRET', 'EXEC_ANALYTICS_EVENT_URL', 'EXEC_ANALYTICS_SECRET'],
    samplePayload: { actionKey: 'nav_support', href: '/support', source: 'public_nav' },
    successResult: 'Support page opens, and form submission can route to a helpdesk endpoint.',
    fallbackBehavior: 'Show a simple support form and store/demo-acknowledge until support endpoint is configured.',
    superAdminNotes: 'Enable CAPTCHA and rate limiting before opening public support submissions.'
  },
  {
    key: 'nav_login',
    label: 'Sign in navigation',
    href: '/login',
    surface: 'studio_workspace',
    userIntent: 'Sign in to existing workspace.',
    visibleTo: 'visitor',
    mode: 'endpoint_required',
    apiRoute: '/api/auth/login',
    method: 'POST',
    backendStages: ['analytics_event'],
    requiredEnv: ['AUTH_MODE', 'AUTH_PROVIDER_HEALTH_URL'],
    samplePayload: { email: 'creator@example.com', authMode: 'provider' },
    successResult: 'User is authenticated and redirected to Studio.',
    fallbackBehavior: 'In staging only, demo login may be enabled. In production, demo auth is blocked.',
    superAdminNotes: 'Production must use real auth/RBAC; never allow demo-session in public paid launch.'
  },
  {
    key: 'cta_create_free_storyboard',
    label: 'Create free storyboard CTA',
    href: '/create-free-storyboard',
    surface: 'public_conversion',
    userIntent: 'Start a free script-to-storyboard preview.',
    visibleTo: 'all',
    mode: 'endpoint_required',
    apiRoute: '/api/storyboard/free-sample',
    method: 'POST',
    backendStages: ['moderation_rights_check', 'script_validate', 'token_reserve', 'storyboard_generate', 'storage_upload', 'token_commit', 'analytics_event'],
    requiredEnv: ['EXEC_STORYBOARD_GENERATE_URL', 'EXEC_STORYBOARD_GENERATE_SECRET', 'EXEC_MODERATION_RIGHTS_URL', 'EXEC_MODERATION_RIGHTS_SECRET', 'EXEC_ANALYTICS_EVENT_URL', 'EXEC_ANALYTICS_SECRET'],
    samplePayload: { scene: 'EXT. RAINY BACKLOT - NIGHT\nA young filmmaker opens a glowing studio door.', style: 'cinematic_realism', durationSeconds: 10 },
    successResult: 'Visitor receives storyboard panels, shot timing, and a next-step export prompt.',
    fallbackBehavior: 'Use staging-safe static storyboard preview if AI endpoints are not configured.',
    superAdminNotes: 'This is the most important revenue link. It must remain simple on the frontend and endpoint-driven behind the scenes.'
  },
  {
    key: 'create_submit_scene',
    label: 'Submit scene for storyboard',
    href: '/create-free-storyboard',
    surface: 'public_conversion',
    userIntent: 'Paste a scene and generate panels.',
    visibleTo: 'all',
    mode: 'endpoint_required',
    apiRoute: '/api/storyboard/free-sample',
    method: 'POST',
    backendStages: ['moderation_rights_check', 'script_validate', 'token_reserve', 'storyboard_generate', 'storage_upload', 'token_commit', 'analytics_event'],
    requiredEnv: ['EXEC_STORYBOARD_GENERATE_URL', 'EXEC_STORYBOARD_GENERATE_SECRET', 'TOKEN_LEDGER_ENDPOINT_URL', 'TOKEN_LEDGER_SECRET'],
    samplePayload: { sceneText: 'A filmmaker steps into a glowing studio.', aspectRatio: '16:9', style: 'clean_storyboard' },
    successResult: 'Generated storyboard preview appears without the user seeing backend complexity.',
    fallbackBehavior: 'Render demo cards with a clear staging label.',
    superAdminNotes: 'Use token reserve/commit around this endpoint before public paid launch.'
  },
  {
    key: 'pricing_checkout_creator',
    label: 'Creator checkout button',
    href: '/pricing',
    surface: 'billing',
    userIntent: 'Subscribe to Creator plan.',
    visibleTo: 'all',
    mode: 'endpoint_required',
    apiRoute: '/api/billing/create-checkout-session',
    method: 'POST',
    backendStages: ['billing_checkout', 'analytics_event'],
    requiredEnv: ['STRIPE_SECRET_KEY', 'STRIPE_PRICE_CREATOR', 'STRIPE_WEBHOOK_SECRET'],
    samplePayload: { plan: 'creator', billingCycle: 'monthly', workspaceId: 'ws_demo' },
    successResult: 'Stripe Checkout opens with correct plan, customer, and metadata.',
    fallbackBehavior: 'Show disabled checkout or demo checkout URL in staging.',
    superAdminNotes: 'Do not enable until webhook reconciliation and token credits are tested.'
  },
  {
    key: 'pricing_checkout_studio',
    label: 'Studio checkout button',
    href: '/pricing',
    surface: 'billing',
    userIntent: 'Subscribe to Studio plan.',
    visibleTo: 'all',
    mode: 'endpoint_required',
    apiRoute: '/api/billing/create-checkout-session',
    method: 'POST',
    backendStages: ['billing_checkout', 'analytics_event'],
    requiredEnv: ['STRIPE_SECRET_KEY', 'STRIPE_PRICE_STUDIO', 'STRIPE_WEBHOOK_SECRET'],
    samplePayload: { plan: 'studio', billingCycle: 'monthly', workspaceId: 'ws_demo' },
    successResult: 'Stripe Checkout opens and subscription metadata is attached.',
    fallbackBehavior: 'Show plan information without taking payment.',
    superAdminNotes: 'Must be linked to subscription entitlements and monthly token refresh.'
  },
  {
    key: 'studio_dashboard',
    label: 'Studio dashboard',
    href: '/studio',
    surface: 'studio_workspace',
    userIntent: 'See current projects and next actions.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_optional',
    apiRoute: '/api/projects/list',
    method: 'GET',
    backendStages: ['analytics_event'],
    requiredEnv: ['DATABASE_URL'],
    samplePayload: { workspaceId: 'ws_demo' },
    successResult: 'User sees projects, drafts, exports, and review items.',
    fallbackBehavior: 'Show simple demo dashboard in staging.',
    superAdminNotes: 'Keep Studio simple. Do not expose Super Admin unless role allows it.'
  },
  {
    key: 'studio_create_project',
    label: 'New storyboard project',
    href: '/studio/new',
    surface: 'studio_workspace',
    userIntent: 'Create a new storyboard project.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_required',
    apiRoute: '/api/projects/create',
    method: 'POST',
    backendStages: ['script_upload', 'script_parse', 'script_validate', 'analytics_event'],
    requiredEnv: ['DATABASE_URL', 'EXEC_SCRIPT_PARSE_URL', 'EXEC_SCRIPT_PARSE_SECRET'],
    samplePayload: { title: 'Rainy Backlot', inputMode: 'paste' },
    successResult: 'Project is created and the user is guided to paste/upload script.',
    fallbackBehavior: 'Create local demo project only in staging.',
    superAdminNotes: 'Production must persist project ownership and workspace permissions.'
  },
  {
    key: 'studio_projects',
    label: 'My Projects',
    href: '/studio/projects',
    surface: 'studio_workspace',
    userIntent: 'Open saved projects.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_required',
    apiRoute: '/api/projects/list',
    method: 'GET',
    backendStages: ['analytics_event'],
    requiredEnv: ['DATABASE_URL'],
    samplePayload: { workspaceId: 'ws_demo', filters: ['draft', 'review', 'exported'] },
    successResult: 'User can search and reopen projects.',
    fallbackBehavior: 'Show demo project list.',
    superAdminNotes: 'Validate tenant isolation before production.'
  },
  {
    key: 'studio_review_panels',
    label: 'Review storyboard panels',
    href: '/studio/storyboard/static',
    surface: 'studio_workspace',
    userIntent: 'Review generated panels and approve or revise them.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_optional',
    apiRoute: '/api/storyboard/sample-10s',
    method: 'POST',
    backendStages: ['storyboard_generate', 'analytics_event'],
    requiredEnv: ['EXEC_STORYBOARD_GENERATE_URL', 'EXEC_STORYBOARD_GENERATE_SECRET'],
    samplePayload: { projectId: 'project_demo', sceneId: 'scene_001' },
    successResult: 'Storyboard panels load with status and review actions.',
    fallbackBehavior: 'Load demo storyboard panels.',
    superAdminNotes: 'Panel review should stay visual and simple.'
  },
  {
    key: 'studio_fix_panel',
    label: 'Fix storyboard panel',
    href: '/studio/storyboard-corrections',
    surface: 'studio_workspace',
    userIntent: 'Change a panel using plain English.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_required',
    apiRoute: '/api/storyboard/correct-panel',
    method: 'POST',
    backendStages: ['moderation_rights_check', 'token_reserve', 'storyboard_correct', 'storage_upload', 'token_commit', 'analytics_event'],
    requiredEnv: ['EXEC_STORYBOARD_CORRECT_URL', 'EXEC_STORYBOARD_CORRECT_SECRET', 'TOKEN_LEDGER_ENDPOINT_URL', 'TOKEN_LEDGER_SECRET'],
    samplePayload: { panelId: 'panel_01', instruction: 'Make the camera lower and add rain reflections.' },
    successResult: 'Updated panel appears with before/after comparison.',
    fallbackBehavior: 'Show correction preview in demo mode.',
    superAdminNotes: 'This is a major paid-value action; ensure token refunds on failure.'
  },
  {
    key: 'studio_export_package',
    label: 'Export pitch package',
    href: '/studio/export',
    surface: 'studio_workspace',
    userIntent: 'Export PDF, shot list, prompts, review link, and ZIP package.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_required',
    apiRoute: '/api/export/package',
    method: 'POST',
    backendStages: ['token_reserve', 'export_package', 'storage_signed_download', 'token_commit', 'analytics_event'],
    requiredEnv: ['EXEC_EXPORT_PACKAGE_URL', 'EXEC_EXPORT_PACKAGE_SECRET', 'PRIVATE_STORAGE_SIGNED_URL_ENDPOINT'],
    samplePayload: { projectId: 'project_demo', exportTypes: ['pdf', 'csv', 'json', 'zip'] },
    successResult: 'User receives secure, pitch-ready download package.',
    fallbackBehavior: 'Provide public demo sample package only.',
    superAdminNotes: 'Plan enforcement and signed URLs are mandatory before paid launch.'
  },
  {
    key: 'studio_billing_portal',
    label: 'Billing portal',
    href: '/studio/billing',
    surface: 'billing',
    userIntent: 'Manage subscription, invoices, and tokens.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_required',
    apiRoute: '/api/billing/customer-portal',
    method: 'POST',
    backendStages: ['billing_checkout', 'analytics_event'],
    requiredEnv: ['STRIPE_SECRET_KEY'],
    samplePayload: { workspaceId: 'ws_demo', returnUrl: '/studio/billing' },
    successResult: 'Stripe customer portal opens for the correct customer.',
    fallbackBehavior: 'Show demo billing info in staging.',
    superAdminNotes: 'Customer ID must be workspace/user-specific.'
  },
  {
    key: 'studio_agent_harness',
    label: 'Open AI Harness',
    href: '/studio/agent-harness',
    surface: 'studio_workspace',
    userIntent: 'Open the director agent harness for single-board storyboard changes.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_optional',
    apiRoute: '/api/agent-harness/readiness',
    method: 'GET',
    backendStages: ['low_token_context_plan', 'agent_director_board_change', 'storyboard_correct', 'analytics_event'],
    requiredEnv: ['CHATGPT_AGENT_ENDPOINT_URL', 'CHATGPT_AGENT_ENDPOINT_SECRET', 'EXEC_STORYBOARD_CORRECT_URL', 'EXEC_STORYBOARD_CORRECT_SECRET'],
    samplePayload: { storyboardId: 'storyboard_1000_panel_demo', boardId: 'board_0417' },
    successResult: 'Director opens a safe single-board change workspace.',
    fallbackBehavior: 'Show local harness plan and keep stitching blocked until endpoints are configured.',
    superAdminNotes: 'This is the UI icon/action that opens the AI harness from the Studio shell.'
  },
  {
    key: 'director_change_single_board',
    label: 'Change one storyboard board',
    href: '/studio/agent-harness',
    surface: 'studio_workspace',
    userIntent: 'Change exactly one storyboard board using a director prompt before dynamic stitching.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_required',
    apiRoute: '/api/agent-harness/change-board',
    method: 'POST',
    backendStages: ['moderation_rights_check', 'low_token_context_plan', 'token_reserve', 'agent_director_board_change', 'storyboard_correct', 'auto_qa', 'storage_upload', 'token_commit', 'analytics_event'],
    requiredEnv: ['CHATGPT_AGENT_ENDPOINT_URL', 'CHATGPT_AGENT_ENDPOINT_SECRET', 'EXEC_STORYBOARD_CORRECT_URL', 'EXEC_STORYBOARD_CORRECT_SECRET', 'AI_EVAL_ENDPOINT_URL', 'AI_PROVENANCE_ENDPOINT_URL'],
    samplePayload: { storyboardId: 'storyboard_1000_panel_demo', boardId: 'board_0417', boardIndex: 417, totalBoards: 1000, directorPrompt: 'Make this one board more emotional. Do not change any other board.', scope: 'single_board_only', tokenMode: 'lowest_cost' },
    successResult: 'Only the selected board receives a new version patch; dynamic stitching remains blocked until approval.',
    fallbackBehavior: 'Generate a local patch plan and wait for provider endpoints before rendering final image.',
    superAdminNotes: 'Critical creative-control action. Validate board ownership, lock continuity, enforce token reserve/commit, and log provenance.'
  },

  {
    key: 'preview_low_token_board_patch',
    label: 'Preview low-token board patch',
    href: '/studio/agent-harness',
    surface: 'studio_workspace',
    userIntent: 'Estimate the smallest context pack before sending the board change to AI.',
    visibleTo: 'signed_in_user',
    mode: 'endpoint_optional',
    apiRoute: '/api/agent-harness/token-plan',
    method: 'POST',
    backendStages: ['low_token_context_plan', 'analytics_event'],
    requiredEnv: [],
    samplePayload: { storyboardId: 'storyboard_1000_panel_demo', boardId: 'board_0417', boardIndex: 417, totalBoards: 1000, directorPrompt: 'Move camera closer.', scope: 'single_board_only', tokenMode: 'lowest_cost' },
    successResult: 'Director sees estimated tokens, omitted context, and patch-safe policy before any AI call.',
    fallbackBehavior: 'Local estimator always works in staging.',
    superAdminNotes: 'This should run before any costly AI provider call. Full storyboard context is blocked by default for more than 50 boards.'
  },
  {
    key: 'super_admin_agent_harness',
    label: 'Agent harness endpoint setup',
    href: '/studio/super-admin/agent-harness',
    surface: 'super_admin',
    userIntent: 'Configure and test ChatGPT-compatible agent endpoint integrations.',
    visibleTo: 'admin',
    mode: 'admin_only',
    apiRoute: '/api/super-admin/agent-harness',
    method: 'GET',
    backendStages: ['agent_director_board_change', 'storyboard_correct', 'analytics_event'],
    requiredEnv: ['SUPER_ADMIN_API_KEY', 'SUPER_ADMIN_SESSION_TOKEN', 'CHATGPT_AGENT_ENDPOINT_URL', 'CHATGPT_AGENT_ENDPOINT_SECRET'],
    samplePayload: { action: 'readiness' },
    successResult: 'Admin can view readiness, required environment variables, pipeline stages, and dry-run single-board patch requests.',
    fallbackBehavior: 'Blocked unless Super Admin access is present.',
    superAdminNotes: 'Use before enabling directors to run live single-board correction agents.'
  },
  {
    key: 'super_admin_frontend_integrations',
    label: 'Frontend endpoint router admin',
    href: '/studio/super-admin/frontend-integrations',
    surface: 'super_admin',
    userIntent: 'Map every visible frontend action to backend endpoints.',
    visibleTo: 'admin',
    mode: 'admin_only',
    apiRoute: '/api/super-admin/frontend-endpoints',
    method: 'GET',
    backendStages: ['analytics_event'],
    requiredEnv: ['SUPER_ADMIN_API_KEY', 'SUPER_ADMIN_SESSION_TOKEN'],
    samplePayload: { actionKey: 'cta_create_free_storyboard', dryRun: true },
    successResult: 'Admin can view, test, and save link-to-endpoint contracts.',
    fallbackBehavior: 'Blocked unless Super Admin access is present.',
    superAdminNotes: 'This is the plug-and-play operations center for connecting UI to APIs.'
  }
];

export const frontendActionGroups = [
  { label: 'Public navigation', description: 'Marketing links that must remain public and never redirect to auth.', actions: ['nav_home', 'nav_how_it_works', 'nav_examples', 'nav_pricing', 'nav_security', 'nav_support', 'nav_login'] },
  { label: 'Conversion actions', description: 'High-value CTAs that start generation, checkout, or support.', actions: ['cta_create_free_storyboard', 'create_submit_scene', 'pricing_checkout_creator', 'pricing_checkout_studio'] },
  { label: 'Studio workspace', description: 'Signed-in product actions for projects, review, correction, export, and billing.', actions: ['studio_dashboard', 'studio_create_project', 'studio_projects', 'studio_review_panels', 'studio_fix_panel', 'studio_agent_harness', 'preview_low_token_board_patch', 'director_change_single_board', 'studio_export_package', 'studio_billing_portal'] },
  { label: 'Super Admin', description: 'Admin-only tools for plug-and-play backend integration.', actions: ['super_admin_frontend_integrations', 'super_admin_agent_harness'] }
];

export function getFrontendAction(key: string) {
  return frontendEndpointActions.find((action) => action.key === key);
}

export function getFrontendActionEnvTemplate() {
  const env = new Set<string>();
  frontendEndpointActions.forEach((action) => action.requiredEnv.forEach((key) => env.add(key)));
  return Array.from(env).sort().map((key) => `${key}=`).join('\n');
}
