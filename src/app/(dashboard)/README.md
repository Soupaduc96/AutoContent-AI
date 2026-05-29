# Dashboard Routes Structure

## Purpose

Protected routes accessible only to authenticated users.

## Structure

```
app/(dashboard)/
├── dashboard/         # Main dashboard landing page
├── onboarding/        # Step-by-step onboarding
├── billing/           # Billing & subscription management
├── settings/          # User account settings
├── clients/           # Agency client management
├── posts/             # Content post management
└── assets/            # Asset library and storage
```

## Route Organization

Each feature folder can contain:

```
dashboard/
├── page.tsx           # /dashboard
├── layout.tsx         # Shared layout for feature
├── [id]/
│   └── page.tsx       # /dashboard/[id]
└── components/        # Feature-specific components
```

## Layout Pattern

```typescript
// app/(dashboard)/layout.tsx
import { DashboardLayout } from '@/components/dashboard';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
```

## Page Pattern

```typescript
// app/(dashboard)/posts/page.tsx
'use client';

import { PostList } from '@/components/posts';
import { useFetch } from '@/hooks';

export default function PostsPage() {
  const { data: posts, loading } = useFetch('/api/posts');
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Posts</h1>
      <PostList posts={posts || []} />
    </div>
  );
}
```

## Route Guards

Routes should be protected by middleware:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  // Redirect to login if not authenticated
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
```

## Sub-routes Pattern

For detailed views (e.g., editing a specific post):

```typescript
// app/(dashboard)/posts/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useFetch } from '@/hooks';
import { PostEditor } from '@/components/posts';

export default function EditPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const { data: post } = useFetch(`/api/posts/${postId}`);
  
  return <PostEditor initialData={post} />;
}
```

## Onboarding Route

Special handling for first-time users:

```typescript
// app/(dashboard)/onboarding/page.tsx
export default function OnboardingPage() {
  // Renders step-by-step wizard
  // Redirects to dashboard after completion
}
```

## Best Practices

1. **Use route groups** - `(dashboard)` keeps routes organized
2. **Share layouts** - DashboardLayout includes sidebar, nav
3. **Protect all routes** - Use middleware for authentication
4. **Use dynamic routes** - `[id]` for specific resources
5. **Keep pages thin** - Move logic to components/hooks
6. **Handle loading states** - Show loading UI while fetching

## Navigation

```typescript
import Link from 'next/link';
import { ROUTES } from '@/constants';

export function Navigation() {
  return (
    <nav>
      <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
      <Link href={ROUTES.POSTS}>Posts</Link>
      <Link href={ROUTES.BILLING}>Billing</Link>
      <Link href={ROUTES.SETTINGS}>Settings</Link>
    </nav>
  );
}
```
