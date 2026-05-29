/**
 * Subscription Tiers
 * 
 * Pricing and feature tiers for AutoContent AI
 */

import { SubscriptionTier } from '@/types/user.types';

export const SUBSCRIPTION_TIERS: Record<string, SubscriptionTier> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Up to 1 social platform',
      '5 AI posts per month',
      'Basic analytics',
      'Email support',
    ],
    limits: {
      postsPerMonth: 5,
      platforms: 1,
      aiGenerations: 5,
    },
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 29,
    features: [
      'Up to 3 social platforms',
      '50 AI posts per month',
      'Advanced analytics',
      'Priority email support',
      'Content calendar',
    ],
    limits: {
      postsPerMonth: 50,
      platforms: 3,
      aiGenerations: 50,
    },
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 99,
    features: [
      'Up to 6 social platforms',
      '200 AI posts per month',
      'Detailed analytics & insights',
      '24/7 phone & email support',
      'Content calendar with scheduling',
      'Team collaboration (up to 3 users)',
      'Custom branding',
    ],
    limits: {
      postsPerMonth: 200,
      platforms: 6,
      aiGenerations: 200,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    features: [
      'Unlimited social platforms',
      'Unlimited AI posts',
      'Real-time analytics & AI insights',
      'Dedicated account manager',
      'Custom integrations',
      'Unlimited team members',
      'Advanced security & compliance',
      'Custom API access',
    ],
    limits: {
      postsPerMonth: Infinity,
      platforms: Infinity,
      aiGenerations: Infinity,
    },
  },
};
