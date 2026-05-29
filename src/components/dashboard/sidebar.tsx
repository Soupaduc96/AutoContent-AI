import {
  LayoutDashboard,
  FileText,
  BarChart3,
  CreditCard,
  Settings,
  Sparkles,
  Plug,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden w-[260px] flex-col justify-between border-r border-white/10 bg-black/60 backdrop-blur-xl lg:flex">
      <div>
        <div className="flex items-center gap-4 border-b border-white/10 p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black">
            <Sparkles />
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-none text-white">
              AutoContent AI
            </h2>

            <p className="mt-2 text-zinc-500">
              AI Automation
            </p>
          </div>
        </div>

        <nav className="space-y-3 p-4">
          <button className="flex w-full items-center gap-4 rounded-2xl bg-white px-5 py-4 text-lg font-medium text-black transition-all duration-300 hover:translate-x-2">
            <LayoutDashboard size={22} />
            Dashboard
          </button>

          <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-lg text-zinc-400 transition-all duration-300 hover:translate-x-2 hover:bg-white/5 hover:text-white">
            <Plug size={22} />
            Platforms
          </button>

          <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-lg text-zinc-400 transition-all duration-300 hover:translate-x-2 hover:bg-white/5 hover:text-white">
            <FileText size={22} />
            Content
          </button>

          <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-lg text-zinc-400 transition-all duration-300 hover:translate-x-2 hover:bg-white/5 hover:text-white">
            <BarChart3 size={22} />
            Analytics
          </button>

          <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-lg text-zinc-400 transition-all duration-300 hover:translate-x-2 hover:bg-white/5 hover:text-white">
            <CreditCard size={22} />
            Billing
          </button>

          <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-lg text-zinc-400 transition-all duration-300 hover:translate-x-2 hover:bg-white/5 hover:text-white">
            <Settings size={22} />
            Settings
          </button>
        </nav>
      </div>

      <div className="p-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-6">
          <p className="text-zinc-500">
            Upgrade to Pro
          </p>

          <h3 className="mt-4 text-3xl font-bold text-white">
            Unlock AI automation at scale.
          </h3>

          <button className="mt-6 w-full rounded-2xl bg-white px-5 py-4 text-lg font-medium text-black transition-all duration-300 hover:scale-105">
            Upgrade Plan
          </button>
        </div>
      </div>
    </aside>
  );
}