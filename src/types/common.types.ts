/**
 * Common Types
 * 
 * Shared types used across the application
 */

export type Status = 'active' | 'inactive' | 'archived' | 'pending';
export type Plan = 'free' | 'starter' | 'professional' | 'enterprise';

export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface Timestamp {
  createdAt: Date;
  updatedAt: Date;
}
