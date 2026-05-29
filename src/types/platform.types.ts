/**
 * Platform Types
 * 
 * Types for social media platform connections and account management
 */

export type PlatformName = 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok' | 'youtube';

export interface Platform {
  id: PlatformName;
  name: string;
  icon: string;
  color: string;
  description: string;
  features: string[];
}

export interface SocialAccount {
  id: string;
  userId: string;
  platform: PlatformName;
  accountName: string;
  accountId?: string;
  profileImage?: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  accountMetadata?: Record<string, any>;
  isConnected: boolean;
  connectedAt: Date;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConnectPlatformInput {
  platform: PlatformName;
  accountName: string;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiresAt?: Date;
  accountMetadata?: Record<string, any>;
}

export interface DisconnectPlatformInput {
  platform: PlatformName;
  accountId: string;
}

export interface PlatformConnectionStatus {
  platform: PlatformName;
  isConnected: boolean;
  accountName?: string;
  connectedAt?: Date;
  lastError?: string;
}
