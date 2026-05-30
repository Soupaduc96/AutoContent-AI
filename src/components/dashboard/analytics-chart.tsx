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

      <div className="flex h-[350px] items-end gap-4">
        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-32 w-full rounded-t-2xl bg-blue-500" />
          <span className="text-sm text-zinc-500">
            Mon
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-44 w-full rounded-t-2xl bg-violet-500" />
          <span className="text-sm text-zinc-500">
            Tue
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-56 w-full rounded-t-2xl bg-fuchsia-500" />
          <span className="text-sm text-zinc-500">
            Wed
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-40 w-full rounded-t-2xl bg-pink-500" />
          <span className="text-sm text-zinc-500">
            Thu
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-64 w-full rounded-t-2xl bg-rose-500" />
          <span className="text-sm text-zinc-500">
            Fri
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-48 w-full rounded-t-2xl bg-green-500" />
          <span className="text-sm text-zinc-500">
            Sat
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center gap-3">
          <div className="h-72 w-full rounded-t-2xl bg-orange-500" />
          <span className="text-sm text-zinc-500">
            Sun
          </span>
        </div>
      </div>
    </section>
  );
}