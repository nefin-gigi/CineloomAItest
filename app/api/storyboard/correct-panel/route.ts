import { NextResponse } from 'next/server';
import { invokeExecutionEndpoint } from '@/lib/execution-runtime';
import { validateApiRequest } from '@/lib/input-validation';

export async function POST(request: Request) {
  const validation = await validateApiRequest(request);
  if (!validation.ok) return validation.response;
  const body = validation.data;
  const prompt = String(body.prompt ?? 'Make this more cinematic.');
  const locks = body.locks ?? {};

  const endpointResult = await invokeExecutionEndpoint({
    stage: 'storyboard_correct',
    payload: {
      panelId: body.panelId ?? 'selected',
      prompt,
      locks,
      correctionMode: 'single_panel_with_continuity_locks'
    },
    workspaceId: String(body.workspaceId ?? 'demo'),
    projectId: String(body.projectId ?? 'demo'),
    idempotencyKey: String(body.idempotencyKey ?? `correction_${body.panelId ?? 'selected'}_${Date.now()}`),
    dryRun: false
  });

  const revisedPrompt = [
    `Panel ${body.panelId ?? 'selected'} correction: ${prompt}`,
    locks.characterLock ? 'LOCK: retain approved character identity, costume, proportions, and emotional arc.' : '',
    locks.styleLock ? 'LOCK: retain approved visual style, aspect ratio, lighting family, and color language.' : '',
    locks.axisLock ? 'LOCK: preserve 180-degree axis, eyeline, and screen direction.' : '',
    'CHANGE ONLY: the director-requested attribute. Return one corrected image prompt, one negative prompt, and a continuity checklist.'
  ].filter(Boolean).join('\n');

  return NextResponse.json({
    panelId: body.panelId ?? 'selected',
    tokenCost: 18,
    execution: endpointResult,
    revisedPrompt,
    endpointMode: endpointResult.status,
    message: endpointResult.ok
      ? 'Storyboard correction endpoint is configured. Enable live mode to call the provider.'
      : 'Demo correction prompt generated. Connect EXEC_STORYBOARD_CORRECT_URL for real prompt-driven image correction.'
  });
}
