/**
 * Feature Flags
 * 
 * Sprint 1 foundation features only
 */

export const FEATURES = {
  AUTH: {
    ENABLED: true,
    SIGNUP: true,
    LOGIN: true,
    PASSWORD_RESET: true,
    EMAIL_VERIFICATION: false, // TODO: Sprint 2
    TWO_FACTOR: false, // TODO: Sprint 2
  },
  ONBOARDING: {
    ENABLED: true,
    STEP_BY_STEP: true,
    SKIP_ALLOWED: false,
  },
  DASHBOARD: {
    ENABLED: true,
    ANALYTICS: false, // TODO: Sprint 2+
  },
  BILLING: {
    ENABLED: true,
    STRIPE_INTEGRATION: true,
    SUBSCRIPTION_MANAGEMENT: true,
    USAGE_TRACKING: true,
  },
  POSTS: {
    ENABLED: true,
    DRAFT_SUPPORT: true,
    SCHEDULING: false, // TODO: Sprint 2
    AI_GENERATION: false, // TODO: Phase 2
    PUBLISHING: false, // TODO: Phase 3
  },
  CLIENTS: {
    ENABLED: true,
    INVITATIONS: true,
    SHARING: true,
  },
  ASSETS: {
    ENABLED: true,
    FOLDER_ORGANIZATION: true,
    VERSION_HISTORY: false, // TODO: Sprint 3
  },
} as const;
