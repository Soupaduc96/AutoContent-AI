'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import {
  Hash,
  Briefcase,
  Camera,
  Share2,
  Music,
  Video,
  Loader2,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { Platform, PlatformName } from '@/types/platform.types';

interface PlatformCardProps {
  platform: Platform;
  isConnected: boolean;
  accountName?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  isLoading?: boolean;
}

const platformIcons: Record<PlatformName, ReactNode> = {
  twitter: <Hash className="h-8 w-8" />,
  linkedin: <Briefcase className="h-8 w-8" />,
  instagram: <Camera className="h-8 w-8" />,
  facebook: <Share2 className="h-8 w-8" />,
  tiktok: <Music className="h-8 w-8" />,
  youtube: <Video className="h-8 w-8" />,
};

export function PlatformCard({
  platform,
  isConnected,
  accountName,
  onConnect,
  onDisconnect,
  isLoading,
}: PlatformCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10">
      {/* Status Badge */}
      <div className="absolute right-4 top-4">
        {isConnected ? (
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-500">
              Connected
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-zinc-500/20 px-3 py-1">
            <Circle className="h-4 w-4 text-zinc-500" />
            <span className="text-xs font-medium text-zinc-500">
              Not Connected
            </span>
          </div>
        )}
      </div>

      {/* Platform Icon & Info */}
      <div className="flex items-start gap-4">
        <div
          className="rounded-xl p-3 text-white transition-all duration-300"
          style={{ backgroundColor: `${platform.color}20` }}
        >
          <div style={{ color: platform.color }}>
            {platformIcons[platform.id as PlatformName]}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            {platform.name}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {platform.description}
          </p>

          {isConnected && accountName && (
            <p className="mt-2 text-sm text-zinc-300">
              <span className="text-zinc-500">Account:</span> {accountName}
            </p>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="mt-4 flex flex-wrap gap-2">
        {platform.features.map((feature) => (
          <span
            key={feature}
            className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-300"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        {isConnected ? (
          <>
            <button className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10">
              Manage
            </button>

            <button
              onClick={() => setShowConfirm(true)}
              disabled={isLoading}
              className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 hover:bg-red-500/20 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Disconnect'
              )}
            </button>
          </>
        ) : (
          <button
            onClick={onConnect}
            disabled={isLoading}
            className="w-full rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting...
              </div>
            ) : (
              'Connect'
            )}
          </button>
        )}
      </div>

      {/* Disconnect Confirmation */}
      {showConfirm && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/80 backdrop-blur-sm">
          <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 text-center">
            <p className="text-sm text-zinc-300">
              Disconnect{' '}
              <span className="font-medium text-white">
                {platform.name}
              </span>
              ?
            </p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDisconnect();
                  setShowConfirm(false);
                }}
                className="flex-1 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}