# Validations Directory

## Purpose

Zod schemas for runtime input validation across the application.

## Structure

```
validations/
├── index.ts           # Barrel export
├── common.schema.ts   # Shared schemas
├── auth.schema.ts     # Auth validation schemas
├── user.schema.ts     # User validation schemas
├── post.schema.ts     # Post validation schemas
└── client.schema.ts   # Client validation schemas
```

## Usage

### In API Routes

```typescript
import { SignUpSchema } from '@/validations';

export async function POST(req: Request) {
  const data = await req.json();
  
  try {
    const validated = SignUpSchema.parse(data);
    // Process validated data
  } catch (error) {
    return Response.json({ error: 'Invalid input' }, { status: 400 });
  }
}
```

### In Services

```typescript
import { CreatePostSchema } from '@/validations';

export const postsService = {
  createPost: async (data: unknown) => {
    const validated = CreatePostSchema.parse(data);
    // Safe to use validated data
  }
};
```

### In React Components

```typescript
import { UserProfileSchema } from '@/validations';

async function handleProfileUpdate(formData) {
  try {
    const validated = UserProfileSchema.parse(formData);
    await updateProfile(validated);
  } catch (error) {
    setError(error.message);
  }
}
```

## Schema Patterns

### Basic Validation

```typescript
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

### Optional Fields

```typescript
export const ProfileSchema = z.object({
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.string().url().optional(),
});
```

### Partial Updates

```typescript
export const UpdatePostSchema = CreatePostSchema.partial();
```

### Enums

```typescript
export const PostStatusSchema = z.enum(['draft', 'published', 'archived']);
```

## Best Practices

1. Keep schemas close to their usage
2. Reuse common schemas (StatusSchema, PlanSchema)
3. Use descriptive error messages
4. Validate at API boundary
5. Use `.refine()` for complex validations
6. Consider using `.superRefine()` for multiple errors

## Error Handling

```typescript
try {
  const data = MySchema.parse(input);
} catch (error) {
  if (error instanceof z.ZodError) {
    // Handle validation errors
    console.log(error.errors); // Array of validation errors
  }
}
```
