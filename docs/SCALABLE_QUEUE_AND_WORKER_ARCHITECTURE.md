# Scalable Queue and Worker Architecture

AI generation, video rendering, and export packaging are long-running jobs. Do not run them only inside request/response routes.

## Job lifecycle

1. User requests generation.
2. Server estimates tokens.
3. Server reserves tokens.
4. Server enqueues job.
5. Worker calls provider.
6. Worker stores assets in private storage.
7. Worker commits tokens on success or refunds reservation on failure.
8. Worker updates job status.
9. User receives status update or email.

## Job types

- `script.parse`
- `story.beats.generate`
- `scene.shots.generate`
- `storyboard.panel.generate`
- `storyboard.panel.correct`
- `animatic.render`
- `audio.voice.generate`
- `audio.music.generate`
- `export.pdf.render`
- `export.zip.render`

## Scaling model

- Text jobs: cheap, high concurrency.
- Image jobs: medium cost, provider-rate limited.
- Video jobs: expensive, low concurrency, priority queues by plan.
- Export jobs: CPU/memory heavy, separate render worker.
- Enterprise jobs: optionally dedicated queue or provider account.

## Reliability rules

- Every job must be idempotent.
- Every provider call should record request ID and provider cost.
- Token reservations must expire if job never starts.
- Failed jobs should refund reserved tokens unless the provider already charged and delivered partial output.
- Provider timeouts should trigger retry policy, not duplicate billing.
