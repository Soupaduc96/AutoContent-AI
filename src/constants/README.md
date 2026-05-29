# Constants Directory

## Purpose

Centralized configuration and constant values used throughout the application.

## Structure

```
constants/
├── index.ts              # Barrel export
├── routes.ts             # All route paths
├── config.ts             # Application configuration
└── feature-flags.ts      # Feature flags for Sprint 1
```

## Usage

```typescript
import { ROUTES, CONFIG, FEATURES } from '@/constants';

// Routes
const loginUrl = ROUTES.LOGIN;
const dashboardUrl = ROUTES.DASHBOARD;

// Config
const maxFileSize = CONFIG.file.maxSize;
const apiTimeout = CONFIG.api.timeout;

// Feature flags
if (FEATURES.BILLING.ENABLED) {
  // Show billing UI
}
```

## Routes File

Centralized route definitions prevent broken links:

```typescript
export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  // ...
  API: {
    AUTH: '/api/auth',
    POSTS: '/api/posts',
    // ...
  }
};
```

## Config File

Application-wide settings:

```typescript
export const CONFIG = {
  app: { name, description, version },
  api: { timeout, retries },
  pagination: { defaultLimit, maxLimit },
  file: { maxSize, allowedTypes },
  features: { /* feature availability */ }
};
```

## Feature Flags File

Sprint 1 focuses on foundation features only:

```typescript
export const FEATURES = {
  AUTH: { ENABLED: true, SIGNUP: true, ... },
  BILLING: { ENABLED: true, ... },
  ANALYTICS: { ENABLED: false }, // Future
  AI: { ENABLED: false }, // Future
};
```

## Best Practices

1. **Keep consistent naming** - Use UPPER_SNAKE_CASE
2. **Group related values** - Use nested objects
3. **Make values immutable** - Use `as const`
4. **Document future items** - Mark with TODO/Sprint info
5. **Use barrel exports** - Import from `@/constants`
6. **Avoid duplicates** - Define once, use everywhere

## When to Add Constants

✅ Do add to constants:
- Route paths
- API endpoints
- Configuration values
- Limits and thresholds
- Status/state enums
- Feature flags

❌ Don't add to constants:
- Dynamic values
- User-specific data
- Environment-specific secrets
- Component props
