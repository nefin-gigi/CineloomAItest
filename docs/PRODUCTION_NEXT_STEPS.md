# Production Next Steps After v1.0 Demo

## Phase 1: Persistence

- Connect Supabase/Postgres.
- Create project, script, beat, scene, shot, panel, animatic, audio, QA, export, and review-event tables.
- Save every review decision.
- Add authentication beyond launch gate.

## Phase 2: Real file parsing

- Add PDF text extraction.
- Add DOCX parsing.
- Add Fountain support.
- Add Final Draft FDX support.
- Store original uploaded source.

## Phase 3: Real generation

- Connect image generation provider for static panels.
- Connect video generation provider for approved animatics.
- Connect voice and music providers.
- Add storage for generated assets.
- Add queue workers for long jobs.

## Phase 4: Exports

- Generate real PDF storyboard packages.
- Generate CSV shot lists.
- Generate JSON prompt packages.
- Generate MP4 animatics.
- Generate ZIP packages for director/investor sharing.

## Phase 5: Collaboration

- Invite directors/producers/artists/editors.
- Add comments and assignments.
- Add read-only investor links.
- Add watermarked previews.
