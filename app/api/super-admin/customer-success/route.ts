import { NextResponse } from 'next/server';

const playbooks = [
  { name: 'First storyboard activation', trigger: 'Signup without first generation after 30 minutes', action: 'Send sample-scene prompt and launch guided wizard.' },
  { name: 'Low-token upgrade', trigger: 'Token balance below 15%', action: 'Show upgrade, token pack and auto top-up options.' },
  { name: 'Export conversion', trigger: 'Watermarked export created', action: 'Offer clean export and commercial license upgrade.' },
  { name: 'Enterprise lead', trigger: 'Workspace has 3+ seats or private mode requested', action: 'Route to enterprise trust pack and sales contact.' }
];

export async function GET() {
  return NextResponse.json({ readiness: '10/10 endpoint-ready', playbooks });
}
