import { getAdminClient } from '@/utils/supabaseAdmin';

export async function logAdminAction(params: {
  action: string;
  details: string;
  admin_email: string;
}) {
  try {
    const admin = getAdminClient();
    await admin.from('audit_logs').insert({
      action: params.action,
      details: params.details,
      admin_email: params.admin_email,
      ip_address: null,
    } as never);
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}
