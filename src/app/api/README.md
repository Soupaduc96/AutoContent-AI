# API Routes Structure

## Purpose

Backend API endpoints organized by feature domain.

## Structure

```
app/api/
├── auth/              # Authentication endpoints
├── users/             # User profile endpoints
├── billing/           # Billing/subscription endpoints
├── posts/             # Post CRUD endpoints
├── clients/           # Client management endpoints
└── assets/            # Asset upload/retrieval endpoints
```

## Routing Pattern

Each feature folder contains route handlers:

```
api/posts/
├── route.ts           # GET /api/posts, POST /api/posts
├── [id]/
│   └── route.ts       # GET /api/posts/[id], PUT, DELETE
└── search/
    └── route.ts       # GET /api/posts/search
```

## Route Handler Pattern

```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { postsService } from '@/services';
import { CreatePostSchema } from '@/validations';

export async function GET(req: NextRequest) {
  try {
    const posts = await postsService.getPosts();
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validated = CreatePostSchema.parse(data);
    const post = await postsService.createPost(validated);
    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

## Authentication Pattern

```typescript
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Proceed with authenticated operation
}
```

## Response Format

Consistent response structure:

```typescript
// Success
{ success: true, data: { /* data */ } }

// Error
{ success: false, error: 'Error message' }

// Paginated
{
  success: true,
  data: [ /* items */ ],
  pagination: { total: 100, page: 1, limit: 10, pages: 10 }
}
```

## Error Handling

```typescript
export async function GET(req: NextRequest) {
  try {
    // Operation
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { success: false, error: 'Resource not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Best Practices

1. **Always validate input** with Zod schemas
2. **Check authentication** for protected endpoints
3. **Use consistent response format**
4. **Include proper status codes** (201 for creation, 204 for deletion)
5. **Handle errors gracefully**
6. **Use services layer** - never call DB directly
7. **Protect multi-tenant data** with organizationId checks
