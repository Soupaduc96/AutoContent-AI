# Lib Directory

## Purpose

Low-level utilities and infrastructure code.

## Structure

```
lib/
├── index.ts          # Barrel export
├── utils.ts          # General utilities
├── db/               # Database clients
├── auth/             # Auth utilities
└── services/         # External service integrations
```

## Sub-directories

### `/lib/db`
Supabase client configuration and database utilities.

```typescript
import { db } from '@/lib/db';
// Use database utilities here
```

### `/lib/auth`
Authentication utilities like JWT validation, session verification.

```typescript
import { authUtils } from '@/lib/auth';
const isValid = authUtils.validateToken(token);
```

### `/lib/services`
External service integrations (Stripe, email, file storage).

```typescript
import { externalServices } from '@/lib/services';
await externalServices.sendEmail(email, subject, body);
```

### `/lib/utils.ts`
General utility functions (existing file).

```typescript
import { cn } from '@/lib/utils';
const classes = cn('bg-red-500', isActive && 'opacity-100');
```

## Naming Convention

Utilities are typically exported as objects or functions:

```typescript
// Object with methods
export const dbUtils = {
  query: () => {},
  transaction: () => {},
};

// Named exports
export function formatDate(date: Date) {}
export function parseJSON(str: string) {}
```

## Best Practices

1. Keep utilities **pure** (no side effects)
2. Make functions **reusable**
3. Avoid business logic - that belongs in services
4. Use TypeScript generics for flexibility
5. Add JSDoc comments for complex utilities
6. Keep file size reasonable - split into modules if needed

## Common Patterns

### Array Utilities
```typescript
export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
```

### Type Utilities
```typescript
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
```

### Error Handling
```typescript
export class AppError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}
```
