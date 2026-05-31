/**
 * Temporary Auth Hook
 * Clerk disabled for deployment testing
 */

'use client';

export function useAuth() {
  return {
    user: {
      id: 'demo-user',
      firstName: 'Paul',
      lastName: 'Souffrant',
    },
    isLoaded: true,
    isSignedIn: true,
    userId: 'demo-user',
  };
}