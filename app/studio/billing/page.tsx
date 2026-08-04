import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { PricingBillingPanel } from '@/components/PricingBillingPanel';

export default function BillingPage() {
  return (
    <AppShell active="Pricing & Billing">
      <PageHeader eyebrow="Subscription + Token Economy" title="Pricing, Tokens, and Payment Gateway">
        CineLoom monetization model: monthly subscription tiers, included monthly tokens, token packs, checkout session creation, usage estimation, and billing handoff readiness.
      </PageHeader>
      <PricingBillingPanel />
    </AppShell>
  );
}
