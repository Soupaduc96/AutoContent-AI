export function AnalyticsChart() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">
            Growth Analytics
          </h3>

          <p className="mt-1 text-zinc-400">
            Content performance overview
          </p>
        </div>

        <div className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-zinc-300">
          Last 30 days
        </div>
      </div>

      <div className="flex h-[300px] items-end gap-4">
        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-[40%] w-full rounded-t-2xl bg-gradient-to-t from-cyan-500 to-blue-500 shadow-2xl shadow-cyan-500/20" />

          <span className="text-sm text-zinc-500">
            Mon
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-[55%] w-full rounded-t-2xl bg-gradient-to-t from-blue-500 to-violet-500 shadow-2xl shadow-blue-500/20" />

          <span className="text-sm text-zinc-500">
            Tue
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-[70%] w-full rounded-t-2xl bg-gradient-to-t from-violet-500 to-fuchsia-500 shadow-2xl shadow-fuchsia-500/20" />

          <span className="text-sm text-zinc-500">
            Wed
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-[50%] w-full rounded-t-2xl bg-gradient-to-t from-fuchsia-500 to-pink-500 shadow-2xl shadow-pink-500/20" />

          <span className="text-sm text-zinc-500">
            Thu
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-[85%] w-full rounded-t-2xl bg-gradient-to-t from-pink-500 to-rose-500 shadow-2xl shadow-rose-500/20" />

          <span className="text-sm text-zinc-500">
            Fri
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-[65%] w-full rounded-t-2xl bg-gradient-to-t from-emerald-500 to-green-500 shadow-2xl shadow-green-500/20" />

          <span className="text-sm text-zinc-500">
            Sat
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-[95%] w-full rounded-t-2xl bg-gradient-to-t from-yellow-500 to-orange-500 shadow-2xl shadow-orange-500/20" />

          <span className="text-sm text-zinc-500">
            Sun
          </span>
        </div>
      </div>
    </section>
  );
}