import type { Metadata } from 'next';
import { GlobalAnalyticsTracker } from '@/components/GlobalAnalyticsTracker';
import { StructuredData } from '@/components/StructuredData';
import './globals.css';
import './clean-rgb.css';
import './saas-cinema.css';
import './mobile-saas.css';
import './audience-10.css';
import './simple-10-final.css';
import './v60-clean-production.css';
import './v70-billion.css';
import './v71-saas-template.css';
import './v72-salient-catalyst-clean.css';
import './v73-frontend-router.css';
import './v75-agent-harness.css';
import './v76-low-token-agent.css';
import './v77-billion-home-match.css';
import './v78-sitewide-alignment.css';
import './v79-responsive-layout-lock.css';
import './v80-cinematic-hero.css';
import './v81-standard-footer.css';
import './v82-hero-banner-buttons.css';

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.cineloom.ai';

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: 'CineLoom.ai | Script to Storyboard in Minutes',
    template: '%s | CineLoom.ai'
  },
  description: 'Paste a scene and create a simple storyboard, shot list, review link, and export-ready pitch package.',
  keywords: ['AI storyboard generator', 'script to storyboard', 'film storyboard software', 'AI pre-production', 'storyboard generator'],
  icons: { icon: '/brand/cineloom-app-icon.jpeg' },
  openGraph: {
    title: 'CineLoom.ai - Script to storyboard in minutes',
    description: 'A simple workflow for creators, filmmakers, and producers: paste, generate, review, export.',
    url: appUrl,
    siteName: 'CineLoom.ai',
    images: [{ url: '/og/cineloom-og.png', width: 1200, height: 630, alt: 'CineLoom.ai storyboard generator' }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineLoom.ai - Script to Storyboard',
    description: 'Create storyboards, shot lists, and pitch packages from a script.',
    images: ['/og/cineloom-og.png']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="clean-production-body">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <StructuredData />
        <GlobalAnalyticsTracker />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
