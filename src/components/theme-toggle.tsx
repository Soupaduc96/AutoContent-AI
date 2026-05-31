'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() =>
        setTheme(
          isDark
            ? 'light'
            : 'dark'
        )
      }
      title={
        isDark
          ? 'Switch to Light Mode'
          : 'Switch to Dark Mode'
      }
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        border-white/10
        bg-white/5
        text-white
        transition-all
        duration-300
        hover:scale-105
        hover:bg-white/10
      "
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-slate-900" />
      )}
    </button>
  );
}