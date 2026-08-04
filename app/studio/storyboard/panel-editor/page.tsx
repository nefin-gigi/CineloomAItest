import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { WorkflowActions } from '@/components/WorkflowActions';
import { StoryboardFrame } from '@/components/StoryboardFrame';
import { panels } from '@/lib/demo-data';

export default function PanelEditorPage() {
  const panel = panels[1];
  return (
    <AppShell active="Panel Editor">
      <PageHeader eyebrow="Panel Review" title="Static Storyboard Panel Editor" action={<Link className="btn" href="/studio/director-review">Director Review</Link>}>
        Fine-tune a single frame with prompt editing, revision notes, continuity locks, versioning, and approval controls.
      </PageHeader>
      <div className="split">
        <div className="card featured">
          <StoryboardFrame label="Panel Preview" tone={panel.tone} />
          <div className="actions"><button className="btn">Compare versions</button><button className="btn">Download frame</button><button className="btn ghost">View prompt package</button></div>
        </div>
        <div className="card">
          <h3>Panel {panel.panelNumber}: {panel.shotType}</h3>
          <div className="grid two">
            <p><strong>Camera:</strong><br />{panel.camera}</p><p><strong>Emotion:</strong><br />{panel.emotion}</p>
          </div>
          <div className="field"><label>Image prompt</label><textarea defaultValue={panel.imagePrompt} /></div>
          <div className="field"><label>Director revision request</label><textarea defaultValue={panel.revisionNotes} /></div>
          <div className="checklist">
            <div className="check"><span>Lock character identity</span><span>✅</span></div>
            <div className="check"><span>Lock staff prop</span><span>✅</span></div>
            <div className="check"><span>Lock screen direction</span><span>✅</span></div>
            <div className="check"><span>Maintain 2.39:1 frame</span><span>✅</span></div>
          </div>
          <WorkflowActions nextLabel="Approve Panel" />
        </div>
      </div>
    </AppShell>
  );
}
