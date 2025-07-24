import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials:', { supabaseUrl, supabaseKey });
}

export const supabase = createClient(
  supabaseUrl || 'https://YOUR_PROJECT.supabase.co',
  supabaseKey || 'YOUR_SERVICE_ROLE_KEY'
);