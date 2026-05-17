import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ error: error.message }, { status: 401 });

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    // Update last_active
    await supabase.from('profiles').update({ last_active: new Date().toISOString() }).eq('id', data.user.id);

    return NextResponse.json({ user: profile || { id: data.user.id, name: data.user.email?.split('@')[0] } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
