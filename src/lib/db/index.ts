/**
 * Database Configuration
 * 
 * Supabase client setup and utilities for server-side operations
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local'
  );
}

/**
 * Supabase client for browser/client-side operations
 * Uses anon key - limited to authenticated users
 */
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabase admin client for server-side operations
 * Uses service role key - has full database access
 */
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Type exports
export type SupabaseClient = typeof supabaseClient;
