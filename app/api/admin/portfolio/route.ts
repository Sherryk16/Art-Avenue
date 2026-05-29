import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/utils/adminAuth';
import { getAdminClient } from '@/utils/supabaseAdmin';
import { logAdminAction } from '@/utils/auditLog';

const portfolioSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().nullable().optional(),
  image_url: z.string().min(1, 'Image URL is required'),
  video_url: z.string().nullable().optional(),
  order: z.number().int().nullable().optional(),
  is_featured: z.boolean().optional(),
});

const updateSchema = portfolioSchema.extend({
  id: z.string().uuid(),
});

const deleteSchema = z.object({
  id: z.string().uuid(),
});

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  const { data, error } = await getAdminClient()
    .from('portfolio_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = portfolioSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { data, error } = await getAdminClient()
    .from('portfolio_items')
    .insert(parsed.data as never)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAdminAction({
    action: 'CREATE',
    details: `Created portfolio item: ${parsed.data.title} (${parsed.data.category})`,
    admin_email: auth.user.email!,
  });

  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { id, ...updateData } = parsed.data;

  const { data, error } = await getAdminClient()
    .from('portfolio_items')
    .update(updateData as never)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAdminAction({
    action: 'UPDATE',
    details: `Updated portfolio item ${id}: ${updateData.title}`,
    admin_email: auth.user.email!,
  });

  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = deleteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  let deletedTitle: string | null = null;
  try {
    const { data } = await getAdminClient()
      .from('portfolio_items')
      .select('title')
      .eq('id', parsed.data.id)
      .single();
    deletedTitle = (data as { title?: string } | null)?.title ?? null;
  } catch {}

  const { error } = await getAdminClient()
    .from('portfolio_items')
    .delete()
    .eq('id', parsed.data.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAdminAction({
    action: 'DELETE',
    details: `Deleted portfolio item ${parsed.data.id}${deletedTitle ? ` (${deletedTitle})` : ''}`,
    admin_email: auth.user.email!,
  });

  return NextResponse.json({ success: true });
}
