import { TrackedCTA } from '@/components/TrackedCTA';

const proofSlots = [
  { role: 'Indie filmmaker', quote: 'Beta proof slot: replace with a verified quote after the first filmmaker pilot.', outcome: 'Storyboard package clarity' },
  { role: 'YouTube creator', quote: 'Beta proof slot: replace with a verified quote after the first creator export.', outcome: 'Free-to-paid conversion' },
  { role: 'Producer', quote: 'Beta proof slot: replace with a verified quote after the first pitch-package review.', outcome: 'Investor package confidence' }
];

export function TestimonialWall() {
  return (
    <section className="conversion-section testimonial-section">
      <div className="section-kicker">Social proof system</div>
      <h2>Customer proof blocks are ready for verified beta testimonials.</h2>
      <p>These slots should be replaced with real customer quotes before public paid launch. The page structure is ready to place proof close to CTAs, pricing, and example outputs.</p>
      <div className="testimonial-grid">
        {proofSlots.map((slot) => (
          <article className="testimonial-card" key={slot.role}>
            <span className="badge">{slot.role}</span>
            <blockquote>“{slot.quote}”</blockquote>
            <strong>{slot.outcome}</strong>
          </article>
        ))}
      </div>
      <div className="center-actions">
        <TrackedCTA className="btn primary" href="/create-free-storyboard" event="proof_cta_clicked" label="Proof wall free storyboard" stage="social-proof">Create my free storyboard</TrackedCTA>
      </div>
    </section>
  );
}
