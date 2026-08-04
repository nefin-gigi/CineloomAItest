# CineLoom v2.6 — Business Model, Subscriptions, Tokens, and Prompt Corrections

## New v2.6 Capabilities

1. 10-second storyboard sample generator.
2. Subscription model for Preview, Creator, Studio, and Enterprise users.
3. Token-based pricing model for script validation, beat breakdown, shot design, storyboard panels, corrections, animatics, and exports.
4. Payment gateway scaffold with Stripe Checkout-compatible route contracts.
5. User management demo for roles, seats, invitations, and monthly token usage.
6. Prompt-driven storyboard correction workflow with style, character, and 180-degree axis locks.

## Pricing Tiers

| Plan | Price | Tokens | Seats | Audience |
|---|---:|---:|---:|---|
| Preview | $0/mo | 250 | 1 | Film enthusiasts testing CineLoom |
| Creator | $29/mo | 1,500 | 1 | YouTube creators, writers, indie storytellers |
| Studio | $149/mo | 10,000 | 5 | Indie production teams and agencies |
| Enterprise | Custom | Custom | Custom | Studios, streaming teams, branded content teams |

## Token Menu

| Action | Token Cost | Unit |
|---|---:|---|
| Script validation | 15 | per script page |
| Beat breakdown | 120 | per short script |
| Shot design | 35 | per scene |
| 10-second storyboard sample | 180 | per sample |
| Storyboard image panel | 45 | per panel |
| Prompt-driven correction | 18 | per correction |
| 10-second animatic preview | 320 | per 10 seconds |
| Director export package | 75 | per export |

## Payment Gateway

The package includes a payment gateway scaffold:

- `POST /api/billing/create-checkout-session`
- `POST /api/billing/customer-portal`
- `POST /api/billing/webhook`

By default it runs in demo mode. To enable Stripe-style checkout:

```env
PAYMENT_GATEWAY_MODE=stripe
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRICE_CREATOR=...
STRIPE_PRICE_STUDIO=...
```

Production must verify payment webhooks, store customer IDs, map subscriptions to workspaces, and update token balances in the database.

## User Management

The package includes a demo user management screen at:

`/studio/account`

Roles:

- Owner
- Director
- Producer
- Editor
- Viewer

Production should connect Clerk, Auth.js, Supabase Auth, or enterprise SSO.

## Prompt-Driven Corrections

The correction API scaffold is:

`POST /api/storyboard/correct-panel`

It accepts:

- panel ID
- correction prompt
- style lock
- character lock
- 180-degree axis lock

Output includes a corrected prompt contract that can be sent to the future image provider.
