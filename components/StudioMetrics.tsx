export function StudioMetrics() {
  const metrics = [
    ['98%', 'demo readiness'],
    ['8', 'guided stages'],
    ['8', 'premium frames'],
    ['20s', 'animatic preview'],
    ['2.39:1', 'cinema aspect'],
    ['24 fps', 'target frame rate']
  ];
  return (
    <div className="metrics-ribbon">
      {metrics.map(([value, label]) => (
        <div className="metric-pill" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
