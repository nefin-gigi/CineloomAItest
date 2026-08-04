# CineLoom v7.6 — Low-Token Director Agent Workflow

This release changes the Director AI Harness UI so storyboard corrections consume the fewest possible AI tokens.

## Core rule

Never send the full storyboard when a director changes one board. For a 1,000-board storyboard, send only:

- target board metadata
- current board visual prompt
- previous board summary
- next board summary
- compressed continuity locks
- director prompt

The AI must return JSON patch only. Other boards remain locked.

## New user flow

1. Select one board.
2. Choose the smallest safe scope.
3. Choose token mode.
4. Lock continuity.
5. Preview token plan.
6. Dry-run patch.
7. Apply after director approval.
8. Restitch only the affected segment.

## New API

```http
POST /api/agent-harness/token-plan
```

Returns an estimated input/output token plan, omitted context, recommended context, hard limits, and stitching policy.

```http
POST /api/agent-harness/change-board
```

Now accepts `scope` and `tokenMode` fields and includes a `lowTokenPlan` in the patch response.

## Token modes

- `lowest_cost` — default; board + two neighbor notes only.
- `balanced` — adds cached scene/style/character/location summaries.
- `director_final_quality` — richer cached context for final review moments.

## Scope modes

- `single_board_only` — default, lowest cost.
- `local_scene` — only when a note affects a nearby beat.
- `full_sequence` — admin-level override; full storyboard context remains blocked for large storyboards.

## Stitching policy

Dynamic stitching remains blocked until the director approves the changed board. After approval, CineLoom should restitch only the changed segment and wait until export for the final full stitch.
