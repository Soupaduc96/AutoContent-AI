/**
 * Workspaces Repository
 * Database operations for workspaces table
 */

import { createServerClient } from '@/lib/supabase/client';
import type { Workspace, WorkspaceInsert, WorkspaceUpdate } from '@/types/database.types';

/**
 * Get all workspaces for a user
 */
export async function getUserWorkspaces(userId: string): Promise<Workspace[]> {
  const supabase: any = createServerClient();
  
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching workspaces:', error);
    return [];
  }

  return data || [];
}

/**
 * Get workspace by ID
 */
export async function getWorkspaceById(workspaceId: string): Promise<Workspace | null> {
  const supabase: any = createServerClient();
  
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('id', workspaceId)
    .single();

  if (error) {
    console.error('Error fetching workspace:', error);
    return null;
  }

  return data;
}

/**
 * Get workspace by slug
 */
export async function getWorkspaceBySlug(slug: string, userId: string): Promise<Workspace | null> {
  const supabase: any = createServerClient();
  
  const { data, error } = await supabase
    .from('workspaces')
    .select('*')
    .eq('slug', slug)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching workspace:', error);
    return null;
  }

  return data;
}

/**
 * Create workspace
 */
export async function createWorkspace(workspace: WorkspaceInsert): Promise<Workspace | null> {
  const supabase: any = createServerClient();
  
  const { data, error } = await supabase
    .from('workspaces')
    .insert(workspace)
    .select()
    .single();

  if (error) {
    console.error('Error creating workspace:', error);
    return null;
  }

  return data;
}

/**
 * Update workspace
 */
export async function updateWorkspace(workspaceId: string, updates: WorkspaceUpdate): Promise<Workspace | null> {
  const supabase: any = createServerClient();
  
  const { data, error } = await supabase
    .from('workspaces')
    .update(updates)
    .eq('id', workspaceId)
    .select()
    .single();

  if (error) {
    console.error('Error updating workspace:', error);
    return null;
  }

  return data;
}

/**
 * Delete workspace
 */
export async function deleteWorkspace(workspaceId: string): Promise<boolean> {
  const supabase: any = createServerClient();
  
  const { error } = await supabase
    .from('workspaces')
    .delete()
    .eq('id', workspaceId);

  if (error) {
    console.error('Error deleting workspace:', error);
    return false;
  }

  return true;
}
