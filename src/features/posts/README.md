# Posts Feature

## Purpose

Content/post management system:
- Create posts
- Edit/delete posts
- Save drafts
- Publish/schedule (future)
- Search and filter
- Analytics (future)

## Structure

```
posts/
├── components/          # Posts UI
│   ├── PostEditor.tsx
│   ├── PostList.tsx
│   ├── PostCard.tsx
│   ├── PostFilters.tsx
│   └── index.ts
├── pages/               # Posts pages
│   ├── page.tsx
│   ├── [id]/page.tsx
│   └── new/page.tsx
├── api/                 # Posts API
│   ├── route.ts         # GET /api/posts, POST /api/posts
│   ├── [id]/route.ts    # GET, PUT, DELETE
│   └── search/route.ts
├── services/            # Posts logic
│   ├── index.ts
│   └── postsService.ts
├── types/               # Posts types
│   ├── index.ts
│   └── post.types.ts
├── validations/         # Posts schemas
│   ├── index.ts
│   └── post.schema.ts
├── README.md            # This file
└── index.ts             # Barrel export
```

## Types

```typescript
export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  organizationId: string;
  title: string;
  content: string;
  status: PostStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export interface PostDraft {
  id: string;
  organizationId: string;
  userId: string;
  content: Partial<Post>;
  savedAt: Date;
}
```

## Services

```typescript
export const postsService = {
  getPosts: async (orgId: string, filters?: PostFilters) => {},
  getPostById: async (postId: string) => {},
  createPost: async (orgId: string, data: PostData) => {},
  updatePost: async (postId: string, data: Partial<PostData>) => {},
  deletePost: async (postId: string) => {},
  saveDraft: async (orgId: string, userId: string, data: DraftData) => {},
};
```

## Components

```typescript
// PostEditor - Create/edit post
export default function PostEditor({ initialData }) {}

// PostList - Display posts
export default function PostList({ posts, onDelete }) {}

// PostCard - Single post display
export default function PostCard({ post }) {}

// PostFilters - Filter posts
export default function PostFilters({ onFilter }) {}
```

## API Routes

```
GET    /api/posts                # List posts
POST   /api/posts                # Create post
GET    /api/posts/:id            # Get post
PUT    /api/posts/:id            # Update post
DELETE /api/posts/:id            # Delete post
GET    /api/posts/search?q=term  # Search posts
```

## Usage

```typescript
import { PostEditor, PostList } from '@/features/posts/components';
import { postsService } from '@/features/posts/services';
import { CreatePostSchema } from '@/features/posts/validations';

// Create post
const data = CreatePostSchema.parse(formData);
await postsService.createPost(orgId, data);

// List posts
const posts = await postsService.getPosts(orgId);
```

## Draft Management

```typescript
// Auto-save drafts
useEffect(() => {
  const timer = setTimeout(async () => {
    await postsService.saveDraft(orgId, userId, content);
  }, 1000); // Debounce

  return () => clearTimeout(timer);
}, [content]);
```

## Feature Flags

```typescript
FEATURES.POSTS = {
  ENABLED: true,
  DRAFT_SUPPORT: true,
  SCHEDULING: false, // Sprint 2
  AI_GENERATION: false, // Phase 2
  PUBLISHING: false, // Phase 3
}
```

## Future Enhancements

- [ ] Scheduling
- [ ] Publishing to platforms
- [ ] Version history
- [ ] Collaboration/comments
- [ ] Analytics
- [ ] AI content generation
- [ ] Templates
