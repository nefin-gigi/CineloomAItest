import { PublicNav } from '@/components/PublicNav';
import { BillionFooter } from '@/components/BillionFooter';
import { WorkingStoryboardDemo } from '@/components/WorkingStoryboardDemo';

export default function CreateFreeStoryboardPage() {
  return (
    <main className="bd-page">
      <PublicNav />
      <section className="bd-page-hero">
        <div className="bd-section-eyebrow">Create</div>
        <h1 className="bd-page-title">Create your first storyboard preview.</h1>
        <p className="bd-page-subtitle">Start with one scene. The preview works on staging immediately, and live AI generation can be connected behind the same workflow.</p>
      </section>
      <section className="bd-section compact">
        <WorkingStoryboardDemo />
      </section>
      <BillionFooter />
    </main>
  );
}
