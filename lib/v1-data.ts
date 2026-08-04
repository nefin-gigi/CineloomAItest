export const v1Readiness = {
  version: '1.0',
  releaseName: 'Hollywood Director Demo',
  productPromise: 'Script upload to verified beat breakdown, shot design, static storyboard, animatic, audio plan, rough-cut handoff, and QA package.',
  qualityScore: 94,
  implementationMode: 'Demo-ready UI with deterministic mock AI APIs and provider-ready integration contracts.'
};

export const scriptParserFeatures = [
  { name: 'Multi-format intake', detail: 'Paste text now; PDF, DOCX, TXT, Fountain, and Final Draft hooks documented for provider implementation.', status: 'Ready' },
  { name: 'Scene heading detection', detail: 'Detects INT/EXT, location, and time-of-day gaps before analysis.', status: 'Ready' },
  { name: 'Dialogue extraction', detail: 'Maps screenplay dialogue to characters for voice, timing, and animatic tracks.', status: 'Ready' },
  { name: 'Action-line extraction', detail: 'Uses visual action to derive shots, panels, and blocking notes.', status: 'Ready' },
  { name: 'Source traceability', detail: 'Every beat, scene, shot, panel, and audio cue links back to source script ranges.', status: 'Ready' },
  { name: 'Runtime estimate', detail: 'Estimates page and scene runtime to validate short film, trailer, and animatic length.', status: 'Ready' }
];

export const beatVerificationRows = [
  { beat: 'Opening Image', expected: 'Visual tone, central world, protagonist state', detected: 'Moses alone on desert ridge at sunset', score: 96, action: 'Approved' },
  { beat: 'Theme Stated', expected: 'Faith under pressure stated visually or through dialogue', detected: 'Theme implied by staff, solitude, and silence', score: 83, action: 'Revise wording' },
  { beat: 'Set-Up', expected: 'World, stakes, emotional burden, key relationships', detected: 'Egypt memory establishes oppression and stakes', score: 88, action: 'Approved' },
  { beat: 'Catalyst', expected: 'Irreversible disruption that pushes the story forward', detected: 'Burning bush event disrupts ordinary fear', score: 79, action: 'Strengthen emotional shock' },
  { beat: 'Debate', expected: 'Protagonist resists, fears, delays, or questions mission', detected: 'Night desert doubt sequence', score: 91, action: 'Approved' },
  { beat: 'Break into Two', expected: 'Clear commitment to new journey', detected: 'Moses turns toward Egypt', score: 86, action: 'Add transition shot' }
];

export const shotIntelligence = [
  { layer: 'Camera Angle', rule: 'Use angle to express power, vulnerability, revelation, or geography.', example: 'Low angle for Pharaoh, eye-level for Moses internal struggle.', status: 'Ready' },
  { layer: 'Continuity', rule: 'Maintain screen direction, eyeline, prop presence, and axis of action.', example: 'Moses travels left-to-right until a deliberate emotional turn.', status: 'Ready' },
  { layer: 'Cutting', rule: 'Design shots that cut for story logic, eye trace, and emotional progression.', example: 'Wide isolation → tracking burden → close-up realization → insert staff.', status: 'Ready' },
  { layer: 'Close-ups', rule: 'Reserve close-ups for turning points, recognition, reaction, or intimacy.', example: 'Close-up only after the wide frame establishes spiritual loneliness.', status: 'Ready' },
  { layer: 'Composition', rule: 'Use frame shape, negative space, leading lines, foreground, and visual weight.', example: '2.39:1 negative space for desert loneliness.', status: 'Ready' }
];

export const overheadLayout = {
  scene: 'EXT. DESERT RIDGE — SUNSET',
  axis: 'Travel axis runs west-to-east; cameras remain south of the line unless flagged as intentional axis break.',
  characters: [
    { name: 'Moses', position: 'Grid C4', distance: '18 ft from camera A', screenDirection: 'Left to right' },
    { name: 'Distant ridge marker', position: 'Grid F4', distance: '70 ft behind subject', screenDirection: 'Background anchor' }
  ],
  cameras: [
    { shot: '1', position: 'Grid B7', lens: '24mm', purpose: 'Extreme wide isolation', axisStatus: 'Safe' },
    { shot: '2', position: 'Grid C7', lens: '50mm', purpose: 'Tracking beside Moses', axisStatus: 'Safe' },
    { shot: '3', position: 'Grid D6', lens: '85mm', purpose: 'Emotional close-up', axisStatus: 'Safe' },
    { shot: '4', position: 'Grid C6', lens: 'Macro', purpose: 'Insert staff in sand', axisStatus: 'Safe' }
  ],
  warnings: ['No camera crosses the 180-degree axis.', 'Eyeline remains toward sunset/right frame.', 'Staff continuity locked across all shots.']
};

export const styleEnginePresets = [
  { style: 'Cinematic Realism', genre: 'Biblical Epic / Drama / Thriller', visualRules: 'Natural lensing, realistic lighting, filmic contrast, premium color grade.', risk: 'Recommended for investor demo' },
  { style: 'Photo Sketch', genre: 'Early Director Review', visualRules: 'Loose pencil/charcoal look, readable staging, fast iteration.', risk: 'Lower polish; excellent for approvals' },
  { style: '3D Blocking', genre: 'Action / Spatial Layout / VFX Prep', visualRules: 'Simple 3D characters, overhead maps, camera cones, movement arrows.', risk: 'Not final art; best for 180-degree validation' },
  { style: 'Animated Movie', genre: 'Family / Adventure / Faith Shorts', visualRules: 'Warm shapes, expressive faces, clean staging, family-safe tone.', risk: 'Avoid imitating protected franchise styles' },
  { style: 'Preschool 2D Animation', genre: 'Kids / YouTube Shorts', visualRules: 'Soft simple characters, bright palette, gentle background shapes.', risk: 'Use generic style labels rather than brand names' }
];

export const characterBible = [
  { name: 'Moses', visual: 'Weathered desert robe, wooden staff, humble posture, tired eyes.', voice: 'Measured, burdened, quiet strength.', continuity: 'Staff must be visible in all desert scenes unless intentionally hidden.', status: 'Locked' },
  { name: 'Pharaoh', visual: 'Royal silhouette, structured gold accents, controlled posture.', voice: 'Calm authority with pride beneath restraint.', continuity: 'Always framed with vertical architecture and guards.', status: 'Draft' },
  { name: 'Miriam', visual: 'Warm earth-tone garment, observant expression, grounded presence.', voice: 'Gentle but emotionally clear.', continuity: 'Used as witness to emotional consequence.', status: 'Draft' }
];

export const locationBible = [
  { location: 'Desert Ridge', geography: 'West-to-east ridge line, sunset right frame, sparse foreground rocks.', lighting: 'Golden-hour rim light, long shadows, warm dust.', continuity: 'Travel direction and horizon slope remain stable.' },
  { location: 'Pharaoh Hall', geography: 'Central throne axis, tall columns, workers seen through distant opening.', lighting: 'Hard shafts of daylight with cooler stone shadows.', continuity: 'Pharaoh stays visually elevated.' },
  { location: 'Sacred Desert Ground', geography: 'Circular clearing with bush at north point and Moses south of the 180 axis.', lighting: 'Twilight blue plus warm fire glow.', continuity: 'Respectful, not fantasy-heavy.' }
];

export const reviewWorkflow = [
  { level: 'Script', decisions: 'Approve, edit, revalidate', lockRule: 'Approved script becomes source of truth.' },
  { level: 'Story Analysis', decisions: 'Approve theme, revise tone, regenerate analysis', lockRule: 'Theme and emotional arc guide all downstream outputs.' },
  { level: 'Beat', decisions: 'Approve one beat, revise one beat, regenerate one beat', lockRule: 'Approved beats cannot be replaced without impact warning.' },
  { level: 'Scene', decisions: 'Approve, split, merge, rewrite scene summary', lockRule: 'Scene IDs persist through shot/panel generation.' },
  { level: 'Shot', decisions: 'Approve shot, change lens, change movement, revise continuity', lockRule: 'Approved camera grammar is used in panel prompts.' },
  { level: 'Storyboard Panel', decisions: 'Approve, regenerate, upload replacement, compare versions', lockRule: 'Approved panels feed animatic timeline.' },
  { level: 'Animatic', decisions: 'Revise timing, motion, dialogue sync, music mood', lockRule: 'Approved animatic feeds video handoff.' },
  { level: 'Video Handoff', decisions: 'Approve package, export prompts, queue provider job', lockRule: 'Final generation requires complete checklist.' }
];

export const animaticTimeline = [
  { item: 'Panel 01', duration: '3.0s', motion: 'Slow push-in', dialogue: 'None', music: 'Low strings begin', sfx: 'Wind bed' },
  { item: 'Panel 02', duration: '4.0s', motion: 'Side tracking drift', dialogue: 'Moses breathes; no spoken line', music: 'Pulse enters quietly', sfx: 'Sand footsteps' },
  { item: 'Panel 03', duration: '3.5s', motion: 'Locked emotional hold', dialogue: 'Moses whispers a question', music: 'Single warm note', sfx: 'Wind drops' },
  { item: 'Panel 04', duration: '2.5s', motion: 'Tilt down to staff', dialogue: 'None', music: 'Resolve cue', sfx: 'Wood presses into sand' }
];

export const audioCueSheet = [
  { scene: 'Scene 01', dialogue: 'Minimal breath and one whispered line', voice: 'Male, mature, restrained, natural room tone', music: 'Sparse spiritual underscore, no overpowering melody', sfx: 'Wind, sand, robe movement, distant desert ambience' },
  { scene: 'Scene 02', dialogue: 'Pharaoh speaks with controlled power', voice: 'Deep formal tone, restrained menace', music: 'Low percussion and stone-hall resonance', sfx: 'Distant labor, sandals, hall echo' },
  { scene: 'Scene 03', dialogue: 'Moses speaks in awe and fear', voice: 'Quiet reverence; pause-heavy delivery', music: 'Warm shimmer, sacred restraint', sfx: 'Soft flame, still air, subtle low tone' }
];

export const exportPackageItems = [
  { artifact: 'Director Storyboard PDF', contents: 'Script summary, beats, scenes, shot list, panel board, QA notes', status: 'Ready' },
  { artifact: 'Shot List CSV', contents: 'Scene, shot type, lens, camera, movement, continuity, purpose', status: 'Ready' },
  { artifact: 'Animatic MP4 placeholder', contents: 'Timeline plan and render hook for panel/audio assembly', status: 'Provider Hook' },
  { artifact: 'Prompt Package JSON', contents: 'Image, video, voice, music, and edit prompts', status: 'Ready' },
  { artifact: 'Character Bible PDF', contents: 'Visual, wardrobe, voice, prop and continuity rules', status: 'Ready' },
  { artifact: 'Location Bible PDF', contents: 'Set geography, lighting, prop, entrances/exits, axis notes', status: 'Ready' },
  { artifact: 'Auto QA Report', contents: 'Script, beat, scene, shot, storyboard, animatic, and video readiness scores', status: 'Ready' },
  { artifact: 'Investor Pitch Package', contents: 'Greenlight summary, demo path, proof points, export checklist', status: 'Ready' }
];

export const providerMatrix = [
  { provider: 'Storyboard Image Provider', mode: 'Flux / SDXL / hosted worker adapter', use: 'Static storyboard panels and visual style previews', env: 'IMAGE_PROVIDER_KEY', status: 'Stubbed' },
  { provider: 'Video Generation Provider', mode: 'fal/Hunyuan, Kling, Runway, or custom GPU worker adapter', use: 'Scene clips from approved animatic', env: 'VIDEO_PROVIDER_KEY or FAL_KEY', status: 'Stubbed' },
  { provider: 'Voice Provider', mode: 'Voice API adapter', use: 'Scratch voice and dialogue timing', env: 'VOICE_PROVIDER_KEY', status: 'Stubbed' },
  { provider: 'Music Provider', mode: 'Music generation adapter', use: 'Mood score and cue sheet export', env: 'MUSIC_PROVIDER_KEY', status: 'Stubbed' },
  { provider: 'Storage', mode: 'S3/R2/Supabase bucket', use: 'Scripts, images, video, audio, PDFs, ZIP exports', env: 'STORAGE_*', status: 'Documented' },
  { provider: 'Database', mode: 'Supabase/Postgres', use: 'Project persistence, versions, approvals, audit history', env: 'DATABASE_URL', status: 'Documented' }
];

export const qaScoreCards = [
  { area: 'Script Readiness', score: 92, finding: 'Script contains clear visual action and scene headings. Improve time-of-day metadata in one scene.' },
  { area: 'Beat Structure', score: 88, finding: 'Save-the-Cat style progression is present. Theme Stated should be more explicit.' },
  { area: 'Shot Design', score: 90, finding: '5 Cs coverage is strong. Add one more reaction shot before the insert.' },
  { area: 'Spatial Continuity', score: 97, finding: '180-degree axis and screen direction remain intact for Scene 01.' },
  { area: 'Storyboard Consistency', score: 86, finding: 'Character prop lock should force staff visibility in Panel 03.' },
  { area: 'Animatic Readiness', score: 84, finding: 'Timeline has dialogue/music/SFX tracks; missing final scratch voice file.' },
  { area: 'Video Handoff', score: 82, finding: 'Provider package is complete; real API credentials still required.' }
];

export const hollywoodTestBench = [
  { test: 'Public-domain drama scene', expected: 'Clear protagonist want, escalating pressure, motivated close-up', result: 'Pass', score: 91 },
  { test: 'Dialogue scene', expected: 'Shot/reverse-shot, eyeline, OTS options, axis preservation', result: 'Pass', score: 89 },
  { test: 'Action reveal scene', expected: 'Master shot, cut-in, reveal angle, geography map', result: 'Needs Review', score: 78 },
  { test: 'Kids animated short', expected: 'Simple readable staging, preschool-safe visual tone', result: 'Pass', score: 87 },
  { test: 'Biblical epic scene', expected: 'Respectful tone, scale, visual restraint, emotional clarity', result: 'Pass', score: 93 }
];

export const collaborationRoles = [
  { role: 'Owner', permissions: 'Full project, billing, export, provider credentials, user access.' },
  { role: 'Director', permissions: 'Review, revise, approve, lock beats/scenes/shots/panels/animatic.' },
  { role: 'Producer', permissions: 'Review package, comments, investor export, status dashboard.' },
  { role: 'Storyboard Artist', permissions: 'Panel edits, prompt edits, manual uploads, version comparison.' },
  { role: 'Editor', permissions: 'Animatic timing, rough cut, audio cue sheet, video handoff.' },
  { role: 'Investor Viewer', permissions: 'Read-only demo link, watermarked previews, no exports unless allowed.' }
];
