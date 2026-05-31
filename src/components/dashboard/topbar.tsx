'use client';

import { ThemeToggle } from '@/components/theme-toggle';

export function Topbar() {
  return (
    <div className="sticky top-0 z-40 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left side - Page title or breadcrumbs */}
        <div className="flex-1" />

        {/* Right side - Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}