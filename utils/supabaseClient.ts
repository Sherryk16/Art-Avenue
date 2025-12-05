import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ojhderkeyxvzvlhqclmd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_secret_kbfThCJTCB88PW4nYGbuYQ_uxnNvBGk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

