import { NextResponse } from 'next/server';
import { exportPackageItems } from '@/lib/v1-data';
import { v2ExportPreview, v2QaScoreCards, v2Readiness } from '@/lib/v2-data';
import { generationPackage } from '@/lib/pipeline';

export async function GET() {
  return NextResponse.json({
    packageType: 'cineloom-v2-director-investor-package',
    generatedAt: new Date().toISOString(),
    version: v2Readiness.version,
    demoArtifacts: v2ExportPreview,
    productionArtifacts: exportPackageItems,
    qaScoreCards: v2QaScoreCards,
    generationPackage: generationPackage()
  });
}
