import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { StoryboardFramePro } from '@/components/StoryboardFramePro';
import { v25SampleSceneProof, v2ExportPreview, v2StoryboardFrames } from '@/lib/v2-data';

export default function CompleteSampleScenePage() {
  return (
    <AppShell active="Complete Sample Scene">
      <PageHeader eyebrow="9.5+ demo proof" title="Complete Sample Scene: Script to Export">
        A finished director-facing sample that proves the CineLoom workflow without asking the customer to imagine the output.
      </PageHeader>

      <section className="card featured">
        <div className="pipeline-header">
          <div>
            <span className="badge premium">The Silent Path</span>
            <h2>One scene, fully packaged</h2>
            <p className="muted">Script intelligence, verified beats, 5 Cs shot design, 180° layout, premium storyboard, playable animatic MP4, and real export downloads.</p>
          </div>
          <div className="actions">
            <Link href="/studio/investor-demo" className="btn primary">Play guided demo</Link>
            <a href="/demo-package/cineloom-demo-export-package.zip" download className="btn">Download ZIP</a>
          </div>
        </div>
        <video className="sample-video large" src="/demo-package/cineloom-animatic-preview.mp4" controls poster="/demo-frames-premium/premium-panel-01.png" />
      </section>

      <section className="grid three" style={{ marginTop: 18 }}>
        {v25SampleSceneProof.map((item) => (
          <div className="card mini-proof" key={item.label}>
            <span className="badge premium">{item.label}</span>
            <p>{item.value}</p>
          </div>
        ))}
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <div className="pipeline-header">
          <div>
            <div className="eyebrow">Storyboard proof</div>
            <h2>8 premium director-review panels</h2>
          </div>
          <a className="btn primary" href="/demo-package/cineloom-director-storyboard-package.pdf" download>Download Storyboard PDF</a>
        </div>
        <div className="storyboard-grid premium-grid">
          {v2StoryboardFrames.map((frame) => (
            <div className="card frame-proof" key={frame.id}>
              <StoryboardFramePro src={frame.image} title={`${frame.panelNumber} · ${frame.title}`} meta={`${frame.shotType} · ${frame.status}`} />
              <p><strong>{frame.camera}</strong></p>
              <p className="muted">{frame.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <div className="pipeline-header">
          <div>
            <div className="eyebrow">Export proof</div>
            <h2>Downloadable package artifacts</h2>
          </div>
          <a className="btn primary" href="/demo-package/cineloom-demo-export-package.zip" download>Download All</a>
        </div>
        <div className="package-grid">
          {v2ExportPreview.map((item) => (
            <a className="package-item download-card" href={item.href} download key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.value}</span>
              <span className="badge premium">{item.status}</span>
            </a>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
