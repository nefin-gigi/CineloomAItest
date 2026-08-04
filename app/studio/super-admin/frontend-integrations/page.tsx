import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { FrontendEndpointIntegrationConsole } from '@/components/FrontendEndpointIntegrationConsole';

export default function FrontendIntegrationsPage() {
  return (
    <AppShell active="Frontend Integrations">
      <PageHeader
        eyebrow="Super Admin"
        title="Frontend-to-backend plug-and-play router"
        description="Map every customer-facing link, button, form, and Studio action to a backend endpoint chain without making the user interface technical or cluttered."
      />
      <FrontendEndpointIntegrationConsole />
    </AppShell>
  );
}
