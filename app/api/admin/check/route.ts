import { NextResponse } from 'next/server';
import { getAdminUser } from '@/utils/adminAuth';

export async function GET() {
  try {
    const user = await getAdminUser();

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
