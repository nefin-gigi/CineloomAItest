import type { Status } from '@/lib/types';

export function StatusBadge({ status }: { status: Status | string }) {
  const cls = status.toLowerCase().replace(/\s+/g, '-');
  return <span className={`status ${cls}`}>{status}</span>;
}
