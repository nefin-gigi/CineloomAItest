import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    workspaceId: 'workspace_cineloom_demo',
    plan: 'studio',
    includedMonthlyTokens: 10000,
    currentBalance: 8420,
    monthToDateUsed: 1580,
    ledger: [
      { id: 'txn_001', action: '10-second storyboard sample', tokens: -180, createdAt: '2026-07-30T13:48:00-04:00' },
      { id: 'txn_002', action: 'Prompt-driven correction', tokens: -18, createdAt: '2026-07-30T13:49:00-04:00' },
      { id: 'txn_003', action: 'Director export package', tokens: -75, createdAt: '2026-07-30T13:50:00-04:00' }
    ]
  });
}
