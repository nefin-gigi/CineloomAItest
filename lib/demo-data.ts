import type { Beat, PipelineStage, ProjectSummary, QaFinding, RequirementFit, Scene, Shot, StoryboardPanel } from './types';

export const project: ProjectSummary = {
  id: 'project-silent-path',
  title: 'The Silent Path',
  genre: 'Biblical Drama',
  format: 'Short Film',
  status: 'Director Review',
  runtime: '15 min',
  aspectRatio: '2.39:1',
  visualStyle: 'Cinematic Realism',
  scenes: 12,
  panels: 48
};

export const pipelineStages: PipelineStage[] = [
  { id: 'script', label: 'Script', href: '/studio/script', status: 'Approved' },
  { id: 'analysis', label: 'Story Analysis', href: '/studio/story-analysis', status: 'Approved' },
  { id: 'beats', label: 'Beats', href: '/studio/beats', status: 'Needs Review' },
  { id: 'scenes', label: 'Scenes', href: '/studio/scenes', status: 'Draft' },
  { id: 'shots', label: 'Shots', href: '/studio/shots', status: 'Draft' },
  { id: 'static', label: 'Static Storyboard', href: '/studio/storyboard/static', status: 'Needs Review' },
  { id: 'review', label: 'Director Review', href: '/studio/director-review', status: 'Ready' },
  { id: 'animatic', label: 'Animatic', href: '/studio/animatic', status: 'Draft' },
  { id: 'handoff', label: 'Video Handoff', href: '/studio/video-handoff', status: 'Ready' }
];

export const beats: Beat[] = [
  { id: 'beat-01', name: 'Opening Image', sceneRange: '1', summary: 'A lonely prophet moves through a vast desert at dusk.', emotionalPurpose: 'Isolation and spiritual weight', continuityNotes: 'Moses carries staff from first frame.', aiConfidence: 'High', verification: 'Matches opening image and tone; ready to approve.', status: 'Approved' },
  { id: 'beat-02', name: 'Theme Stated', sceneRange: '1-2', summary: 'Faith is shown as a burden before it becomes courage.', emotionalPurpose: 'Introduce faith under pressure', continuityNotes: 'Keep tone restrained, not triumphant yet.', aiConfidence: 'High', verification: 'Needs director wording review for emotional precision.', status: 'Needs Review' },
  { id: 'beat-03', name: 'Catalyst', sceneRange: '3', summary: 'A supernatural sign disrupts Moses’ ordinary fear.', emotionalPurpose: 'Awakening', continuityNotes: 'Maintain desert geography and left-to-right travel.', aiConfidence: 'Medium', verification: 'Direct prompt iteration recommended; ask AI to strengthen the turning point.', status: 'Draft' },
  { id: 'beat-04', name: 'Debate', sceneRange: '4-5', summary: 'Moses doubts whether he is worthy of the calling.', emotionalPurpose: 'Resistance', continuityNotes: 'Do not make Moses look confident too early.', aiConfidence: 'Medium', verification: 'Compare against scene summaries and emotional arc.', status: 'Draft' },
  { id: 'beat-05', name: 'Break into Two', sceneRange: '6', summary: 'Moses accepts the mission and turns toward Egypt.', emotionalPurpose: 'Commitment', continuityNotes: 'Screen direction changes must be intentional.', aiConfidence: 'High', verification: 'Verify continuity handoff to the next sequence.', status: 'Draft' }
];

export const scenes: Scene[] = [
  { id: 'scene-01', number: 1, slugline: 'EXT. DESERT RIDGE — SUNSET', summary: 'Moses walks alone across a ridge while the sun falls behind him.', purpose: 'Establish isolation and spiritual burden.', characters: ['Moses'], location: 'Desert Ridge', runtimeSeconds: 45, reviewNote: 'Approved for tone and geography.', status: 'Approved' },
  { id: 'scene-02', number: 2, slugline: 'INT. MEMORY OF EGYPT — DAY', summary: 'A fragmented memory reveals oppression and royal power.', purpose: 'Reveal conflict and stakes.', characters: ['Moses', 'Pharaoh', 'Hebrew Workers'], location: 'Pharaoh Hall', runtimeSeconds: 60, reviewNote: 'Needs clearer distinction between memory and present timeline.', status: 'Needs Review' },
  { id: 'scene-03', number: 3, slugline: 'EXT. BURNING BUSH — TWILIGHT', summary: 'Moses sees fire that does not consume the bush.', purpose: 'Supernatural catalyst.', characters: ['Moses'], location: 'Sacred Desert Ground', runtimeSeconds: 75, reviewNote: 'Lock respectful tone and avoid overly fantasy imagery.', status: 'Draft' },
  { id: 'scene-04', number: 4, slugline: 'EXT. DESERT PATH — NIGHT', summary: 'Moses struggles with doubt while walking under cold stars.', purpose: 'Debate and internal conflict.', characters: ['Moses'], location: 'Desert Path', runtimeSeconds: 50, reviewNote: 'Needs transition bridge from Scene 03.', status: 'Draft' }
];

export const shots: Shot[] = [
  { id: 'shot-01-01', sceneId: 'scene-01', number: 1, shotType: 'Extreme Wide Shot', camera: 'Static', lens: '24mm', angle: 'Eye level', composition: 'Negative space; Moses lower-left', movement: 'None', purpose: 'Show scale and isolation.', continuity: 'Moses moves left to right holding staff.', status: 'Approved' },
  { id: 'shot-01-02', sceneId: 'scene-01', number: 2, shotType: 'Medium Tracking Shot', camera: 'Slow track', lens: '50mm', angle: 'Eye level', composition: 'Rule of thirds', movement: 'Track with Moses', purpose: 'Bring audience closer to burden.', continuity: 'Maintain left-to-right travel.', status: 'Needs Review' },
  { id: 'shot-01-03', sceneId: 'scene-01', number: 3, shotType: 'Close-Up', camera: 'Locked', lens: '85mm', angle: 'Eye level', composition: 'Tight emotional frame', movement: 'None', purpose: 'Reveal fear turning to faith.', continuity: 'Staff remains visible as foreground texture.', status: 'Draft' },
  { id: 'shot-01-04', sceneId: 'scene-01', number: 4, shotType: 'Insert', camera: 'Tilt down', lens: 'Macro', angle: 'Low detail angle', composition: 'Staff and sand', movement: 'Tilt down to staff', purpose: 'Anchor symbolic prop.', continuity: 'Same staff design from character bible.', status: 'Draft' },
  { id: 'shot-01-05', sceneId: 'scene-01', number: 5, shotType: 'Overhead Geography', camera: 'Top-down diagram', lens: 'Plan view', angle: 'Overhead', composition: 'Axis line, subject path, sun direction', movement: 'Static', purpose: 'Verify 180-degree layout before storyboarding.', continuity: 'Camera remains south of axis; travel stays left-to-right.', status: 'Ready' }
];

export const panels: StoryboardPanel[] = [
  { id: 'panel-01', sceneId: 'scene-01', shotId: 'shot-01-01', panelNumber: 1, shotType: 'Extreme Wide Shot', camera: 'Static 24mm', emotion: 'Loneliness', imagePrompt: 'Cinematic realistic extreme wide shot of Moses crossing a desert ridge at sunset, vast negative space, warm dust, 2.39:1 frame.', status: 'Approved', revisionNotes: 'Keep same screen direction.', tone: 'gold' },
  { id: 'panel-02', sceneId: 'scene-01', shotId: 'shot-01-02', panelNumber: 2, shotType: 'Medium Tracking Shot', camera: 'Slow tracking 50mm', emotion: 'Burden', imagePrompt: 'Medium tracking shot beside Moses in worn desert robe, staff in hand, orange sunset rim light, cinematic realism.', status: 'Needs Review', revisionNotes: 'Make expression more emotionally restrained.', tone: 'warm' },
  { id: 'panel-03', sceneId: 'scene-01', shotId: 'shot-01-03', panelNumber: 3, shotType: 'Close-Up', camera: 'Locked 85mm', emotion: 'Fear becoming faith', imagePrompt: 'Close-up of Moses with tired eyes reflecting sunset fire, staff edge in foreground, shallow depth of field.', status: 'Draft', revisionNotes: 'Add stronger eye light.', tone: 'cool' },
  { id: 'panel-04', sceneId: 'scene-01', shotId: 'shot-01-04', panelNumber: 4, shotType: 'Insert', camera: 'Tilt down macro', emotion: 'Symbolic resolve', imagePrompt: 'Insert shot of wooden staff pressing into sand, grains shifting, sunset shadow stretching left to right.', status: 'Draft', revisionNotes: 'Maintain same staff texture.', tone: 'night' }
];

export const qaFindings: QaFinding[] = [
  { id: 'qa-01', category: 'Beat Coverage', severity: 'Info', message: 'Core beat structure is present for the first act.', recommendation: 'Approve or revise Theme Stated before scene locking.', status: 'Ready' },
  { id: 'qa-02', category: 'Continuity', severity: 'Warning', message: 'Staff visibility missing in Panel 03 prompt.', recommendation: 'Lock staff as persistent continuity prop across all Moses shots.', status: 'Needs Review' },
  { id: 'qa-03', category: 'Cinematography', severity: 'Warning', message: 'Shot 02 tracking direction must preserve left-to-right travel.', recommendation: 'Add 180-degree axis note to the shot breakdown.', status: 'Needs Review' },
  { id: 'qa-04', category: 'Video Readiness', severity: 'Info', message: 'Animatic can be generated once panels 02-04 are approved.', recommendation: 'Complete static storyboard approvals first.', status: 'Draft' }
];

export const styleOptions = [
  { name: 'Cinematic Realism', description: 'Premium look for Hollywood-director demos, trailers, and serious narrative films.', tag: 'Recommended', tone: 'gold' as const },
  { name: 'Photo Sketch', description: 'Fast director iteration when composition matters more than polish.', tag: 'Fast Review', tone: 'cool' as const },
  { name: '3D Blocking', description: 'Spatial geography, staging, distances, axis, and camera-path validation.', tag: 'Spatial QA', tone: 'night' as const },
  { name: 'Animated Movie', description: 'Stylized family films and character-led short films.', tag: 'Family', tone: 'warm' as const },
  { name: 'Kids TV Style', description: 'Simple preschool-friendly storyboard style for gentle, bright storytelling.', tag: 'Kids', tone: 'cool' as const }
];

export const videoReadinessChecklist = [
  'Approved script',
  'Approved beat breakdown',
  'Approved scene breakdown',
  'Approved shot design',
  'Approved static storyboard panels',
  'Approved dynamic animatic timing',
  'Character bible',
  'Location bible',
  'Visual style guide',
  'Dialogue/voice notes',
  'Music/SFX notes',
  'Auto QA report'
];

export const requirementsFit: RequirementFit[] = [
  { area: 'Launch Control', requirement: 'Public site under construction with credential access.', implementation: 'Root page shows construction message and credential login; internal studio routes are gated by Vercel env variables.', status: 'Approved' },
  { area: 'Script Upload', requirement: 'Script upload, validation, and analysis before breakdown.', implementation: 'Script Studio includes file/paste workflow, validation panel, and API placeholders.', status: 'Ready' },
  { area: 'Beat Breakdown', requirement: 'Hollywood continuity styling and Save-the-Cat-style beat review.', implementation: 'Beat Breakdown screen shows beats, scene ranges, emotional purpose, continuity notes, AI confidence, and verification notes.', status: 'Ready' },
  { area: 'Shot Breakdown', requirement: '5 Cs cinematography, shot list, camera movement, 180-degree checks.', implementation: 'Shot Design includes camera, lens, movement, composition, purpose, continuity, and overhead geography shot.', status: 'Ready' },
  { area: 'User Review', requirement: 'Allow review and revision at every individual level.', implementation: 'Workflow actions, review rail, director review page, and approval statuses are included across stages.', status: 'Ready' },
  { area: 'Static Storyboard', requirement: 'Cinematic realism, sketch, 3D, animated outputs.', implementation: 'Static storyboard grid and style selector support the requested visual output modes.', status: 'Ready' },
  { area: 'Dynamic Storyboard', requirement: 'Animatic timeline with motion, voice, music, SFX, frame rate, aspect ratio.', implementation: 'Animatic Studio includes preview player, timeline, motion controls, dialogue/music/SFX tracks, 24fps and 2.39:1 settings.', status: 'Ready' },
  { area: 'Video Generation', requirement: 'Dialogue/voice, music, editing rough cut, audio, provider handoff.', implementation: 'Video Handoff exports prompts and package JSON with provider abstraction placeholders.', status: 'Ready' },
  { area: 'Auto QA', requirement: 'QA for script, continuity, cinematography, storyboard, animatic, and video readiness.', implementation: 'Auto QA Center and right rail show readiness score and prioritized warnings.', status: 'Ready' }
];
