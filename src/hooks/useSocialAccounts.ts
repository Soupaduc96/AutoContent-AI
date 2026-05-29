/**
 * useSocialAccounts Hook
 * 
 * Fetch and manage social media account connections
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { SocialAccount, PlatformName, ConnectPlatformInput } from '@/types/platform.types';
import { useAuth } from './useAuth';

interface UseSocialAccountsReturn {
  accounts: SocialAccount[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  connect: (input: ConnectPlatformInput) => Promise<SocialAccount>;
  disconnect: (accountId: string) => Promise<boolean>;
}

export function useSocialAccounts(): UseSocialAccountsReturn {
  const { userId, isSignedIn } = useAuth();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    if (!userId || !isSignedIn) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/social-accounts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch social accounts');
      }

      const data = await response.json();
      setAccounts(data.accounts || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching social accounts:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId, isSignedIn]);

  // Fetch accounts on mount and when userId changes
  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const connect = useCallback(
    async (input: ConnectPlatformInput): Promise<SocialAccount> => {
      try {
        setError(null);

        const response = await fetch('/api/social-accounts/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to connect social account');
        }

        const data = await response.json();
        const newAccount = data.account;

        // Update local state
        setAccounts((prev) => [newAccount, ...prev]);

        return newAccount;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const disconnect = useCallback(async (accountId: string): Promise<boolean> => {
    try {
      setError(null);

      const response = await fetch('/api/social-accounts/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to disconnect social account');
      }

      // Update local state
      setAccounts((prev) => prev.filter((acc) => acc.id !== accountId));

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    accounts,
    isLoading,
    error,
    refetch: fetchAccounts,
    connect,
    disconnect,
  };
}
