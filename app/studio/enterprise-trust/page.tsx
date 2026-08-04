import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { EnterpriseTrustGrid } from '@/components/BillionDollarPlatformConsole';

export default function EnterpriseTrustPage() {
  return <AppShell active="Enterprise Trust"><PageHeader eyebrow="Enterprise Trust" title="Studio trust, IP, and security controls" description="SSO, audit logs, training opt-out, private project mode, retention controls, NDA workspaces, and rights receipts for serious film customers." /><EnterpriseTrustGrid /></AppShell>;
}
