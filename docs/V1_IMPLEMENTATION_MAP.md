# CineLoom.ai v1.0 Implementation Map

| Requirement | Screen | API / Code | Status |
|---|---|---|---|
| Password protected construction page | `/` | `app/api/gate/*`, `middleware.ts`, `lib/auth.ts` | Implemented |
| Script upload and validation | `/studio/script` | `/api/pipeline/validate-script`, `/api/pipeline/parse-script` | Demo implemented |
| Story analysis | `/studio/story-analysis` | `/api/pipeline/analyze-story` | Demo implemented |
| Beat breakdown | `/studio/beats` | `/api/pipeline/generate-beats` | Demo implemented |
| Beat verification | `/studio/beat-verification` | `/api/pipeline/verify-beats` | Implemented |
| Scene breakdown | `/studio/scenes` | `/api/pipeline/generate-scenes` | Demo implemented |
| Shot design | `/studio/shots` | `/api/pipeline/generate-shots` | Demo implemented |
| 180-degree layout | `/studio/spatial-layout` | `/api/pipeline/spatial-layout` | Implemented |
| Characters and locations | `/studio/characters-locations` | `lib/v1-data.ts` | Implemented |
| Static storyboard | `/studio/storyboard/static` | `/api/pipeline/generate-panels` | Demo implemented |
| Panel editor | `/studio/storyboard/panel-editor` | `/api/pipeline/review-decision` | Demo implemented |
| Genre styles | `/studio/storyboard/styles` | `styleEnginePresets` | Implemented |
| Dynamic animatic | `/studio/animatic` | `/api/pipeline/generate-animatic` | Demo implemented |
| Dialogue/voice/music/SFX | `/studio/audio` | `/api/pipeline/generate-audio-plan` | Implemented |
| Video handoff | `/studio/video-handoff` | `/api/pipeline/send-to-provider` | Demo implemented |
| Export package | `/studio/export` | `/api/pipeline/export-director-package` | Implemented |
| Auto QA | `/studio/qa` | `/api/pipeline/run-auto-qa` | Implemented |
| Hollywood tests | `/studio/testing` | `/api/pipeline/run-hollywood-testbench` | Implemented |
| Provider/cost | `/studio/provider-cost` | `/api/pipeline/provider-estimate` | Implemented |
| Collaboration | `/studio/collaboration` | role model in `lib/v1-data.ts` | Implemented |
