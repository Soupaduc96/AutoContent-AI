# Services Directory

## Purpose

Business logic layer that handles data operations and external integrations.

## Architecture

Services act as the bridge between:
- **API Routes** (endpoints that receive requests)
- **Database & External Services** (Supabase, Stripe, etc.)

This separation ensures:
- Reusable business logic
- Easy testing
- Clean API handlers
- Consistent error handling

## Structure

```
services/
├── index.ts           # Barrel export
├── auth/              # Authentication services
├── billing/           # Billing/subscription services
├── users/             # User management services
├── posts/             # Post management services
└── clients/           # Client management services
```

## Usage Example

```typescript
// In API route
import { authService } from '@/services';

export async function POST(req: Request) {
  const data = await req.json();
  const user = await authService.signUp(data.email, data.password);
  return Response.json(user);
}

// In React component
import { postsService } from '@/services';

async function handleCreatePost(data) {
  const post = await postsService.createPost(orgId, data);
  // ...
}
```

## Separation of Concerns

### Service Layer
- Business logic
- Data validation
- Calling external APIs
- Error handling

### API Routes
- Request parsing
- Response formatting
- HTTP status codes
- Authentication checks

### Components
- UI rendering
- User interactions
- Calling services/APIs

## Best Practices

1. Services should be **stateless**
2. All parameters should be explicit (no implicit context)
3. Each service method should have a **single responsibility**
4. Return typed responses
5. Throw meaningful errors
6. Use async/await consistently
