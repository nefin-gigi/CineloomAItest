# AI Workflow Engine Design

CineLoom v1.0 uses staged AI outputs with human approval between each level.

## Stages

1. Script upload and validation.
2. Story analysis.
3. Beat breakdown.
4. Beat verification.
5. Scene breakdown.
6. Shot breakdown.
7. Overhead spatial layout.
8. Static storyboard panels.
9. Panel review and versioning.
10. Dynamic storyboard / animatic.
11. Dialogue, voice, music, and SFX planning.
12. Video generation handoff.
13. Auto QA.
14. Export package.

## Verification strategy

- First AI generates the output.
- Second AI evaluates the output against story/cinematography rules.
- Deterministic rule checks flag missing data.
- Human reviewer approves, revises, regenerates, or locks the item.
- Downstream stages consume only approved/locked outputs.

## Production implementation

For production, persist every generated entity as a versioned record:

- Project
- Script
- StoryAnalysis
- Beat
- Scene
- Shot
- SpatialLayout
- CharacterProfile
- LocationProfile
- StoryboardPanel
- AnimaticCue
- AudioCue
- QAReport
- ExportPackage
- ReviewEvent

Never overwrite approved records. Create a new version and keep an audit trail.
