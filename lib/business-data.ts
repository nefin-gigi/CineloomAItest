export type PlanId = 'free' | 'creator' | 'studio' | 'enterprise';

export type PricingPlan = {
  id: PlanId;
  name: string;
  audience: string;
  monthlyPrice: number | 'Custom';
  includedTokens: number | 'Custom';
  seats: number | 'Custom';
  stripePriceEnv: string;
  highlights: string[];
  limits: string[];
  recommended?: boolean;
};

export type TokenAction = {
  id: string;
  label: string;
  description: string;
  tokenCost: number;
  unit: string;
  bestFor: string;
};

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Director' | 'Producer' | 'Editor' | 'Viewer';
  plan: PlanId;
  tokenBalance: number;
  monthlyTokensUsed: number;
  status: 'Active' | 'Invited' | 'Suspended';
};

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Preview',
    audience: 'Film enthusiasts testing a short idea',
    monthlyPrice: 0,
    includedTokens: 250,
    seats: 1,
    stripePriceEnv: 'STRIPE_PRICE_PREVIEW',
    highlights: ['1 active project', '10-second sample storyboard', 'Basic script validation', 'Watermarked storyboard export'],
    limits: ['No private team collaboration', 'No commercial video handoff', 'Limited revision history']
  },
  {
    id: 'creator',
    name: 'Creator',
    audience: 'YouTube creators, screenwriters, indie storytellers',
    monthlyPrice: 29,
    includedTokens: 1500,
    seats: 1,
    stripePriceEnv: 'STRIPE_PRICE_CREATOR',
    highlights: ['5 active projects', 'Static storyboard generation', 'Prompt-driven corrections', 'PDF + JSON export package'],
    limits: ['Standard queue priority', 'No producer approval rooms']
  },
  {
    id: 'studio',
    name: 'Studio',
    audience: 'Indie film teams, producers, agencies, production houses',
    monthlyPrice: 149,
    includedTokens: 10000,
    seats: 5,
    stripePriceEnv: 'STRIPE_PRICE_STUDIO',
    recommended: true,
    highlights: ['Unlimited active storyboards', 'Dynamic animatic package', 'Team roles and approvals', 'Cost routing + provider handoff'],
    limits: ['Premium model overages billed by token pack']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    audience: 'Studios, streaming teams, education networks, branded content teams',
    monthlyPrice: 'Custom',
    includedTokens: 'Custom',
    seats: 'Custom',
    stripePriceEnv: 'STRIPE_PRICE_ENTERPRISE',
    highlights: ['Dedicated workspaces', 'Private model/provider routing', 'Custom legal/security controls', 'SLA, onboarding, and white-glove support'],
    limits: ['Requires sales-assisted setup']
  }
];

export const tokenActions: TokenAction[] = [
  { id: 'script_validate', label: 'Script validation', description: 'Parse sluglines, action, dialogue, runtime, and obvious script issues.', tokenCost: 15, unit: 'per script page', bestFor: 'Script upload and QA' },
  { id: 'beat_breakdown', label: 'Beat breakdown', description: 'Generate Save-the-Cat-style continuity beats with scene coverage.', tokenCost: 120, unit: 'per short script', bestFor: 'Story structure' },
  { id: 'shot_design', label: 'Shot design', description: 'Generate 5 Cs shot plan, lenses, angles, movement, blocking, and continuity notes.', tokenCost: 35, unit: 'per scene', bestFor: 'Cinematography planning' },
  { id: 'sample_10s', label: '10-second storyboard sample', description: 'Generate a quick 8-panel mini storyboard with timing and director notes.', tokenCost: 180, unit: 'per sample', bestFor: 'Fast demo and try-before-subscribe' },
  { id: 'storyboard_panel', label: 'Storyboard image panel', description: 'Generate one static storyboard panel using selected visual style and continuity locks.', tokenCost: 45, unit: 'per panel', bestFor: 'Static storyboard' },
  { id: 'prompt_correction', label: 'Prompt-driven correction', description: 'Revise a panel while locking approved character, location, aspect ratio, and screen direction.', tokenCost: 18, unit: 'per correction', bestFor: 'Director iteration' },
  { id: 'animatic_10s', label: '10-second animatic preview', description: 'Create motion timing, transitions, scratch voice, music bed, and SFX notes.', tokenCost: 320, unit: 'per 10 seconds', bestFor: 'Dynamic storyboard' },
  { id: 'export_package', label: 'Director export package', description: 'Build storyboard PDF, shot CSV, prompt JSON, QA PDF, and ZIP handoff.', tokenCost: 75, unit: 'per export', bestFor: 'Producer/investor package' }
];

export const tokenPacks = [
  { id: 'pack_1k', name: '1,000 Tokens', price: 19, bestFor: 'Extra corrections and small storyboards' },
  { id: 'pack_5k', name: '5,000 Tokens', price: 79, bestFor: 'Short film storyboard production' },
  { id: 'pack_25k', name: '25,000 Tokens', price: 299, bestFor: 'Studio team production sprint' }
];

export const demoUsers: DemoUser[] = [
  { id: 'user_001', name: 'Cijo Naliath', email: 'owner@cineloom.ai', role: 'Owner', plan: 'studio', tokenBalance: 8420, monthlyTokensUsed: 1580, status: 'Active' },
  { id: 'user_002', name: 'Director Preview', email: 'director.preview@cineloom.ai', role: 'Director', plan: 'studio', tokenBalance: 8420, monthlyTokensUsed: 740, status: 'Active' },
  { id: 'user_003', name: 'Producer Guest', email: 'producer.guest@cineloom.ai', role: 'Producer', plan: 'studio', tokenBalance: 8420, monthlyTokensUsed: 330, status: 'Invited' },
  { id: 'user_004', name: 'Storyboard Editor', email: 'editor@cineloom.ai', role: 'Editor', plan: 'studio', tokenBalance: 8420, monthlyTokensUsed: 510, status: 'Active' }
];

export const sample10Storyboard = {
  title: 'The Door Opens',
  durationSeconds: 10,
  aspectRatio: '2.39:1',
  frameRate: '24fps',
  tokenEstimate: 180,
  description: 'A quick, director-ready 10-second storyboard sample that proves CineLoom can turn a tiny story moment into reviewable panels with timing and correction controls.',
  panels: [
    { id: 's10-01', t: '0.0s-1.2s', shot: 'Wide establishing shot', prompt: 'A rainy studio backlot at night, one glowing doorway, cinematic blue light, red practical light in background.', correction: 'Make the doorway feel more mysterious but keep the same geography.' },
    { id: 's10-02', t: '1.2s-2.4s', shot: 'Medium tracking shot', prompt: 'Young filmmaker steps toward the glowing doorway, production green rim light, rain in foreground.', correction: 'Slow the pacing and make the character more hesitant.' },
    { id: 's10-03', t: '2.4s-3.4s', shot: 'Insert shot', prompt: 'Hand reaches toward old brass door handle, water drops, shallow depth of field.', correction: 'Add stronger hand silhouette and keep the brass handle.' },
    { id: 's10-04', t: '3.4s-4.8s', shot: 'Close-up', prompt: 'Close-up of eyes reflecting red, green, and blue cinema light, fear turning into wonder.', correction: 'Make the eyes more emotional, less horror, more awe.' },
    { id: 's10-05', t: '4.8s-6.0s', shot: 'Over-the-shoulder', prompt: 'Over shoulder as door opens to reveal a vast cinematic desert set inside the doorway.', correction: 'Keep doorway frame visible and widen the world inside.' },
    { id: 's10-06', t: '6.0s-7.5s', shot: 'Push-in reveal', prompt: 'Camera pushes through doorway into a massive story world, warm dust, blue moonlight, green production glow fading.', correction: 'Make the push-in more Spielberg-like with wonder and scale.' },
    { id: 's10-07', t: '7.5s-8.8s', shot: 'Reaction close-up', prompt: 'Character smiles with tears, realizing the script is becoming a living movie.', correction: 'Add a small smile and stronger catchlight.' },
    { id: 's10-08', t: '8.8s-10.0s', shot: 'Title frame', prompt: 'CineLoom logo over cinematic RGB light beams, words: Your Story. On Screen.', correction: 'Make this feel premium, not like an ad.' }
  ]
};

export const correctionPresets = [
  'Make this more cinematic but keep the same character and framing.',
  'Change to a wider shot while preserving the 180-degree axis.',
  'Make the emotion more hopeful, not sad.',
  'Keep the costume and location identical, but improve lighting.',
  'Add stronger foreground depth and reduce visual clutter.',
  'Convert this to photo-sketch storyboard style.',
  'Convert this to 3D blocking style for camera geography.',
  'Make this family-friendly animated style without copying a specific show.'
];

export function estimateTokens(input: { pages?: number; scenes?: number; panels?: number; corrections?: number; animaticSeconds?: number; exports?: number }) {
  const pages = input.pages ?? 0;
  const scenes = input.scenes ?? 0;
  const panels = input.panels ?? 0;
  const corrections = input.corrections ?? 0;
  const animaticSeconds = input.animaticSeconds ?? 0;
  const exports = input.exports ?? 0;
  return Math.ceil(
    pages * 15 +
    (pages > 0 ? 120 : 0) +
    scenes * 35 +
    panels * 45 +
    corrections * 18 +
    Math.ceil(animaticSeconds / 10) * 320 +
    exports * 75
  );
}
