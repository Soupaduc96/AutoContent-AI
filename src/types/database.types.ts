/**
 * Database Types - Auto-generated from Supabase schema
 * Generated for AutoContent AI SaaS
 */

// Users
export interface User {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  subscription_plan: 'free' | 'starter' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'canceled' | 'past_due';
  created_at: string;
  updated_at: string;
}

export interface UserInsert {
  clerk_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  subscription_plan?: 'free' | 'starter' | 'pro' | 'enterprise';
  subscription_status?: 'active' | 'canceled' | 'past_due';
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  subscription_plan?: 'free' | 'starter' | 'pro' | 'enterprise';
  subscription_status?: 'active' | 'canceled' | 'past_due';
}

// Workspaces
export interface Workspace {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  description: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkspaceInsert {
  user_id: string;
  name: string;
  slug: string;
  description?: string;
  avatar_url?: string;
}

export interface WorkspaceUpdate {
  name?: string;
  slug?: string;
  description?: string;
  avatar_url?: string;
}

// Social Accounts
export interface SocialAccount {
  id: string;
  user_id: string;
  workspace_id: string | null;
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok' | 'youtube';
  account_id: string;
  account_name: string;
  account_username: string | null;
  avatar_url: string | null;
  access_token: string | null;
  refresh_token: string | null;
  token_expires_at: string | null;
  is_connected: boolean;
  last_sync_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialAccountInsert {
  user_id: string;
  workspace_id?: string;
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook' | 'tiktok' | 'youtube';
  account_id: string;
  account_name: string;
  account_username?: string;
  avatar_url?: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
}

export interface SocialAccountUpdate {
  account_name?: string;
  account_username?: string;
  avatar_url?: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  is_connected?: boolean;
  last_sync_at?: string;
}

// Content Posts
export interface ContentPost {
  id: string;
  user_id: string;
  workspace_id: string | null;
  title: string;
  content: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  scheduled_for: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentPostInsert {
  user_id: string;
  workspace_id?: string;
  title: string;
  content: string;
  status?: 'draft' | 'scheduled' | 'published' | 'archived';
  scheduled_for?: string;
}

export interface ContentPostUpdate {
  title?: string;
  content?: string;
  status?: 'draft' | 'scheduled' | 'published' | 'archived';
  scheduled_for?: string;
  published_at?: string;
}

// Content Generations
export interface ContentGeneration {
  id: string;
  user_id: string;
  workspace_id: string | null;
  post_id: string | null;
  prompt: string;
  generated_content: string;
  platform: string | null;
  tone: string | null;
  language: string;
  tokens_used: number | null;
  generation_time_ms: number | null;
  created_at: string;
  updated_at: string;
}

export interface ContentGenerationInsert {
  user_id: string;
  workspace_id?: string;
  post_id?: string;
  prompt: string;
  generated_content: string;
  platform?: string;
  tone?: string;
  language?: string;
  tokens_used?: number;
  generation_time_ms?: number;
}

export interface ContentGenerationUpdate {
  prompt?: string;
  generated_content?: string;
  platform?: string;
  tone?: string;
  language?: string;
  tokens_used?: number;
  generation_time_ms?: number;
}

// Subscriptions
export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan_name: string;
  status: 'active' | 'past_due' | 'canceled' | 'unpaid';
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at: string | null;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionInsert {
  user_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan_name: string;
  status?: 'active' | 'past_due' | 'canceled' | 'unpaid';
  current_period_start?: string;
  current_period_end?: string;
}

export interface SubscriptionUpdate {
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan_name?: string;
  status?: 'active' | 'past_due' | 'canceled' | 'unpaid';
  current_period_start?: string;
  current_period_end?: string;
  cancel_at?: string;
  canceled_at?: string;
}

// Database schema for type safety
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: UserInsert;
        Update: UserUpdate;
      };
      workspaces: {
        Row: Workspace;
        Insert: WorkspaceInsert;
        Update: WorkspaceUpdate;
      };
      social_accounts: {
        Row: SocialAccount;
        Insert: SocialAccountInsert;
        Update: SocialAccountUpdate;
      };
      content_posts: {
        Row: ContentPost;
        Insert: ContentPostInsert;
        Update: ContentPostUpdate;
      };
      content_generations: {
        Row: ContentGeneration;
        Insert: ContentGenerationInsert;
        Update: ContentGenerationUpdate;
      };
      subscriptions: {
        Row: Subscription;
        Insert: SubscriptionInsert;
        Update: SubscriptionUpdate;
      };
    };
  };
}
