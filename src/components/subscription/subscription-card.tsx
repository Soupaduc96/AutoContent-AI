'use client';

import React, { useState } from 'react';
import { User } from '@/types/user.types';
import { SUBSCRIPTION_TIERS } from '@/constants/subscriptions';
import { Check } from 'lucide-react';

interface SubscriptionCardProps {
  tier: (typeof SUBSCRIPTION_TIERS)[keyof typeof SUBSCRIPTION_TIERS];
  currentPlan: string;
  onUpgrade: (plan: string) => Promise<void>;
  isLoading?: boolean;
}

export function SubscriptionCard({
  tier,
  currentPlan,
  onUpgrade,
  isLoading,
}: SubscriptionCardProps) {
  const isCurrent = currentPlan === tier.id;
  const isEnterprise = tier.id === 'enterprise';

  return (
    <div
      className={`relative rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 ${
        isCurrent
          ? 'border-white bg-white/10'
          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
      }`}
    >
      {isCurrent && (
        <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
          Current Plan
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">${tier.price}</span>
          <span className="text-zinc-400">/month</span>
        </div>
      </div>

      <p className="mb-6 text-sm text-zinc-300">
        Perfect for {tier.id === 'free' ? 'getting started' : tier.id === 'starter' ? 'growing teams' : tier.id === 'professional' ? 'professionals' : 'large organizations'}
      </p>

      <div className="mb-8 space-y-3 border-b border-white/10 pb-8">
        {tier.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
            <span className="text-sm text-zinc-300">{feature}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onUpgrade(tier.id)}
          disabled={isCurrent || isLoading || isEnterprise}
          className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
            isCurrent
              ? 'bg-white/10 text-white cursor-default'
              : isEnterprise
                ? 'bg-white/5 text-zinc-400 cursor-default'
                : 'bg-white text-black hover:bg-white/90'
          }`}
        >
          {isLoading ? 'Upgrading...' : isCurrent ? 'Current Plan' : isEnterprise ? 'Contact Sales' : 'Upgrade'}
        </button>

        {isEnterprise && (
          <a
            href="mailto:sales@autocontent-ai.com"
            className="block rounded-lg border border-white/10 px-4 py-3 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-white/5"
          >
            Contact Sales
          </a>
        )}
      </div>
    </div>
  );
}
