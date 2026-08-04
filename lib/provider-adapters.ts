export type ProviderName = 'mock' | 'fal_hunyuan' | 'kling' | 'runway' | 'flux_sdxl' | 'voice_provider' | 'music_provider' | 'custom_worker';

export interface VideoProviderRequest {
  projectId: string;
  prompt: string;
  aspectRatio: string;
  frameRate: string;
  durationSeconds: number;
  style: string;
  references?: string[];
}

export interface ProviderResult {
  provider: ProviderName;
  status: 'queued' | 'generated' | 'failed';
  jobId: string;
  previewUrl?: string;
  message: string;
}

export function selectVideoProvider(): ProviderName {
  if (process.env.FAL_KEY) return 'fal_hunyuan';
  if (process.env.KLING_API_KEY) return 'kling';
  if (process.env.RUNWAY_API_KEY) return 'runway';
  if (process.env.CUSTOM_WORKER_URL) return 'custom_worker';
  return 'mock';
}

export function selectImageProvider(): ProviderName {
  if (process.env.IMAGE_PROVIDER_KEY) return 'flux_sdxl';
  if (process.env.CUSTOM_WORKER_URL) return 'custom_worker';
  return 'mock';
}

export function selectVoiceProvider(): ProviderName {
  if (process.env.VOICE_PROVIDER_KEY) return 'voice_provider';
  return 'mock';
}

export function selectMusicProvider(): ProviderName {
  if (process.env.MUSIC_PROVIDER_KEY) return 'music_provider';
  return 'mock';
}

export async function queueVideoGeneration(request: VideoProviderRequest): Promise<ProviderResult> {
  const provider = selectVideoProvider();
  return {
    provider,
    status: provider === 'mock' ? 'generated' : 'queued',
    jobId: `${provider}-${request.projectId}-${Date.now()}`,
    previewUrl: provider === 'mock' ? '/demo-preview-placeholder.mp4' : undefined,
    message: provider === 'mock'
      ? 'Mock video generated. Add provider API keys to queue real generation.'
      : `Queued generation using ${provider}. Add a polling route for real status updates.`
  };
}

export async function queueStoryboardImage(projectId: string, prompt: string): Promise<ProviderResult> {
  const provider = selectImageProvider();
  return {
    provider,
    status: provider === 'mock' ? 'generated' : 'queued',
    jobId: `${provider}-${projectId}-panel-${Date.now()}`,
    message: provider === 'mock'
      ? `Mock storyboard panel created from prompt: ${prompt.slice(0, 80)}`
      : `Queued storyboard image using ${provider}.`
  };
}

export async function queueVoiceOrMusic(projectId: string, kind: 'voice' | 'music', prompt: string): Promise<ProviderResult> {
  const provider = kind === 'voice' ? selectVoiceProvider() : selectMusicProvider();
  return {
    provider,
    status: provider === 'mock' ? 'generated' : 'queued',
    jobId: `${provider}-${projectId}-${kind}-${Date.now()}`,
    message: provider === 'mock'
      ? `Mock ${kind} cue generated from prompt: ${prompt.slice(0, 80)}`
      : `Queued ${kind} generation using ${provider}.`
  };
}
