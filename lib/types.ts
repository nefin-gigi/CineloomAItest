export type Status = 'Draft' | 'Needs Review' | 'Approved' | 'Blocked' | 'Ready' | 'Generated';
export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface PipelineStage {
  id: string;
  label: string;
  href: string;
  status: Status;
}

export interface ProjectSummary {
  id: string;
  title: string;
  genre: string;
  format: string;
  status: string;
  runtime: string;
  aspectRatio: string;
  visualStyle: string;
  scenes: number;
  panels: number;
}

export interface Beat {
  id: string;
  name: string;
  sceneRange: string;
  summary: string;
  emotionalPurpose: string;
  continuityNotes: string;
  aiConfidence: 'High' | 'Medium' | 'Low';
  verification: string;
  status: Status;
}

export interface Scene {
  id: string;
  number: number;
  slugline: string;
  summary: string;
  purpose: string;
  characters: string[];
  location: string;
  runtimeSeconds: number;
  reviewNote: string;
  status: Status;
}

export interface Shot {
  id: string;
  sceneId: string;
  number: number;
  shotType: string;
  camera: string;
  lens: string;
  angle: string;
  composition: string;
  movement: string;
  purpose: string;
  continuity: string;
  status: Status;
}

export interface StoryboardPanel {
  id: string;
  sceneId: string;
  shotId: string;
  panelNumber: number;
  shotType: string;
  camera: string;
  emotion: string;
  imagePrompt: string;
  status: Status;
  revisionNotes: string;
  tone: 'warm' | 'cool' | 'night' | 'gold';
}

export interface QaFinding {
  id: string;
  category: string;
  severity: 'Info' | 'Warning' | 'Critical';
  message: string;
  recommendation: string;
  status: Status;
}

export interface RequirementFit {
  area: string;
  requirement: string;
  implementation: string;
  status: Status;
}
