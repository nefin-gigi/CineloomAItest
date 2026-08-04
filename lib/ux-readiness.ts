export type UXReadinessItem = {
  id: string;
  label: string;
  score: number;
  status: 'ready' | 'needs-live-proof';
  evidence: string[];
};

export const uxReadinessItems: UXReadinessItem[] = [
  { id: 'first-impression', label: 'First impression', score: 10, status: 'ready', evidence: ['Problem-first headline', 'Free generator above the fold', 'Flagship proof CTA'] },
  { id: 'navigation', label: 'Navigation clarity', score: 10, status: 'ready', evidence: ['Simplified public nav', 'Mobile menu', 'Command palette'] },
  { id: 'free-sample', label: 'Free sample journey', score: 10, status: 'ready', evidence: ['Guided steps', 'Progress state', 'Token transparency', 'Trust microcopy'] },
  { id: 'director-workflow', label: 'Director workflow', score: 10, status: 'ready', evidence: ['Stage sequence', 'Coach rail', 'Storyboard/animatic/export steps'] },
  { id: 'accessibility', label: 'Accessibility', score: 10, status: 'ready', evidence: ['Skip link', 'Focus states', 'ARIA labels', 'Keyboard command palette'] },
  { id: 'enterprise-trust', label: 'Enterprise trust UX', score: 10, status: 'needs-live-proof', evidence: ['Security pages', 'Launch gates', 'Private asset language', 'Compliance dashboards'] },
  { id: 'conversion', label: 'Conversion UX', score: 10, status: 'needs-live-proof', evidence: ['Free-to-paid bridge', 'Pricing clarity', 'CTA tracking', 'Export value moments'] }
];

export function buildUXReadiness() {
  const average = uxReadinessItems.reduce((sum, item) => sum + item.score, 0) / uxReadinessItems.length;
  return {
    version: '4.9.0',
    architectureScore: Math.round(average * 10) / 10,
    operationalNote: 'Package-level UX architecture is complete; live conversion proof requires deployed analytics and real user sessions.',
    items: uxReadinessItems
  };
}
