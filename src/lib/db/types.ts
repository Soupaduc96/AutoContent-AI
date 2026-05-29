/**
 * Database Schemas & Types
 * 
 * TypeScript types for Supabase database tables
 */

import { PostgrestError } from '@supabase/supabase-js';
import { SocialAccount, PlatformName } from '@/types/platform.types';

export interface Database {
  public: {
    Tables: {
      social_accounts: {
        Row: {
          id: string;
          user_id: string;
          platform: PlatformName;
          account_name: string;
          account_id?: string;
          profile_image?: string;
          access_token?: string;
          refresh_token?: string;
          token_expires_at?: string;
          account_metadata?: Record<string, any>;
          is_connected: boolean;
          connected_at: string;
          last_sync_at?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          platform: PlatformName;
          account_name: string;
          account_id?: string;
          profile_image?: string;
          access_token?: string;
          refresh_token?: string;
          token_expires_at?: string;
          account_metadata?: Record<string, any>;
          is_connected?: boolean;
        };
        Update: Partial<Database['public']['Tables']['social_accounts']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          email: string;
          clerk_id: string;
          first_name?: string;
          last_name?: string;
          profile_image?: string;
          subscription_plan: 'free' | 'starter' | 'professional' | 'enterprise';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          clerk_id: string;
          first_name?: string;
          last_name?: string;
          profile_image?: string;
          subscription_plan?: 'free';
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
    };
  };
}

/**
 * Type-safe database error handler
 */
export function handleDatabaseError(error: PostgrestError | null): string {
  if (!error) return '';

  // Map common Supabase errors to user-friendly messages
  const errorMap: Record<string, string> = {
    '23505': 'This account is already connected.',
    '23503': 'Invalid reference - user or platform not found.',
    '42P01': 'Database table not found.',
    'PGRST116': 'JWT expired, please log in again.',
  };

  return errorMap[error.code] || error.message || 'An unexpected database error occurred.';
}
