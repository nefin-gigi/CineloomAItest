import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';

const emailFlows = [
  ['onboarding_welcome', 'Sent when a new user creates an account and starts the free storyboard funnel.'],
  ['generation_complete', 'Sent when storyboard, animatic, or export jobs complete.'],
  ['billing_receipt', 'Sent after subscription or token pack purchase is confirmed by billing webhook.'],
  ['support_ticket', 'Sent when support receives a customer question or issue.'],
  ['low_token_warning', 'Sent when a user approaches their token floor.']
];

export default function EmailSuperAdminPage() {
  return (
    <AppShell>
      <PageHeader title="Email Provider" eyebrow="Super Admin" description="Plug in outbound email for onboarding, generation-complete, billing, support, and token lifecycle messages." />
      <section className="card">
        <h2>Endpoint configuration</h2>
        <p className="muted">Set EMAIL_PROVIDER_ENDPOINT and EMAIL_PROVIDER_API_KEY to route email through Resend, SendGrid, Postmark, AWS SES, or your own email worker. Demo mode logs the payload without sending.</p>
        <div className="grid two">
          {emailFlows.map(([key, note]) => <div className="package-item" key={key}><strong>{key}</strong><span>{note}</span></div>)}
        </div>
      </section>
    </AppShell>
  );
}
