/**
 * Application Configuration
 */

export const CONFIG = {
  app: {
    name: 'AutoContent AI',
    description: 'Production-grade SaaS for content management',
    version: '1.0.0',
  },
  api: {
    timeout: 30000,
    retries: 3,
  },
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
  file: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'],
  },
  features: {
    enableFeatureFlags: true,
    enableAnalytics: false, // Sprint 1 - disabled
    enableAI: false, // Sprint 1 - disabled
  },
} as const;
