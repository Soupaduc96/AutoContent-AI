# Auth Feature

## Purpose

Handles all authentication-related functionality including:
- User signup/registration
- User login/sign-in
- Password reset/recovery
- Session management
- JWT token handling
- Auth guards and middleware

## Structure

```
auth/
├── components/          # Auth UI components
│   ├── LoginForm.tsx
│   ├── SignUpForm.tsx
│   ├── PasswordResetForm.tsx
│   └── index.ts
├── pages/               # Auth pages
│   ├── login/
│   ├── signup/
│   └── forgot-password/
├── api/                 # Auth API routes
│   ├── signup/route.ts
│   ├── login/route.ts
│   ├── logout/route.ts
│   └── reset-password/route.ts
├── services/            # Auth business logic
│   ├── index.ts
│   └── authService.ts
├── types/               # Auth types
│   ├── index.ts
│   └── auth.types.ts
├── validations/         # Auth Zod schemas
│   ├── index.ts
│   └── auth.schema.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Types

```typescript
// types/auth.types.ts
export interface AuthUser {
  id: string;
  email: string;
  displayName?: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  displayName?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}
```

## Services

```typescript
// services/index.ts
export const authService = {
  signUp: async (email: string, password: string) => {},
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
  resetPassword: async (email: string) => {},
  getCurrentUser: async () => {},
};
```

## Components

```typescript
// components/LoginForm.tsx
export default function LoginForm() {
  // Login form UI
}

// components/SignUpForm.tsx
export default function SignUpForm() {
  // Signup form UI
}

// components/PasswordResetForm.tsx
export default function PasswordResetForm() {
  // Password reset UI
}
```

## API Routes

```
POST   /api/auth/signup           # Create new account
POST   /api/auth/login            # Authenticate user
POST   /api/auth/logout           # End session
POST   /api/auth/reset-password   # Send reset email
```

## Usage

### Sign Up

```typescript
import { authService } from '@/features/auth/services';
import { SignUpSchema } from '@/features/auth/validations';

const data = SignUpSchema.parse(formData);
await authService.signUp(data.email, data.password);
```

### Login

```typescript
import { useAuth } from '@/hooks';

const { login } = useAuth();
await login(email, password);
```

### Protected Routes

Use middleware to protect auth routes:

```typescript
// middleware.ts
import { getCurrentUser } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
```

## Integration Points

- **Global Hooks** - `useAuth()` provides auth state
- **Global Lib** - `@/lib/auth` has utilities
- **Global Types** - Auth types exported to `/types`
- **Global Middleware** - Auth checks in main middleware

## Future Enhancements

- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Social OAuth (Google, GitHub)
- [ ] Session timeout
- [ ] Device management
