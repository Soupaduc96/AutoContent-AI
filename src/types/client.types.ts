/**
 * Client (Agency Client) Types
 */

import { Status, Timestamp } from './common.types';

export interface Client extends Timestamp {
  id: string;
  organizationId: string;
  name: string;
  email: string;
  status: Status;
  contactPerson?: string;
  website?: string;
  industry?: string;
  logo?: string;
}

export interface ClientInvitation extends Timestamp {
  id: string;
  organizationId: string;
  clientId: string;
  email: string;
  token: string;
  expiresAt: Date;
  acceptedAt?: Date;
}

export interface ClientAccess extends Timestamp {
  id: string;
  organizationId: string;
  clientId: string;
  userId: string;
  role: 'viewer' | 'editor';
}
