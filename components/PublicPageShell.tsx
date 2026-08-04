import { ReactNode } from 'react';
import { PublicNav } from '@/components/PublicNav';
import { BillionFooter } from '@/components/BillionFooter';

export function PublicPageShell({ eyebrow, title, subtitle, children }: { eyebrow: string; title: string; subtitle: string; children: ReactNode }) {
  return (
    <main className="bd-page">
      <PublicNav />
      <section className="bd-page-hero">
        <div className="bd-section-eyebrow">{eyebrow}</div>
        <h1 className="bd-page-title">{title}</h1>
        <p className="bd-page-subtitle">{subtitle}</p>
      </section>
      {children}
      <BillionFooter />
    </main>
  );
}
