# Connector Contracts

CineLoom v3.0 is designed around replaceable adapters. Demo mode should use the same endpoint contracts as production mode so providers can be swapped without redesigning the UI.

## Identity

```ts
type IdentityAdapter = {
  getCurrentUser(): Promise<UserSession | null>;
  requireRole(workspaceId: string, role: string): Promise<void>;
  createWorkspace(input: CreateWorkspaceInput): Promise<Workspace>;
  inviteMember(input: InviteMemberInput): Promise<void>;
};
```

## Billing

```ts
type BillingAdapter = {
  createCheckoutSession(input: CheckoutInput): Promise<{ url: string }>;
  createCustomerPortal(input: PortalInput): Promise<{ url: string }>;
  handleWebhook(rawBody: string, signature: string): Promise<WebhookResult>;
};
```

## Token Ledger

```ts
type TokenLedger = {
  estimate(action: GenerationAction): Promise<TokenEstimate>;
  reserve(input: TokenReservationInput): Promise<TokenReservation>;
  commit(reservationId: string): Promise<void>;
  refund(reservationId: string, reason: string): Promise<void>;
};
```

## AI Generation

```ts
type LlmAdapter = {
  validateScript(input: ScriptInput): Promise<ScriptValidation>;
  generateBeats(input: ScriptInput): Promise<Beat[]>;
  generateShots(input: SceneInput): Promise<Shot[]>;
  correctPanel(input: PanelCorrectionInput): Promise<PanelVariant>;
};

type ImageAdapter = {
  generateStoryboardPanel(input: StoryboardPanelRequest): Promise<AssetRef>;
};

type VideoAdapter = {
  generateAnimaticOrClip(input: VideoGenerationRequest): Promise<JobRef>;
};
```

## Storage

```ts
type StorageAdapter = {
  putPrivateAsset(input: PutAssetInput): Promise<AssetRef>;
  getSignedDownloadUrl(assetId: string, ttlSeconds: number): Promise<string>;
  deleteAsset(assetId: string): Promise<void>;
};
```

## Worker Queue

```ts
type QueueAdapter = {
  enqueue(type: JobType, payload: unknown): Promise<JobRef>;
  getStatus(jobId: string): Promise<JobStatus>;
  retry(jobId: string): Promise<JobRef>;
};
```

## Export Renderer

```ts
type ExportRenderer = {
  renderStoryboardPdf(projectId: string): Promise<AssetRef>;
  renderShotListCsv(projectId: string): Promise<AssetRef>;
  renderAnimaticMp4(projectId: string): Promise<AssetRef>;
  renderZipPackage(projectId: string): Promise<AssetRef>;
};
```
