/**
 * Social Accounts Database Operations
 * 
 * CRUD operations for managing social media account connections
 */

import { supabaseClient, supabaseAdmin } from './index';
import { handleDatabaseError } from './types';
import { SocialAccount, PlatformName, ConnectPlatformInput } from '@/types/platform.types';

/**
 * Get all connected social accounts for the current user
 * @param userId - The user's ID
 * @returns Array of connected social accounts
 */
export async function getSocialAccounts(userId: string): Promise<SocialAccount[]> {
  try {
    const { data, error } = await supabaseClient
      .from('social_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_connected', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(handleDatabaseError(error));
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      platform: row.platform,
      accountName: row.account_name,
      accountId: row.account_id,
      profileImage: row.profile_image,
      isConnected: row.is_connected,
      connectedAt: new Date(row.connected_at),
      lastSyncAt: row.last_sync_at ? new Date(row.last_sync_at) : undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));
  } catch (error) {
    console.error('Failed to get social accounts:', error);
    throw error;
  }
}

/**
 * Get a specific social account by platform
 * @param userId - The user's ID
 * @param platform - The platform name
 * @returns Social account or null if not found
 */
export async function getSocialAccountByPlatform(
  userId: string,
  platform: PlatformName
): Promise<SocialAccount | null> {
  try {
    const { data, error } = await supabaseClient
      .from('social_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('platform', platform)
      .eq('is_connected', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found (expected case)
      throw new Error(handleDatabaseError(error));
    }

    if (!data) return null;

    return {
      id: data.id,
      userId: data.user_id,
      platform: data.platform,
      accountName: data.account_name,
      accountId: data.account_id,
      profileImage: data.profile_image,
      isConnected: data.is_connected,
      connectedAt: new Date(data.connected_at),
      lastSyncAt: data.last_sync_at ? new Date(data.last_sync_at) : undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error(`Failed to get ${platform} account:`, error);
    throw error;
  }
}

/**
 * Connect a new social account
 * @param userId - The user's ID
 * @param input - Connection details
 * @returns Created social account
 */
export async function connectSocialAccount(
  userId: string,
  input: ConnectPlatformInput
): Promise<SocialAccount> {
  try {
    const { data, error } = await supabaseClient
      .from('social_accounts')
      .insert({
        user_id: userId,
        platform: input.platform,
        account_name: input.accountName,
        access_token: input.accessToken,
        refresh_token: input.refreshToken,
        token_expires_at: input.tokenExpiresAt?.toISOString(),
        account_metadata: input.accountMetadata,
        is_connected: true,
      })
      .select()
      .single();

    if (error) {
      throw new Error(handleDatabaseError(error));
    }

    return {
      id: data.id,
      userId: data.user_id,
      platform: data.platform,
      accountName: data.account_name,
      accountId: data.account_id,
      profileImage: data.profile_image,
      isConnected: data.is_connected,
      connectedAt: new Date(data.connected_at),
      lastSyncAt: data.last_sync_at ? new Date(data.last_sync_at) : undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error('Failed to connect social account:', error);
    throw error;
  }
}

/**
 * Disconnect a social account
 * @param userId - The user's ID
 * @param accountId - The social account ID
 * @returns Success status
 */
export async function disconnectSocialAccount(userId: string, accountId: string): Promise<boolean> {
  try {
    const { error } = await supabaseClient
      .from('social_accounts')
      .update({ is_connected: false, updated_at: new Date().toISOString() })
      .eq('id', accountId)
      .eq('user_id', userId);

    if (error) {
      throw new Error(handleDatabaseError(error));
    }

    return true;
  } catch (error) {
    console.error('Failed to disconnect social account:', error);
    throw error;
  }
}

/**
 * Update social account tokens (for refresh token flow)
 * @param accountId - The social account ID
 * @param accessToken - New access token
 * @param refreshToken - New refresh token
 * @param tokenExpiresAt - Token expiration time
 * @returns Updated social account
 */
export async function updateSocialAccountTokens(
  accountId: string,
  accessToken: string,
  refreshToken?: string,
  tokenExpiresAt?: Date
): Promise<SocialAccount> {
  try {
    const { data, error } = await supabaseClient
      .from('social_accounts')
      .update({
        access_token: accessToken,
        ...(refreshToken && { refresh_token: refreshToken }),
        ...(tokenExpiresAt && { token_expires_at: tokenExpiresAt.toISOString() }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId)
      .select()
      .single();

    if (error) {
      throw new Error(handleDatabaseError(error));
    }

    return {
      id: data.id,
      userId: data.user_id,
      platform: data.platform,
      accountName: data.account_name,
      accountId: data.account_id,
      profileImage: data.profile_image,
      isConnected: data.is_connected,
      connectedAt: new Date(data.connected_at),
      lastSyncAt: data.last_sync_at ? new Date(data.last_sync_at) : undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error('Failed to update social account tokens:', error);
    throw error;
  }
}

/**
 * Update last sync timestamp (called after syncing posts)
 * @param accountId - The social account ID
 * @returns Success status
 */
export async function updateLastSyncAt(accountId: string): Promise<boolean> {
  try {
    const { error } = await supabaseClient
      .from('social_accounts')
      .update({
        last_sync_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId);

    if (error) {
      throw new Error(handleDatabaseError(error));
    }

    return true;
  } catch (error) {
    console.error('Failed to update last sync timestamp:', error);
    throw error;
  }
}
