import Link from 'next/link';
import { PublicPageShell } from '@/components/PublicPageShell';

export default function LoginPage() {
  return (
    <PublicPageShell eyebrow="Sign in" title="Welcome back to CineLoom." subtitle="Staging sign-in is intentionally simple. Connect production auth before paid launch.">
      <section className="bd-section compact" style={{maxWidth: 560}}>
        <form className="bd-card">
          <label className="bd-field"><span>Email</span><input type="email" placeholder="you@example.com" /></label>
          <label className="bd-field"><span>Password</span><input type="password" placeholder="••••••••" /></label>
          <Link className="bd-primary-button" href="/studio" style={{width: '100%'}}>Continue to studio</Link>
        </form>
      </section>
    </PublicPageShell>
  );
}
