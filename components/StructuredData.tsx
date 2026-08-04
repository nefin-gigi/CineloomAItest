export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CineLoom.ai',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    description: 'AI film pre-production platform that turns scripts into beats, shots, storyboards, animatics, and export-ready director packages.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free watermarked 10-second storyboard preview with paid subscription and token upgrades.'
    },
    featureList: [
      'AI storyboard generation',
      'Script-to-shot breakdown',
      'Dynamic animatics',
      'Prompt-based storyboard corrections',
      'Director export packages',
      'Token-based billing'
    ]
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
