import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { SuperAdminConnectorConsole } from '@/components/SuperAdminConnectorConsole';
import { ExecutionEndpointConsole } from '@/components/ExecutionEndpointConsole';
import { ScaleReadinessConsole } from '@/components/ScaleReadinessConsole';
import { BillionDollarPlatformConsole } from '@/components/BillionDollarPlatformConsole';
import { MilitarySecurityCommandCenter } from '@/components/MilitarySecurityCommandCenter';
import Link from 'next/link';

export default function SuperAdminPage() {
  return (
    <AppShell active="Super Admin">
      <PageHeader
        eyebrow="Super Admin"
        title="Plug-and-play connectivity command center"
        description="Configure production endpoints plus marketplace, API platform, enterprise trust, film integrations, revenue loops, and growth ecosystem from one scalable CineLoom control surface."
      />
      <section className="fer-superadmin-callout">
        <div>
          <span>New in v7.3</span>
          <h2>Frontend links are now endpoint-aware.</h2>
          <p>Connect public navigation, storyboard CTAs, Studio actions, billing, exports, and support to backend endpoints from one plug-and-play control panel.</p>
        </div>
        <Link href="/studio/super-admin/frontend-integrations">Open Frontend Integrations</Link>
      </section>
      <section className="fer-superadmin-callout agent-admin-callout">
        <div>
          <span>New in v7.5</span>
          <h2>ChatGPT Agent Harness controls single-board changes.</h2>
          <p>Let directors change board 417 out of 1,000 without touching any other board, then approve before dynamic stitching.</p>
        </div>
        <Link href="/studio/super-admin/agent-harness">Open Agent Harness</Link>
      </section>
      <MilitarySecurityCommandCenter />
      <SuperAdminConnectorConsole />
      <ScaleReadinessConsole />
      <ExecutionEndpointConsole />
      <BillionDollarPlatformConsole />
    </AppShell>
  );
}
