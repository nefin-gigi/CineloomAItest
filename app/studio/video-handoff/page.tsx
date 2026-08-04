import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { videoReadinessChecklist } from '@/lib/demo-data';

export default function VideoHandoffPage() {
  return (
    <AppShell active="Video Handoff">
      <PageHeader eyebrow="Stage 4" title="Video Generation Handoff Package">
        Export the approved creative package to video, voice, music, editing, and QA providers without locking CineLoom to a single vendor.
      </PageHeader>
      <div className="grid two">
        <div className="card featured">
          <h3>Readiness checklist</h3>
          <div className="checklist">
            {videoReadinessChecklist.map((item, index) => <div className="check" key={item}><span>{item}</span><span>{index < 6 ? '✅' : index < 10 ? 'Ready' : '⚠'}</span></div>)}
          </div>
        </div>
        <div className="card">
          <h3>Provider package settings</h3>
          <div className="field"><label>Video provider</label><select><option>Mock Demo Mode</option><option>Hunyuan / fal.ai</option><option>Kling</option><option>Runway</option><option>Custom hosted worker</option></select></div>
          <div className="field"><label>Dialogue / voice</label><select><option>Screenplay Dialogue</option><option>Narration Only</option><option>Voice Provider</option></select></div>
          <div className="field"><label>Music</label><select><option>Emotional Cinematic Score</option><option>Suno / Music Provider</option><option>No Music</option></select></div>
          <div className="field"><label>Editing output</label><select><option>Rough cut with timing notes</option><option>Trailer package</option><option>Pitch package</option></select></div>
          <div className="actions"><button className="btn">Export prompts</button><a className="btn" href="/api/export/package">Download JSON</a><button className="btn primary">Generate Video Package</button></div>
        </div>
      </div>
    </AppShell>
  );
}
