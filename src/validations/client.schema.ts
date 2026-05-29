/**
 * Client Validation Schemas
 */

import { z } from 'zod';
import { StatusSchema } from './common.schema';

export const CreateClientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  status: StatusSchema.default('active'),
  contactPerson: z.string().optional(),
  website: z.string().url().optional(),
  industry: z.string().optional(),
  logo: z.string().url().optional(),
});

export const UpdateClientSchema = CreateClientSchema.partial();

export const ClientInvitationSchema = z.object({
  email: z.string().email('Invalid email address'),
});
