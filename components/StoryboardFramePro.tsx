type StoryboardFrameProProps = {
  src: string;
  title: string;
  meta?: string;
  priority?: boolean;
};

export function StoryboardFramePro({ src, title, meta }: StoryboardFrameProProps) {
  return (
    <div className="pro-frame-card">
      <img src={src} alt={title} className="pro-frame-img" />
      <div className="pro-frame-overlay">
        <strong>{title}</strong>
        {meta ? <span>{meta}</span> : null}
      </div>
    </div>
  );
}
