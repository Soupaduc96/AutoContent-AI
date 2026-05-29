'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types/user.types';
import { ProfileSection } from '@/components/profile';
import { SubscriptionSection } from '@/components/subscription';
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const { userId, isSignedIn, isLoaded } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !isSignedIn) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoaded) {
      fetchUser();
    }
  }, [userId, isSignedIn, isLoaded]);

  const handleUpdateProfile = async (updates: { firstName?: string; lastName?: string }) => {
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  const handleUpgradeSubscription = async (plan: string) => {
    try {
      const response = await fetch('/api/users/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade subscription');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upgrade subscription');
      throw err;
    }
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-xl">
            <p className="text-red-400">{error || 'Failed to load user profile'}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Settings</h1>
          <p className="mt-2 text-lg text-zinc-400">
            Manage your account, profile, and subscription
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-xl">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Profile Section */}
        <div className="mb-12">
          <ProfileSection user={user} onUpdate={handleUpdateProfile} />
        </div>

        {/* Subscription Section */}
        <div>
          <SubscriptionSection user={user} onUpgrade={handleUpgradeSubscription} />
        </div>
      </div>
    </main>
  );
}
