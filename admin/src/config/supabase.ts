import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function readEnv(name: string): string | undefined {
  // Vite at build/dev time
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[name]) {
    const value = import.meta.env[name] as string;
    if (value && value !== '' && !value.includes('your-') && !value.includes('placeholder')) {
      return value;
    }
  }

  // Node/SSR fallback
  if (typeof process !== 'undefined' && process?.env?.[name]) {
    const value = process.env[name];
    if (value && value !== '' && !value.includes('your-') && !value.includes('placeholder')) {
      return value;
    }
  }

  // Browser runtime fallback (injected via public/runtime-env.js)
  if (typeof window !== 'undefined' && (window as any).__ENV?.[name]) {
    const value = (window as any).__ENV[name] as string;
    if (value && value !== '' && !value.includes('your-') && !value.includes('placeholder')) {
      return value;
    }
  }

  return undefined;
}

const supabaseUrl = readEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = readEnv('VITE_SUPABASE_ANON_KEY');

// Check if we have valid Supabase credentials
const isUsingPlaceholders = !supabaseUrl || !supabaseAnonKey || 
  supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder') ||
  supabaseUrl.includes('your-') || supabaseAnonKey.includes('your-');

if (isUsingPlaceholders) {
  console.error('❌ [Supabase] Missing or invalid credentials. Please connect to Supabase in Bolt.');
  console.error('📋 Current values:', { 
    url: supabaseUrl ? 'Set' : 'Missing', 
    key: supabaseAnonKey ? 'Set' : 'Missing' 
  });
}

// Only create client if we have valid credentials
export const supabase: SupabaseClient | null = isUsingPlaceholders 
  ? null 
  : createClient(supabaseUrl!, supabaseAnonKey!);

// Export a flag to check if Supabase is properly configured
export const isSupabaseConfigured = !isUsingPlaceholders && supabase !== null;

// Helper function to ensure Supabase is available
export const requireSupabase = () => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Database not connected. Please click "Connect to Supabase" in Bolt to set up the database.');
  }
  return supabase;
};