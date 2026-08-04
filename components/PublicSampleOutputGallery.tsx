import Image from 'next/image';
import { TrackedCTA } from '@/components/TrackedCTA';

const panels = [
  { src: '/sample-output/cineloom-sample-panel-01.png', title: 'Opening image', shot: 'Wide establishing shot' },
  { src: '/sample-output/cineloom-sample-panel-02.png', title: 'Approach', shot: 'Medium tracking shot' },
  { src: '/sample-output/cineloom-sample-panel-03.png', title: 'Threshold', shot: 'Insert shot' },
  { src: '/sample-output/cineloom-sample-panel-04.png', title: 'Wonder', shot: 'Emotional close-up' },
  { src: '/sample-output/cineloom-sample-panel-05.png', title: 'Reveal', shot: 'Over-the-shoulder' },
  { src: '/sample-output/cineloom-sample-panel-06.png', title: 'Push through', shot: 'Dolly push-in' },
  { src: '/sample-output/cineloom-sample-panel-07.png', title: 'Reaction', shot: 'Reaction close-up' },
  { src: '/sample-output/cineloom-sample-panel-08.png', title: 'Title beat', shot: 'Hero title frame' }
];

export function PublicSampleOutputGallery() {
  return (
    <section className="conversion-section sample-output-section">
      <div className="section-kicker">Real downloadable sample output</div>
      <h2>A complete watermarked storyboard package visitors can inspect before signup.</h2>
      <p>The public sample package includes eight storyboard frames, storyboard PDF, shot list CSV, prompt package JSON, and a ZIP export. These are demo-safe assets and can be replaced automatically by live generation endpoints.</p>
      <div className="sample-before-after-grid">
        <article className="card featured">
          <span className="badge premium">Before</span>
          <h3>Scene input</h3>
          <p className="script-preview-copy">A young filmmaker opens a glowing studio door and sees their script become a living movie world.</p>
          <div className="package-item"><strong>Customer value</strong><span>Visitors understand the transformation before creating an account.</span></div>
        </article>
        <article className="card featured">
          <span className="badge premium">After</span>
          <h3>Downloadable director package</h3>
          <p>Storyboard PDF, shot list, prompt package, QA-ready notes, and watermarked image panels.</p>
          <div className="actions">
            <TrackedCTA className="btn primary" href="/sample-output/cineloom-public-sample-package.zip" event="sample_package_downloaded" label="Public sample ZIP" stage="proof" download>Download sample ZIP</TrackedCTA>
            <TrackedCTA className="btn" href="/sample-output/cineloom-public-sample-storyboard.pdf" event="sample_storyboard_pdf_downloaded" label="Public sample PDF" stage="proof" download>Open storyboard PDF</TrackedCTA>
          </div>
        </article>
      </div>
      <div className="public-sample-panel-grid">
        {panels.map((panel, index) => (
          <article className="public-sample-card" key={panel.src}>
            <div className="public-sample-image-wrap">
              <Image src={panel.src} alt={`${panel.title} storyboard panel`} width={960} height={540} />
              <span className="watermark-chip">CineLoom.ai preview</span>
            </div>
            <div className="public-sample-meta">
              <strong>{String(index + 1).padStart(2, '0')} · {panel.title}</strong>
              <span>{panel.shot}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
