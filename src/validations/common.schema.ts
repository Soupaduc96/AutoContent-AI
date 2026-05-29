/**
 * Common Validation Schemas
 */

import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const StatusSchema = z.enum(['active', 'inactive', 'archived', 'pending']);

export const PlanSchema = z.enum(['free', 'starter', 'professional', 'enterprise']);
