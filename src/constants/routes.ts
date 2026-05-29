/**
 * Route Constants
 */

export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',

  // Dashboard routes
  DASHBOARD: '/dashboard',
  ONBOARDING: '/onboarding',
  BILLING: '/billing',
  SETTINGS: '/settings',
  CLIENTS: '/clients',
  POSTS: '/posts',
  ASSETS: '/assets',

  // API routes
  API: {
    AUTH: '/api/auth',
    USERS: '/api/users',
    POSTS: '/api/posts',
    CLIENTS: '/api/clients',
    BILLING: '/api/billing',
    ASSETS: '/api/assets',
  },
} as const;
