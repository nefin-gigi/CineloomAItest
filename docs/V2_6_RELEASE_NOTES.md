# CineLoom v2.6 Release Notes

## Theme
Business-ready Hollywood director demo with subscriptions, token pricing, private users, payment gateway scaffold, and prompt-driven storyboard corrections.

## Added Screens

- `/studio/sample-10s-storyboard`
- `/studio/billing`
- `/studio/account`
- `/studio/storyboard-corrections`

## Added API Routes

- `/api/billing/create-checkout-session`
- `/api/billing/customer-portal`
- `/api/billing/webhook`
- `/api/tokens/estimate`
- `/api/tokens/ledger`
- `/api/storyboard/correct-panel`
- `/api/storyboard/sample-10s`

## Demo Value

v2.6 now supports a clear monetization story:

- Free try-before-subscribe path
- Monthly plan tiers
- Included token balances
- Token pack upsells
- Role-based workspace access
- Prompt corrections charged per iteration

## Production Still Needed

- Real auth provider
- Database persistence
- Secure customer/subscription storage
- Stripe webhook signature verification
- Asset access control outside `/public`
- Real AI provider connections
- Usage-based billing enforcement
