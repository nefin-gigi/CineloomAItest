# Export Rendering Pipeline

Paid conversion depends on real exports. CineLoom should generate tangible packages from project data.

## Exports

- Storyboard PDF
- Shot list CSV
- Prompt package JSON
- QA report PDF
- Animatic MP4
- Complete ZIP package
- Character bible PDF
- Location bible PDF
- Investor package PDF

## Renderer lifecycle

1. Server validates plan entitlement.
2. Server estimates/reserves tokens if export consumes generation/render resources.
3. Server enqueues render job.
4. Render worker pulls project data and private assets.
5. Render worker creates output artifact.
6. Artifact is stored in private storage.
7. Secure download route returns signed URL.
8. Export event is tracked in analytics.

## Watermarking

Free users can export watermarked previews. Paid plans unlock clean exports.
