# CineLoom 10/10 Customer Readiness Plan

This package now contains the code structure needed to target 10/10 rankings across customer groups. Actual scoring depends on live endpoint quality and sample output quality.

## Film enthusiasts

Target: instant free 10-second storyboard.

Required endpoints:

- `script_validate`
- `storyboard_generate`
- `storage_upload`
- `analytics_event`

## Indie filmmakers

Target: real upload-to-storyboard-to-export workflow.

Required endpoints:

- `script_upload`
- `script_parse`
- `scene_breakdown`
- `shot_design`
- `storyboard_generate`
- `export_package`

## Hollywood directors

Target: director-controlled creative revisions.

Required endpoints:

- `storyboard_correct`
- `character_location_bible`
- `spatial_layout`
- `animatic_generate`
- `voice_music_sfx`

## Producers

Target: secure, fundable production package.

Required endpoints:

- `auto_qa`
- `export_package`
- `storage_signed_download`
- `analytics_event`

## Studio / enterprise

Target: IP safety and operational control.

Required endpoints:

- `moderation_rights_check`
- `storage_upload`
- `storage_signed_download`
- auth connector
- audit logs
- SSO connector when ready

## Revenue operations

Target: margin-safe paid generation.

Required endpoints:

- `billing_checkout`
- `billing_webhook`
- `token_reserve`
- `token_commit`
- `token_refund`
- `analytics_event`

