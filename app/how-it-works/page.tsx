import { PublicPageShell } from '@/components/PublicPageShell';

const steps = [
  ['1', 'Paste your scene', 'Use a paragraph, short film scene, script page, or simple story idea.', 'red'],
  ['2', 'Generate panels', 'CineLoom creates visual beats, camera direction, timing, and panel notes.', 'green'],
  ['3', 'Review and fix', 'Choose a panel and explain changes in everyday language.', 'blue'],
  ['4', 'Export the package', 'Download the storyboard PDF, shot list, prompts, animatic timing, and ZIP.', 'dark']
];

export default function HowItWorksPage() {
  return (
    <PublicPageShell eyebrow="How it works" title="From script to storyboard in four clear steps." subtitle="No technical setup. No confusing AI tools. Just a guided production workflow.">
      <section className="bd-section compact">
        <div className="bd-grid-4">
          {steps.map(([num, title, body, tone]) => (
            <article className="bd-card" key={title}>
              <div className={`bd-step-number ${tone}`}>{num}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </PublicPageShell>
  );
}
