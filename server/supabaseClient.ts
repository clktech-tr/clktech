import { createClient } from '@supabase/supabase-js';

// Fallback values for development
const DEFAULT_SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const DEFAULT_SUPABASE_KEY = 'your-supabase-anon-key';

const supabaseUrl = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || DEFAULT_SUPABASE_KEY;

// Only log missing credentials in production
if (process.env.NODE_ENV === 'production' && (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY)) {
  console.error('Missing Supabase credentials in production environment');
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
});

// Test the connection on startup
async function testConnection() {
  try {
    const { data, error } = await supabase.from('settings').select('*').limit(1);
    if (error) {
      console.warn('Supabase connection test failed:', error.message);
    } else {
      console.log('Successfully connected to Supabase');
    }
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
  }
}

// Run the connection test in non-test environments
if (process.env.NODE_ENV !== 'test') {
  testConnection();
}