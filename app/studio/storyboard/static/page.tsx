import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { WorkflowActions } from '@/components/WorkflowActions';
import { StatusBadge } from '@/components/StatusBadge';
import { StoryboardFramePro } from '@/components/StoryboardFramePro';
import { v2StoryboardFrames } from '@/lib/v2-data';

export default function StaticStoryboardPage() {
  return (
    <AppShell active="Storyboard Review">
      <PageHeader eyebrow="Stage 6" title="Premium Static Storyboard Review" action={<Link className="btn" href="/studio/storyboard/styles">Change Style</Link>}>
        Director-friendly storyboard review with real sample frames, shot motivation, continuity notes, quick revisions, and approval locks.
      </PageHeader>
      <div className="tab-row" style={{ marginBottom: 18 }}>
        <span className="badge premium">Cinematic Realism</span><span className="badge">Photo Sketch</span><span className="badge">3D Blocking</span><span className="badge">Animated Movie</span><span className="badge">Preschool 2D</span>
      </div>
      <div className="grid four v2-storyboard-grid">
        {v2StoryboardFrames.map((panel, index) => (
          <Link className="card v2-panel-card" href="/studio/storyboard/panel-editor" key={panel.id}>
            <StoryboardFramePro src={panel.image} title={`${panel.panelNumber} · ${panel.title}`} meta={`${panel.shotType} · ${panel.emotion}`} priority={index === 0} />
            <h3 style={{ marginTop: 14 }}>{panel.title}</h3>
            <p><strong>{panel.shotType}</strong></p>
            <p>{panel.camera}</p>
            <p>{panel.note}</p>
            <StatusBadge status={panel.status} />
          </Link>
        ))}
      </div>
      <WorkflowActions nextLabel="Approve Selected Panels" helper="Click a panel to open detailed review. Approved frames are locked for animatic timing and provider handoff." />
    </AppShell>
  );
}
