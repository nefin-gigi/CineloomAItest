import { PublicNav } from '@/components/PublicNav';
import { SimpleFooter } from '@/components/SimpleFooter';

const cases = [
  ['Indie short film', 'One-page scene to 12-panel storyboard and animatic pitch package.'],
  ['YouTube Shorts creator', 'Weekly 10-second storyboard template with vertical export workflow.'],
  ['Ad agency concept', 'Client storyboard board, prompt corrections and watermarked review link.'],
  ['Film school lesson', 'Script-to-shot breakdown with 180-degree spatial layout and QA score.']
];

export default function CaseStudiesPage() {
  return (
    <main className="public-page">
      <PublicNav />
      <section className="public-hero">
        <span className="badge premium">Use cases</span>
        <h1>Film-industry examples that sell the platform.</h1>
        <p>These case-study shells are ready to connect to real customer examples and public share pages.</p>
      </section>
      <section className="grid two">{cases.map(([title, text]) => <div className="card" key={title}><h3>{title}</h3><p>{text}</p><span className="status ready">Share-ready</span></div>)}</section>
          <SimpleFooter />
    </main>
  );
}
