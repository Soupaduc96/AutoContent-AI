"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  Sparkles,
  Plug,
  PenSquare,
  Calendar,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (href: string) =>
    pathname === href
      ? "flex w-full items-center gap-4 rounded-2xl bg-white px-5 py-4 text-lg font-medium text-black transition-all duration-300"
      : "flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-lg text-zinc-400 transition-all duration-300 hover:translate-x-2 hover:bg-white/5 hover:text-white";

  return (
    <aside className="hidden w-[220px] flex-col justify-between border-r border-white/10 bg-black/60 backdrop-blur-xl lg:flex">
      <div>
        <div className="flex items-center gap-4 border-b border-white/10 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
            <Sparkles />
          </div>

          <div>
            <h2 className="text-2xl font-bold leading-none text-white">
              AutoContent AI
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Social Media OS
            </p>
          </div>
        </div>

        <nav className="space-y-3 p-4">
          <Link
            href="/dashboard"
            className={getLinkClass("/dashboard")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/generate"
            className={getLinkClass("/dashboard/generate")}
          >
            <PenSquare size={20} />
            Generate
          </Link>

          <Link
            href="/dashboard/drafts"
            className={getLinkClass("/dashboard/drafts")}
          >
            <FileText size={20} />
            Drafts
          </Link>

          <Link
            href="/dashboard/calendar"
            className={getLinkClass("/dashboard/calendar")}
          >
            <Calendar size={20} />
            Calendar
          </Link>

          <Link
            href="/platforms"
            className={getLinkClass("/platforms")}
          >
            <Plug size={20} />
            Platforms
          </Link>

          <Link
            href="/dashboard/analytics"
            className={getLinkClass("/dashboard/analytics")}
          >
            <BarChart3 size={20} />
            Analytics
          </Link>

          <Link
            href="/billing"
            className={getLinkClass("/billing")}
          >
            <CreditCard size={20} />
            Billing
          </Link>

          <Link
            href="/settings"
            className={getLinkClass("/settings")}
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </div>

      <div className="p-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-5">
          <p className="text-sm text-zinc-500">
            Upgrade to Pro
          </p>

          <h3 className="mt-3 text-2xl font-bold text-white">
            Unlock AI automation at scale.
          </h3>

          <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-medium text-white transition-all duration-300 hover:scale-105">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}