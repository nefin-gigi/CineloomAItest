import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { UserManagementPanel } from '@/components/UserManagementPanel';

export default function AccountPage() {
  return (
    <AppShell active="User Management">
      <PageHeader eyebrow="Workspace Access Control" title="User Management, Roles, Seats, and Usage">
        Invite directors, producers, editors, and viewers; control permissions; track seat usage; and connect future production auth through Clerk, Auth.js, Supabase Auth, or enterprise SSO.
      </PageHeader>
      <UserManagementPanel />
    </AppShell>
  );
}
