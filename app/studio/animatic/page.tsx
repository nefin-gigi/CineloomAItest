import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { WorkflowActions } from '@/components/WorkflowActions';
import { AnimaticPreview } from '@/components/AnimaticPreview';

export default function AnimaticPage() {
  return (
    <AppShell active="Animatic Preview">
      <PageHeader eyebrow="Stage 7" title="Dynamic Storyboard / Playable Animatic">
        Turn approved panels into a timed rough cut with movement, dialogue, music, SFX, aspect ratio, and frame-rate controls.
      </PageHeader>
      <AnimaticPreview />
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Timeline</h3>
        <div className="timeline">
          <div className="timeline-cell"><strong>P01</strong><br /><span className="muted">3.0s · wide hold</span></div>
          <div className="timeline-cell"><strong>P02</strong><br /><span className="muted">4.0s · slow push</span></div>
          <div className="timeline-cell"><strong>P03</strong><br /><span className="muted">3.5s · close hold</span></div>
          <div className="timeline-cell"><strong>P04</strong><br /><span className="muted">2.5s · tilt down</span></div>
          <div className="timeline-cell"><strong>Voice</strong><br /><span className="muted">12s screenplay sync</span></div>
          <div className="timeline-cell"><strong>Music/SFX</strong><br /><span className="muted">12s mix plan</span></div>
        </div>
      </div>
      <WorkflowActions nextLabel="Approve Animatic" />
    </AppShell>
  );
}
