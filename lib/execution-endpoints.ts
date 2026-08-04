export type ExecutionStage =
  | 'script_upload'
  | 'script_parse'
  | 'script_validate'
  | 'story_analysis'
  | 'beat_generate'
  | 'beat_verify'
  | 'scene_breakdown'
  | 'shot_design'
  | 'spatial_layout'
  | 'character_location_bible'
  | 'storyboard_generate'
  | 'storyboard_correct'
  | 'low_token_context_plan'
  | 'agent_director_board_change'
  | 'animatic_generate'
  | 'voice_music_sfx'
  | 'video_handoff'
  | 'export_package'
  | 'auto_qa'
  | 'token_reserve'
  | 'token_commit'
  | 'token_refund'
  | 'storage_upload'
  | 'storage_signed_download'
  | 'billing_checkout'
  | 'billing_webhook'
  | 'analytics_event'
  | 'moderation_rights_check';

export type ExecutionEndpointAuthMode =
  | 'none_demo'
  | 'bearer_env_secret'
  | 'x_api_key_env_secret'
  | 'basic_env_secret'
  | 'signed_hmac_env_secret'
  | 'oauth_client_credentials';

export type ExecutionEndpointMode = 'demo' | 'configured' | 'live' | 'disabled';

export type ExecutionEndpointDefinition = {
  key: ExecutionStage;
  label: string;
  businessPurpose: string;
  customerPromise: string;
  productionRequirement: string;
  defaultUrlEnv: string;
  defaultSecretEnv: string;
  defaultAuthMode: ExecutionEndpointAuthMode;
  timeoutMs: number;
  tokenPolicy: 'none' | 'estimate_only' | 'reserve_then_commit' | 'deduct_on_success' | 'refund_on_failure';
  requiredResponseKeys: string[];
  samplePayload: Record<string, unknown>;
  sampleResponse: Record<string, unknown>;
  fallbackBehavior: string;
  tenOutOfTenImpact: string;
};

export const executionEndpointCatalog: ExecutionEndpointDefinition[] = [
  {
    key: 'script_upload',
    label: 'Script upload ingestion',
    businessPurpose: 'Accept PDF, DOCX, TXT, Fountain, and FDX screenplay files and move them into private storage.',
    customerPromise: 'The filmmaker can upload a real script without losing formatting or confidential IP.',
    productionRequirement: 'Endpoint must virus-scan, validate type/size, store privately, and return assetId plus extracted text if available.',
    defaultUrlEnv: 'EXEC_SCRIPT_UPLOAD_URL',
    defaultSecretEnv: 'EXEC_SCRIPT_UPLOAD_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 120000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['assetId', 'status'],
    samplePayload: { fileName: 'sample-scene.txt', contentType: 'text/plain', workspaceId: 'ws_demo', projectId: 'project_demo' },
    sampleResponse: { assetId: 'asset_script_001', status: 'stored', privateUrl: 'signed://asset_script_001' },
    fallbackBehavior: 'Use paste-text mode and store metadata only.',
    tenOutOfTenImpact: 'Makes the first customer action feel professional and secure.'
  },
  {
    key: 'script_parse',
    label: 'Script parser',
    businessPurpose: 'Extract screenplay structure, dialogue, action, characters, locations, props, and timing.',
    customerPromise: 'A writer can paste or upload a script and immediately see scenes and dialogue understood correctly.',
    productionRequirement: 'Endpoint must return normalized scenes with source line references and confidence values.',
    defaultUrlEnv: 'EXEC_SCRIPT_PARSE_URL',
    defaultSecretEnv: 'EXEC_SCRIPT_PARSE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 180000,
    tokenPolicy: 'estimate_only',
    requiredResponseKeys: ['scenes', 'characters', 'locations', 'runtimeEstimateSeconds'],
    samplePayload: { scriptText: 'EXT. DESERT - SUNSET\nMoses walks alone...', parserMode: 'screenplay' },
    sampleResponse: { scenes: [{ sceneNumber: 1, slugline: 'EXT. DESERT - SUNSET', sourceLines: [1, 8] }], characters: ['Moses'], locations: ['Desert'], runtimeEstimateSeconds: 10 },
    fallbackBehavior: 'Use local demo parser and mark result as needs review.',
    tenOutOfTenImpact: 'Removes the biggest friction for screenwriters and producers.'
  },
  {
    key: 'script_validate',
    label: 'Script validation',
    businessPurpose: 'Find missing sluglines, unclear locations, duplicate names, runtime risk, and production blockers.',
    customerPromise: 'The user sees exactly what must be fixed before storyboarding.',
    productionRequirement: 'Endpoint must return issues with severity, source references, and suggested fixes.',
    defaultUrlEnv: 'EXEC_SCRIPT_VALIDATE_URL',
    defaultSecretEnv: 'EXEC_SCRIPT_VALIDATE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 120000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['score', 'issues', 'approvedForBreakdown'],
    samplePayload: { projectId: 'project_demo', scriptAssetId: 'asset_script_001' },
    sampleResponse: { score: 94, issues: [], approvedForBreakdown: true },
    fallbackBehavior: 'Run deterministic validation rules and flag as demo-grade.',
    tenOutOfTenImpact: 'Builds trust before the expensive generation steps.'
  },
  {
    key: 'story_analysis',
    label: 'Story analysis',
    businessPurpose: 'Generate logline, theme, protagonist arc, tone, genre, and emotional map.',
    customerPromise: 'The filmmaker can verify that CineLoom understands the story before generating visuals.',
    productionRequirement: 'Endpoint must cite source scene references and return editable analysis blocks.',
    defaultUrlEnv: 'EXEC_STORY_ANALYSIS_URL',
    defaultSecretEnv: 'EXEC_STORY_ANALYSIS_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 180000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['logline', 'theme', 'emotionalArc'],
    samplePayload: { projectId: 'project_demo', scenes: ['EXT. DESERT - SUNSET'] },
    sampleResponse: { logline: 'A reluctant leader hears a call in the wilderness.', theme: 'Faith under pressure', emotionalArc: ['isolation', 'calling', 'resolve'] },
    fallbackBehavior: 'Use local sample analysis and require director approval.',
    tenOutOfTenImpact: 'Makes the app feel like a creative collaborator, not a generator.'
  },
  {
    key: 'beat_generate',
    label: 'Beat breakdown generator',
    businessPurpose: 'Create Hollywood continuity beats such as Save the Cat, 3-act, or Hero Journey structures.',
    customerPromise: 'The screenplay becomes a clear story map before shots and panels are created.',
    productionRequirement: 'Endpoint must return beat names, scene coverage, emotional purpose, and missing-beat risks.',
    defaultUrlEnv: 'EXEC_BEAT_GENERATE_URL',
    defaultSecretEnv: 'EXEC_BEAT_GENERATE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 180000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['beats', 'coverageScore'],
    samplePayload: { projectId: 'project_demo', model: 'save_the_cat', runtimeSeconds: 10 },
    sampleResponse: { coverageScore: 96, beats: [{ name: 'Opening Image', scenes: [1], purpose: 'loneliness' }] },
    fallbackBehavior: 'Use a template beat sheet with explicit confidence warnings.',
    tenOutOfTenImpact: 'Adds professional screenwriting credibility.'
  },
  {
    key: 'beat_verify',
    label: 'Beat verification engine',
    businessPurpose: 'Run second-pass QA over beat structure, coverage, timing, and character arc.',
    customerPromise: 'The user knows whether the story structure is ready for scene and shot generation.',
    productionRequirement: 'Endpoint must return pass/fail gates, weak beats, missing beats, and revision prompts.',
    defaultUrlEnv: 'EXEC_BEAT_VERIFY_URL',
    defaultSecretEnv: 'EXEC_BEAT_VERIFY_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 120000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['verified', 'score', 'fixes'],
    samplePayload: { projectId: 'project_demo', beats: [{ name: 'Opening Image' }] },
    sampleResponse: { verified: true, score: 95, fixes: [] },
    fallbackBehavior: 'Use deterministic required-beat coverage rules.',
    tenOutOfTenImpact: 'Prevents bad storyboards from weak structure.'
  },
  {
    key: 'scene_breakdown',
    label: 'Scene breakdown',
    businessPurpose: 'Convert approved story analysis and beats into scene cards with timing, intent, characters, and continuity.',
    customerPromise: 'The director can review scene-by-scene before shots are designed.',
    productionRequirement: 'Endpoint must return editable scenes and preserve source references.',
    defaultUrlEnv: 'EXEC_SCENE_BREAKDOWN_URL',
    defaultSecretEnv: 'EXEC_SCENE_BREAKDOWN_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 180000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['scenes', 'runtimeEstimateSeconds'],
    samplePayload: { projectId: 'project_demo', beatsApproved: true },
    sampleResponse: { runtimeEstimateSeconds: 10, scenes: [{ id: 'scene_001', slugline: 'EXT. DESERT - SUNSET', purpose: 'establish calling' }] },
    fallbackBehavior: 'Use parser scenes and require manual approval.',
    tenOutOfTenImpact: 'Creates the backbone for all downstream production artifacts.'
  },
  {
    key: 'shot_design',
    label: '5 Cs shot design',
    businessPurpose: 'Create professional shot lists using camera angles, continuity, cutting, close-ups, composition, lens, and movement.',
    customerPromise: 'A cinematographer sees shot motivation, not just generic image prompts.',
    productionRequirement: 'Endpoint must return shot size, angle, lens, movement, emotional purpose, and continuity notes.',
    defaultUrlEnv: 'EXEC_SHOT_DESIGN_URL',
    defaultSecretEnv: 'EXEC_SHOT_DESIGN_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 180000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['shots', 'continuityNotes'],
    samplePayload: { sceneId: 'scene_001', style: 'cinematic_realism', aspectRatio: '2.39:1' },
    sampleResponse: { shots: [{ shotNumber: 1, size: 'Wide', lens: '24mm', movement: 'slow push', purpose: 'isolation' }], continuityNotes: ['screen direction locked left-to-right'] },
    fallbackBehavior: 'Use master-shot templates by genre.',
    tenOutOfTenImpact: 'Raises DP and director confidence.'
  },
  {
    key: 'spatial_layout',
    label: '180-degree spatial layout',
    businessPurpose: 'Generate overhead camera geography, axis of action, movement arrows, distances, and eyeline warnings.',
    customerPromise: 'The storyboard will preserve cinematic geography and avoid confusing cuts.',
    productionRequirement: 'Endpoint must return layout coordinates, axis, camera positions, warnings, and SVG/JSON diagram data.',
    defaultUrlEnv: 'EXEC_SPATIAL_LAYOUT_URL',
    defaultSecretEnv: 'EXEC_SPATIAL_LAYOUT_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 120000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['axisOfAction', 'cameraPositions', 'warnings'],
    samplePayload: { sceneId: 'scene_001', shots: [{ shotNumber: 1, size: 'Wide' }] },
    sampleResponse: { axisOfAction: { from: [10, 50], to: [90, 50] }, cameraPositions: [{ shot: 1, x: 22, y: 80 }], warnings: [] },
    fallbackBehavior: 'Use deterministic horizontal axis layout.',
    tenOutOfTenImpact: 'Creates a unique CineLoom film-industry moat.'
  },
  {
    key: 'character_location_bible',
    label: 'Character and location bible',
    businessPurpose: 'Create consistent character, wardrobe, prop, and location references.',
    customerPromise: 'The same characters and places stay visually consistent across panels and animatics.',
    productionRequirement: 'Endpoint must return visual prompts, reference IDs, wardrobe/prop continuity, and locked identity notes.',
    defaultUrlEnv: 'EXEC_CHARACTER_LOCATION_BIBLE_URL',
    defaultSecretEnv: 'EXEC_CHARACTER_LOCATION_BIBLE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 180000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['characters', 'locations', 'continuityLocks'],
    samplePayload: { projectId: 'project_demo', scenes: ['scene_001'] },
    sampleResponse: { characters: [{ name: 'Moses', wardrobe: 'weathered robe' }], locations: [{ name: 'Desert', palette: 'amber dusk' }], continuityLocks: ['staff', 'robe', 'desert skyline'] },
    fallbackBehavior: 'Use user-editable manual bible templates.',
    tenOutOfTenImpact: 'Addresses the biggest AI film consistency concern.'
  },
  {
    key: 'storyboard_generate',
    label: 'Static storyboard generation',
    businessPurpose: 'Generate storyboard panels from approved shots, character bible, location bible, and visual style.',
    customerPromise: 'The user receives a visible, reviewable storyboard in minutes.',
    productionRequirement: 'Endpoint must return panel asset IDs, image URLs/signed URLs, prompts, seed metadata, and token usage.',
    defaultUrlEnv: 'EXEC_STORYBOARD_GENERATE_URL',
    defaultSecretEnv: 'EXEC_STORYBOARD_GENERATE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 600000,
    tokenPolicy: 'reserve_then_commit',
    requiredResponseKeys: ['panels', 'providerRequestId', 'tokenUsage'],
    samplePayload: { sceneId: 'scene_001', shotIds: ['shot_001'], style: 'cinematic_realism' },
    sampleResponse: { panels: [{ panelId: 'panel_001', assetId: 'asset_panel_001', status: 'generated' }], providerRequestId: 'img_req_001', tokenUsage: 50 },
    fallbackBehavior: 'Return watermarked demo frames and explain provider not connected.',
    tenOutOfTenImpact: 'Core paid product value.'
  },
  {
    key: 'low_token_context_plan',
    label: 'Low-token context plan',
    businessPurpose: 'Create the smallest safe context package before a director changes one storyboard board.',
    customerPromise: 'The director can change a single board without sending or regenerating the full storyboard.',
    productionRequirement: 'Endpoint or local planner must include only target board metadata, neighbor summaries, locks, token estimate, and full-context blocking rules.',
    defaultUrlEnv: 'EXEC_LOW_TOKEN_CONTEXT_PLAN_URL',
    defaultSecretEnv: 'EXEC_LOW_TOKEN_CONTEXT_PLAN_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 30000,
    tokenPolicy: 'estimate_only',
    requiredResponseKeys: ['targetBoard', 'estimatedInputTokens', 'blockedFullStoryboardContext'],
    samplePayload: { storyboardId: 'storyboard_1000_panel_demo', boardId: 'board_0417', boardIndex: 417, totalBoards: 1000, tokenMode: 'lowest_cost' },
    sampleResponse: { targetBoard: 'board_0417', estimatedInputTokens: 850, blockedFullStoryboardContext: true, includedContextBoards: ['board_0416', 'board_0417', 'board_0418'] },
    fallbackBehavior: 'Use local deterministic context estimator and block full-storyboard context for more than 50 boards.',
    tenOutOfTenImpact: 'Keeps AI cost low while preserving director control and continuity.'
  },

  {
    key: 'storyboard_correct',
    label: 'Prompt-driven storyboard correction',
    businessPurpose: 'Revise a selected panel using director prompt corrections while preserving locks.',
    customerPromise: 'The director can say “make it more emotional” and keep character, style, and 180-degree continuity intact.',
    productionRequirement: 'Endpoint must return new version, before/after metadata, lock compliance, and cost.',
    defaultUrlEnv: 'EXEC_STORYBOARD_CORRECT_URL',
    defaultSecretEnv: 'EXEC_STORYBOARD_CORRECT_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 600000,
    tokenPolicy: 'reserve_then_commit',
    requiredResponseKeys: ['newPanelVersionId', 'lockComplianceScore', 'assetId'],
    samplePayload: { panelId: 'panel_001', correction: 'Make it more emotional, keep same character and camera angle.', locks: ['character', 'style', 'camera', 'axis'] },
    sampleResponse: { newPanelVersionId: 'panel_001_v2', lockComplianceScore: 97, assetId: 'asset_panel_001_v2' },
    fallbackBehavior: 'Create corrected prompt text and queue generation when provider is available.',
    tenOutOfTenImpact: 'Turns the product from generator into director-controlled creative tool.'
  },
  {
    key: 'agent_director_board_change',
    label: 'ChatGPT director single-board agent',
    businessPurpose: 'Let a director change exactly one storyboard board out of a large board set before dynamic stitching.',
    customerPromise: 'A director can say “change board 417 only” and CineLoom will keep the other 999 boards untouched.',
    productionRequirement: 'Endpoint must return a bounded single-board patch, lock checklist, eval requirements, provenance metadata, rollback instructions, and approval gate status.',
    defaultUrlEnv: 'CHATGPT_AGENT_ENDPOINT_URL',
    defaultSecretEnv: 'CHATGPT_AGENT_ENDPOINT_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 120000,
    tokenPolicy: 'reserve_then_commit',
    requiredResponseKeys: ['newPanelPrompt', 'lockChecklist', 'approvalRequired'],
    samplePayload: { storyboardId: 'storyboard_1000_panel_demo', boardId: 'board_0417', boardIndex: 417, totalBoards: 1000, directorPrompt: 'Make this one board more emotional, do not change any other board.', locks: ['character', 'style', 'axis', 'neighbor_continuity'] },
    sampleResponse: { newPanelPrompt: 'Correct board 417 only...', lockChecklist: [{ lock: 'axis', status: 'pass' }], approvalRequired: true },
    fallbackBehavior: 'Create a local patch plan and block dynamic stitching until a real correction provider is connected.',
    tenOutOfTenImpact: 'Gives filmmakers precise director control at scale and prevents expensive full-storyboard regeneration.'
  },
  {
    key: 'animatic_generate',
    label: 'Animatic generation',
    businessPurpose: 'Turn storyboard panels into timed motion preview with cuts, push-ins, pans, and audio placeholders.',
    customerPromise: 'The producer can watch the scene before full video generation.',
    productionRequirement: 'Endpoint must render or queue MP4, return jobId, duration, signed video URL, and status.',
    defaultUrlEnv: 'EXEC_ANIMATIC_GENERATE_URL',
    defaultSecretEnv: 'EXEC_ANIMATIC_GENERATE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 900000,
    tokenPolicy: 'reserve_then_commit',
    requiredResponseKeys: ['jobId', 'status', 'durationSeconds'],
    samplePayload: { projectId: 'project_demo', sceneId: 'scene_001', durationSeconds: 10, frameRate: 24 },
    sampleResponse: { jobId: 'job_animatic_001', status: 'queued', durationSeconds: 10 },
    fallbackBehavior: 'Use bundled demo animatic and label as sample.',
    tenOutOfTenImpact: 'Creates the emotional “movie-in-motion” proof.'
  },
  {
    key: 'voice_music_sfx',
    label: 'Dialogue, voice, music, and SFX',
    businessPurpose: 'Generate or map dialogue timing, scratch voices, music cue, and sound effects.',
    customerPromise: 'The animatic feels like a real scene with sound, not just panels.',
    productionRequirement: 'Endpoint must return dialogue cues, voice assets, music asset, SFX cues, and mix notes.',
    defaultUrlEnv: 'EXEC_AUDIO_GENERATE_URL',
    defaultSecretEnv: 'EXEC_AUDIO_GENERATE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 600000,
    tokenPolicy: 'reserve_then_commit',
    requiredResponseKeys: ['dialogueCues', 'audioAssets', 'mixNotes'],
    samplePayload: { sceneId: 'scene_001', dialogueMode: 'scratch_voice', musicMood: 'awe' },
    sampleResponse: { dialogueCues: [], audioAssets: [{ type: 'music', assetId: 'asset_music_001' }], mixNotes: ['low desert wind'] },
    fallbackBehavior: 'Return cue sheet without generated audio.',
    tenOutOfTenImpact: 'Raises director demo from visual proof to emotional proof.'
  },
  {
    key: 'video_handoff',
    label: 'Video generation handoff',
    businessPurpose: 'Package approved storyboards, prompts, timing, style, and references for video providers.',
    customerPromise: 'A paid user can move from storyboard to provider-ready video generation.',
    productionRequirement: 'Endpoint must return provider payloads, cost estimates, and validation warnings.',
    defaultUrlEnv: 'EXEC_VIDEO_HANDOFF_URL',
    defaultSecretEnv: 'EXEC_VIDEO_HANDOFF_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 180000,
    tokenPolicy: 'estimate_only',
    requiredResponseKeys: ['providerPayloads', 'estimatedCostCents', 'warnings'],
    samplePayload: { projectId: 'project_demo', provider: 'auto', approvedOnly: true },
    sampleResponse: { providerPayloads: [{ provider: 'fal_hunyuan', sceneId: 'scene_001' }], estimatedCostCents: 280, warnings: [] },
    fallbackBehavior: 'Export prompt package JSON only.',
    tenOutOfTenImpact: 'Shows credible bridge to final AI video production.'
  },
  {
    key: 'export_package',
    label: 'Production export package',
    businessPurpose: 'Generate storyboard PDF, shot CSV, QA PDF, prompt JSON, animatic MP4, and ZIP package.',
    customerPromise: 'The user receives real deliverables they can share with a producer or team.',
    productionRequirement: 'Endpoint must render customer-specific private files and return secure download IDs.',
    defaultUrlEnv: 'EXEC_EXPORT_PACKAGE_URL',
    defaultSecretEnv: 'EXEC_EXPORT_PACKAGE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 900000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['exports', 'zipAssetId', 'status'],
    samplePayload: { projectId: 'project_demo', exportTypes: ['storyboard_pdf', 'shot_csv', 'prompt_json', 'animatic_mp4', 'zip'] },
    sampleResponse: { status: 'ready', zipAssetId: 'asset_export_zip_001', exports: [{ type: 'storyboard_pdf', assetId: 'asset_pdf_001' }] },
    fallbackBehavior: 'Return demo package and require upgrade for custom export.',
    tenOutOfTenImpact: 'Converts excitement into paid, tangible value.'
  },
  {
    key: 'auto_qa',
    label: 'Auto QA and production readiness',
    businessPurpose: 'Run film-aware checks across script, beats, shots, continuity, storyboard, animatic, rights, and export readiness.',
    customerPromise: 'The team knows what is ready and what needs fixing.',
    productionRequirement: 'Endpoint must return stage scores, blockers, fixes, and pass/fail gate.',
    defaultUrlEnv: 'EXEC_AUTO_QA_URL',
    defaultSecretEnv: 'EXEC_AUTO_QA_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 180000,
    tokenPolicy: 'deduct_on_success',
    requiredResponseKeys: ['overallScore', 'stageScores', 'blockers'],
    samplePayload: { projectId: 'project_demo', gate: 'export_ready' },
    sampleResponse: { overallScore: 96, stageScores: { storyboard: 97, continuity: 95 }, blockers: [] },
    fallbackBehavior: 'Use deterministic checklist and mark as human review required.',
    tenOutOfTenImpact: 'Builds trust for producers, directors, and paying customers.'
  },
  {
    key: 'token_reserve',
    label: 'Token reserve',
    businessPurpose: 'Reserve tokens before expensive AI or render jobs.',
    customerPromise: 'The user sees predictable pricing and no surprise charges.',
    productionRequirement: 'Endpoint must be transactional and idempotent.',
    defaultUrlEnv: 'EXEC_TOKEN_RESERVE_URL',
    defaultSecretEnv: 'EXEC_TOKEN_LEDGER_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 30000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['reservationId', 'reservedTokens', 'expiresAt'],
    samplePayload: { workspaceId: 'ws_demo', jobType: 'storyboard_generate', estimatedTokens: 75, idempotencyKey: 'demo_001' },
    sampleResponse: { reservationId: 'res_001', reservedTokens: 75, expiresAt: '2026-07-30T16:00:00-04:00' },
    fallbackBehavior: 'Block paid generation if TOKEN_HARD_STOP_ENABLED=true and ledger is unavailable.',
    tenOutOfTenImpact: 'Protects margin and billing trust.'
  },
  {
    key: 'token_commit',
    label: 'Token commit',
    businessPurpose: 'Finalize token deduction after a successful job.',
    customerPromise: 'Tokens are consumed only when value is delivered.',
    productionRequirement: 'Endpoint must be idempotent and reconcile provider usage.',
    defaultUrlEnv: 'EXEC_TOKEN_COMMIT_URL',
    defaultSecretEnv: 'EXEC_TOKEN_LEDGER_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 30000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['committed', 'actualTokens', 'balance'],
    samplePayload: { reservationId: 'res_001', actualTokens: 68, providerRequestId: 'img_req_001' },
    sampleResponse: { committed: true, actualTokens: 68, balance: 1932 },
    fallbackBehavior: 'Keep job in reconciliation_required state.',
    tenOutOfTenImpact: 'Gives finance-grade control over token billing.'
  },
  {
    key: 'token_refund',
    label: 'Token refund',
    businessPurpose: 'Refund or release reserved tokens when generation fails or is cancelled.',
    customerPromise: 'Users are not charged for failed provider jobs.',
    productionRequirement: 'Endpoint must be idempotent and linked to failed job reason.',
    defaultUrlEnv: 'EXEC_TOKEN_REFUND_URL',
    defaultSecretEnv: 'EXEC_TOKEN_LEDGER_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 30000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['refunded', 'tokens', 'balance'],
    samplePayload: { reservationId: 'res_001', reason: 'provider_timeout' },
    sampleResponse: { refunded: true, tokens: 75, balance: 2000 },
    fallbackBehavior: 'Flag support review for manual token credit.',
    tenOutOfTenImpact: 'Reduces churn caused by failed generation anxiety.'
  },
  {
    key: 'storage_upload',
    label: 'Private asset upload',
    businessPurpose: 'Move generated assets into private storage with workspace permissions.',
    customerPromise: 'Scripts, frames, animatics, and exports stay private.',
    productionRequirement: 'Endpoint must return assetId and metadata; never expose raw public paths for customer IP.',
    defaultUrlEnv: 'EXEC_STORAGE_UPLOAD_URL',
    defaultSecretEnv: 'EXEC_STORAGE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 120000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['assetId', 'storageKey', 'visibility'],
    samplePayload: { workspaceId: 'ws_demo', assetType: 'storyboard_panel', sourceUrl: 'provider://image/1' },
    sampleResponse: { assetId: 'asset_panel_001', storageKey: 'ws_demo/projects/project_demo/panel_001.png', visibility: 'private' },
    fallbackBehavior: 'Keep demo assets public only for sample projects.',
    tenOutOfTenImpact: 'Protects film IP, the most important trust factor for serious users.'
  },
  {
    key: 'storage_signed_download',
    label: 'Secure signed download',
    businessPurpose: 'Serve protected PDFs, videos, and ZIP exports through signed URLs.',
    customerPromise: 'Only authorized users can download project assets.',
    productionRequirement: 'Endpoint must validate user/workspace access and return time-limited URL.',
    defaultUrlEnv: 'EXEC_STORAGE_SIGNED_DOWNLOAD_URL',
    defaultSecretEnv: 'EXEC_STORAGE_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 30000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['downloadUrl', 'expiresAt'],
    samplePayload: { assetId: 'asset_export_zip_001', userId: 'user_demo' },
    sampleResponse: { downloadUrl: 'https://signed.example/export.zip', expiresAt: '2026-07-30T16:00:00-04:00' },
    fallbackBehavior: 'Block custom project download and provide demo assets only.',
    tenOutOfTenImpact: 'Meets producer and enterprise expectations for privacy.'
  },
  {
    key: 'billing_checkout',
    label: 'Billing checkout',
    businessPurpose: 'Create Stripe or gateway checkout sessions for subscriptions and token packs.',
    customerPromise: 'Users can pay and immediately unlock paid workflow.',
    productionRequirement: 'Endpoint must return checkoutUrl and use gateway price IDs.',
    defaultUrlEnv: 'EXEC_BILLING_CHECKOUT_URL',
    defaultSecretEnv: 'EXEC_BILLING_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 30000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['checkoutUrl', 'sessionId'],
    samplePayload: { workspaceId: 'ws_demo', plan: 'studio', successUrl: 'https://cineloom.ai/studio/billing/success' },
    sampleResponse: { checkoutUrl: 'https://checkout.stripe.com/demo', sessionId: 'cs_demo_001' },
    fallbackBehavior: 'Show demo checkout message; do not grant paid entitlements.',
    tenOutOfTenImpact: 'Turns interest into revenue.'
  },
  {
    key: 'billing_webhook',
    label: 'Billing webhook reconciliation',
    businessPurpose: 'Process payment, subscription, cancellation, invoice, and token-pack webhooks.',
    customerPromise: 'Paid access is accurate and billing state is trusted.',
    productionRequirement: 'Endpoint must verify signature and update DB transactionally.',
    defaultUrlEnv: 'EXEC_BILLING_WEBHOOK_URL',
    defaultSecretEnv: 'STRIPE_WEBHOOK_SECRET',
    defaultAuthMode: 'signed_hmac_env_secret',
    timeoutMs: 30000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['processed', 'eventId'],
    samplePayload: { type: 'checkout.session.completed', id: 'evt_demo' },
    sampleResponse: { processed: true, eventId: 'evt_demo' },
    fallbackBehavior: 'Keep subscription in pending_webhook state.',
    tenOutOfTenImpact: 'Prevents revenue leakage and entitlement mistakes.'
  },
  {
    key: 'analytics_event',
    label: 'Analytics event collector',
    businessPurpose: 'Track funnel, activation, token burn, generation success, exports, MRR, and churn events.',
    customerPromise: 'The product improves based on real usage and success metrics.',
    productionRequirement: 'Endpoint must accept idempotent event payloads and avoid PII leakage.',
    defaultUrlEnv: 'EXEC_ANALYTICS_EVENT_URL',
    defaultSecretEnv: 'EXEC_ANALYTICS_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 30000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['accepted'],
    samplePayload: { event: 'free_sample_completed', workspaceId: 'ws_demo', metadata: { genre: 'biblical' } },
    sampleResponse: { accepted: true },
    fallbackBehavior: 'Log to server console in demo mode.',
    tenOutOfTenImpact: 'Makes revenue optimization measurable.'
  },
  {
    key: 'moderation_rights_check',
    label: 'Safety, rights, and moderation check',
    businessPurpose: 'Check uploaded scripts and generation requests for rights, likeness, unsafe content, and policy issues.',
    customerPromise: 'CineLoom helps users create responsibly and protects the company from avoidable risk.',
    productionRequirement: 'Endpoint must return allow/review/block decision with reason and appeal path.',
    defaultUrlEnv: 'EXEC_MODERATION_RIGHTS_URL',
    defaultSecretEnv: 'EXEC_MODERATION_RIGHTS_SECRET',
    defaultAuthMode: 'bearer_env_secret',
    timeoutMs: 60000,
    tokenPolicy: 'none',
    requiredResponseKeys: ['decision', 'reasons'],
    samplePayload: { scriptText: 'Original short scene...', requestedStyle: 'cinematic realism', userAttestation: true },
    sampleResponse: { decision: 'allow', reasons: [] },
    fallbackBehavior: 'Require user rights attestation and block high-risk requests for manual review.',
    tenOutOfTenImpact: 'Required for film-industry trust and public launch safety.'
  }
];

export const tenOutOfTenCustomerTargets = [
  { area: 'Film enthusiast', target: 'Instant free 10-second storyboard with no confusing setup.', executionEndpoint: 'storyboard_generate' },
  { area: 'Indie filmmaker', target: 'Real script upload, reviewable shot plan, PDF export, and prompt corrections.', executionEndpoint: 'script_parse' },
  { area: 'Producer', target: 'Secure export package, token clarity, team review, and private IP handling.', executionEndpoint: 'export_package' },
  { area: 'Cinematographer / DP', target: '5 Cs shot design, 180-degree layout, lens/movement rationale, and visual continuity warnings.', executionEndpoint: 'shot_design' },
  { area: 'Hollywood director', target: 'Director-only mode, emotional sample scene, quick revisions, and approved-version locks.', executionEndpoint: 'storyboard_correct' },
  { area: 'Studio / enterprise', target: 'Private storage, audit logs, SSO-ready connector, secure downloads, and rights controls.', executionEndpoint: 'storage_signed_download' },
  { area: 'Revenue operations', target: 'Stripe/webhooks, token reserve/commit/refund, analytics, and admin observability.', executionEndpoint: 'token_reserve' }
];

export const endpointWorkflowMap = [
  { uiStage: 'Create free 10-sec storyboard', endpoints: ['moderation_rights_check', 'script_validate', 'token_reserve', 'storyboard_generate', 'storage_upload', 'token_commit', 'analytics_event'] },
  { uiStage: 'Full script-to-storyboard', endpoints: ['script_upload', 'script_parse', 'script_validate', 'story_analysis', 'beat_generate', 'beat_verify', 'scene_breakdown', 'shot_design', 'spatial_layout', 'character_location_bible', 'storyboard_generate', 'auto_qa'] },
  { uiStage: 'Prompt correction', endpoints: ['moderation_rights_check', 'token_reserve', 'storyboard_correct', 'storage_upload', 'token_commit', 'analytics_event'] },
  { uiStage: 'Dynamic animatic', endpoints: ['token_reserve', 'animatic_generate', 'voice_music_sfx', 'storage_upload', 'token_commit', 'auto_qa'] },
  { uiStage: 'Paid export', endpoints: ['plan_enforcement_internal', 'token_reserve', 'export_package', 'storage_signed_download', 'token_commit', 'analytics_event'] },
  { uiStage: 'Subscription / tokens', endpoints: ['billing_checkout', 'billing_webhook', 'token_commit', 'analytics_event'] }
];
