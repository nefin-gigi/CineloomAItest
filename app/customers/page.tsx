import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';
import { SaaS10PublicProof } from '@/components/SaaS10PublicProof';

export default function CustomersPage() {
  return (
    <main className="public-page">
      <PublicNav />
      <section className="public-hero">
        <span className="badge premium">Customer-ready film SaaS</span>
        <h1>One platform for creators, filmmakers, producers, agencies, educators, and studios.</h1>
        <p>CineLoom gives every film customer a path from idea to storyboard, animatic, review, export and production handoff.</p>
      </section>
      <SaaS10PublicProof />
          <SimpleFooter />
    </main>
  );
}
