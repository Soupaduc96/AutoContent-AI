'use client';

import React, { useState } from 'react';
import { User } from '@/types/user.types';
import { SUBSCRIPTION_TIERS } from '@/constants/subscriptions';
import { SubscriptionCard } from './subscription-card';

interface SubscriptionSectionProps {
  user: User;
  onUpgrade?: (plan: string) => Promise<void>;
}

export function SubscriptionSection({ user, onUpgrade }: SubscriptionSectionProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async (plan: string) => {
    if (onUpgrade) {
      setIsLoading(true);
      try {
        await onUpgrade(plan);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-white">Subscription & Billing</h2>
      <p className="mb-8 text-zinc-400">
        Upgrade your plan to unlock more features and increase your limits
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.values(SUBSCRIPTION_TIERS).map((tier) => (
          <SubscriptionCard
            key={tier.id}
            tier={tier}
            currentPlan={user.subscriptionPlan}
            onUpgrade={handleUpgrade}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
