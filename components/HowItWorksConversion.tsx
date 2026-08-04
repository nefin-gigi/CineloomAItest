import Link from 'next/link';
import { workflowSteps } from '@/lib/public-conversion-data';

export function HowItWorksConversion() {
  return (
    <section className="conversion-section">
      <div className="section-kicker">How it works</div>
      <h2>One scene becomes a visual production package.</h2>
      <div className="workflow-strip-public">
        {workflowSteps.map((step, index) => (
          <article className="workflow-step-public" key={step.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </article>
        ))}
      </div>
      <div className="center-actions">
        <Link className="btn primary" href="/create-free-storyboard">Create my free storyboard</Link>
        <Link className="btn ghost" href="/how-it-works">See full workflow</Link>
      </div>
    </section>
  );
}
