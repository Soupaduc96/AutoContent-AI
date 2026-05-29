import { supabaseAdmin } from './index';
import { handleDatabaseError } from './types';
import { getUserByClerkId } from './users';
import {
  SocialAccount,
  PlatformName,
  ConnectPlatformInput,
} from '@/types/platform.types';

export async function getSocialAccounts(
  userId: string
): Promise<SocialAccount[]> {
  try {
    const user = await getUserByClerkId(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const supabase = supabaseAdmin;
    if (!supabase) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    const res: any = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_connected', true)
      .order('created_at', { ascending: false });
    const data = res.data;
    const error = res.error;

    if (error) {
      throw new Error(handleDatabaseError(error));
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      platform: row.platform,
      accountName: row.account_name,
      accountId: row.account_id,
      profileImage: row.avatar_url ?? row.profile_image ?? undefined,
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

export async function getSocialAccountByPlatform(
  userId: string,
  platform: PlatformName
): Promise<SocialAccount | null> {
  try {
    const user = await getUserByClerkId(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const supabase = supabaseAdmin;
    if (!supabase) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    const res: any = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('platform', platform)
      .eq('is_connected', true)
      .single();
    const data = res.data;
    const error = res.error;

    if (error && error.code !== 'PGRST116') {
      throw new Error(handleDatabaseError(error));
    }

    if (!data) return null;

    return {
      id: data.id,
      userId: data.user_id,
      platform: data.platform,
      accountName: data.account_name,
      accountId: data.account_id,
      profileImage: data.avatar_url ?? data.profile_image ?? undefined,
      isConnected: data.is_connected,
      connectedAt: new Date(data.connected_at),
      lastSyncAt: data.last_sync_at
        ? new Date(data.last_sync_at)
        : undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error(`Failed to get ${platform} account:`, error);
    throw error;
  }
}

export async function connectSocialAccount(
  userId: string,
  input: ConnectPlatformInput
): Promise<SocialAccount> {
  try {
    const user = await getUserByClerkId(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const supabase = supabaseAdmin;
    if (!supabase) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');

    const res: any = await supabase
      .from('social_accounts')
      .insert({
        user_id: user.id,
        platform: input.platform,
        account_id: `demo_${input.platform}_${Date.now()}`,
        account_name: input.accountName,
        access_token: input.accessToken,
        refresh_token: input.refreshToken,
        token_expires_at: input.tokenExpiresAt?.toISOString(),
        account_metadata: input.accountMetadata,
        is_connected: true,
      })
      .select()
      .single();
    const data = res.data;
    const error = res.error;

    if (error) {
      throw new Error(handleDatabaseError(error));
    }

    return {
      id: data.id,
      userId: data.user_id,
      platform: data.platform,
      accountName: data.account_name,
      accountId: data.account_id,
      profileImage: data.avatar_url ?? data.profile_image ?? undefined,
      isConnected: data.is_connected,
      connectedAt: new Date(data.connected_at),
      lastSyncAt: data.last_sync_at
        ? new Date(data.last_sync_at)
        : undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  } catch (error) {
    console.error('Failed to connect social account:', error);
    throw error;
  }
}

export async function disconnectSocialAccount(
  userId: string,
  accountId: string
): Promise<boolean> {
  try {
    const user = await getUserByClerkId(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const supabase = supabaseAdmin;
    if (!supabase) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
    const res: any = await supabase
      .from('social_accounts')
      .update({
        is_connected: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId)
      .eq('user_id', user.id);
    const error = res.error;

    if (error) {
      throw new Error(handleDatabaseError(error));
    }

    return true;
  } catch (error) {
    console.error('Failed to disconnect social account:', error);
    throw error;
  }
}