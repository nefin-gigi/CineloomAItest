import { PublicPageShell } from '@/components/PublicPageShell';

const items = [
  ['Private script controls', 'The product is designed to keep customer scripts in private workspaces with signed export patterns.'],
  ['No training without permission', 'Public-facing language and policy structure are built around user consent and IP protection.'],
  ['Launch gates', 'Production gates are designed to block unsafe paid launch until services and approvals are ready.'],
  ['Security architecture', 'Rate limits, audit patterns, Super Admin lockdown, and compliance controls are built into the package.']
];

export default function SecurityPage() {
  return (
    <PublicPageShell eyebrow="Security" title="Built for private scripts and serious creative work." subtitle="CineLoom’s architecture is designed for controlled access, signed exports, auditability, and responsible AI workflows.">
      <section className="bd-section compact">
        <div className="bd-grid-2">
          {items.map(([title, body]) => <article className="bd-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>
    </PublicPageShell>
  );
}
