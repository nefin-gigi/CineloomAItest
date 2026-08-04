export function PageHeader({ eyebrow, title, children, action, description }: { eyebrow: string; title: string; children?: React.ReactNode; action?: React.ReactNode; description?: string }) {
  return (
    <div className="page-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : children ? <p>{children}</p> : null}
      </div>
      {action ? <div className="page-action">{action}</div> : null}
    </div>
  );
}
