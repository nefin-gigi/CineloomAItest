# CineLoom Storyboard Workflow Spec

## Stage 1: Script Breakdown

### 1A. Beat breakdown

Goal: transform the script into story beats with Hollywood continuity-style structure.

Verification options:

1. Direct prompting with multiple iterations
2. LLM self-critique against beat criteria
3. Separate evaluator model
4. Human approval
5. More complex fallback: rules + embeddings + scene-to-beat coverage map

Required fields:

- Beat name
- Scene range
- Summary
- Emotional purpose
- Continuity notes
- Confidence score
- Approval status

### 1B. Shot breakdown

Goal: transform approved scenes into cinematic shots.

Required checks:

- Shot size
- Lens suggestion
- Camera angle
- Camera movement
- Composition
- 180-degree axis
- Screen direction
- Eyeline
- Character distance
- Prop continuity
- Emotional purpose

## Stage 2: Storyboard Breakdown

Static storyboard outputs:

- Cinematic realism images
- Photo sketch images
- 3D blocking images
- Animated movie images
- Kids TV style images

Dynamic storyboard / animatic outputs:

- Panel timing
- Camera motion
- Transitions
- Voice/dialogue guide
- Music mood
- SFX notes
- Rough edit pacing

## Video Generation

Approved package should hand off:

- Dialogue/voice from screenplay
- Music instructions
- Editing instructions
- Rough cut timeline
- Aspect ratio
- Frame rate
- Visual style
- Auto QA report
