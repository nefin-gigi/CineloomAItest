import { secureJson } from '@/lib/military-security';
import { buildInputValidationReadiness } from '@/lib/input-validation';

export async function GET() {
  return secureJson(buildInputValidationReadiness());
}
