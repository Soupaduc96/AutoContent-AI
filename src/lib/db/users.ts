/**
 * Users Repository
 * Database operations for users table
 */

import { createServerClient } from '@/lib/supabase/client';
import type { User, UserInsert, UserUpdate } from '@/types/database.types';

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}

/**
 * Create or update user
 */
export async function upsertUser(clerkId: string, userData: UserInsert): Promise<User | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('users')
    .upsert({
      clerk_id: clerkId,
      ...userData,
    }, {
      onConflict: 'clerk_id',
    })
    .select()
    .single();

  if (error) {
    console.error('Error upserting user:', error);
    return null;
  }

  return data;
}

/**
 * Update user
 */
export async function updateUser(userId: string, updates: UserUpdate): Promise<User | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }

  return data;
}

/**
 * Delete user
 */
export async function deleteUser(userId: string): Promise<boolean> {
  const supabase = createServerClient();
  
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }

  return true;
}
