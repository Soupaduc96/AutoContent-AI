# Types Directory

## Purpose

Centralized TypeScript interfaces and types organized by feature domain.

## Structure

```
types/
├── index.ts              # Barrel export
├── common.types.ts       # Shared types
├── auth.types.ts         # Auth-related types
├── user.types.ts         # User profile types
├── billing.types.ts      # Billing/subscription types
├── post.types.ts         # Post types
├── client.types.ts       # Client types
└── asset.types.ts        # Asset types
```

## Usage

```typescript
// Import from barrel
import { Post, User, Subscription } from '@/types';

// Or specific imports
import type { Post } from '@/types/post.types';
```

## Best Practices

1. Keep interfaces focused and single-responsibility
2. Use `readonly` for immutable properties
3. Extend common types for shared properties
4. Export only public types
5. Use discriminated unions for different states
