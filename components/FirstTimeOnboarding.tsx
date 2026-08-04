import Link from 'next/link';

const choices = [
  {
    label: 'I have a story idea',
    body: 'Paste a paragraph and get a simple storyboard preview.',
    href: '/create-free-storyboard',
    cta: 'Start with my idea',
    accent: 'red'
  },
  {
    label: 'I want to see an example',
    body: 'View a finished sample before trying your own script.',
    href: '/examples',
    cta: 'See examples',
    accent: 'green'
  },
  {
    label: 'I need a pitch package',
    body: 'Create storyboard, shot list, prompts, and export files.',
    href: '/sample-package',
    cta: 'View package',
    accent: 'blue'
  }
];

export function FirstTimeOnboarding() {
  return (
    <section className="simple-section first-time-onboarding" id="start">
      <div className="simple-section-head">
        <span className="section-kicker">Start here</span>
        <h2>Choose one simple starting point.</h2>
        <p>No film software knowledge is required. CineLoom guides you one step at a time.</p>
      </div>
      <div className="simple-choice-grid">
        {choices.map((choice) => (
          <Link className={`simple-choice-card ${choice.accent}`} href={choice.href} key={choice.label}>
            <span className="simple-choice-icon" aria-hidden="true">→</span>
            <h3>{choice.label}</h3>
            <p>{choice.body}</p>
            <b>{choice.cta}</b>
          </Link>
        ))}
      </div>
    </section>
  );
}
