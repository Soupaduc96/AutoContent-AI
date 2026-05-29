'use client';

import React, { useState } from 'react';
import { Platform, PlatformName, SocialAccount } from '@/types/platform.types';
import { PlatformCard } from './platform-card';

const AVAILABLE_PLATFORMS: Platform[] = [
  {
    id: 'twitter',
    name: 'Twitter / X',
    icon: 'twitter',
    color: '#1DA1F2',
    description: 'Share posts, engage with followers, and grow your audience',
    features: ['Posts', 'Retweets', 'Replies', 'Analytics'],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'linkedin',
    color: '#0A66C2',
    description: 'Professional networking and B2B content distribution',
    features: ['Posts', 'Articles', 'Updates', 'Comments'],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'instagram',
    color: '#E1306C',
    description: 'Visual content, stories, and community engagement',
    features: ['Posts', 'Stories', 'Reels', 'DMs'],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    description: 'Community building and content sharing',
    features: ['Posts', 'Pages', 'Groups', 'Events'],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'tiktok',
    color: '#000000',
    description: 'Short-form video content and viral marketing',
    features: ['Videos', 'Sounds', 'Effects', 'Trends'],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    description: 'Long-form video content and audience monetization',
    features: ['Videos', 'Shorts', 'Community', 'Premieres'],
  },
];

interface PlatformsListProps {
  connectedAccounts?: SocialAccount[];
  onConnect?: (platform: PlatformName) => void;
  onDisconnect?: (platform: PlatformName, accountId: string) => void;
}

export function PlatformsList({
  connectedAccounts = [],
  onConnect,
  onDisconnect,
}: PlatformsListProps) {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const getConnectedAccount = (platform: PlatformName) => {
    return connectedAccounts.find((acc) => acc.platform === platform);
  };

  const handleConnect = async (platform: PlatformName) => {
    setLoadingStates((prev) => ({ ...prev, [platform]: true }));
    try {
      await onConnect?.(platform);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [platform]: false }));
    }
  };

  const handleDisconnect = async (platform: PlatformName, accountId: string) => {
    setLoadingStates((prev) => ({ ...prev, [platform]: true }));
    try {
      await onDisconnect?.(platform, accountId);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {AVAILABLE_PLATFORMS.map((platform) => {
        const connected = getConnectedAccount(platform.id);
        return (
          <PlatformCard
            key={platform.id}
            platform={platform}
            isConnected={!!connected}
            accountName={connected?.accountName}
            onConnect={() => handleConnect(platform.id)}
            onDisconnect={() => handleDisconnect(platform.id, connected?.id || '')}
            isLoading={loadingStates[platform.id]}
          />
        );
      })}
    </div>
  );
}
