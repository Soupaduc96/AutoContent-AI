import React from 'react';
import { Metadata } from 'next';
import { PlatformsList } from '@/components/platforms';

export const metadata: Metadata = {
  title: 'Social Platforms | AutoContent AI',
  description: 'Connect and manage your social media accounts',
};

export default function PlatformsPage() {
  // TODO: Fetch connected accounts from database when Supabase is set up
  const connectedAccounts: any[] = [];

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
        <PlatformsList connectedAccounts={connectedAccounts} />

        {/* Coming Soon Notice */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
          <p className="text-zinc-400">
            <span className="font-medium text-white">OAuth Integration Coming Soon</span>
            <br />
            For now, connect manually using API tokens or test with demo accounts
          </p>
        </div>
      </div>
    </main>
  );
}
