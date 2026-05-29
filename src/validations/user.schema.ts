/**
 * User Validation Schemas
 */

import { z } from 'zod';

export const UserProfileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  avatarUrl: z.string().url().optional(),
  timezone: z.string().optional(),
  locale: z.string().optional(),
});

export const UserPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  darkMode: z.boolean().default(false),
  theme: z.enum(['light', 'dark', 'system']).default('system'),
});
