import Link from 'next/link';

type BrandLogoProps = {
  compact?: boolean;
  href?: string;
};

export function BrandLogo({ compact = false, href = '/dashboard' }: BrandLogoProps) {
  const content = (
    <>
      <span className="brand-icon-wrap" aria-hidden="true">
        <img src="/brand/cineloom-app-icon.jpeg" alt="" className="brand-icon" />
      </span>
      {!compact ? (
        <span className="brand-copy">
          <span className="brand-title">CineLoom</span>
          <span className="brand-sub">AI Storyboard Studio</span>
        </span>
      ) : null}
    </>
  );

  return href ? <Link className="brand-row" href={href}>{content}</Link> : <div className="brand-row">{content}</div>;
}
