# CineLoom v5.4 Final Simple Production Install

This version focuses on making CineLoom easy enough for a non-technical creator while preserving the full production, security, AI harness, enterprise, API, and billing architecture from previous versions.

## Primary user workflow

1. Start
2. Create storyboard
3. Review panels
4. Fix with plain English
5. Export package
6. Share review link
7. Return to My Projects

## User-facing improvements

- First-time onboarding with three plain choices: story idea, examples, or pitch package.
- One-path workflow section: paste scene, get panels, review/fix, export/share.
- Plan helper for creator, filmmaker, producer, and studio users.
- Export value preview showing exact files included.
- Project search and filters for drafts, review, exported, and shared work.
- Share-for-review panel with a simple review link pattern.
- Mobile workflow progress rail.
- Simpler public navigation.
- Simpler studio navigation that hides advanced/admin tools.
- Plain-language trust strip on public and creation flows.

## Normal user navigation

Public:
- How it works
- Examples
- Pricing
- Security
- Help
- Start free

Studio:
- Create
- My Projects
- Review
- Export Package
- Pricing & Billing
- Help

Advanced/admin tools are still included but grouped away from normal users.

## Installation

```bash
npm install
npm run typecheck
npm run build
npm run nontechnical-10-check
npm run production-check
```

For live paid production:

```bash
npm run production-check:strict
```

The strict check should only pass after real auth, database, Stripe, storage, Redis, queues, AI endpoints, observability, WAF/bot protection, legal/security approvals, and launch gates are configured.

## Deployment flow

1. Upload this package to GitHub.
2. Import the repository into Vercel.
3. Configure environment variables.
4. Run Vercel Preview.
5. Test on desktop, iPhone, Android, and tablet.
6. Validate create → review → fix → export → share.
7. Run strict production checks.
8. Launch private beta before public paid launch.

## Final UX principle

One page should ask the user to make only one clear decision.
