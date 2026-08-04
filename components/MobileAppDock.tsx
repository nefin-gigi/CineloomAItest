import Link from 'next/link';

const dockItems = [
  { label: 'Create', href: '/create-free-storyboard', icon: '✦' },
  { label: 'Examples', href: '/examples', icon: '▦' },
  { label: 'Pricing', href: '/pricing', icon: '$' },
  { label: 'Help', href: '/support', icon: '?' }
];

export function MobileAppDock() {
  return (
    <div className="mobile-app-dock" aria-label="Mobile quick actions">
      <div className="mobile-dock-tabs">
        {dockItems.map((item) => (
          <Link key={item.href} href={item.href} className={item.label === 'Create' ? 'dock-item primary-dock-item' : 'dock-item'}>
            <span aria-hidden="true">{item.icon}</span>
            <strong>{item.label}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
