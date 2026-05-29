# Components Directory

## Purpose

Reusable React components organized by feature domain.

## Structure

```
components/
├── ui/                # Shadcn UI components (pre-built)
├── auth/              # Auth components
├── dashboard/         # Dashboard layout and shared components
├── onboarding/        # Onboarding flow components
├── billing/           # Billing/pricing components
├── posts/             # Post management components
└── clients/           # Client management components
```

## UI vs Feature Components

### `/ui` - UI Library
Pre-built, framework components from Shadcn UI.
- Button, Input, Card, Dialog, etc.
- Reusable across entire app
- No business logic

### Feature Folders
Domain-specific components that use UI components.
- LoginForm (uses Input, Button from ui/)
- PostEditor (uses Textarea, Button from ui/)
- ClientList (uses Table, Button from ui/)

## Naming Conventions

- Use PascalCase for component names
- Use descriptive names: `PostEditorForm`, not `Form1`
- Suffixes help identify type: `Button`, `Card`, `Modal`, etc.

## Component Structure

```typescript
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Props {
  title: string;
  onSubmit: (data: any) => void;
}

export default function MyComponent({ title, onSubmit }: Props) {
  return (
    <Card>
      <h1>{title}</h1>
      <Button onClick={() => onSubmit({})}>Submit</Button>
    </Card>
  );
}
```

## Best Practices

1. Components should be **presentational** - avoid business logic
2. Use `'use client'` for interactivity
3. Props should be explicitly typed
4. Keep components small and focused
5. Use composition over inheritance
6. Avoid prop drilling - use context for shared state

## Re-exporting from Index Files

Each feature folder has an `index.ts` for convenience:

```typescript
// Instead of:
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';

// Do this:
import { LoginForm, SignUpForm } from '@/components/auth';
```
