"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  Search,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { GenerateModal } from "./generate-modal";

export function Topbar() {
  const router = useRouter();

  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => router.forward()}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              Overview
            </h1>

            <p className="mt-2 text-zinc-400">
              Track content performance and activity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 lg:flex">
            <Search className="h-5 w-5 text-zinc-500" />

            <input
              placeholder="Search content..."
              className="bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10">
            <Bell className="h-5 w-5" />

            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-green-400" />
          </button>

          <GenerateModal />
        </div>
      </div>
    </header>
  );
}