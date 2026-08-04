# CineLoom v7.5 — ChatGPT Agent Harness for Single-Board Director Changes

## Purpose

A director may have a 1,000-board storyboard and need to change only one specific board before the dynamic storyboard is stitched. v7.5 adds a ChatGPT-compatible agent harness that creates a bounded single-board patch while preserving all other boards.

## User workflow

1. Open **Studio → AI Harness** from the new icon/action in the Studio shell.
2. Enter the board number or board ID.
3. Write a plain-English director prompt.
4. Keep continuity locks enabled: character, style, camera, 180-degree axis, neighbor continuity, timing, and export manifest.
5. Run the agent.
6. Review the patch.
7. Approve only that board.
8. Release dynamic stitching after approval.

## API routes

- `GET /api/agent-harness/readiness`
- `POST /api/agent-harness/change-board`
- `GET /api/super-admin/agent-harness`
- `POST /api/super-admin/agent-harness`

## Required environment variables

```env
CHATGPT_AGENT_ENDPOINT_URL=
CHATGPT_AGENT_ENDPOINT_SECRET=
EXEC_STORYBOARD_CORRECT_URL=
EXEC_STORYBOARD_CORRECT_SECRET=
AI_EVAL_ENDPOINT_URL=
AI_PROVENANCE_ENDPOINT_URL=
```

## Optional environment variables

```env
CHATGPT_AGENT_HARNESS_MODE=configured
CHATGPT_AGENT_MODEL=gpt-agent-storyboard-director
CHATGPT_AGENT_TEMPERATURE=0.2
CHATGPT_AGENT_MAX_OUTPUT_TOKENS=1800
TOKEN_LEDGER_ENDPOINT_URL=
TOKEN_LEDGER_SECRET=
QUEUE_ENDPOINT_URL=
QUEUE_ENDPOINT_SECRET=
AI_SAFETY_MODERATION_ENDPOINT_URL=
```

## Safety guarantees

- The request is scoped to `single_board_only`.
- The target board is clamped between 1 and 1,000.
- Dynamic stitching is blocked until director approval.
- Continuity locks are explicit and sent to the agent endpoint.
- API inputs use route-specific validation.
- Super Admin can test readiness and dry-run the payload.

## Production contract

The backend agent should return:

```json
{
  "newPanelPrompt": "...",
  "negativePrompt": "...",
  "lockChecklist": [{ "lock": "axis", "status": "pass" }],
  "continuityNotes": ["Previous and next board direction preserved"],
  "approvalRequired": true,
  "provenance": { "provider": "...", "model": "...", "promptVersion": "..." }
}
```
