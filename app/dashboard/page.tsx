import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { PageHeader } from '@/components/PageHeader';
import { PipelineStepper } from '@/components/PipelineStepper';
import { StudioMetrics } from '@/components/StudioMetrics';
import { project } from '@/lib/demo-data';
import { DirectorWorkflowCoach } from '@/components/DirectorWorkflowCoach';
import { StoryboardFramePro } from '@/components/StoryboardFramePro';
import { v2Readiness, v2StoryboardFrames } from '@/lib/v2-data';

export default function DashboardPage() {
  return (
    <AppShell active="Dashboard">
      <PageHeader eyebrow="Hollywood-ready private preview" title="CineLoom Storyboard Studio v3.0" action={<Link className="btn primary" href="/studio/investor-demo">Play Guided Demo</Link>}>
        A simplified, premium production workspace designed to impress directors, producers, investors, indie filmmakers, and film enthusiasts in one clear story-to-screen experience, now with subscription pricing, token usage, private user roles, and 10-second storyboard samples.
      </PageHeader>
      <section className="v2-score-ribbon">
        {v2Readiness.customerScores.map((item) => (
          <div className="score-card" key={item.audience}>
            <span>{item.audience}</span>
            <strong>{item.score}</strong>
            <small>{item.reason}</small>
          </div>
        ))}
      </section>
      <DirectorWorkflowCoach />
      <section className="hero-card card featured">
        <div>
          <span className="badge premium">Demo project</span>
          <h2 style={{ fontSize: '2.35rem', letterSpacing: '-0.07em', margin: '14px 0 8px' }}>{project.title}</h2>
          <p className="muted">{project.genre} · {project.format} · {project.runtime} · {project.visualStyle}</p>
          <p>Designed to show a director exactly what CineLoom does: convert story intent into cinematic continuity, reviewable frames, playable timing, and a shareable production package.</p>
          <div className="actions"><Link className="btn primary" href="/studio/investor-demo">Start guided demo</Link><Link className="btn" href="/studio/complete-sample-scene">Complete sample scene</Link><Link className="btn" href="/studio/sample-10s-storyboard">10-sec sample</Link><Link className="btn" href="/studio/billing">Pricing</Link><Link className="btn" href="/studio/export">Export package</Link></div>
        </div>
        <StoryboardFramePro src={v2StoryboardFrames[0].image} title="Opening Wide" meta="Premium storyboard proof" priority />
      </section>
      <StudioMetrics />
      <PipelineStepper />
    </AppShell>
  );
}
