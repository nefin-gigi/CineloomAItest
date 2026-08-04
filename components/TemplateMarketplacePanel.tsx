import { templateLibrary } from '@/lib/v3-production-data';

export function TemplateMarketplacePanel() {
  return (
    <div className="grid three">
      {templateLibrary.map((template) => <article className="card" key={template.name}><span className="badge premium">Template</span><h3>{template.name}</h3><p>{template.audience}</p><div className="package-item"><strong>Style direction</strong><span>{template.styles}</span></div><button className="btn primary">Use template</button></article>)}
    </div>
  );
}
