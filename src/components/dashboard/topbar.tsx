'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export function Topbar() {
  const router = useRouter();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showAccountMenu, setShowAccountMenu] =
    useState(false);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const accountRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setShowNotifications(false);
      }

      if (
        accountRef.current &&
        !accountRef.current.contains(
          event.target as Node
        )
      ) {
        setShowAccountMenu(false);
      }
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowAccountMenu(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );

      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-5">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">

            <button
              onClick={() => router.back()}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => router.forward()}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

          </div>

         <div>
  <p className="text-xs text-zinc-500">
    Workspace
  </p>

  <button
    onClick={() => router.push('/dashboard')}
    className="
      text-2xl
      font-bold
      text-white
      transition-all
      duration-300
      hover:text-violet-400
    "
  >
    Overview
  </button>
</div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Account */}
          <div
            ref={accountRef}
            className="relative hidden lg:block"
          >
            <button
              onClick={() =>
                setShowAccountMenu(
                  !showAccountMenu
                )
              }
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-bold text-white">
                A
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Account
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">
                    Pro Plan
                  </span>

                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400">
                    3/5 Platforms
                  </span>
                </div>
              </div>
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl">
                <div className="border-b border-white/10 p-4">
                  <p className="font-semibold text-white">
                    Paul
                  </p>

                  <p className="text-sm text-zinc-500">
                    Founder • Pro Plan
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowAccountMenu(false);
                    router.push('/dashboard/settings');
                  }}
                  className="w-full p-4 text-left text-white hover:bg-white/5"
                >
                  👤 Profile
                </button>

                <button
                  onClick={() =>
                    router.push('/dashboard/billing')
                  }
                  className="w-full p-4 text-left text-white hover:bg-white/5"
                >
                  💳 Billing
                </button>

                <button
                  onClick={() =>
                    router.push('/dashboard/settings')
                  }
                  className="w-full p-4 text-left text-white hover:bg-white/5"
                >
                  ⚙️ Settings
                </button>

                <button className="w-full border-t border-white/10 p-4 text-left text-red-400 hover:bg-white/5">
                  🚪 Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Growth */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            ↑ 24% Growth
          </div>

          {/* AI Credits */}
          <div className="hidden xl:flex min-w-[180px] flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

              <p className="text-xs text-zinc-500">
                AI Credits
              </p>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm font-semibold text-white">
                874 / 1000
              </p>

              <p className="text-xs text-emerald-400">
                87%
              </p>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            </div>
          </div>

          {/* Notifications */}
          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition-all duration-300 hover:bg-white/10"
            >
              <Bell className="h-4 w-4" />

              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-emerald-400" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl">
                <div className="border-b border-white/10 p-4">
                  <h3 className="font-semibold text-white">
                    Notifications
                  </h3>

                  <p className="text-sm text-zinc-500">
                    Latest activity
                  </p>
                </div>

                <div className="divide-y divide-white/5">
                  <div className="p-4 hover:bg-white/5">
                    ✅ Facebook connected
                  </div>

                  <div className="p-4 hover:bg-white/5">
                    🚀 Content generated
                  </div>

                  <div className="p-4 hover:bg-white/5">
                    📅 Draft scheduled
                  </div>

                  <div className="p-4 hover:bg-white/5">
                    💎 Pro subscription active
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Generate */}
          <button
            onClick={() =>
              router.push('/dashboard/generate')
            }
            className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 px-6 py-3 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40"
          >
            <Sparkles className="h-5 w-5" />

            <span>
              Generate Content
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}