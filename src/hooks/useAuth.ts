/**
 * useAuth Hook
 * 
 * Get current authenticated user from Clerk
 */

'use client';

import { useUser } from '@clerk/nextjs';

export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();

  return {
    user,
    isLoaded,
    isSignedIn,
    userId: user?.id,
  };
}
