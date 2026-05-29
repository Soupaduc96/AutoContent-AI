/**
 * Platform Validation Schemas
 * 
 * Zod schemas for platform and social account validation
 */

import { z } from 'zod';

export const PlatformNameSchema = z.enum([
  'twitter',
  'linkedin',
  'instagram',
  'facebook',
  'tiktok',
  'youtube',
]);

export const SocialAccountSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  platform: PlatformNameSchema,
  accountName: z.string().min(1).max(255),
  accountId: z.string().optional(),
  profileImage: z.string().url().optional(),
  isConnected: z.boolean(),
  connectedAt: z.date(),
  lastSyncAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ConnectPlatformSchema = z.object({
  platform: PlatformNameSchema,
  accountName: z.string().min(1).max(255),
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),
  tokenExpiresAt: z.date().optional(),
  accountMetadata: z.record(z.string(), z.any()).optional(),
});

export const DisconnectPlatformSchema = z.object({
  platform: PlatformNameSchema,
  accountId: z.string().uuid(),
});

export type SocialAccountInput = z.infer<typeof SocialAccountSchema>;
export type ConnectPlatformInput = z.infer<typeof ConnectPlatformSchema>;
export type DisconnectPlatformInput = z.infer<typeof DisconnectPlatformSchema>;
