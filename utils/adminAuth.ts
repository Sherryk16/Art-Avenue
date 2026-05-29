import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import type { User } from '@supabase/supabase-js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function getAdminUser() {
  if (!ADMIN_EMAIL) {
    console.error('ADMIN_EMAIL environment variable is not set');
    return null;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.email !== ADMIN_EMAIL) {
    return null;
  }

  return user;
}

type RequireAdminResult =
  | { authorized: false; user: undefined; response: NextResponse }
  | { authorized: true; user: User; response?: undefined };

export async function requireAdmin(): Promise<RequireAdminResult> {
  const user = await getAdminUser();
  if (!user) {
    return { authorized: false, user: undefined, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { authorized: true, user };
}
