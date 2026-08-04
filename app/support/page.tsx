import { PublicPageShell } from '@/components/PublicPageShell';

export default function SupportPage() {
  return (
    <PublicPageShell eyebrow="Help" title="Simple help for creators and teams." subtitle="Find the next action fast: create a storyboard, view examples, check pricing, or ask for support.">
      <section className="bd-section compact">
        <div className="bd-grid-3">
          <article className="bd-card"><h3>Getting started</h3><p>Paste one scene, click create, review the preview, then export when ready.</p></article>
          <article className="bd-card"><h3>Billing</h3><p>Plans and token packs are designed to keep storyboard generation predictable.</p></article>
          <article className="bd-card"><h3>Contact</h3><p>For beta support, use hello@cineloom.ai or your internal project support channel.</p></article>
        </div>
      </section>
    </PublicPageShell>
  );
}
