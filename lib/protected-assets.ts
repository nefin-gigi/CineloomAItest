const demoAssets: Record<string, string> = {
  flagship_package: '/flagship/cineloom-flagship-public-package.zip',
  sample_package: '/sample-output/cineloom-public-sample-package.zip',
  flagship_animatic: '/flagship/cineloom-flagship-60s-animatic.mp4'
};

export function resolveProtectedAsset(assetId: string) {
  return demoAssets[assetId] ?? null;
}

export function canDownloadProtectedAsset({ hasSession, isPublicDemo }: { hasSession: boolean; isPublicDemo: boolean }) {
  if (isPublicDemo) return true;
  return hasSession;
}
