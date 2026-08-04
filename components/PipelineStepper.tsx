import Link from 'next/link';
import { v2SimpleStages } from '@/lib/v2-data';

export function PipelineStepper() {
  return (
    <div className="pipeline-card v2-pipeline-card">
      <div className="pipeline-header">
        <div>
          <div className="eyebrow">Guided workflow</div>
          <h2>Eight clear stages from script to director package</h2>
        </div>
        <span className="badge premium">Designed for 9.5+ customer demo experience</span>
      </div>
      <div className="pipeline">
        {v2SimpleStages.map((stage, index) => (
          <Link className="stage v2-stage" href={stage.href} key={stage.id} aria-label={`Open ${stage.label}`}>
            <span className="stage-number">{String(index + 1).padStart(2, '0')}</span>
            <strong>{stage.label}</strong>
            <span className="muted" style={{ fontSize: '.84rem' }}>{stage.proof}</span>
            <div className="confidence-meter"><span style={{ width: `${stage.score}%` }} /></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
