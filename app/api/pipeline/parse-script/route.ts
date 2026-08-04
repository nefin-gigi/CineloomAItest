import { NextResponse } from 'next/server';
import { scriptParserFeatures } from '@/lib/v1-data';
import { v2DemoScript } from '@/lib/v2-data';

export async function POST() {
  return NextResponse.json({
    parserMode: 'v2-demo-deterministic-parser',
    script: v2DemoScript,
    detected: {
      scenes: 1,
      characters: ['Moses'],
      locations: ['Desert Ridge'],
      dialogueLines: 1,
      actionLines: 4,
      estimatedRuntimeSeconds: 24
    },
    features: scriptParserFeatures,
    warnings: ['Production parser should connect PDF/DOCX/Fountain/Final Draft extraction.']
  });
}
