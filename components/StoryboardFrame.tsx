export function StoryboardFrame({ label, tone = 'warm' }: { label: string; tone?: 'warm' | 'cool' | 'night' | 'gold' }) {
  return (
    <div className={`storyboard-frame ${tone}`}>
      <div className="frame-bars" />
      <div className="frame-horizon" />
      <div className="frame-character" />
      <div className="frame-glow" />
      <span>{label}</span>
    </div>
  );
}
