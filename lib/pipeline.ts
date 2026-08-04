import { beats, panels, qaFindings, scenes, shots, videoReadinessChecklist } from './demo-data';

export function validateScript(scriptText: string) {
  const length = scriptText.trim().length;
  return {
    status: length > 80 ? 'valid' : 'needs_more_detail',
    estimatedRuntimeMinutes: Math.max(1, Math.round(length / 850)),
    checks: [
      { label: 'Scene headings detected', status: scriptText.includes('EXT.') || scriptText.includes('INT.') ? 'pass' : 'warning' },
      { label: 'Character dialogue detected', status: scriptText.includes(':') || scriptText.includes('(V.O.)') ? 'pass' : 'warning' },
      { label: 'Action lines available', status: length > 80 ? 'pass' : 'warning' },
      { label: 'Ready for story analysis', status: length > 80 ? 'pass' : 'warning' }
    ]
  };
}

export function storyAnalysis() {
  return {
    logline: 'A reluctant leader moves from fear to faith as he accepts a calling larger than himself.',
    theme: 'Faith under pressure',
    emotionalArc: ['Fear', 'Resistance', 'Surrender', 'Courage', 'Deliverance'],
    characters: ['Moses', 'Pharaoh', 'Miriam', 'Hebrew Workers'],
    locations: ['Desert Ridge', 'Pharaoh Hall', 'Sacred Desert Ground', 'Desert Path']
  };
}

export function generationPackage() {
  return {
    beats,
    scenes,
    shots,
    panels,
    qaFindings,
    videoReadinessChecklist,
    providerMode: process.env.FAL_KEY ? 'provider_enabled' : 'mock_demo_mode'
  };
}
