import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { WorkflowActions } from '@/components/WorkflowActions';
import { StatusBadge } from '@/components/StatusBadge';
import { scenes } from '@/lib/demo-data';

export default function ScenesPage() {
  return (
    <AppShell active="Scene Breakdown">
      <PageHeader eyebrow="Stage 1C" title="Scene Breakdown">
        Convert approved beats into reviewable production scenes with sluglines, runtime, purpose, characters, and revision notes.
      </PageHeader>
      <div className="grid two">
        {scenes.map((scene) => (
          <div className="card" key={scene.id}>
            <span className="badge premium">Scene {scene.number}</span>
            <h3 style={{ marginTop: 12 }}>{scene.slugline}</h3>
            <p>{scene.summary}</p>
            <p><strong>Purpose:</strong> {scene.purpose}</p>
            <p><strong>Characters:</strong> {scene.characters.join(', ')}</p>
            <p><strong>Location:</strong> {scene.location} · <strong>Runtime:</strong> {scene.runtimeSeconds}s</p>
            <p><strong>Review note:</strong> {scene.reviewNote}</p>
            <StatusBadge status={scene.status} />
          </div>
        ))}
      </div>
      <WorkflowActions nextLabel="Approve Scenes" />
    </AppShell>
  );
}
