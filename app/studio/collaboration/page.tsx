import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { collaborationRoles } from '@/lib/v1-data';

export default function CollaborationPage() {
  return (
    <AppShell active="Collaboration">
      <PageHeader eyebrow="Team Workflow" title="Director, Producer, Artist, Editor, and Investor Collaboration">
        Adds the missing production-team workflow: comments, role-based access, review assignments, read-only investor links, and watermarked previews.
      </PageHeader>
      <div className="role-grid">
        {collaborationRoles.map((role) => <div className="role-card" key={role.role}><span className="badge">{role.role}</span><h3>{role.role}</h3><p>{role.permissions}</p></div>)}
      </div>
      <div className="grid three" style={{ marginTop: 18 }}>
        <div className="card featured"><h3>Comment threads</h3><p>Attach notes to beats, scenes, shots, panels, audio cues, and animatic timeline moments.</p></div>
        <div className="card"><h3>Review assignments</h3><p>Send a specific shot or storyboard panel to a director or producer for approval.</p></div>
        <div className="card"><h3>Investor preview links</h3><p>Share a read-only watermarked demo without exposing editable project data or provider credentials.</p></div>
      </div>
    </AppShell>
  );
}
