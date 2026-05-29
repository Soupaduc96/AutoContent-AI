/**
 * Auth Types
 */

import { Timestamp } from './common.types';

export interface AuthUser extends Timestamp {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  emailVerified: boolean;
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

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}

export interface AuthSession extends Timestamp {
  userId: string;
  token: string;
  expiresAt: Date;
}
