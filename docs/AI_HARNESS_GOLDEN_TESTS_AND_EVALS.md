# AI Harness — Golden Tests and Film Evals

The CineLoom AI harness validates output quality before release and before expensive downstream generation.

## Golden test suite

Golden tests should cover:

1. Biblical epic scenes
2. Indie drama scenes
3. YouTube Shorts hooks
4. Commercial/ad pitch scenes
5. Animation/family scenes
6. Dialogue-heavy scenes
7. Action/blocking scenes
8. Silent emotional moments

## Rubric categories

- Story structure and beat coverage
- Cinematography and shot motivation
- Continuity, 180-degree axis, and spatial geography
- Visual quality and style compliance
- Safety, rights, and IP compliance
- Export and delivery readiness

## Regression gates

Any prompt/model/provider update should be blocked when:

- Overall score falls below the configured threshold.
- Continuity score drops below 92.
- Safety/rights score drops below 95.
- Storyboard output becomes unusable for production review.
- Token cost increases beyond margin guardrails.

## Human feedback

Director, producer, editor, and viewer scores are captured separately so CineLoom can learn which outputs are actually useful in production review.
