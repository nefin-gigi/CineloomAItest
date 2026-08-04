# CineLoom v5.0 — Simple RGB Production UI/UX Redesign

This release replaces the overly cinematic, heavy, dark visual treatment with a simple, readable, customer-friendly design system.

## Design goals

- Make the site legible on mobile and desktop.
- Use a clean red, green, and blue identity without visual clutter.
- Reduce excessive gradients, shadows, giant headings, and dense sections.
- Keep the product promise clear: script to storyboard in minutes.
- Preserve all production, security, AI harness, SaaS, marketplace, and enterprise architecture from prior versions.

## RGB system

- Red: `#dc2626` for warnings, creative/action accents, and RGB identity.
- Green: `#16a34a` for trust, safety, completed status, and success states.
- Blue: `#2563eb` for primary actions, links, navigation, and product CTA.

## UI changes

- New `app/clean-rgb.css` loaded after legacy CSS to override heavy visual styles.
- Simplified public navigation.
- Simplified homepage section order.
- New clean homepage hero.
- Simplified free storyboard generator card.
- More readable pricing/cards/forms/tables.
- More legible studio shell and side navigation.
- New simple public footer across marketing pages.
- Stronger accessibility focus states and mobile behavior.

## Deployment note

Run the full build and preview QA before production deployment:

```bash
npm install
npm run typecheck
npm run build
npm run simple-rgb-ui-check
```

