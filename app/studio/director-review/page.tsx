import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { StoryboardFrame } from '@/components/StoryboardFrame';
import { panels } from '@/lib/demo-data';

export default function DirectorReviewPage() {
  const panel = panels[1];
  return (
    <AppShell active="Director Review">
      <PageHeader eyebrow="Creative Approval" title="Director Review Mode" action={<Link className="btn" href="/studio/animatic">Continue to Animatic</Link>}>
        A simple review interface for non-technical directors and producers. Approve, request revision, regenerate, or reject without touching raw AI settings.
      </PageHeader>
      <div className="hero-card card featured">
        <StoryboardFrame label="Panel 02" tone={panel.tone} />
        <div>
          <span className="badge premium">Scene 01 · Panel 02</span>
          <h2 style={{ fontSize: '2.2rem', letterSpacing: '-0.065em', margin: '14px 0 8px' }}>{panel.shotType}</h2>
          <p><strong>Director note:</strong> Make this more emotionally restrained while preserving the same framing, screen direction, and character identity.</p>
          <p><strong>AI QA:</strong> Character identity locked. Staff prop locked. Screen direction safe. Emotion can be improved.</p>
          <StatusBadge status={panel.status} />
          <div className="actions" style={{ marginTop: 18 }}><button className="btn primary">Approve</button><button className="btn">Request revision</button><button className="btn">Regenerate</button><button className="btn danger">Reject</button></div>
        </div>
      </div>
      <div className="grid three" style={{ marginTop: 18 }}>
        <div className="card"><h3>Plain-language feedback</h3><p>“More emotional,” “wider,” “less bright,” “keep character the same,” and similar notes become structured revisions.</p></div>
        <div className="card"><h3>Revision safety</h3><p>Locked continuity rules prevent the AI from changing actor identity, location geography, props, or aspect ratio.</p></div>
        <div className="card"><h3>Version memory</h3><p>Each attempt is saved so the director can compare before approving.</p></div>
      </div>
    </AppShell>
  );
}
