import Link from 'next/link';
import { PublicPageShell } from '@/components/PublicPageShell';

export default function SignupPage() {
  return (
    <PublicPageShell eyebrow="Create account" title="Start with a free storyboard preview." subtitle="Create an account when you are ready to save projects, export packages, or upgrade.">
      <section className="bd-section compact" style={{maxWidth: 560}}>
        <form className="bd-card">
          <label className="bd-field"><span>Name</span><input placeholder="Your name" /></label>
          <label className="bd-field"><span>Email</span><input type="email" placeholder="you@example.com" /></label>
          <Link className="bd-primary-button" href="/create-free-storyboard" style={{width: '100%'}}>Create free storyboard</Link>
        </form>
      </section>
    </PublicPageShell>
  );
}
