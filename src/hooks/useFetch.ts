/**
 * useFetch Hook
 * 
 * Generic data fetching hook with loading and error states
 */

'use client';

// TODO: Implement generic fetch hook with retry logic
export function useFetch<T>(url: string, options?: RequestInit) {
  return {
    data: null as T | null,
    loading: false,
    error: null as Error | null,
    refetch: async () => {},
  };
}
