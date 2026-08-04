import { NextResponse } from 'next/server';
import { assertSuperAdminAccess } from '@/lib/integration-runtime';
import { endpointWorkflowMap, executionEndpointCatalog, tenOutOfTenCustomerTargets } from '@/lib/execution-endpoints';
import { getExecutionEndpointHealth } from '@/lib/execution-runtime';

export async function GET(request: Request) {
  const access = assertSuperAdminAccess(request);
  if (!access.allowed) return NextResponse.json({ ok: false, message: access.reason }, { status: 403 });
  return NextResponse.json({
    ok: true,
    access: access.reason,
    health: getExecutionEndpointHealth(),
    catalog: executionEndpointCatalog,
    workflowMap: endpointWorkflowMap,
    customerTargets: tenOutOfTenCustomerTargets
  });
}
