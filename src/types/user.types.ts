/**
 * User Types
 * 
 * Types for user profiles, subscriptions, and preferences
 */

import { Timestamp } from './common.types';

export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise';

export interface User extends Timestamp {
  id: string;
  email: string;
  clerkId: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  subscriptionPlan: SubscriptionPlan;
}

export interface UserProfile extends Timestamp {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  timezone?: string;
  locale?: string;
}

export interface UserPreferences extends Timestamp {
  userId: string;
  emailNotifications: boolean;
  darkMode: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface UserRole {
  userId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
}

export interface SubscriptionTier {
  id: SubscriptionPlan;
  name: string;
  price: number;
  features: string[];
  limits: {
    postsPerMonth: number;
    platforms: number;
    aiGenerations: number;
  };
}
