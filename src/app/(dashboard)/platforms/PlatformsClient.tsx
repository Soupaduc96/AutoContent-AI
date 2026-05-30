'use client';

import React, { useEffect, useState } from 'react';
import { PlatformsList } from '@/components/platforms';
import { SocialAccount, PlatformName } from '@/types/platform.types';

type Toast = { id: string; type: 'success' | 'error'; message: string };

export default function PlatformsClient() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: Toast['type'], message: string) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 6);
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/social-accounts', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch accounts');
      const data = await res.json();
      setAccounts(data.accounts || []);
    } catch (err) {
      addToast('error', err instanceof Error ? err.message : 'Failed to fetch accounts');
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);
const ha
  ndleConnect = async (platform: PlatformName) => {
    setLoadingMap((m) => ({ ...m, [platform]: true }));
    try {
      const payload = {
        platform,
        accountName: `${platform} Demo Account`,
        accessToken: 'demo-token',
      };

      const res = await fetch('/api/social-accounts/connect', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || res.statusText || 'Failed to connect');
      }

      addToast('success', `${platform} connected`);
      await fetchAccounts();
    } catch (err) {
      addToast('error', err instanceof Error ? err.message : 'Connect failed');
    } finally {
      setLoadingMap((m) => ({ ...m, [platform]: false }));
    }
  };

  const handleConnect = async (platform: PlatformName) => {
  // LinkedIn OAuth
  if (platform === 'linkedin') {
    window.location.href = '/api/oauth/linkedin/start';
    return;
  }

  setLoadingMap((m) => ({ ...m, [platform]: true }));

  try {
    const payload = {
      platform,
      accountName: `${platform} Demo Account`,
      accessToken: 'demo-token',
    };

    const res = await fetch('/api/social-accounts/connect', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));

      throw new Error(
        err.error ||
        res.statusText ||
        'Failed to connect'
      );
    }

    addToast(
      'success',
      `${platform} connected`
    );

    await fetchAccounts();
  } catch (err) {
    addToast(
      'error',
      err instanceof Error
        ? err.message
        : 'Connect failed'
    );
  } finally {
    setLoadingMap((m) => ({
      ...m,
      [platform]: false,
    }));
  }
};
    setLoadingMap((m) => ({ ...m, [platform]: true }));
    try {
      const res = await fetch('/api/social-accounts/disconnect', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || res.statusText || 'Failed to disconnect');
      }

      addToast('success', `${platform} disconnected`);
      await fetchAccounts();
    } catch (err) {
      addToast('error', err instanceof Error ? err.message : 'Disconnect failed');
    } finally {
      setLoadingMap((m) => ({ ...m, [platform]: false }));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white">Social Platforms</h1>
          <p className="mt-2 text-lg text-zinc-400">
            Connect your social media accounts to start auto-posting AI-generated content
          </p>
        </div>

        {/* Connection Tips */}
        <div className="mb-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-6 backdrop-blur-xl">
          <h3 className="font-medium text-blue-400">💡 Getting Started</h3>
          <p className="mt-2 text-sm text-blue-200">
            Connect at least one social platform to begin scheduling AI-generated content. Each platform
            requires specific permissions to post on your behalf.
          </p>
        </div>

        {/* Platforms Grid */}
        <PlatformsList
          connectedAccounts={accounts}
          onConnect={(platform) => handleConnect(platform)}
          onDisconnect={(platform, accountId) => handleDisconnect(platform, accountId)}
        />

        {/* Toasts */}
        <div className="fixed right-6 top-6 z-50 flex flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`rounded-md px-4 py-2 text-sm ${t.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
              {t.message}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
