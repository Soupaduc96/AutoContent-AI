# Features Directory - Feature-Based Architecture

## Overview

This directory implements a **feature-based architecture** where each feature (auth, billing, posts, etc.) is self-contained with its own:

- **Components** - Feature-specific UI components
- **Pages** - Feature-specific pages
- **API** - Feature-specific backend routes
- **Services** - Feature-specific business logic
- **Types** - Feature-specific TypeScript interfaces
- **Validations** - Feature-specific Zod schemas

## Structure

```
features/
├── auth/                  # Authentication feature
├── onboarding/           # Onboarding wizard
├── dashboard/            # Main dashboard
├── billing/              # Subscription & payments
├── posts/                # Content management
├── content-assets/       # Asset library
├── social-accounts/      # Social integrations (future)
├── agency-clients/       # Client management
└── settings/             # User settings
```

Each feature folder contains:

```
feature-name/
├── README.md             # Feature documentation
├── components/           # React components
├── pages/                # Next.js pages
├── api/                  # API route handlers
├── services/             # Business logic
├── types/                # TypeScript types
├── validations/          # Zod schemas
└── index.ts              # Barrel export
```

## Benefits of Feature-Based Architecture

1. **Scalability** - Easy to add new features without affecting existing ones
2. **Maintainability** - All related code is in one place
3. **Team Collaboration** - Teams can work on features independently
4. **Code Splitting** - Features can be lazy-loaded
5. **Testing** - Features can be tested in isolation
6. **Organization** - Clear folder structure reduces cognitive load

## Global Shared Systems

These systems are kept globally for cross-feature use:

- **`/components/ui`** - UI library components (Shadcn UI primitives)
- **`/hooks`** - Shared custom hooks (useAuth, useFetch, etc.)
- **`/lib`** - Infrastructure utilities (db, auth, services)
- **`/types`** - Global types shared across features
- **`/validations`** - Global validation schemas (if needed)
- **`/constants`** - Routes, config, feature flags
- **`/middleware`** - Express-like middleware for routes

## Import Patterns

### Importing from Global Shared Systems

```typescript
// UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Hooks
import { useAuth } from '@/hooks';

// Utilities
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/db';

// Types
import type { User } from '@/types';

// Constants
import { ROUTES } from '@/constants';
```

### Importing from Features

```typescript
// Within same feature
import { LoginForm } from '@/features/auth/components';
import { authService } from '@/features/auth/services';

// From another feature
import { PricingCards } from '@/features/billing/components';
```

## Feature Development Workflow

### 1. Create Feature Structure
```bash
mkdir -p src/features/my-feature/{components,pages,api,services,types,validations}
touch src/features/my-feature/README.md
touch src/features/my-feature/index.ts
```

### 2. Add Types
```typescript
// src/features/my-feature/types/index.ts
export interface MyFeatureEntity {
  id: string;
  // ... properties
}
```

### 3. Add Validations
```typescript
// src/features/my-feature/validations/index.ts
import { z } from 'zod';

export const MyFeatureSchema = z.object({
  // ... schema definition
});
```

### 4. Add Services
```typescript
// src/features/my-feature/services/index.ts
export const myFeatureService = {
  async getAll() { /* ... */ },
  async create(data) { /* ... */ },
  // ...
};
```

### 5. Add Components
```typescript
// src/features/my-feature/components/index.ts
export { default as MyComponent } from './MyComponent';
```

### 6. Add API Routes
```typescript
// src/features/my-feature/api/route.ts
export async function GET() { /* ... */ }
export async function POST() { /* ... */ }
```

### 7. Add Pages
```typescript
// src/features/my-feature/pages/page.tsx
export default function Page() { /* ... */ }
```

## Routing Convention

Features are mounted through Next.js App Router:

```typescript
// app/(dashboard)/auth/login/page.tsx
import LoginPage from '@/features/auth/pages/login/page';
export default LoginPage;

// app/(dashboard)/billing/page.tsx
import BillingPage from '@/features/billing/pages/page';
export default BillingPage;
```

Or features can export pages directly that are used in app directory.

## API Routing Convention

```typescript
// app/api/[feature]/route.ts imports from features
// app/api/auth/[...route]/route.ts → uses features/auth/api
```

## Best Practices

1. **Keep features independent** - Minimize cross-feature dependencies
2. **Use barrel exports** - Always export from `index.ts`
3. **Type everything** - No `any` types
4. **Validate at boundaries** - API routes and service entry points
5. **Share utilities through global systems** - Don't duplicate
6. **Document feature README** - Explain feature purpose and API
7. **Test in isolation** - Features should be testable independently

## Feature Dependencies

When features depend on each other:

```typescript
// ✅ Good: Service-level dependency
// src/features/billing/services/index.ts
import { userService } from '@/features/settings/services';

// ✅ Good: Type-level dependency
// src/features/billing/types/index.ts
import type { User } from '@/features/settings/types';

// ❌ Avoid: Deep circular dependencies
// Refactor to use shared types in /types
```

## Migration from Old Structure

Old global services/components → New feature structure:

```
services/auth → features/auth/services
components/auth → features/auth/components
```

Global shared remains in root:

```
components/ui → components/ui (unchanged)
hooks → hooks (unchanged)
lib → lib (unchanged)
```

---

See individual feature README files for detailed documentation.
