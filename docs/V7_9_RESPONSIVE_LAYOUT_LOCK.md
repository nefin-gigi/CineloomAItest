# CineLoom v7.9 Responsive Layout Lock

This release fixes the staging issue where the homepage and public pages looked misaligned at tablet/desktop widths.

## Fixes
- Single-column hero below 1220px to prevent text and product visual overlap.
- Locked navigation so CTA buttons no longer wrap into ugly stacked text.
- Sitewide public page typography clamps for h1/h2/h3.
- Auto-fit card grids on examples, pricing, security, support, and workflow pages.
- Feature cards no longer inherit old oversized heading styles.
- Product mockup and AI Harness board visual scale safely on desktop, tablet, and mobile.
- Loaded `app/v79-responsive-layout-lock.css` last so old prototype CSS cannot override it.

## Preserved
- ChatGPT Agent Harness.
- Low-token board patch workflow.
- Super Admin frontend endpoint router.
- Input validation and top-security harness.
- Existing backend/API architecture.
