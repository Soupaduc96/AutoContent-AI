"use client";

import { useRouter } from "next/navigation";
import { Bell, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { GenerateModal } from "./generate-modal";

export function Topbar() {
  const router = useRouter();

  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-5">

        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              onClick={() => router.forward()}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Title */}
          <div>
            <p className="text-xs text-zinc-500">Workspace</p>
            <h1 className="text-2xl font-bold text-white">AutoContent AI</h1>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 lg:flex">
            <Search className="h-4 w-4 text-zinc-500" />
            <input
              placeholder="Search content, drafts, analytics..."
              className="w-80 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
            <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-zinc-500">
              Ctrl K
            </span>
          </div>

          {/* Bell */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-green-400" />
          </button>

          {/* User Card — statik, pa bezwen Clerk */}
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 lg:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-sm font-semibold text-white">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white leading-tight">Account</p>
              <p className="text-xs text-zinc-500">Pro Plan</p>
            </div>
          </div>

          <GenerateModal />
        </div>

      </div>
    </header>
  );
}