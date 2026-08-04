# CineLoom Requirements Compliance Matrix

| Requirement | Demo implementation |
|---|---|
| Site under construction with credential access | Root page plus API-based launch gate using Vercel environment variables |
| User with credentials can go in | `/api/gate/login`, secure HTTP-only cookie, gated internal routes |
| Script upload | `/studio/script` file/paste UI and validation results |
| Script validation | Validation panel and `/api/pipeline/validate-script` placeholder |
| Story analysis | `/studio/story-analysis` logline, theme, arc, tone guardrails, elements |
| Beat breakdown | `/studio/beats` beat table with scene range, purpose, continuity, confidence, verification |
| Shot breakdown | `/studio/shots` camera, lens, movement, composition, purpose, continuity, 180-degree geography |
| User review/revise at every level | Workflow actions, status badges, director review page, right-side review rail |
| Static storyboard | `/studio/storyboard/static` storyboard card grid |
| Panel editor | `/studio/storyboard/panel-editor` prompt, revision, locks, versions |
| Genre/style modes | `/studio/storyboard/styles` cinematic realism, sketch, 3D, animated, kids TV |
| Dynamic storyboard/animatic | `/studio/animatic` preview player, timeline, motion, voice, music, SFX |
| Video generation | `/studio/video-handoff` provider package and JSON export |
| Aspect ratio/frame rate | Project wizard and animatic controls |
| Auto QA | `/studio/qa` quality score and QA findings |
| Hollywood director demo | `/studio/investor-demo` and modern cinematic UI polish |
