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
  const supabase: any = createServerClient();
  
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
  const supabase: any = createServerClient();
  
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
 * Get or create user by Clerk ID and user ID
 * If a user with the provided ID doesn't exist, create one with the given clerkId and email
 */
export async function getOrCreateUser(
  userId: string,
  email: string,
  clerkId: string
): Promise<User | null> {
  const supabase: any = createServerClient();

  // Try to find by ID first
  const { data: existingById, error: errById } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (!errById && existingById) {
    return existingById as User;
  }

  // Try to find by clerk_id
  const { data: existingByClerk, error: errByClerk } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();

  if (!errByClerk && existingByClerk) {
    return existingByClerk as User;
  }

  // Create new user with provided id
  const { data: newUser, error: insertError } = await supabase
    .from('users')
    .insert({
      id: userId,
      clerk_id: clerkId,
      email,
      subscription_plan: 'free',
    } as any)
    .select()
    .single();

  if (insertError) {
    console.error('Error creating user in getOrCreateUser:', insertError);
    return null;
  }

  return newUser as User;
}

/**
 * Create or update user
 */
export async function upsertUser(clerkId: string, userData: UserInsert): Promise<User | null> {
  const supabase: any = createServerClient();
  
  const payload = { ...userData } as any;
  delete payload.clerk_id;
  payload.clerk_id = clerkId;

  const { data, error } = await supabase
    .from('users')
    .upsert(payload, {
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
export async function updateUser(
  userId: string,
  updates: { firstName?: string; lastName?: string; profileImage?: string }
): Promise<User | null> {
  const supabase: any = createServerClient();

  const payload: Partial<Record<string, any>> = {};
  if (updates.firstName !== undefined) payload.first_name = updates.firstName;
  if (updates.lastName !== undefined) payload.last_name = updates.lastName;
  if (updates.profileImage !== undefined) payload.profile_image = updates.profileImage;

  const { data, error } = await supabase
    .from('users')
    .update(payload as any)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    return null;
  }

  return data as User;
}

/**
 * Update user subscription plan
 */
export async function updateSubscriptionPlan(
  userId: string,
  plan: 'free' | 'starter' | 'professional' | 'enterprise'
): Promise<User | null> {
  const supabase: any = createServerClient();

  const { data, error } = await supabase
    .from('users')
    .update({ subscription_plan: plan })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating subscription plan:', error);
    return null;
  }

  return data;
}

/**
 * Delete user
 */
export async function deleteUser(userId: string): Promise<boolean> {
  const supabase: any = createServerClient();
  
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