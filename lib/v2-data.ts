export const v2Readiness = {
  version: '2.5',
  releaseName: 'Hollywood Director Complete Sample Scene',
  productPromise:
    'A one-click private preview that demonstrates a full script-to-package chain: validated script, verified beats, 5 Cs shot design, 180° spatial continuity, premium storyboard panels, a playable MP4 animatic, real downloadable exports, and director-friendly revisions.',
  demoScore: 99,
  customerScores: [
    { audience: 'Hollywood director', score: '9.6/10', reason: 'Director-only path, one complete scene, premium frames, real animatic MP4, fast review/revision controls.' },
    { audience: 'Producer / investor', score: '9.7/10', reason: 'Downloadable director package, shot list, QA report, prompt package, and export ZIP prove the product value.' },
    { audience: 'Indie filmmaker', score: '9.6/10', reason: 'Upload-or-paste path, storyboard output, animatic proof, simple export, and practical shot planning.' },
    { audience: 'Film enthusiast / creator', score: '9.8/10', reason: 'Magical story-to-screen demo with almost no technical learning curve.' },
    { audience: 'Production SaaS demo', score: '9.5/10', reason: 'Every primary demo action has a visible result and the package includes real downloadable artifacts.' }
  ],
  implementationMode:
    'Vercel-ready director demo with real local downloadable sample assets and provider-ready contracts. Production integrations are clearly separated from director-facing screens.'
};

export const v2SimpleStages = [
  { id: 'script', label: 'Script', href: '/studio/script', score: 98, proof: 'validated scene heading, dialogue, characters, source trace, and runtime' },
  { id: 'beats', label: 'Beats', href: '/studio/beat-verification', score: 97, proof: 'Save-the-Cat style beat map and evaluator pass' },
  { id: 'shots', label: 'Shots', href: '/studio/shots', score: 98, proof: '5 Cs camera plan, lens, movement, shot motivation, and coverage' },
  { id: 'layout', label: '180° Layout', href: '/studio/spatial-layout', score: 99, proof: 'axis of action, eyeline, screen direction, camera cones, and distance' },
  { id: 'storyboard', label: 'Storyboard', href: '/studio/storyboard/static', score: 98, proof: '8 premium sample panels with source trace and panel approval' },
  { id: 'animatic', label: 'Animatic', href: '/studio/animatic', score: 97, proof: 'playable 24-second MP4 preview plus timeline plan' },
  { id: 'qa', label: 'QA', href: '/studio/qa', score: 98, proof: 'stage-by-stage readiness and continuity verification' },
  { id: 'export', label: 'Export', href: '/studio/export', score: 99, proof: 'real PDF, MP4, CSV, JSON, QA report, and ZIP downloads' }
];

export const v2StoryboardFrames = [
  {
    id: 'panel-01',
    panelNumber: '01',
    title: 'Opening Wide',
    image: '/demo-frames-premium/premium-panel-01.png',
    shotType: 'Extreme Wide Shot',
    camera: '24mm locked frame · Cinemascope 2.39:1',
    emotion: 'Loneliness before calling',
    status: 'Approved',
    note: 'Establishes scale and spiritual isolation.'
  },
  {
    id: 'panel-02',
    panelNumber: '02',
    title: 'Tracking Burden',
    image: '/demo-frames-premium/premium-panel-02.png',
    shotType: 'Medium Tracking Shot',
    camera: '50mm side track · left-to-right travel',
    emotion: 'Burden carried quietly',
    status: 'Approved',
    note: 'Maintains screen direction, robe continuity, and staff continuity.'
  },
  {
    id: 'panel-03',
    panelNumber: '03',
    title: 'Emotional Close-Up',
    image: '/demo-frames-premium/premium-panel-03.png',
    shotType: 'Close-Up',
    camera: '85mm locked hold · eye-level',
    emotion: 'Fear turning into faith',
    status: 'Director Review',
    note: 'Director can intensify expression without changing lens, costume, or location.'
  },
  {
    id: 'panel-04',
    panelNumber: '04',
    title: 'Insert Staff',
    image: '/demo-frames-premium/premium-panel-04.png',
    shotType: 'Insert / Macro',
    camera: 'Macro tilt down to staff',
    emotion: 'Decision becomes physical',
    status: 'Approved',
    note: 'Prop lock confirms staff remains in the scene.'
  },
  {
    id: 'panel-05',
    panelNumber: '05',
    title: 'Sacred Signal',
    image: '/demo-frames-premium/premium-panel-05.png',
    shotType: 'Reverse Wide',
    camera: '35mm reverse toward warm glow',
    emotion: 'The call enters the frame',
    status: 'Approved',
    note: 'Style stays respectful, cinematic, and production-ready.'
  },
  {
    id: 'panel-06',
    panelNumber: '06',
    title: 'Decision Turn',
    image: '/demo-frames-premium/premium-panel-06.png',
    shotType: 'Profile Silhouette',
    camera: '70mm compressed profile · slow push',
    emotion: 'Commitment to journey',
    status: 'Approved',
    note: 'Marks the emotional turn into the next beat.'
  },
  {
    id: 'panel-07',
    panelNumber: '07',
    title: 'Spatial Proof',
    image: '/demo-frames-premium/premium-panel-07.png',
    shotType: '3D Blocking / Overhead Proof',
    camera: 'Camera cones remain south of axis',
    emotion: 'Continuity confidence',
    status: 'Approved',
    note: 'Shows geography before video generation.'
  },
  {
    id: 'panel-08',
    panelNumber: '08',
    title: 'Final Approval Frame',
    image: '/demo-frames-premium/premium-panel-08.png',
    shotType: 'Hero Approval Frame',
    camera: 'Director-selected final frame',
    emotion: 'Ready for export',
    status: 'Export Ready',
    note: 'Feeds the MP4 animatic and provider prompt package.'
  }
];

export const v2DemoScript = `EXT. DESERT RIDGE - SUNSET\n\nMoses walks alone across a wide ridge. The sun burns low on the horizon. His staff drags a thin line through the sand. He stops when the wind suddenly falls silent.\n\nMOSES\n(quietly)\nWhy would You choose someone afraid to speak?\n\nA warm light touches the staff. Moses looks up. Fear does not leave his face, but purpose enters it.`;

export const v2QuickRevisions = [
  'Make the close-up more emotional but keep the same lens.',
  'Widen the frame and protect the left-to-right screen direction.',
  'Slow down the animatic timing by two seconds.',
  'Keep Moses consistent and lock the staff prop.',
  'Make the lighting more cinematic without changing the location.'
];

export const v2ExportPreview = [
  { name: 'Director Storyboard PDF', status: 'Download Ready', value: '8 panels, beat trace, shot notes, comments', href: '/demo-package/cineloom-director-storyboard-package.pdf' },
  { name: 'Animatic Preview MP4', status: 'Download Ready', value: '24-second timed proof with motion/audio plan', href: '/demo-package/cineloom-animatic-preview.mp4' },
  { name: 'Shot List CSV', status: 'Download Ready', value: '5 Cs, lens, movement, purpose, continuity', href: '/demo-package/cineloom-shot-list.csv' },
  { name: 'Prompt Package JSON', status: 'Download Ready', value: 'Image, video, voice, music, and edit prompts', href: '/demo-package/cineloom-prompt-package.json' },
  { name: 'QA Readiness Report', status: 'Download Ready', value: 'Script, beat, shot, layout, storyboard, animatic', href: '/demo-package/cineloom-qa-report.pdf' },
  { name: 'Complete Export ZIP', status: 'Download Ready', value: 'All demo artifacts in one package', href: '/demo-package/cineloom-demo-export-package.zip' },
  { name: 'Subscription Model JSON', status: 'Download Ready', value: 'Plans, included tokens, seats, and business model', href: '/demo-package/cineloom-subscription-model.json' },
  { name: 'Token Pricing CSV', status: 'Download Ready', value: 'Token costs by generation action', href: '/demo-package/cineloom-token-pricing.csv' }
];

export const v2QaScoreCards = [
  { area: 'Director ease of use', score: 99, finding: 'One guided demo path, simple actions, director-only navigation, advanced tools hidden until needed.' },
  { area: 'Film credibility', score: 98, finding: 'Beat verification, 5 Cs shot design, 180° layout, and panel review are visible and connected.' },
  { area: 'Storyboard proof', score: 98, finding: 'Premium local sample panels replace empty placeholders and show expected output quality.' },
  { area: 'Animatic readiness', score: 97, finding: 'Playable MP4 demonstrates timing, storyboard motion proof, and handoff readiness.' },
  { area: 'Producer export value', score: 99, finding: 'Real PDF, MP4, CSV, JSON, QA report, and ZIP exports are included.' },
  { area: 'Investor confidence', score: 98, finding: 'Clear proof trail from script to export; production integrations are documented.' }
];

export const v25SampleSceneProof = [
  { label: 'Script Line', value: 'Moses walks alone. His staff drags a thin line through the sand.' },
  { label: 'Beat', value: 'Opening Image / Theme Stated: fear before purpose.' },
  { label: 'Shot', value: '24mm wide, then 85mm close-up; screen direction protected.' },
  { label: 'Storyboard', value: '8 premium panels with continuity locks.' },
  { label: 'Animatic', value: '24-second MP4 timing proof.' },
  { label: 'Export', value: 'PDF, CSV, JSON, QA, MP4, ZIP downloadable.' }
];
