# Developer Handoff Notes

## Current state

The package is a Vercel-ready Next.js prototype with polished screens and mocked API routes. It is designed to be demoable while giving developers a clear path to implement production services.

## Highest priority implementation areas

1. Persistent project storage: database tables for projects, scripts, beats, scenes, shots, panels, animatics, QA findings, and exports.
2. Real script ingestion: PDF, DOCX, TXT, Fountain, Final Draft.
3. LLM workflow orchestration: story analysis, beat breakdown, scene breakdown, shot design, prompt generation.
4. Storyboard generation: image provider integration, reference locking, version history.
5. Dynamic storyboard generation: timeline editing, motion presets, voice/music/SFX preview.
6. Video provider handoff: provider abstraction for Hunyuan/fal, Kling, Runway, and custom workers.
7. Security: production auth, role-based access, rate limits, file scanning, billing controls.
8. QA automation: schema validation, continuity checks, 180-degree geometry checks, prompt readiness checks.

## Important routes

- `/` public construction gate
- `/dashboard` private overview
- `/studio` guided studio overview
- `/studio/investor-demo` director/investor walkthrough
- `/studio/script` script upload/validation
- `/studio/story-analysis` story analysis
- `/studio/beats` beat breakdown
- `/studio/scenes` scene breakdown
- `/studio/characters-locations` character/location bible
- `/studio/shots` shot design
- `/studio/storyboard/static` static storyboard
- `/studio/storyboard/panel-editor` panel review
- `/studio/storyboard/styles` style selector
- `/studio/director-review` simple review/approval mode
- `/studio/animatic` dynamic storyboard/animatic
- `/studio/video-handoff` export/provider handoff
- `/studio/qa` Auto QA center
- `/studio/requirements` compliance matrix

## Environment variables

```env
LAUNCH_GATE_ENABLED=true
LAUNCH_USERNAME=cineloom
LAUNCH_PASSWORD=replace_with_private_password
LAUNCH_GATE_TOKEN=replace_with_long_random_token
```
