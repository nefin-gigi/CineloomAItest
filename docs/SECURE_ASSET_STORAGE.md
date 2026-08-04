# Secure Asset Storage

Customer scripts, storyboards, animatics, and exports must not live under `/public`.

## Production rules

- Store customer assets in private object storage.
- Serve downloads through authenticated API routes.
- Generate signed URLs with short TTLs.
- Enforce workspace membership before download.
- Watermark preview/free exports.
- Track asset ownership, retention, deletion, and audit events.
- Keep public demo assets separate from private customer assets.

## Asset types

- Uploaded scripts
- Parsed script text
- Generated storyboard panels
- Reference character/location images
- Animatic MP4 files
- Voice/music/SFX stems
- Storyboard PDFs
- Shot list CSV files
- Prompt package JSON files
- ZIP export packages

## Storage adapter methods

See `docs/CONNECTOR_CONTRACTS.md#storage`.
