import { BillionHomeExperience } from '@/components/BillionHomeExperience';
import { ConversionAnalyticsTracker } from '@/components/ConversionAnalyticsTracker';

// Homepage CTAs are rendered through EndpointAwareLink inside BillionHomeExperience.
export default function Home() {
  return (
    <>
      <ConversionAnalyticsTracker pageName="homepage_v77_billion_saas_full_match" />
      <BillionHomeExperience />
    </>
  );
}
