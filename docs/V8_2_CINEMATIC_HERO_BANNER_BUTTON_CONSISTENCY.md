# CineLoom v8.2 — Cinematic Hero Banner + Button Consistency

This release adds a production-ready cinematic hero banner image and standardizes the public-site button system.

## What changed
- Adds `/public/hero/cineloom-cinematic-saas-hero.png` as the cinematic SaaS hero banner.
- Rebuilds the homepage hero into a calm, film-inspired, two-column layout.
- Standardizes primary, secondary, AI Harness, footer, router, and form buttons.
- Fixes low-contrast AI Harness button text on dark panels.
- Keeps the Standard Footer, AI Harness, low-token workflow, Super Admin endpoint router, input validation, security hardening, and public-page alignment layers intact.

## Deployment note
Deploy with Vercel build cache disabled after replacing older packages so the final CSS layer loads correctly.
