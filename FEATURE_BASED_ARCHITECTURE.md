# Feature-Based Architecture - Refactored Structure

## Overview

AutoContent AI has been refactored from a global folder structure to a **feature-based architecture**. This maximizes scalability, maintainability, and team collaboration.

## Architecture Decision

**Before (Global Structure):**
```
src/
├── components/        # All components
├── services/          # All services
├── types/            # All types
├── validations/      # All schemas
└── app/api/          # All API routes
```

**After (Feature-Based Structure):**
```
src/
├── features/
│   ├── auth/         # Auth feature (components, services, types, etc.)
│   ├── billing/      # Billing feature
│   ├── posts/        # Posts feature
│   └── ...
├── components/ui/    # Global UI library only
├── hooks/            # Global hooks
├── lib/              # Global utilities
├── types/            # Global types
├── validations/      # Global schemas
├── constants/        # Global constants
└── middleware/       # Global middleware
```

## Why Feature-Based?

### Benefits

1. **Scalability** - Each feature is self-contained. Easy to add new features without affecting others
2. **Maintainability** - Related code is colocated. All auth code lives in `/features/auth`
3. **Team Autonomy** - Teams can work on different features independently
4. **Code Splitting** - Features can be code-split and lazy-loaded
5. **Testing** - Each feature is testable in isolation
6. **Clear Ownership** - Each team owns their feature folder
7. **Reduced Merge Conflicts** - Teams work on separate folders

## Feature Structure

Each feature folder contains everything it needs:

```
features/[feature-name]/
├── components/          # Feature-specific React components
├── pages/               # Feature-specific Next.js pages
├── api/                 # Feature-specific API routes
├── services/            # Feature business logic
├── types/               # Feature TypeScript interfaces
├── validations/         # Feature Zod schemas
├── index.ts             # Barrel export (for clean imports)
└── README.md            # Feature documentation
```

### Example: Auth Feature

```
features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── SignUpForm.tsx
│   └── index.ts         # export { LoginForm, SignUpForm }
├── pages/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── forgot-password/page.tsx
├── api/
│   ├── signup/route.ts
│   ├── login/route.ts
│   └── logout/route.ts
├── services/
│   ├── authService.ts
│   └── index.ts
├── types/
│   ├── auth.types.ts
│   └── index.ts
├── validations/
│   ├── auth.schema.ts
│   └── index.ts
├── index.ts
└── README.md
```

## Global Shared Systems

These remain in the root `/src` for cross-feature use:

### `/components/ui` - UI Library
```typescript
// Shadcn UI primitives - shared across all features
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

### `/hooks` - Shared Hooks
```typescript
// Cross-feature utilities
import { useAuth } from '@/hooks';
import { useFetch } from '@/hooks';
```

### `/lib` - Infrastructure
```typescript
// Database clients, utilities, external services
import { supabase } from '@/lib/db';
import { cn } from '@/lib/utils';
```

### `/types` - Global Types
```typescript
// Types used across multiple features
import type { Organization, User } from '@/types';
```

### `/constants` - Global Constants
```typescript
// Routes, config, feature flags
import { ROUTES, CONFIG, FEATURES } from '@/constants';
```

## Import Patterns

### From Global Shared Systems

```typescript
// UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Hooks
import { useAuth } from '@/hooks';

// Utilities
import { cn } from '@/lib/utils';

// Types
import type { User } from '@/types';

// Constants
import { ROUTES } from '@/constants';
```

### From Features

```typescript
// Component from auth feature
import { LoginForm } from '@/features/auth/components';

// All exports from auth feature
import { LoginForm, SignUpForm, authService } from '@/features/auth';

// Service from billing feature
import { billingService } from '@/features/billing/services';

// Types from posts feature
import type { Post } from '@/features/posts/types';
```

## Feature Dependencies

### Allowed (No Circular Dependencies)

```
Feature → Global Shared Systems ✅
Feature A → Feature B Services ✅ (one-way)
Feature → UI Library ✅
Feature → Hooks/Lib ✅
```

### Avoid

```
Circular: Feature A ← → Feature B ❌
Deep imports: @/features/auth/services/deep/path ❌
```

### When Features Need Each Other

Extract to global shared:

```typescript
// ❌ Avoid: Deep dependency
// src/features/billing/services/index.ts
import { userService } from '@/features/settings/services';

// ✅ Better: Use global types
// src/types/user.types.ts - shared by both features
import type { User } from '@/types';
```

## Feature Development Workflow

### Step 1: Create Feature Structure
```bash
mkdir -p src/features/my-feature/{components,pages,api,services,types,validations}
touch src/features/my-feature/README.md
touch src/features/my-feature/index.ts
```

### Step 2: Add Barrel Exports
```typescript
// src/features/my-feature/index.ts
export * from './components';
export * from './services';
export * from './types';
export * from './validations';
```

### Step 3: Implement Feature
1. Define types in `types/`
2. Add validation schemas in `validations/`
3. Create services in `services/`
4. Build components in `components/`
5. Add API routes in `api/`
6. Create pages in `pages/`

## Features Overview

| Feature | Purpose | Status |
|---------|---------|--------|
| **Auth** | User authentication | ✅ Sprint 1 |
| **Onboarding** | Setup wizard | ✅ Sprint 1 |
| **Dashboard** | Main hub | ✅ Sprint 1 |
| **Billing** | Subscriptions & Stripe | ✅ Sprint 1 |
| **Posts** | Content management | ✅ Sprint 1 |
| **Content-Assets** | File management | ✅ Sprint 1 |
| **Agency-Clients** | Client management | ✅ Sprint 1 |
| **Settings** | User/org settings | ✅ Sprint 1 |
| **Social-Accounts** | Social integrations | ⏳ Future |

## Routing Strategy

Features integrate with Next.js App Router through the app directory:

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx          → imports from @/features/auth/pages
│   ├── signup/
│   │   └── page.tsx
│   └── layout.tsx
├── (dashboard)/
│   ├── billing/page.tsx
│   ├── posts/page.tsx
│   ├── settings/page.tsx
│   └── layout.tsx
└── api/
    ├── auth/[...route]/route.ts
    ├── billing/[...route]/route.ts
    └── posts/[...route]/route.ts
```

## API Routes Strategy

Features provide API route handlers that are used in the app directory:

```typescript
// app/api/auth/[...route]/route.ts
import { authApiHandler } from '@/features/auth/api';
export const { GET, POST } = authApiHandler;

// app/api/posts/[...route]/route.ts
import { postsApiHandler } from '@/features/posts/api';
export const { GET, POST, PUT, DELETE } = postsApiHandler;
```

## Migration Path

### For Existing Features

Move to feature-based structure:

```
services/auth → features/auth/services
components/auth → features/auth/components
types/auth.types.ts → features/auth/types
validations/auth.schema.ts → features/auth/validations
```

### Keep Global

```
components/ui → components/ui (unchanged)
hooks → hooks (unchanged)
lib → lib (unchanged)
```

## Best Practices

1. **Keep features independent** - Minimal cross-feature dependencies
2. **Use barrel exports** - Always import from feature `index.ts`
3. **Type everything** - Every feature has its own types
4. **Validate at boundaries** - API routes and service entry points
5. **Colocate related code** - Feature code lives together
6. **Document features** - Each feature has a README.md
7. **One responsibility** - Each feature solves one domain problem

## Scaling to Multiple Teams

When growing to multiple teams, each team can own one or more features:

```
Team 1: Auth, Onboarding
Team 2: Billing, Payments
Team 3: Posts, Content-Assets
Team 4: Agency-Clients, Settings
```

Each team:
- Works independently in their feature folder
- Maintains their own services, components, types
- Contributes shared utilities to global `lib/`, `hooks/`, `types/`
- Minimal merge conflicts with other teams

## Performance Considerations

### Code Splitting

Each feature can be code-split and lazy-loaded:

```typescript
const AuthComponent = dynamic(() => import('@/features/auth/components/LoginForm'));
const BillingComponent = dynamic(() => import('@/features/billing/components/PricingCards'));
```

### Bundle Analysis

```bash
npm run build --analyze
```

Features load only when needed, reducing initial bundle size.

## Testing Strategy

Each feature is independently testable:

```
src/
├── features/
│   └── auth/
│       ├── __tests__/
│       │   ├── auth.test.ts
│       │   ├── components.test.tsx
│       │   └── services.test.ts
│       ├── components/
│       ├── services/
│       └── ...
```

## Documentation Structure

Each feature provides:

- **README.md** - Feature overview, API, usage
- **Type documentation** - In `types/` files
- **Service documentation** - In `services/` files
- **Component documentation** - JSDoc comments

---

**This architecture scales from a solo developer to a 50+ person engineering team while maintaining code quality and development velocity.**
