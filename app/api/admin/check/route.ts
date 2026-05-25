import { NextResponse } from 'next/server';
import crypto from 'crypto';

function verifySessionToken(token: string): boolean {
  const secret = process.env.ADMIN_SECRET || 'default-secret';
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  if (!timestamp || !signature) return false;

  const expectedSignature = crypto.createHmac('sha256', secret).update(timestamp).digest('hex');
  if (signature !== expectedSignature) return false;

  const age = Date.now() - parseInt(timestamp, 10);
  if (isNaN(age) || age > 24 * 60 * 60 * 1000) return false;

  return true;
}

export async function GET() {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
