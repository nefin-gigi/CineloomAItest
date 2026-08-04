import { trustSignals } from '@/lib/public-conversion-data';

export function TrustMicrocopy({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'trust-row compact' : 'trust-row'}>
      {trustSignals.slice(0, compact ? 3 : trustSignals.length).map((signal) => (
        <span key={signal}>✓ {signal}</span>
      ))}
    </div>
  );
}
