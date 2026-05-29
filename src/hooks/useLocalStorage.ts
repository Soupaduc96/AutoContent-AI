/**
 * useLocalStorage Hook
 * 
 * Synced state with localStorage
 */

'use client';

// TODO: Implement localStorage hook
export function useLocalStorage<T>(key: string, initialValue: T) {
  return [initialValue, (value: T) => {}] as const;
}
