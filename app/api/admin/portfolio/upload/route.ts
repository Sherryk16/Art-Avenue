import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/utils/adminAuth';
import { getAdminClient } from '@/utils/supabaseAdmin';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File size exceeds 50MB limit' }, { status: 400 });
  }

  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

  if (!isImage && !isVideo) {
    return NextResponse.json({ error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, MP4, WebM, OGG' }, { status: 400 });
  }

  const fileExtension = file.name.split('.').pop() || (isImage ? 'jpg' : 'mp4');
  const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${fileExtension}`;
  const filePath = `public/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const admin = getAdminClient();
  const { error: uploadError } = await admin.storage
    .from('portfolio-images')
    .upload(filePath, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: publicUrlData } = admin.storage
    .from('portfolio-images')
    .getPublicUrl(filePath);

  if (!publicUrlData) {
    return NextResponse.json({ error: 'Could not get public URL' }, { status: 500 });
  }

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
