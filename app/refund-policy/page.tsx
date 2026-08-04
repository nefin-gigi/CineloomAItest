import Link from 'next/link';

export default function Page() {
  return (
    <main className="v3-marketing-page">
      <nav className="v3-public-nav"><Link href="/">CineLoom.ai</Link><span><Link href="/how-it-works">How it works</Link><Link href="/examples">Examples</Link><Link href="/pricing">Pricing</Link><Link href="/create-free-storyboard">Free sample</Link><Link href="/login">Login</Link></span></nav>
      <section className="v3-marketing-hero">
        <span className="badge premium">Legal and trust</span>
        <h1 className="gradient-text">Refund Policy</h1>
        <p>Subscriptions renew monthly. Token refunds should be issued only for failed provider jobs or billing errors, not for approved creative outputs.</p>
      </section>

      <section className="card"><h2>Launch note</h2><p className="muted">This page is a production-ready placeholder. Have counsel review final language before accepting public payments.</p><a className="btn primary" href="/pricing">View plans</a></section>
    </main>
  );
}
