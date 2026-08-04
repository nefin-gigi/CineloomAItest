# API Provider Integration Guide

The MVP is provider-agnostic. It should not depend on only one AI video provider.

## Current provider selection

`lib/provider-adapters.ts` chooses providers in this order:

1. `FAL_KEY` → `fal_hunyuan`
2. `KLING_API_KEY` → `kling`
3. `RUNWAY_API_KEY` → `runway`
4. No key → `mock`

## Current routes

- `POST /api/pipeline/validate-script`
- `POST /api/pipeline/analyze-story`
- `POST /api/pipeline/generate-beats`
- `POST /api/pipeline/generate-scenes`
- `POST /api/pipeline/generate-shots`
- `POST /api/pipeline/generate-panels`
- `POST /api/pipeline/generate-animatic`
- `POST /api/pipeline/send-to-provider`
- `GET /api/export/package`

## Recommended production queue

Vercel serverless functions are not ideal for long-running video generation. For production, use:

- Vercel for UI and API orchestration
- Queue service for jobs
- Hosted GPU worker or provider API for generation
- Object storage for generated clips and storyboard images
- Database for project state and approvals

## Provider implementation notes

Each provider adapter should normalize:

- Prompt
- Negative prompt
- Reference images
- Character consistency references
- Aspect ratio
- Frame rate
- Duration
- Job ID
- Polling URL
- Preview URL
- Error state
- Cost estimate
