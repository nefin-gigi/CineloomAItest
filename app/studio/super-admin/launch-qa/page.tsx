import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { FinalLaunchReadinessPanel } from '@/components/FinalLaunchReadinessPanel';

export default function LaunchQAPage() {
  return (
    <AppShell>
      <PageHeader title="Final Launch QA" eyebrow="Super Admin" description="High-priority launch gaps, mobile QA, SEO proof, analytics coverage, protected assets, and deployment readiness." />
      <FinalLaunchReadinessPanel />
      <section className="card">
        <h2>Required final live checks</h2>
        <div className="checklist">
          {['Vercel preview build passes', 'Auth provider is live', 'Database migrations applied', 'Stripe webhooks verified', 'Private storage signed URLs tested', 'Queue workers processing jobs', 'Storyboard endpoint returns real panels', 'Analytics receiving events', 'Support/email provider delivering messages', 'Legal/security review complete'].map((item) => <div className="check" key={item}><span>{item}</span><strong>Required</strong></div>)}
        </div>
      </section>
    </AppShell>
  );
}
