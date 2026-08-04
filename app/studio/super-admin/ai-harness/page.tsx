import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { AIHarnessCommandCenter } from '@/components/AIHarnessCommandCenter';

export default function SuperAdminAIHarnessPage() {
  return (
    <AppShell active="AI Harness">
      <PageHeader eyebrow="Super Admin" title="AI harness maturity 10/10">
        Prompt registry, golden tests, automated evals, provider benchmarks, provenance, safety red-team, and AI quality gates.
      </PageHeader>
      <AIHarnessCommandCenter />
    </AppShell>
  );
}
