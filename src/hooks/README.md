# Hooks Directory

## Purpose

Reusable React hooks for common patterns like authentication, data fetching, and state management.

## Available Hooks

### `useAuth()`
Authentication context and utilities.

```typescript
const { user, loading, isAuthenticated, login, logout, signUp } = useAuth();
```

### `useFetch<T>()`
Generic data fetching hook with loading/error states.

```typescript
const { data, loading, error, refetch } = useFetch<Post[]>('/api/posts');
```

### `useLocalStorage<T>()`
Synced state with browser localStorage.

```typescript
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### `useDebounce<T>()`
Debounce values for search inputs and API calls.

```typescript
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  // Only called after 500ms of inactivity
  searchPosts(debouncedSearchTerm);
}, [debouncedSearchTerm]);
```

## Structure

```
hooks/
├── index.ts               # Barrel export
├── useAuth.ts
├── useFetch.ts
├── useLocalStorage.ts
└── useDebounce.ts
```

## Usage

```typescript
'use client';

import { useAuth, useFetch, useDebounce } from '@/hooks';

export default function MyComponent() {
  const { user } = useAuth();
  const { data: posts } = useFetch('/api/posts');
  
  return (
    <div>
      {user && <p>Welcome {user.displayName}</p>}
    </div>
  );
}
```

## Best Practices

1. Hooks should be in `'use client'` components
2. Use TypeScript for hook return types
3. Follow React hooks rules (hooks at top level)
4. Memoize callback dependencies
5. Clean up side effects (subscriptions, timers)

## Creating New Hooks

Follow this pattern:

```typescript
'use client';

import { useState, useEffect } from 'react';

export function useMyHook() {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Side effects here
  }, []);
  
  return { state };
}
```
