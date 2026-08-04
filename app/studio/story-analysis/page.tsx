import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { WorkflowActions } from '@/components/WorkflowActions';

export default function StoryAnalysisPage() {
  return (
    <AppShell active="Story Analysis">
      <PageHeader eyebrow="Stage 1A" title="Story Analysis" action={<Link className="btn" href="/studio/beats">Open Beats</Link>}>
        Confirm that CineLoom understood the core story before generating beat, scene, and shot breakdowns.
      </PageHeader>
      <div className="grid two">
        <div className="card featured"><h3>Logline</h3><p>A reluctant leader moves from fear to faith as he accepts a calling larger than himself.</p></div>
        <div className="card"><h3>Theme</h3><p>Faith under pressure; courage begins where certainty ends.</p></div>
        <div className="card"><h3>Emotional arc</h3><p>Fear → Resistance → Surrender → Courage → Deliverance</p></div>
        <div className="card"><h3>Tone guardrails</h3><p>Respectful, cinematic, restrained, grounded, not flashy, not comic, and not fantasy-heavy.</p></div>
      </div>
      <div className="card" style={{ marginTop: 18 }}>
        <h3>Detected production elements</h3>
        <div className="grid three"><p><strong>Characters:</strong><br />Moses, Pharaoh, Miriam, Hebrew Workers</p><p><strong>Locations:</strong><br />Desert Ridge, Pharaoh Hall, Sacred Ground, Desert Path</p><p><strong>Continuity:</strong><br />Staff, travel direction, robe, desert light, sacred tone</p></div>
        <WorkflowActions nextLabel="Approve Analysis" />
      </div>
    </AppShell>
  );
}
