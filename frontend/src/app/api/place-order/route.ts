import { NextResponse } from 'next/server';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createPagesServerClient({ req, res });

  // 1. Get user session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session || sessionError) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await req.json();
  const { items, totalAmount } = body;

  // 2. Insert order into Supabase
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: session.user.id,
      total_amount: totalAmount,
      items,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Order placed!', data });
}
