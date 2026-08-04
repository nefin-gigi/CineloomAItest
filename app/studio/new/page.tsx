import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';

export default function NewProjectPage() {
  return (
    <AppShell active="New Project">
      <PageHeader eyebrow="Project Wizard" title="Create a production-ready storyboard project">
        A friendly setup screen for directors, writers, and producers. Capture only what is needed before script upload.
      </PageHeader>
      <div className="card featured">
        <div className="grid two">
          <div className="field"><label>Project title</label><input className="input" defaultValue="The Silent Path" /></div>
          <div className="field"><label>Production format</label><select><option>Short Film</option><option>Ad / Commercial</option><option>Series Episode</option><option>Feature Concept</option></select></div>
          <div className="field"><label>Genre</label><select><option>Biblical Drama</option><option>Family</option><option>Comedy</option><option>Action</option><option>Kids Animation</option></select></div>
          <div className="field"><label>Target length</label><select><option>15 minutes</option><option>30 seconds</option><option>60 seconds</option><option>45 minutes</option></select></div>
          <div className="field"><label>Aspect ratio</label><select><option>2.39:1 Cinemascope</option><option>16:9 YouTube</option><option>9:16 Shorts/Reels</option><option>1.85:1 Theatrical</option></select></div>
          <div className="field"><label>Frame rate</label><select><option>24 fps cinematic</option><option>30 fps digital</option><option>60 fps motion preview</option></select></div>
          <div className="field"><label>Visual style</label><select><option>Cinematic Realism</option><option>Photo Sketch</option><option>3D Blocking</option><option>Animated Movie</option><option>Kids TV Style</option></select></div>
          <div className="field"><label>Review mode</label><select><option>Director approval required at every stage</option><option>Fast draft mode</option><option>Investor demo mode</option></select></div>
        </div>
        <div className="actions"><Link className="btn ghost" href="/dashboard">Cancel</Link><Link className="btn primary" href="/studio/script">Next: Upload Script</Link></div>
      </div>
      <div className="grid three" style={{ marginTop: 18 }}>
        <div className="card"><h3>Director-friendly</h3><p>No technical AI terms are required. The workflow uses normal filmmaking language.</p></div>
        <div className="card"><h3>Review-first</h3><p>Every stage can be approved, revised, regenerated, or locked.</p></div>
        <div className="card"><h3>Provider-ready</h3><p>Output settings travel into the video handoff package later.</p></div>
      </div>
    </AppShell>
  );
}
