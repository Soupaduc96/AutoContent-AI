/**
 * Post Validation Schemas
 */

import { z } from 'zod';
import { StatusSchema } from './common.schema';

export const CreatePostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  content: z.string().min(1, 'Content is required'),
  description: z.string().max(500).optional(),
  status: StatusSchema.default('pending'),
  scheduledFor: z.date().optional(),
  tags: z.array(z.string()).default([]),
});

export const UpdatePostSchema = CreatePostSchema.partial();

export const PostFilterSchema = z.object({
  status: StatusSchema.optional(),
  tags: z.array(z.string()).optional(),
  authorId: z.string().optional(),
});
