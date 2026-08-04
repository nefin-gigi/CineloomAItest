import { secureJson, isProductionLike } from './military-security';

export type ValidationIssue = {
  field: string;
  code: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
};

type FieldType = 'string' | 'email' | 'url' | 'enum' | 'number' | 'boolean' | 'object' | 'array' | 'id';

type FieldRule = {
  type: FieldType;
  required?: boolean;
  min?: number;
  max?: number;
  minValue?: number;
  maxValue?: number;
  allowed?: string[];
  pattern?: RegExp;
  default?: unknown;
  allowHtml?: boolean;
  allowSecrets?: boolean;
  allowPrivateNetworkUrls?: boolean;
};

type RouteSchema = {
  maxBodyBytes?: number;
  allowUnknown?: boolean;
  allowSecrets?: boolean;
  fields: Record<string, FieldRule>;
};

export type ValidationResult =
  | { ok: true; data: Record<string, any>; issues: ValidationIssue[]; sanitized: true }
  | { ok: false; data: Record<string, any>; issues: ValidationIssue[]; response: Response; sanitized: true };

const DEFAULT_MAX_BODY_BYTES = 512 * 1024;
const SCRIPT_MAX_BODY_BYTES = 1024 * 1024;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const XSS_PATTERNS = [/<\s*script\b/i, /javascript\s*:/i, /data\s*:\s*text\/html/i, /on\w+\s*=/i, /<\s*iframe\b/i, /<\s*object\b/i, /<\s*embed\b/i];
const COMMAND_PATTERNS = [/\$\([^)]{1,120}\)/, /`[^`]{1,120}`/, /(?:^|[\s;&|])(?:rm\s+-rf|curl\s+|wget\s+|nc\s+-|bash\s+-c|powershell\s+)/i];
const PATH_TRAVERSAL = /(?:\.\.\/|\.\.\\|%2e%2e%2f|%2e%2e%5c)/i;
const TEMPLATE_INJECTION = /(?:\{\{[^}]{0,120}\}\}|<%[^%]{0,120}%>|\$\{[^}]{0,120}\})/;
const SECRET_PATTERNS = [
  /-----BEGIN (?:RSA |EC |OPENSSH |)PRIVATE KEY-----/i,
  /\b(?:sk_live|rk_live|pk_live)_[A-Za-z0-9_\-]{12,}\b/,
  /\b(?:api[_-]?key|secret[_-]?key|access[_-]?token|refresh[_-]?token|password)\b\s*[:=]/i,
  /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/
];
const PUBLIC_URL_BLOCKED_HOSTS = /^(?:localhost|127\.0\.0\.1|0\.0\.0\.0|10\.|172\.(?:1[6-9]|2\d|3[0-1])\.|192\.168\.|169\.254\.)/i;

const styleValues = ['cinematic_realism', 'photo_sketch', '3d_blocking', 'family_animated', 'pitch_deck', 'storyboard_ink', 'anime_safe', 'commercial_clean'];
const planValues = ['free_preview', 'free', 'creator', 'studio', 'producer', 'enterprise'];
const roleValues = ['Viewer', 'Creator', 'Producer', 'Admin', 'SuperAdmin'];
const agentScopeValues = ['single_board_only', 'local_scene', 'full_sequence'];
const agentTokenModeValues = ['lowest_cost', 'balanced', 'director_final_quality'];

const text = (max = 1000, required = false): FieldRule => ({ type: 'string', max, required });
const id = (required = false): FieldRule => ({ type: 'id', max: 120, required, pattern: /^[a-zA-Z0-9_.:\-\/]+$/ });
const email = (required = false): FieldRule => ({ type: 'email', max: 254, required });
const url = (required = false, privateNetwork = false): FieldRule => ({ type: 'url', max: 2048, required, allowPrivateNetworkUrls: privateNetwork });
const bool = (): FieldRule => ({ type: 'boolean' });
const obj = (): FieldRule => ({ type: 'object' });
const arr = (): FieldRule => ({ type: 'array' });
const num = (minValue = 0, maxValue = 999999, required = false): FieldRule => ({ type: 'number', minValue, maxValue, required });
const enm = (allowed: string[], required = false): FieldRule => ({ type: 'enum', allowed, required });

const schemas: Record<string, RouteSchema> = {
  '/api/storyboard/free-sample': { maxBodyBytes: SCRIPT_MAX_BODY_BYTES, allowUnknown: true, fields: { script: text(20000, true), style: enm(styleValues), durationSeconds: num(3, 120), panels: num(1, 24), aspectRatio: enm(['16:9', '9:16', '1:1', '4:5', '2.39:1']), frameRate: enm(['24fps', '25fps', '30fps', '60fps']), workspaceId: id(), projectId: id(), userId: id(), plan: enm(planValues), idempotencyKey: id() } },
  '/api/storyboard/generate-live': { maxBodyBytes: SCRIPT_MAX_BODY_BYTES, allowUnknown: true, fields: { script: text(60000, true), style: enm(styleValues), durationSeconds: num(3, 600), panels: num(1, 120), aspectRatio: enm(['16:9', '9:16', '1:1', '4:5', '2.39:1']), workspaceId: id(), projectId: id(), userId: id(), plan: enm(planValues), idempotencyKey: id() } },
  '/api/storyboard/correct-panel': { maxBodyBytes: 256 * 1024, allowUnknown: true, fields: { panelId: id(true), prompt: text(4000, true), workspaceId: id(), projectId: id(), idempotencyKey: id(), locks: obj() } },
  '/api/agent-harness/change-board': { maxBodyBytes: 512 * 1024, allowUnknown: true, fields: { workspaceId: id(), projectId: id(), storyboardId: id(true), boardId: id(true), boardIndex: num(1, 1000, true), totalBoards: num(1, 1000, true), directorPrompt: text(6000, true), currentBoardPrompt: text(10000), currentBoardAssetId: id(), currentBoardImageUrl: url(), previousBoardSummary: text(4000), nextBoardSummary: text(4000), sceneSummary: text(2000), styleSummary: text(2000), characterSummary: text(2000), locationSummary: text(2000), locks: arr(), scope: enm(agentScopeValues), tokenMode: enm(agentTokenModeValues), stitchMode: enm(['block_until_approved', 'preview_only', 'auto_queue_after_approval']), idempotencyKey: id(), dryRun: bool() } },
  '/api/agent-harness/token-plan': { maxBodyBytes: 128 * 1024, allowUnknown: true, fields: { storyboardId: id(), boardId: id(), boardIndex: num(1, 1000, true), totalBoards: num(1, 1000, true), directorPrompt: text(6000, true), currentBoardPrompt: text(10000), previousBoardSummary: text(4000), nextBoardSummary: text(4000), sceneSummary: text(2000), styleSummary: text(2000), characterSummary: text(2000), locationSummary: text(2000), scope: enm(agentScopeValues), tokenMode: enm(agentTokenModeValues) } },
  '/api/storyboard/sample-10s': { maxBodyBytes: SCRIPT_MAX_BODY_BYTES, allowUnknown: true, fields: { storyIdea: text(20000), script: text(20000), visualStyle: enm(styleValues), panels: num(1, 12), durationSeconds: num(3, 30) } },
  '/api/export/package': { maxBodyBytes: 256 * 1024, allowUnknown: true, fields: { projectId: id(true), workspaceId: id(), userId: id(), format: enm(['zip', 'pdf', 'csv', 'json', 'mp4']), idempotencyKey: id() } },
  '/api/export/generate-live': { maxBodyBytes: 256 * 1024, allowUnknown: true, fields: { projectId: id(true), workspaceId: id(), userId: id(), exportType: enm(['pitch_package', 'storyboard_pdf', 'shot_list_csv', 'prompt_package_json', 'animatic_mp4', 'zip']), idempotencyKey: id() } },
  '/api/export/secure-download': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { assetId: id(true), projectId: id(), workspaceId: id(), userId: id() } },
  '/api/billing/create-checkout-session': { maxBodyBytes: 128 * 1024, allowUnknown: true, fields: { planId: id(true), email: email(), workspaceId: id(), successUrl: url(), cancelUrl: url(), idempotencyKey: id() } },
  '/api/support/ticket': { maxBodyBytes: 128 * 1024, allowUnknown: false, fields: { category: enm(['general', 'billing', 'technical', 'storyboard', 'security', 'enterprise']), priority: enm(['low', 'normal', 'high', 'urgent']), email: email(true), message: text(5000, true), source: id() } },
  '/api/email/send': { maxBodyBytes: 128 * 1024, allowUnknown: true, fields: { to: email(true), subject: text(180, true), template: id(), text: text(8000), data: obj() } },
  '/api/proof/submit-quote': { maxBodyBytes: 128 * 1024, allowUnknown: false, fields: { name: text(120, true), title: text(160), company: text(160), email: email(true), quote: text(1800, true), consent: bool() } },
  '/api/onboarding/email': { maxBodyBytes: 128 * 1024, allowUnknown: true, fields: { email: email(true), name: text(120), plan: enm(planValues), workspaceId: id(), useCase: text(200) } },
  '/api/analytics/funnel': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { event: id(true), path: text(500), source: text(200), anonymousId: id(), userId: id(), workspaceId: id(), properties: obj() } },
  '/api/frontend-action': { maxBodyBytes: 64 * 1024, allowUnknown: false, fields: { actionKey: id(true), source: text(120), path: text(500) } },
  '/api/auth/login': { maxBodyBytes: 64 * 1024, allowUnknown: false, fields: { email: email(true), password: { type: 'string', min: 8, max: 256, required: true, allowSecrets: true }, next: text(500) } },
  '/api/auth/signup': { maxBodyBytes: 64 * 1024, allowUnknown: false, fields: { email: email(true), password: { type: 'string', min: 8, max: 256, required: true, allowSecrets: true }, name: text(120), company: text(160), plan: enm(planValues) } },
  '/api/gate/login': { maxBodyBytes: 32 * 1024, allowUnknown: false, allowSecrets: true, fields: { token: { type: 'string', min: 8, max: 256, required: true, allowSecrets: true } } },
  '/api/security/dlp-scan': { maxBodyBytes: SCRIPT_MAX_BODY_BYTES, allowUnknown: true, fields: { text: text(100000, true), source: id() } },
  '/api/security/upload-scan': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { fileName: text(260, true), sizeBytes: num(0, 250 * 1024 * 1024, true), contentType: text(160, true) } },
  '/api/security/risk-score': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { action: id(), workspaceId: id(), highValueAction: bool(), superAdminAction: bool(), publicGeneration: bool() } },
  '/api/security/tenant-access': { maxBodyBytes: 64 * 1024, allowUnknown: false, fields: { userWorkspaceId: id(true), resourceWorkspaceId: id(true), role: enm(roleValues) } },
  '/api/security/audit-event': { maxBodyBytes: 128 * 1024, allowUnknown: true, fields: { eventType: id(true), actorId: id(), workspaceId: id(), resourceId: id(), outcome: enm(['success', 'failure', 'blocked', 'approved']), metadata: obj() } },
  '/api/security/csp-report': { maxBodyBytes: 128 * 1024, allowUnknown: true, fields: { 'csp-report': obj() } },
  '/api/jobs/submit': { maxBodyBytes: 256 * 1024, allowUnknown: true, fields: { jobType: id(true), workspaceId: id(), projectId: id(), payload: obj(), idempotencyKey: id() } },
  '/api/jobs/webhook': { maxBodyBytes: 256 * 1024, allowUnknown: true, allowSecrets: true, fields: { jobId: id(true), status: enm(['queued', 'running', 'succeeded', 'failed', 'cancelled']), payload: obj(), signature: text(512) } },
  '/api/projects': { maxBodyBytes: 256 * 1024, allowUnknown: true, fields: { title: text(180), script: text(60000), workspaceId: id(), projectId: id(), status: enm(['draft', 'review', 'exported', 'shared']) } },
  '/api/tokens/estimate': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { action: id(true), units: num(1, 10000), plan: enm(planValues), workspaceId: id() } },
  '/api/tokens/reserve': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { action: id(true), amount: num(1, 100000, true), workspaceId: id(true), userId: id(), idempotencyKey: id(true) } },
  '/api/tokens/commit': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { reservationId: id(true), workspaceId: id(true), actualAmount: num(0, 100000), idempotencyKey: id() } },
  '/api/tokens/refund': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { reservationId: id(true), workspaceId: id(true), reason: text(500), idempotencyKey: id() } },
  '/api/tokens/purchase': { maxBodyBytes: 64 * 1024, allowUnknown: true, fields: { packId: id(true), workspaceId: id(), email: email(), idempotencyKey: id() } },
  '/api/ai-harness/evaluate': { maxBodyBytes: SCRIPT_MAX_BODY_BYTES, allowUnknown: true, fields: { script: text(100000), provider: id(), model: id(), output: obj(), rubricId: id() } },
  '/api/ai-harness/provenance': { maxBodyBytes: 256 * 1024, allowUnknown: true, fields: { assetId: id(true), provider: id(), model: id(), promptVersion: id(), rights: obj(), metadata: obj() } }
};

function schemaFor(pathname: string): RouteSchema {
  if (schemas[pathname]) return schemas[pathname];
  if (pathname.startsWith('/api/super-admin')) return { maxBodyBytes: 512 * 1024, allowUnknown: true, allowSecrets: true, fields: { action: id(), endpointId: id(), url: url(false, true), name: text(180), value: { type: 'string', max: 4096, allowSecrets: true }, secret: { type: 'string', max: 4096, allowSecrets: true }, payload: obj(), enabled: bool() } };
  if (pathname.startsWith('/api/developer')) return { maxBodyBytes: SCRIPT_MAX_BODY_BYTES, allowUnknown: true, fields: { script: text(100000), projectId: id(), workspaceId: id(), apiKeyId: id(), payload: obj(), idempotencyKey: id() } };
  if (pathname.startsWith('/api/pipeline')) return { maxBodyBytes: SCRIPT_MAX_BODY_BYTES, allowUnknown: true, fields: { script: text(100000), scene: text(20000), prompt: text(10000), projectId: id(), workspaceId: id(), payload: obj(), style: enm(styleValues), stage: id() } };
  if (pathname.startsWith('/api/marketplace')) return { maxBodyBytes: 256 * 1024, allowUnknown: true, fields: { sellerId: id(), templateId: id(), workspaceId: id(), name: text(180), description: text(3000), payoutAccountId: id(), price: num(0, 999999) } };
  if (pathname.startsWith('/api/enterprise')) return { maxBodyBytes: 256 * 1024, allowUnknown: true, allowSecrets: true, fields: { userName: email(), externalId: id(), displayName: text(180), active: bool(), emails: arr(), schemas: arr(), password: { type: 'string', max: 256, allowSecrets: true } } };
  if (pathname.startsWith('/api/platform') || pathname.startsWith('/api/growth')) return { maxBodyBytes: 256 * 1024, allowUnknown: true, fields: { projectId: id(), workspaceId: id(), shareId: id(), referralCode: id(), email: email(), title: text(180), description: text(2000) } };
  return { maxBodyBytes: DEFAULT_MAX_BODY_BYTES, allowUnknown: true, fields: { id: id(), action: id(), projectId: id(), workspaceId: id(), userId: id(), email: email(), name: text(180), message: text(5000), payload: obj() } };
}

export function sanitizeString(value: unknown, max = 5000) {
  return String(value ?? '')
    .normalize('NFKC')
    .replace(CONTROL_CHARS, '')
    .slice(0, max)
    .trim();
}

function analyzeString(field: string, value: string, rule: FieldRule, allowSecrets: boolean): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!rule.allowHtml && XSS_PATTERNS.some((pattern) => pattern.test(value))) {
    issues.push({ field, code: 'xss_payload_detected', message: 'HTML/script-style input is not allowed in this field.', severity: 'critical' });
  }
  if (COMMAND_PATTERNS.some((pattern) => pattern.test(value))) {
    issues.push({ field, code: 'command_injection_pattern', message: 'Command execution-like input was blocked.', severity: 'critical' });
  }
  if (PATH_TRAVERSAL.test(value)) {
    issues.push({ field, code: 'path_traversal_pattern', message: 'Path traversal-like input was blocked.', severity: 'critical' });
  }
  if (TEMPLATE_INJECTION.test(value) && !field.toLowerCase().includes('script')) {
    issues.push({ field, code: 'template_injection_pattern', message: 'Template-expression input is not allowed here.', severity: 'high' });
  }
  if (!allowSecrets && !rule.allowSecrets && SECRET_PATTERNS.some((pattern) => pattern.test(value))) {
    issues.push({ field, code: 'secret_material_detected', message: 'Secret-looking material must not be submitted to this endpoint.', severity: 'critical' });
  }
  return issues;
}

function validateEmail(field: string, value: string, required?: boolean): ValidationIssue[] {
  if (!value && !required) return [];
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
    ? []
    : [{ field, code: 'invalid_email', message: 'Enter a valid email address.', severity: 'medium' }];
}

function validateUrl(field: string, value: string, rule: FieldRule): ValidationIssue[] {
  if (!value && !rule.required) return [];
  const issues: ValidationIssue[] = [];
  try {
    const parsed = new URL(value);
    if (!['https:', 'http:'].includes(parsed.protocol)) issues.push({ field, code: 'invalid_url_protocol', message: 'Only http/https URLs are allowed.', severity: 'high' });
    if (isProductionLike() && parsed.protocol !== 'https:') issues.push({ field, code: 'https_required', message: 'Production URLs must use HTTPS.', severity: 'high' });
    if (!rule.allowPrivateNetworkUrls && PUBLIC_URL_BLOCKED_HOSTS.test(parsed.hostname)) issues.push({ field, code: 'private_network_url_blocked', message: 'Private network and localhost URLs are blocked to reduce SSRF risk.', severity: 'critical' });
  } catch {
    issues.push({ field, code: 'invalid_url', message: 'Enter a valid URL.', severity: 'medium' });
  }
  return issues;
}

function sanitizeRecursive(value: unknown, fieldPath: string, allowSecrets: boolean, issues: ValidationIssue[], maxStringLength = 5000): unknown {
  if (typeof value === 'string') {
    const sanitized = sanitizeString(value, maxStringLength);
    issues.push(...analyzeString(fieldPath, sanitized, { type: 'string', max: maxStringLength }, allowSecrets));
    return sanitized;
  }
  if (Array.isArray(value)) {
    return value.slice(0, 100).map((item, index) => sanitizeRecursive(item, `${fieldPath}[${index}]`, allowSecrets, issues, maxStringLength));
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value as Record<string, unknown>).slice(0, 200)) {
      const safeKey = sanitizeString(key, 80).replace(/[^a-zA-Z0-9_.:\-\[\]]/g, '');
      out[safeKey] = sanitizeRecursive(nested, `${fieldPath}.${safeKey}`, allowSecrets, issues, maxStringLength);
    }
    return out;
  }
  return value;
}

function validateField(field: string, raw: unknown, rule: FieldRule, routeAllowsSecrets: boolean): { value: unknown; issues: ValidationIssue[] } {
  const issues: ValidationIssue[] = [];
  const missing = raw === undefined || raw === null || raw === '';
  if (missing) {
    if (rule.required) issues.push({ field, code: 'required', message: 'This field is required.', severity: 'medium' });
    return { value: rule.default ?? raw, issues };
  }
  const allowSecrets = routeAllowsSecrets || Boolean(rule.allowSecrets);
  if (rule.type === 'string' || rule.type === 'email' || rule.type === 'url' || rule.type === 'id' || rule.type === 'enum') {
    const value = sanitizeString(raw, rule.max ?? 5000);
    if (rule.min && value.length < rule.min) issues.push({ field, code: 'too_short', message: `Minimum length is ${rule.min}.`, severity: 'low' });
    if (rule.max && String(raw).length > rule.max) issues.push({ field, code: 'too_long', message: `Maximum length is ${rule.max}.`, severity: 'medium' });
    if (rule.pattern && !rule.pattern.test(value)) issues.push({ field, code: 'invalid_format', message: 'The value does not match the allowed format.', severity: 'medium' });
    if (rule.type === 'email') issues.push(...validateEmail(field, value, rule.required));
    if (rule.type === 'url') issues.push(...validateUrl(field, value, rule));
    if (rule.type === 'enum' && rule.allowed && value && !rule.allowed.includes(value)) issues.push({ field, code: 'invalid_option', message: `Allowed values: ${rule.allowed.join(', ')}`, severity: 'medium' });
    issues.push(...analyzeString(field, value, rule, allowSecrets));
    return { value, issues };
  }
  if (rule.type === 'number') {
    const value = Number(raw);
    if (!Number.isFinite(value)) issues.push({ field, code: 'invalid_number', message: 'Enter a valid number.', severity: 'medium' });
    if (rule.minValue !== undefined && value < rule.minValue) issues.push({ field, code: 'number_too_small', message: `Minimum value is ${rule.minValue}.`, severity: 'low' });
    if (rule.maxValue !== undefined && value > rule.maxValue) issues.push({ field, code: 'number_too_large', message: `Maximum value is ${rule.maxValue}.`, severity: 'medium' });
    return { value, issues };
  }
  if (rule.type === 'boolean') return { value: raw === true || raw === 'true' || raw === 1 || raw === '1', issues };
  if (rule.type === 'array') {
    if (!Array.isArray(raw)) issues.push({ field, code: 'invalid_array', message: 'Expected an array.', severity: 'medium' });
    return { value: Array.isArray(raw) ? sanitizeRecursive(raw, field, allowSecrets, issues) : [], issues };
  }
  if (rule.type === 'object') {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) issues.push({ field, code: 'invalid_object', message: 'Expected an object.', severity: 'medium' });
    return { value: raw && typeof raw === 'object' && !Array.isArray(raw) ? sanitizeRecursive(raw, field, allowSecrets, issues) : {}, issues };
  }
  return { value: raw, issues };
}

export async function validateApiRequest(request: Request): Promise<ValidationResult> {
  const pathname = new URL(request.url).pathname;
  const schema = schemaFor(pathname);
  const maxBodyBytes = schema.maxBodyBytes ?? DEFAULT_MAX_BODY_BYTES;
  const contentType = request.headers.get('content-type') ?? '';
  const issues: ValidationIssue[] = [];

  if (!contentType.includes('application/json') && request.method.toUpperCase() !== 'GET') {
    return {
      ok: false,
      data: {},
      sanitized: true,
      issues: [{ field: '$', code: 'unsupported_content_type', message: 'Use application/json for API requests.', severity: 'high' }],
      response: secureJson({ ok: false, error: 'unsupported_content_type', message: 'Use application/json for API requests.' }, { status: 415 })
    };
  }

  const rawText = await request.text().catch(() => '');
  if (Buffer.byteLength(rawText, 'utf8') > maxBodyBytes) {
    return {
      ok: false,
      data: {},
      sanitized: true,
      issues: [{ field: '$', code: 'body_too_large', message: `Request body exceeds ${maxBodyBytes} bytes.`, severity: 'high' }],
      response: secureJson({ ok: false, error: 'body_too_large', maxBodyBytes }, { status: 413 })
    };
  }

  let parsed: Record<string, any> = {};
  if (rawText.trim()) {
    try {
      const value = JSON.parse(rawText);
      if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('JSON body must be an object');
      parsed = value;
    } catch {
      return {
        ok: false,
        data: {},
        sanitized: true,
        issues: [{ field: '$', code: 'invalid_json', message: 'Request body must be a valid JSON object.', severity: 'medium' }],
        response: secureJson({ ok: false, error: 'invalid_json', message: 'Request body must be a valid JSON object.' }, { status: 400 })
      };
    }
  }

  const data: Record<string, any> = {};
  for (const [field, rule] of Object.entries(schema.fields)) {
    const { value, issues: fieldIssues } = validateField(field, parsed[field], rule, Boolean(schema.allowSecrets));
    if (value !== undefined) data[field] = value;
    issues.push(...fieldIssues);
  }

  const known = new Set(Object.keys(schema.fields));
  for (const [field, raw] of Object.entries(parsed)) {
    if (known.has(field)) continue;
    if (schema.allowUnknown === false) {
      issues.push({ field, code: 'unknown_field', message: 'Unknown fields are not accepted for this endpoint.', severity: 'low' });
      continue;
    }
    data[field] = sanitizeRecursive(raw, field, Boolean(schema.allowSecrets), issues);
  }

  const blockers = issues.filter((issue) => issue.severity === 'critical' || issue.code === 'required' || issue.code === 'invalid_email' || issue.code === 'invalid_json' || issue.code === 'invalid_option' || issue.code === 'invalid_format');
  if (blockers.length) {
    return { ok: false, data, sanitized: true, issues, response: secureJson({ ok: false, error: 'input_validation_failed', issues }, { status: 400 }) };
  }
  return { ok: true, data, issues, sanitized: true };
}

export function buildInputValidationReadiness() {
  const requiredControls = [
    'JSON-only API body policy',
    'Bounded request size per route',
    'Required field checks',
    'Email/URL/ID/enum/number validation',
    'Recursive string sanitization',
    'XSS, command injection, path traversal, and template injection detection',
    'Secret-material detection for public endpoints',
    'SSRF private-network URL blocking',
    'Route-specific schemas for storyboard, export, billing, auth, support, analytics, AI harness, tokens, and Super Admin flows',
    'Security validation scripts and penetration-test harness'
  ];
  return {
    ok: true,
    profile: 'v7.4-top-security-input-validation',
    schemas: Object.keys(schemas).length,
    defaultMaxBodyBytes: DEFAULT_MAX_BODY_BYTES,
    scriptMaxBodyBytes: SCRIPT_MAX_BODY_BYTES,
    requiredControls
  };
}
