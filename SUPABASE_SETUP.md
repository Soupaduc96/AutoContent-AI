# Supabase Database Setup Guide

This document explains how to set up the Supabase database for AutoContent AI.

## Prerequisites

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Note your project credentials

## Step 1: Add Supabase Environment Variables

Add these variables to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Where to find these:
1. Go to https://supabase.com and log in
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - `NEXT_PUBLIC_SUPABASE_URL` from the URL field
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` from "anon public" key
   - `SUPABASE_SERVICE_ROLE_KEY` from "service_role secret" key

## Step 2: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire SQL from `migrations/001_create_social_accounts_schema.sql`
4. Paste it into the query editor
5. Click **Run**

## Step 3: Verify Tables Were Created

1. Go to **Table Editor**
2. You should see:
   - `users` table
   - `social_accounts` table

## Step 4: Enable Real-Time (Optional)

If you want real-time subscriptions to database changes:

1. In Supabase dashboard, go to **Database** → **Replication**
2. Under "Publication 'supabase_realtime'", toggle on:
   - `public` schema
   - `social_accounts` table
   - `users` table

## Step 5: Test the Connection

Run the dev server and navigate to:
```
http://localhost:3000/dashboard/platforms
```

The page should load without database errors.

## Tables Overview

### users
Extends Clerk authentication with additional profile data.

Columns:
- `id` - UUID from Clerk (primary key)
- `email` - User email
- `clerk_id` - Clerk user ID
- `first_name` - User's first name
- `last_name` - User's last name
- `profile_image` - URL to profile picture
- `subscription_plan` - Current plan (free, starter, professional, enterprise)
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### social_accounts
Stores connected social media accounts for each user.

Columns:
- `id` - Unique identifier (UUID)
- `user_id` - Reference to users table (UUID)
- `platform` - Social platform (twitter, linkedin, instagram, facebook, tiktok, youtube)
- `account_name` - Display name of the social account
- `account_id` - Platform-specific account ID
- `profile_image` - Platform profile picture URL
- `access_token` - OAuth access token (encrypted in production)
- `refresh_token` - OAuth refresh token (encrypted in production)
- `token_expires_at` - When the access token expires
- `account_metadata` - Additional platform-specific data (JSON)
- `is_connected` - Whether the account is currently connected
- `connected_at` - When the account was connected
- `last_sync_at` - When posts were last synced
- `created_at` - Record creation timestamp
- `updated_at` - Last update timestamp

## Row Level Security (RLS)

All tables have RLS enabled. Users can only see and modify their own data.

## Environment Variables Summary

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Clerk (already configured)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## Troubleshooting

### "Missing Supabase environment variables"
- Ensure all three Supabase variables are in `.env.local`
- Restart the dev server after adding variables

### "RLS policy violation"
- Ensure you're logged in with Clerk
- Check that user exists in the `users` table
- Verify RLS policies are correctly applied

### "Table does not exist"
- Re-run the SQL migration
- Check the table name (case-sensitive)
- Verify you're using the correct Supabase project

## Next Steps

Once database is set up:
1. Test the Platforms page at `/dashboard/platforms`
2. Test connecting/disconnecting social accounts
3. Proceed to **Step 3: User Tables**
